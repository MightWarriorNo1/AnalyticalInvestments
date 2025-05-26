import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  Database,
  Users,
  Shield,
  Award,
  Target
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="text-primary font-semibold text-lg">About Analytical Investments</div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              "For the People and the Pros"
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Analytical Investments is committed to making powerful, AI-enhanced investing tools 
              accessible, understandable, and affordable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform empowers individuals—whether novice or experienced—to access 
                  high-quality financial insights and analysis without the typical barriers 
                  of complexity, cost, or confusion.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Using OpenAI-powered technology, we deliver clear, actionable intelligence 
                  at a fraction of the price charged by traditional platforms.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">What Makes Us Different</h3>
                <div className="space-y-3">
                  {[
                    "Transparent $5/month pricing",
                    "Beginner-friendly interface design",
                    "Professional-grade AI capabilities",
                    "Comprehensive free education"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Young professionals analyzing financial data on laptops" 
                className="rounded-xl shadow-lg w-full"
              />
              
              <div className="grid grid-cols-2 gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Diverse group of people learning finance together" 
                  className="rounded-lg shadow-md w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Modern trading charts and financial graphs on screens" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OMEGA AI Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Meet OMEGA AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our custom-built assistant generates personalized reports, supports market Q&A, 
              and delivers data summaries using insights from over 50 reputable financial and news sources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Personalized Reports",
                description: "Custom analysis based on your portfolio and interests, generated in real-time with the latest market data."
              },
              {
                icon: MessageSquare,
                title: "Interactive Q&A",
                description: "Ask any financial question and receive expert-level answers backed by comprehensive market intelligence."
              },
              {
                icon: Database,
                title: "50+ Data Sources",
                description: "Aggregated insights from trusted financial news outlets, market data providers, and research institutions."
              }
            ].map((capability, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <capability.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{capability.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What Problem Are We Solving?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most trading platforms and market AIs have significant barriers that prevent 
              everyday investors from accessing professional-grade tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problems */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Traditional Platforms Are:</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Target,
                    title: "Difficult to Navigate",
                    description: "Complex interfaces that overwhelm users with unnecessary features and confusing layouts."
                  },
                  {
                    icon: Shield,
                    title: "Extremely Expensive",
                    description: "High subscription costs and hidden fees that put professional tools out of reach for most investors."
                  },
                  {
                    icon: Users,
                    title: "Overcomplicated",
                    description: "Features that require extensive training and often poorly explained functionality."
                  },
                  {
                    icon: Award,
                    title: "Sometimes Untrustworthy",
                    description: "Unclear methodologies and potentially inaccurate or biased information sources."
                  }
                ].map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mt-1">
                      <problem.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h4>
                      <p className="text-gray-600">{problem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Analytical Investments Provides:</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Brain,
                    title: "Clear, Easy-to-Understand Intelligence",
                    description: "Simplified reports and visual summaries that make complex market data accessible to everyone."
                  },
                  {
                    icon: Shield,
                    title: "Affordable Access",
                    description: "Transparent $5/month pricing with no hidden fees, making professional tools accessible to all."
                  },
                  {
                    icon: Users,
                    title: "Beginner-Friendly Simplicity",
                    description: "Intuitive interface design that balances professional depth with ease of use."
                  },
                  {
                    icon: Award,
                    title: "Trusted & Accurate",
                    description: "Transparent data sources and methodologies with insights from 50+ reputable financial providers."
                  }
                ].map((solution, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mt-1">
                      <solution.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h4>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Experience the Difference
              </h2>
              <p className="text-xl text-blue-100">
                Join the movement to democratize professional investment tools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/education">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Explore Education Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
