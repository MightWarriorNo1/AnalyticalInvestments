import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { 
  Brain, 
  Wallet, 
  Scale3d, 
  TrendingUp, 
  DollarSign, 
  Puzzle, 
  HelpCircle,
  CheckCircle,
  Play,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Database,
  Shield,
  Check,
  X,
  Star,
  Clock,
  Users
} from "lucide-react";
import PortfolioChart from "@/components/charts/portfolio-chart";
import AllocationChart from "@/components/charts/allocation-chart";

interface Feature {
  name: string;
  included: boolean;
  note?: string;
}

export default function Home() {
  const { user } = useAuth();

  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight">
                Transform Your Investment Strategy with{' '}
                <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  Data-Driven Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Unlock the power of advanced analytics and make informed investment decisions with our cutting-edge platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 inline-block" size={20} />
                </Link>
                <button onClick={scrollToDemo} className="btn-secondary">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/images/1.jpg"
                    alt="Analytics Dashboard"
                    className="rounded-xl shadow-2xl border border-purple-500/20"
                  />
                  <img
                    src="/images/2.jpg"
                    alt="Market Analysis"
                    className="rounded-xl shadow-2xl border border-purple-500/20"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="/images/3.jpg"
                    alt="Portfolio Insights"
                    className="rounded-xl shadow-2xl border border-purple-500/20"
                  />
                  <img
                    src="/images/4.jpg"
                    alt="Risk Assessment"
                    className="rounded-xl shadow-2xl border border-purple-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Pain Points Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Solving Modern Investment Challenges
            </h2>
            <p className="text-xl text-muted-foreground">
              We address the key pain points that investors face in today's complex market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gradient-card p-6 rounded-xl border border-purple-500/20">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Overload</h3>
              <p className="text-muted-foreground">
                Struggling to make sense of overwhelming market data? Our AI-powered analytics transform complex information into actionable insights.
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-xl border border-purple-500/20">
              <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-muted-foreground">
                Worried about market volatility? Our advanced risk assessment tools help you protect your investments and make informed decisions.
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-xl border border-purple-500/20">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
              <p className="text-muted-foreground">
                Need better portfolio insights? Get real-time performance metrics and personalized recommendations to optimize your returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Solving Real Problems in Financial Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional platforms are complex, expensive, and hard to use. We're changing that.
            </p>
          </div>

          {/* Problems */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: HelpCircle, title: "Difficult Navigation", desc: "Complex interfaces that confuse users" },
              { icon: DollarSign, title: "Extremely Expensive", desc: "High costs limit access to tools" },
              { icon: Puzzle, title: "Overcomplicated", desc: "Features that are hard to understand" },
              { icon: HelpCircle, title: "Untrustworthy", desc: "Unclear or inaccurate information" }
            ].map((problem, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-900/30 rounded-xl flex items-center justify-center mx-auto">
                  <problem.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="font-semibold text-white">{problem.title}</h3>
                <p className="text-sm text-gray-300">{problem.desc}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Clear Intelligence",
                desc: "Easy-to-understand market insights powered by AI that cuts through complexity.",
                gradient: "from-blue-900/30 to-indigo-900/30",
                iconBg: "bg-primary",
                features: ["Simplified reports", "Visual data summaries"]
              },
              {
                icon: Wallet,
                title: "Affordable Access",
                desc: "Professional-grade tools at just $5/month - a fraction of traditional platform costs.",
                gradient: "from-green-900/30 to-emerald-900/30",
                iconBg: "bg-green-600",
                features: ["No hidden fees", "Cancel anytime"]
              },
              {
                icon: Scale3d,
                title: "Beginner Friendly",
                desc: "Professional depth with beginner-friendly simplicity and comprehensive education.",
                gradient: "from-amber-900/30 to-orange-900/30",
                iconBg: "bg-amber-600",
                features: ["Free education hub", "Guided onboarding"]
              }
            ].map((solution, index) => (
              <Card key={index} className={`bg-gradient-to-br ${solution.gradient} border-gray-700`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${solution.iconBg} text-white rounded-xl flex items-center justify-center mb-6`}>
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{solution.title}</h3>
                  <p className="text-gray-300 mb-6">{solution.desc}</p>
                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              See OMEGA AI in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch how our platform transforms complex market data into actionable insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: Play,
                    title: "Interactive Demo",
                    desc: "Experience our platform's powerful features through an interactive walkthrough."
                  },
                  {
                    icon: BarChart3,
                    title: "Real-Time Analysis",
                    desc: "See how OMEGA AI processes market data and generates insights in real-time."
                  },
                  {
                    icon: MessageSquare,
                    title: "AI Assistant Demo",
                    desc: "Watch our AI assistant answer complex financial questions and provide recommendations."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mt-1">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/register">
                <Button className="btn-primary">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Demo Video Preview */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary">
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                  <img 
                    src="/images/demo-preview.jpg" 
                    alt="Demo Preview" 
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-white">Platform Overview</h3>
                  <p className="text-gray-300">Watch how OMEGA AI transforms your investment strategy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. Upgrade or downgrade at any time with no hidden fees.
            </p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>No setup fees</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                name: "Free Plan",
                price: "$0",
                period: "/month",
                description: "Perfect for getting started with investing education",
                popular: false,
                features: [
                  { name: "Full access to education hub", included: true } as Feature,
                  { name: "Basic market data", included: true } as Feature,
                  { name: "Community forum access", included: true } as Feature,
                  { name: "Limited AI tools access", included: false, note: "5 queries/month" } as Feature,
                  { name: "Basic reports only", included: false, note: "Monthly summaries" } as Feature,
                  { name: "No chat sessions", included: false } as Feature,
                  { name: "Admin dashboard access", included: false } as Feature,
                  { name: "Priority support", included: false } as Feature,
                  { name: "Advanced analytics", included: false } as Feature,
                  { name: "Custom reports", included: false } as Feature
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
            ].map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? "bg-gradient-to-br from-primary/20 to-purple-900/20 backdrop-blur-sm border-primary/50" 
                    : "bg-gray-800/50 backdrop-blur-sm border-gray-700"
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
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-5xl font-bold ${plan.popular ? "text-primary" : "text-white"}`}>
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature: Feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-gray-300" : "text-gray-500"}`}>
                          {feature.name}
                          {feature.note && (
                            <span className="text-gray-500 ml-2">({feature.note})</span>
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
                          : "bg-gray-700 hover:bg-gray-600 text-white"
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
          <div className="text-center mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-white">Disclosure And Legal Information</h3>
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SSL encrypted & secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>5,000+ satisfied users</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>24/7 customer support</span>
              </div>
            </div>
            {/* Company Information */}
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-gray-300">
                Our Company is an AI-powered analytics tool that helps users explore and understand financial markets. We do not provide personalized investment advice or execute trades, and therefore are not a broker-dealer or investment advisor under U.S. law. Our platform exists purely as a research assistant, giving users access to data and insights without the confusion or cost of traditional financial services. This means we're not required to register with the SEC or follow the strict compliance standards set for those entities. Our mission is to make market analysis accessible, smart, and affordable for everyone.
              </p>
              <p className="text-gray-300">
                Before you use this website, we highly recommend that you read our <Link href="/privacy" className="text-blue-400 hover:text-red-500 active:text-white-500 transition-colors"><strong>Privacy Policy</strong></Link> and <Link href="/terms" className="text-blue-400 hover:text-red-500 active:text-red-500 transition-colors"><strong>Terms of Service</strong></Link>. 
                You must ensure that you agree and completely understand the information and disclosures we provide before using this website.
              </p>
            </div>

            

            {/* Legal Links
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/compliance" className="text-gray-400 hover:text-white transition-colors">
                Compliance
              </a>
              <a href="/security" className="text-gray-400 hover:text-white transition-colors">
                Security
              </a>
            </div> */}

            {/* Registration Info */}
            <div className="text-sm text-gray-400">
              <p>Analytical Investments LLC | Registered in Delaware, USA</p>
              <p className="mt-1">FINRA Member | SEC Registered Investment Advisor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
