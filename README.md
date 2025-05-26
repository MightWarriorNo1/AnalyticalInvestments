# Analytical Investments - Professional Financial Analytics Platform

A beginner-friendly financial analytics platform featuring GPT-4o AI assistance, transparent $5/month pricing, and free educational resources designed to democratize professional investment tools.

![Platform Preview](https://via.placeholder.com/800x400/2563eb/ffffff?text=Analytical+Investments+Platform)

## 🚀 Features

### Free Plan
- ✅ Educational content and courses
- ✅ Basic portfolio tracking
- ✅ Market data visualization
- ✅ User dashboard
- ✅ Account management

### OMEGA Plan ($5/month)
- 🤖 **AI-Powered Financial Assistant** - GPT-4o powered insights
- 📊 **Advanced Portfolio Analytics** - Professional-grade analysis
- 💬 **Unlimited AI Chat Sessions** - Real-time financial guidance
- 📈 **Custom Reports & Market Analysis** - Personalized insights
- ⚡ **Real-time Market Data** - Live financial information
- 👑 **Admin Dashboard Access** - Advanced platform features
- 🔧 **API Access** - Developer integration capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Chart.js** for data visualization

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication
- **Express Session** for session management

### AI & Payments
- **OpenAI GPT-4o** for AI assistant
- **Stripe** for payment processing
- **bcrypt** for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** database
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd analytical-investments
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create environment variables for the following services:

#### Required API Keys:
- **OpenAI API Key** - For AI assistant functionality
- **Stripe API Keys** - For payment processing
- **Database URL** - PostgreSQL connection string

#### How to obtain API keys:

**OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Set as `OPENAI_API_KEY`

**Stripe API Keys:**
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Get your **Publishable key** (starts with `pk_`) → Set as `VITE_STRIPE_PUBLIC_KEY`
3. Get your **Secret key** (starts with `sk_`) → Set as `STRIPE_SECRET_KEY`

**Database Setup:**
- PostgreSQL database URL will be provided automatically if using Replit
- For local development, set up a PostgreSQL database and configure `DATABASE_URL`

### 4. Database Setup
```bash
# Push database schema
npm run db:push
```

## 🏃‍♂️ Running the Project

### Development Mode
```bash
npm run dev
```
This starts both the frontend and backend servers:
- Frontend: Vite development server
- Backend: Express server on port 5000
- The app will be available at the provided URL

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🗂️ Project Structure

```
analytical-investments/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn/ui components
│   │   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   │   ├── charts/     # Chart components
│   │   │   └── ai/         # AI chat interface
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── main.tsx        # App entry point
│   └── index.html
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── index.ts           # Server entry point
│   └── vite.ts            # Vite integration
├── shared/                 # Shared TypeScript definitions
│   └── schema.ts          # Database schema & types
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── drizzle.config.ts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm start              # Start production server

# Database
npm run db:push         # Push schema changes to database
npm run db:studio      # Open Drizzle Studio (if available)

# Linting & Formatting
npm run lint           # Lint code
npm run type-check     # TypeScript type checking
```

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user

### Subscriptions (OMEGA Plan)
- `POST /api/get-or-create-subscription` - Create Stripe subscription
- `POST /api/update-subscription-status` - Update subscription status

### AI Chat (OMEGA Plan)
- `GET /api/chat-sessions` - Get user chat sessions
- `POST /api/chat-sessions` - Create new chat session
- `POST /api/chat` - Send message to AI assistant

### Educational Content
- `GET /api/courses` - Get available courses
- `GET /api/courses/:id` - Get specific course

## 🔐 Security Features

- **Password Hashing** - bcrypt for secure password storage
- **Session Management** - Express sessions with PostgreSQL store
- **Authentication Middleware** - Protected routes and API endpoints
- **Environment Variables** - Secure API key management
- **CORS Protection** - Cross-origin request security

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode Support** - Theme switching capability
- **Modern Glassmorphism** - Contemporary design aesthetics
- **Smooth Animations** - Enhanced user experience
- **Accessible Components** - WCAG compliant UI elements
- **Professional Branding** - Cohesive visual identity

## 🚀 Deployment

### Replit (Recommended)
The project is optimized for Replit deployment:
1. Import the repository to Replit
2. Configure environment variables through Replit's secrets manager
3. The database and hosting are handled automatically
4. Click "Run" to deploy

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy to your preferred hosting platform
5. Run database migrations: `npm run db:push`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for democratizing financial education and investment tools**

### Quick Start Checklist
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Configure API keys (OpenAI, Stripe)
- [ ] Run `npm run db:push`
- [ ] Start with `npm run dev`
- [ ] Access the platform and create an account
- [ ] Explore free features or upgrade to OMEGA plan

---

*Ready to revolutionize your investment journey? Get started with Analytical Investments today!*