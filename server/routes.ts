import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import OpenAI from "openai";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema } from "@shared/schema";
import { z } from "zod";

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

// Initialize Stripe
// Initialize Stripe only if secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'analytical-investments-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Passport configuration
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Authentication required' });
  };

  const requireOmegaPlan = (req: any, res: any, next: any) => {
    if (req.user && req.user.plan === 'omega') {
      return next();
    }
    res.status(403).json({ message: 'OMEGA plan required' });
  };

  // Authentication routes
  app.post('/api/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Remove password from response
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    const { password, ...userResponse } = req.user as any;
    res.json(userResponse);
  });

  app.post('/api/logout', (req, res) => {
    req.logout(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/me', requireAuth, (req, res) => {
    const { password, ...userResponse } = req.user as any;
    res.json(userResponse);
  });

  // Stripe subscription routes
  app.post('/api/get-or-create-subscription', requireAuth, async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ 
        message: "Payment processing unavailable. Please contact support." 
      });
    }

    try {
      let user = req.user as any;

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        res.json({
          subscriptionId: subscription.id,
          clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        });
        return;
      }

      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });

      // For now, create a basic subscription structure
      // This will be replaced with proper Stripe integration once API keys are added
      const subscription = {
        id: 'temp_sub_' + Date.now(),
        latest_invoice: {
          payment_intent: {
            client_secret: 'temp_secret_' + Date.now()
          }
        }
      };

      await storage.updateUserStripeInfo(user.id, customer.id, subscription.id);
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      res.status(400).json({ error: { message: error.message } });
    }
  });

  app.post('/api/update-subscription-status', requireAuth, async (req, res) => {
    try {
      const { subscriptionId, status } = req.body;
      const user = req.user as any;

      if (status === 'active') {
        await storage.updateUserPlan(user.id, 'omega');
      } else {
        await storage.updateUserPlan(user.id, 'free');
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(parseInt(req.params.id));
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/courses', requireAuth, requireOmegaPlan, async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // AI Chat routes
  app.get('/api/chat-sessions', requireAuth, requireOmegaPlan, async (req, res) => {
    try {
      const user = req.user as any;
      const sessions = await storage.getUserChatSessions(user.id);
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/chat', requireAuth, requireOmegaPlan, async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      const user = req.user as any;

      // Get or create chat session
      let session;
      if (sessionId) {
        const sessions = await storage.getUserChatSessions(user.id);
        session = sessions.find(s => s.id === sessionId);
      }

      if (!session) {
        session = await storage.createChatSession({
          userId: user.id,
          messages: []
        });
      }

      const messages = session.messages as any[] || [];
      messages.push({ role: 'user', content: message, timestamp: new Date() });

      // Generate AI response using GPT-4o
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are OMEGA AI, a financial intelligence assistant for Analytical Investments. Provide clear, actionable financial insights and analysis. Draw from comprehensive market knowledge to help users make informed investment decisions. Always be professional, accurate, and helpful."
          },
          ...messages.slice(-10).map((msg: any) => ({ role: msg.role, content: msg.content }))
        ],
        max_tokens: 1000
      });

      const aiResponse = completion.choices[0].message.content;
      messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });

      // Update session
      const updatedSession = await storage.updateChatSession(session.id, messages);
      
      res.json({
        response: aiResponse,
        sessionId: updatedSession.id
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portfolio routes
  app.get('/api/portfolios', requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const portfolios = await storage.getUserPortfolios(user.id);
      res.json(portfolios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Market data routes
  app.get('/api/market-data', async (req, res) => {
    try {
      const data = await storage.getAllMarketData();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // AI Report generation
  app.post('/api/generate-report', requireAuth, requireOmegaPlan, async (req, res) => {
    try {
      const { topic, preferences } = req.body;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are OMEGA AI, generating comprehensive financial reports. Create detailed, professional investment analysis reports based on the given topic and user preferences. Include market trends, risk assessments, and actionable recommendations. Respond in JSON format with sections: title, summary, analysis, recommendations, risks, and conclusion."
          },
          {
            role: "user",
            content: `Generate a financial report on: ${topic}. User preferences: ${JSON.stringify(preferences)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const report = JSON.parse(completion.choices[0].message.content || '{}');
      res.json(report);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
