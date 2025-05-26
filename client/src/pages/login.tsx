import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Brain, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      setLocation("/dashboard");
    } catch (error: any) {
      setError("root", {
        message: error.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Analytical Investments</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to access your dashboard and portfolio</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12"
                    {...register("email")}
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12"
                    {...register("password")}
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-6" />
              
              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register">
                    <span className="text-primary font-medium hover:text-primary/80 cursor-pointer">
                      Create a free account
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <span>AI Insights</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span>Secure Platform</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span>Easy Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
