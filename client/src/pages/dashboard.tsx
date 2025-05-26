import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Briefcase, 
  Brain,
  ArrowRight,
  BarChart3,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import PortfolioChart from "@/components/charts/portfolio-chart";
import AllocationChart from "@/components/charts/allocation-chart";
import ChatInterface from "@/components/ai/chat-interface";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: portfolios, isLoading: portfoliosLoading } = useQuery({
    queryKey: ["/api/portfolios"],
    enabled: !!user,
  });

  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ["/api/market-data"],
    staleTime: 60 * 1000, // 1 minute
  });

  // Mock data for demo purposes
  const mockPortfolioData = {
    totalValue: "$47,832",
    dailyChange: "+$1,247",
    dailyChangePercent: "+2.1%",
    monthlyChangePercent: "+12.5%",
    holdings: 23,
    aiScore: 8.7
  };

  const mockMarketData = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$185.42", change: "+2.31", changePercent: "+1.26%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "$142.87", change: "-1.45", changePercent: "-1.00%" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "$378.91", change: "+4.22", changePercent: "+1.13%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$189.98", change: "+8.76", changePercent: "+4.83%" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "$721.33", change: "+15.42", changePercent: "+2.18%" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access your dashboard and portfolio data.
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full">Create Account</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.username}
              </h1>
              <p className="text-gray-600">
                Here's your investment overview for today
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={user.plan === "omega" ? "default" : "secondary"}>
                {user.plan.toUpperCase()} Plan
              </Badge>
              {user.plan === "free" && (
                <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    Upgrade to OMEGA
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                  <p className="text-2xl font-bold text-gray-900">{mockPortfolioData.totalValue}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {mockPortfolioData.monthlyChangePercent} this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily P&L</p>
                  <p className="text-2xl font-bold text-gray-900">{mockPortfolioData.dailyChange}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {mockPortfolioData.dailyChangePercent} today
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Holdings</p>
                  <p className="text-2xl font-bold text-gray-900">{mockPortfolioData.holdings}</p>
                  <p className="text-sm text-gray-500">Diversified portfolio</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Score</p>
                  <p className="text-2xl font-bold text-gray-900">{mockPortfolioData.aiScore}/10</p>
                  <p className="text-sm text-green-600">Excellent outlook</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <PortfolioChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <AllocationChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Market Overview
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {marketLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="w-10 h-10 rounded" />
                          <div className="space-y-1">
                            <Skeleton className="w-20 h-4" />
                            <Skeleton className="w-32 h-3" />
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Skeleton className="w-16 h-4" />
                          <Skeleton className="w-12 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockMarketData.map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">{stock.symbol}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{stock.symbol}</p>
                            <p className="text-sm text-gray-500">{stock.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{stock.price}</p>
                          <p className={`text-sm flex items-center ${
                            stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change.startsWith('+') ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {stock.changePercent}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  OMEGA AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Market Analysis</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Based on current market conditions and your portfolio composition, 
                      consider increasing exposure to technology stocks. Market sentiment 
                      shows bullish indicators for the next quarter with 78% confidence.
                    </p>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      View Full Analysis <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  {user.plan === "free" && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-1">Upgrade for Full AI Access</h4>
                          <p className="text-amber-700 text-sm mb-3">
                            Get unlimited AI reports, personalized insights, and chat sessions with OMEGA AI.
                          </p>
                          <Link href="/pricing">
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Upgrade to OMEGA
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Chat */}
            {user.plan === "omega" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    OMEGA AI Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ChatInterface />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI Chat</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Chat with OMEGA AI for personalized financial insights and analysis.
                  </p>
                  <Link href="/pricing">
                    <Button size="sm" className="w-full">
                      Upgrade to Access
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Add Holdings
                </Button>
                <Link href="/education">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Portfolio rebalanced</span>
                    <span className="text-gray-400 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">AI report generated</span>
                    <span className="text-gray-400 ml-auto">1d ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-600">Market alert triggered</span>
                    <span className="text-gray-400 ml-auto">2d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
