import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Check, 
  Star,
  Crown,
  Shield,
  CreditCard,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Zap
} from "lucide-react";

// Load Stripe (only if key is available)
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { refetchUser } = useAuth();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard?subscription=success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Update user status
        await apiRequest("POST", "/api/update-subscription-status", {
          status: "active"
        });
        
        // Refresh user data
        refetchUser();
        
        toast({
          title: "Welcome to OMEGA!",
          description: "Your subscription is now active. Enjoy unlimited AI access!",
        });
        
        setLocation("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-primary" />
          Payment Information
        </h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <PaymentElement 
            options={{
              layout: "tabs"
            }}
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
            <p className="text-blue-700 text-sm">
              Your payment information is encrypted and processed securely by Stripe. 
              We never store your card details.
            </p>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Subscribe to OMEGA - $5/month</span>
          </div>
        )}
      </Button>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          By subscribing, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a>
        </p>
        <div className="flex justify-center space-x-6 text-xs text-gray-500">
          <span>✓ Cancel anytime</span>
          <span>✓ 30-day money-back guarantee</span>
          <span>✓ Instant access</span>
        </div>
      </div>
    </form>
  );
};

export default function Subscribe() {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setError("Please sign in to subscribe to OMEGA");
      setIsLoading(false);
      return;
    }

    if (user.plan === "omega") {
      setError("You already have an active OMEGA subscription");
      setIsLoading(false);
      return;
    }

    // Create subscription
    apiRequest("POST", "/api/get-or-create-subscription")
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Failed to initialize subscription");
        setIsLoading(false);
        toast({
          title: "Subscription Error",
          description: "Failed to initialize subscription. Please try again.",
          variant: "destructive",
        });
      });
  }, [user, toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900">Setting up your subscription...</h2>
              <p className="text-gray-600">Please wait while we prepare your OMEGA upgrade.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Subscription Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              {!user ? (
                <>
                  <Link href="/login">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full">Create Account</Button>
                  </Link>
                </>
              ) : user.plan === "omega" ? (
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/pricing">
                  <Button className="w-full">Back to Pricing</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to OMEGA</h1>
          <p className="text-gray-600">Unlock the full power of AI-enhanced investing tools</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="bg-gradient-to-br from-primary/5 to-blue-50 border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-900">OMEGA Plan</CardTitle>
                <Badge className="bg-primary text-white px-3 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary">$5</span>
                <span className="text-lg text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Professional-grade investment tools with unlimited AI assistance at an unbeatable price.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                {[
                  "Full access to OMEGA AI assistant",
                  "Unlimited reports & market analysis",
                  "Unlimited chat sessions",
                  "Real-time market data",
                  "Advanced portfolio analytics",
                  "Admin dashboard access",
                  "Priority customer support",
                  "Custom AI-generated reports",
                  "API access for developers",
                  "All education hub content"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="w-6 h-6 text-amber-500" />
                  <h4 className="font-semibold text-gray-900">30-Day Guarantee</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Not satisfied? Get a full refund within 30 days, no questions asked.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Complete Your Subscription</CardTitle>
                <Link href="/pricing">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {!stripePromise ? (
                <div className="text-center space-y-4 p-8">
                  <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Payment Setup Required</h3>
                  <p className="text-gray-600">
                    Payment processing will be available once the platform is fully configured with payment credentials.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
                    <h4 className="font-medium text-blue-900 mb-2">Meanwhile, explore these features:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Free educational content in the Education Hub</li>
                      <li>• Portfolio tracking and visualization tools</li>
                      <li>• Market data and basic analytics</li>
                      <li>• User dashboard and account management</li>
                    </ul>
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full mt-4">Explore Free Features</Button>
                  </Link>
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <SubscribeForm />
                </Elements>
              ) : (
                <div className="space-y-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Highlight */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Thousands Choose OMEGA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Advanced AI Intelligence",
                description: "GPT-4o powered insights with data from 50+ financial sources"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and secure data handling for your peace of mind"
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "Start using all premium features immediately after subscription"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
