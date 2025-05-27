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

interface FAQItem {
  question: string;
  answer: string;
}

interface Feature {
  name: string;
  included: boolean;
  note?: string;
}

export default function FAQ() {
  const { user } = useAuth();

  const faqs: FAQItem[] = [
    {
      question: "What is OMEGA AI?",
      answer: "OMEGA AI is an advanced investment analysis platform that combines artificial intelligence with professional-grade financial tools to help investors make smarter decisions. Our platform provides personalized insights, real-time market data, and comprehensive educational resources."
    },
    {
      question: "How does OMEGA AI work?",
      answer: "OMEGA AI uses advanced GPT-4o technology to analyze market data, provide personalized investment insights, and generate detailed reports. The platform combines AI-powered analysis with professional-grade tools to give you institutional-quality investment research at a fraction of the cost."
    },
    {
      question: "What features are included in the free plan?",
      answer: "The free plan includes full access to our education hub, basic market data, community forum access, and limited AI tools access (5 queries/month). It's perfect for those who want to learn about investing and try out our basic features."
    },
    {
      question: "What additional features come with the OMEGA plan?",
      answer: "The OMEGA plan includes full access to OMEGA AI, unlimited reports & graphs, unlimited chat sessions, admin dashboard access, priority support, full education suite, real-time market data, advanced portfolio analytics, custom AI reports, and API access."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, new users get a 7-day free trial of the OMEGA plan to experience all premium features before committing to a subscription."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure Stripe payment processor."
    },
    {
      question: "How does the 30-day money-back guarantee work?",
      answer: "If you're not satisfied with your OMEGA subscription within 30 days, we'll provide a full refund, no questions asked."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we provide 24/7 customer support through our help center, email, and live chat for OMEGA plan subscribers. Free plan users can access our community forum for support."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted using SSL, and we follow industry best practices for data protection. We never share your personal information with third parties."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about OMEGA AI and our investment platform.
            </p>
            <div className="flex justify-center space-x-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Always Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Why Choose OMEGA?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of AI-driven investment analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description: "Advanced GPT-4o integration provides personalized insights and analysis",
                gradient: "from-indigo-900/50 to-indigo-950",
                iconBg: "bg-indigo-600"
              },
              {
                icon: BarChart3,
                title: "Professional Analytics",
                description: "Institutional-grade tools at a fraction of the cost of competitors",
                gradient: "from-indigo-900/50 to-indigo-950",
                iconBg: "bg-indigo-600"
              },
              {
                icon: BookOpen,
                title: "Free Education",
                description: "Comprehensive learning resources to help you master investing",
                gradient: "from-indigo-900/50 to-indigo-950",
                iconBg: "bg-indigo-600"
              }
            ].map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} border border-indigo-800/50 hover:border-indigo-600 transition-all duration-300`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${feature.iconBg} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
