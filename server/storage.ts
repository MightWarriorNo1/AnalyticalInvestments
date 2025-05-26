import { users, courses, chatSessions, portfolios, marketData, type User, type InsertUser, type Course, type InsertCourse, type ChatSession, type InsertChatSession, type Portfolio, type InsertPortfolio, type MarketData } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPlan(id: number, plan: string): Promise<User>;
  updateUserStripeInfo(id: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Course management
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Chat sessions
  getUserChatSessions(userId: number): Promise<ChatSession[]>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(id: number, messages: any[]): Promise<ChatSession>;
  
  // Portfolio management
  getUserPortfolios(userId: number): Promise<Portfolio[]>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: number, holdings: any[], totalValue: string, dailyChange: string): Promise<Portfolio>;
  
  // Market data
  getAllMarketData(): Promise<MarketData[]>;
  getMarketDataBySymbol(symbol: string): Promise<MarketData | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserPlan(id: number, plan: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ plan })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserStripeInfo(id: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId, stripeSubscriptionId })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async getUserChatSessions(userId: number): Promise<ChatSession[]> {
    return await db.select().from(chatSessions).where(eq(chatSessions.userId, userId)).orderBy(desc(chatSessions.updatedAt));
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db
      .insert(chatSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async updateChatSession(id: number, messages: any[]): Promise<ChatSession> {
    const [session] = await db
      .update(chatSessions)
      .set({ messages, updatedAt: new Date() })
      .where(eq(chatSessions.id, id))
      .returning();
    return session;
  }

  async getUserPortfolios(userId: number): Promise<Portfolio[]> {
    return await db.select().from(portfolios).where(eq(portfolios.userId, userId)).orderBy(desc(portfolios.updatedAt));
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const [portfolio] = await db
      .insert(portfolios)
      .values(insertPortfolio)
      .returning();
    return portfolio;
  }

  async updatePortfolio(id: number, holdings: any[], totalValue: string, dailyChange: string): Promise<Portfolio> {
    const [portfolio] = await db
      .update(portfolios)
      .set({ holdings, totalValue, dailyChange, updatedAt: new Date() })
      .where(eq(portfolios.id, id))
      .returning();
    return portfolio;
  }

  async getAllMarketData(): Promise<MarketData[]> {
    return await db.select().from(marketData).orderBy(desc(marketData.updatedAt));
  }

  async getMarketDataBySymbol(symbol: string): Promise<MarketData | undefined> {
    const [data] = await db.select().from(marketData).where(eq(marketData.symbol, symbol));
    return data || undefined;
  }
}

export const storage = new DatabaseStorage();
