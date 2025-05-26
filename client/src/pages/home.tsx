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
  Database
} from "lucide-react";
import PortfolioChart from "@/components/charts/portfolio-chart";
import AllocationChart from "@/components/charts/allocation-chart";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative gradient-hero pt-16 pb-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  AI-Enhanced{" "}
                  <span className="text-primary">Investing Tools</span>{" "}
                  For Everyone
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Professional-grade market intelligence made accessible and affordable. 
                  Powered by OMEGA AI with insights from 50+ financial sources.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="btn-primary text-lg px-8 py-4">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button size="lg" className="btn-primary text-lg px-8 py-4">
                      Start Free Trial
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free education hub</span>
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-2xl">
                <CardContent className="p-6 space-y-6">
                  {/* Chart visualization */}
                  <div className="h-64 chart-container">
                    <PortfolioChart />
                  </div>
                  {/* Stats cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-900/30 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400">+12.5%</div>
                      <div className="text-sm text-gray-300">Portfolio</div>
                    </div>
                    <div className="bg-amber-900/30 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-amber-400">$24.8K</div>
                      <div className="text-sm text-gray-300">Value</div>
                    </div>
                    <div className="bg-blue-900/30 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-400">15</div>
                      <div className="text-sm text-gray-300">Holdings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

      {/* Features Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Professional Tools, Simplified Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to make informed investment decisions in one intuitive platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Real-Time Analytics",
                    desc: "Live market data and portfolio tracking with professional-grade charts and indicators."
                  },
                  {
                    icon: MessageSquare,
                    title: "OMEGA AI Assistant",
                    desc: "Get personalized insights and answers to your financial questions from our advanced AI."
                  },
                  {
                    icon: Database,
                    title: "50+ Data Sources",
                    desc: "Comprehensive market intelligence from trusted financial news and data providers."
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
              
              <Link href="/dashboard">
                <Button className="btn-primary">
                  Explore Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Dashboard Preview */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-2xl">
              <CardContent className="p-8 space-y-8">
                {/* Top Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-300">Portfolio Value</h3>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$47,832</div>
                    <div className="text-sm text-green-400">+12.5% this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Transform Your Investment Strategy?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of investors using OMEGA AI to make smarter financial decisions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
                      Go to Dashboard
                    </Button>
                  </Link>
                  {user.plan === "free" && (
                    <Link href="/pricing">
                      <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800">
                        Upgrade to OMEGA
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800">
                      View Pricing
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex justify-center space-x-8 text-gray-400 text-sm">
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
