import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  email: string;
  plan: "free" | "omega";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["/api/me"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/login", { email, password });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/me"] });
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: { username: string; email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/register", { username, email, password });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/me"] });
      toast({
        title: "Account created!",
        description: "Welcome to Analytical Investments.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Goodbye!",
        description: "You have been logged out successfully.",
      });
    },
  });

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    login: async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password });
    },
    register: async (username: string, email: string, password: string) => {
      await registerMutation.mutateAsync({ username, email, password });
    },
    logout: async () => {
      await logoutMutation.mutateAsync();
    },
    refetchUser: () => refetch(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
