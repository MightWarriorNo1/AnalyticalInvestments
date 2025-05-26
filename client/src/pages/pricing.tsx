import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { 
  Check, 
  X, 
  Star,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  MessageSquare,
  BarChart3,
  BookOpen,
  Users,
  Clock
} from "lucide-react";

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started with investing education",
      popular: false,
      features: [
        { name: "Full access to education hub", included: true },
        { name: "Basic market data", included: true },
        { name: "Community forum access", included: true },
        { name: "Limited AI tools access", included: false, note: "5 queries/month" },
        { name: "Basic reports only", included: false, note: "Monthly summaries" },
        { name: "No chat sessions", included: false },
        { name: "Admin dashboard access", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom reports", included: false }
      ],
      cta: user ? "Current Plan" : "Get Started Free",
      ctaVariant: "outline" as const,
      ctaLink: user ? "/dashboard" : "/register"
    },
    {
      name: "OMEGA Plan",
      price: "$5",
      period: "/month",
      description: "Professional-grade tools at an affordable price",
      popular: true,
      features: [
        { name: "Full access to OMEGA AI", included: true },
        { name: "Unlimited reports & graphs", included: true },
        { name: "Unlimited chat sessions", included: true },
        { name: "Admin dashboard access", included: true },
        { name: "Priority updates & support", included: true },
        { name: "Full education suite", included: true },
        { name: "Real-time market data", included: true },
        { name: "Advanced portfolio analytics", included: true },
        { name: "Custom AI reports", included: true },
        { name: "API access", included: true }
      ],
      cta: user?.plan === "omega" ? "Current Plan" : "Start OMEGA Trial",
      ctaVariant: "default" as const,
      ctaLink: user?.plan === "omega" ? "/dashboard" : "/subscribe"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. Upgrade or downgrade at any time with no hidden fees.
            </p>
            <div className="flex justify-center space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>No setup fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? "bg-gradient-to-br from-primary/5 to-blue-50 border-2 border-primary shadow-xl" 
                    : "border-2 border-gray-200 hover:border-primary/30"
                } transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-6 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="text-center space-y-4 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-5xl font-bold ${plan.popular ? "text-primary" : "text-gray-900"}`}>
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-gray-900" : "text-gray-500"}`}>
                          {feature.name}
                          {feature.note && (
                            <span className="text-gray-400 ml-2">({feature.note})</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={plan.ctaLink}>
                    <Button 
                      className={`w-full py-4 text-lg font-semibold ${
                        plan.popular 
                          ? "bg-primary hover:bg-primary/90 text-white shadow-lg" 
                          : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      variant={plan.ctaVariant}
                      disabled={user?.plan === plan.name.toLowerCase().split(' ')[0]}
                    >
                      {user?.plan === plan.name.toLowerCase().split(' ')[0] ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Current Plan
                        </>
                      ) : (
                        plan.cta
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Questions about our plans?</h3>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>SSL encrypted & secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>5,000+ satisfied users</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose OMEGA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform compares to traditional financial tools and competitors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description: "Advanced GPT-4o integration provides personalized insights and analysis",
                gradient: "from-primary/10 to-blue-50",
                iconBg: "bg-primary"
              },
              {
                icon: BarChart3,
                title: "Professional Analytics",
                description: "Institutional-grade tools at a fraction of the cost of competitors",
                gradient: "from-green-50 to-emerald-50",
                iconBg: "bg-green-600"
              },
              {
                icon: BookOpen,
                title: "Free Education",
                description: "Comprehensive learning resources to help you master investing",
                gradient: "from-amber-50 to-orange-50",
                iconBg: "bg-amber-600"
              }
            ].map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} border-0`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${feature.iconBg} text-white rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades will take effect at the end of your current billing cycle."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure Stripe payment processor."
              },
              {
                question: "Is there a free trial for the OMEGA plan?",
                answer: "Yes, new users get a 7-day free trial of the OMEGA plan to experience all premium features before committing to a subscription."
              },
              {
                question: "How does the 30-day money-back guarantee work?",
                answer: "If you're not satisfied with your OMEGA subscription within 30 days, we'll provide a full refund, no questions asked."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
              }
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Upgrade Your Investment Strategy?
              </h2>
              <p className="text-xl text-blue-100">
                Join thousands of investors using OMEGA AI to make smarter financial decisions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user?.plan !== "omega" && (
                <Link href="/subscribe">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    <Zap className="w-5 h-5 mr-2" />
                    Start OMEGA Trial
                  </Button>
                </Link>
              )}
              <Link href="/education">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Education Hub
                </Button>
              </Link>
            </div>

            <div className="flex justify-center space-x-8 text-blue-100 text-sm">
              <span>✓ 30-day money-back guarantee</span>
              <span>✓ Cancel anytime</span>
              <span>✓ No setup fees</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
