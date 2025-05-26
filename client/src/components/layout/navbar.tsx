import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Brain,
  Home,
  BarChart3,
  MessageCircle,
  BookOpen,
  DollarSign,
  Crown,
  Sparkles
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3, authRequired: true },
    { href: "/chat", label: "AI Chat", icon: MessageCircle, authRequired: true, omegaOnly: true, badge: "NEW" },
    { href: "/education", label: "Education", icon: BookOpen },
    { href: "/pricing", label: "Pricing", icon: DollarSign },
    { href: "/about", label: "About", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Brain className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Analytical Investments
                </h1>
                <div className="text-xs text-gray-500 -mt-1">Professional Trading Platform</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              // Check access permissions
              if (item.authRequired && !user) return null;
              if (item.omegaOnly && user?.plan !== "omega") {
                return (
                  <div key={item.href} className="relative group">
                    <Link href={item.omegaOnly ? "/subscribe" : item.href}>
                      <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed opacity-60 hover:opacity-80 transition-all">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <Crown className="w-3 h-3 text-amber-500" />
                      </div>
                    </Link>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      OMEGA Plan Required
                    </div>
                  </div>
                );
              }
              
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-1 text-xs bg-amber-100 text-amber-700 border-amber-200">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.plan === "omega" && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md">
                    <Crown className="w-3 h-3 mr-1" />
                    OMEGA
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                      <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-blue-600 text-white">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-medium">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-xs text-gray-500 capitalize">{user.plan} Plan</div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="flex items-center mt-2">
                        <Badge variant={user.plan === "omega" ? "default" : "secondary"} className="text-xs">
                          {user.plan === "omega" ? "OMEGA Plan" : "Free Plan"}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.plan === "omega" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.plan !== "omega" && (
                      <DropdownMenuItem asChild>
                        <Link href="/subscribe" className="flex items-center text-primary">
                          <Crown className="mr-2 h-4 w-4" />
                          <span>Upgrade to OMEGA</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-gray-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                // Check access permissions
                if (item.authRequired && !user) return null;
                
                return (
                  <Link key={item.href} href={item.omegaOnly && user?.plan !== "omega" ? "/subscribe" : item.href}>
                    <div
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary shadow-sm"
                          : item.omegaOnly && user?.plan !== "omega"
                          ? "text-gray-400 opacity-60"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-1 text-xs bg-amber-100 text-amber-700 border-amber-200">
                          {item.badge}
                        </Badge>
                      )}
                      {item.omegaOnly && user?.plan !== "omega" && (
                        <Crown className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                  </Link>
                );
              })}
              
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full justify-start bg-gradient-to-r from-primary to-blue-600">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
