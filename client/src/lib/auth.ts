// Auth utility functions and types
export interface User {
  id: number;
  username: string;
  email: string;
  plan: "free" | "omega";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Helper function to check if user has access to premium features
export function hasOmegaAccess(user: User | null): boolean {
  return user?.plan === "omega";
}

// Helper function to check if user can access AI features
export function canAccessAI(user: User | null): boolean {
  return hasOmegaAccess(user);
}

// Helper function to check if user can access admin features
export function canAccessAdmin(user: User | null): boolean {
  return hasOmegaAccess(user);
}

// Helper function to get user initials for avatar
export function getUserInitials(user: User | null): string {
  if (!user) return "?";
  return user.username.charAt(0).toUpperCase();
}

// Helper function to format plan name for display
export function formatPlanName(plan: string): string {
  return plan === "omega" ? "OMEGA" : "Free";
}

// Helper function to get plan color
export function getPlanColor(plan: string): string {
  return plan === "omega" ? "bg-primary text-white" : "bg-gray-100 text-gray-700";
}

// Storage keys for localStorage
export const AUTH_STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "auth_user",
  REFRESH_TOKEN: "refresh_token",
} as const;

// Auth routes that don't require authentication
export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/education",
  "/pricing",
  "/login",
  "/register",
] as const;

// Routes that require OMEGA plan
export const OMEGA_ROUTES = [
  "/admin",
] as const;

// Check if route is public
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.includes(path as any) || path.startsWith("/education");
}

// Check if route requires OMEGA plan
export function requiresOmegaPlan(path: string): boolean {
  return OMEGA_ROUTES.includes(path as any);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Format user display name
export function formatUserDisplayName(user: User | null): string {
  if (!user) return "Guest";
  return user.username;
}

// Check if user subscription is active
export function hasActiveSubscription(user: User | null): boolean {
  return user?.plan === "omega" && !!user.stripeSubscriptionId;
}

// Get subscription status text
export function getSubscriptionStatusText(user: User | null): string {
  if (!user) return "Not authenticated";
  if (user.plan === "free") return "Free Plan";
  if (hasActiveSubscription(user)) return "OMEGA Plan Active";
  return "OMEGA Plan Inactive";
}
