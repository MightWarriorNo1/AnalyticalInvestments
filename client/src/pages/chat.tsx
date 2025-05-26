import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Brain, 
  Send, 
  Sparkles,
  MessageCircle,
  User,
  Bot,
  Crown,
  Lock,
  ArrowRight,
  Loader2,
  Lightbulb,
  TrendingUp,
  DollarSign,
  BarChart3
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: number;
  messages: Message[];
  updatedAt: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions?.find((s: ChatSession) => s.id === currentSessionId) || sessions?.[0];
  const hasOmegaAccess = user?.plan === "omega";

  // Sample conversation starters
  const conversationStarters = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      question: "What are the current market trends I should be aware of?"
    },
    {
      icon: DollarSign,
      title: "Investment Strategy",
      question: "Help me create a diversified investment portfolio for my goals"
    },
    {
      icon: BarChart3,
      title: "Portfolio Review",
      question: "Analyze my current portfolio performance and suggest improvements"
    },
    {
      icon: Lightbulb,
      title: "Financial Education",
      question: "Explain the basics of options trading in simple terms"
    }
  ];

  useEffect(() => {
    if (user && hasOmegaAccess) {
      loadChatSessions();
    } else {
      setIsLoadingSessions(false);
    }
  }, [user, hasOmegaAccess]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatSessions = async () => {
    try {
      const response = await apiRequest("GET", "/api/chat-sessions");
      const data = await response.json();
      setSessions(data);
      if (data.length > 0) {
        setCurrentSessionId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load chat sessions:", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const createNewSession = async () => {
    if (!hasOmegaAccess) return;
    
    try {
      const response = await apiRequest("POST", "/api/chat-sessions", {
        messages: []
      });
      const newSession = await response.json();
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new chat session",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim() || isLoading || !hasOmegaAccess) return;

    setIsLoading(true);
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    try {
      // Create new session if none exists
      if (!currentSessionId) {
        await createNewSession();
      }

      // Add user message to current session
      const updatedMessages = [...(currentSession?.messages || []), userMessage];
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: updatedMessages }
          : s
      ));

      setMessage("");

      // Send to AI (will be available when OpenAI API key is configured)
      const response = await apiRequest("POST", "/api/chat", {
        sessionId: currentSessionId,
        message: textToSend,
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Update session with AI response
      const aiMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...updatedMessages, aiMessage] }
          : s
      ));

    } catch (error: any) {
      const errorMessage = error.message || "Failed to send message";
      
      // Add error message as AI response
      const errorResponse: Message = {
        role: "assistant",
        content: `I apologize, but I'm currently unavailable. ${errorMessage.includes('OpenAI') ? 'The AI service needs to be configured with proper credentials.' : 'Please try again later.'}`,
        timestamp: new Date().toISOString(),
      };

      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...(s.messages || []), userMessage, errorResponse] }
          : s
      ));

      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show upgrade prompt for free users
  if (!hasOmegaAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>OMEGA AI Assistant</span>
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Unlock intelligent financial insights with our advanced AI chatbot
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">OMEGA Plan Required</h4>
                  <p className="text-amber-700 text-sm">
                    Access to the AI chatbot is available exclusively for OMEGA subscribers. 
                    Upgrade now for just $5/month to unlock unlimited conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">What you'll get with OMEGA AI:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Personalized investment advice",
                  "Real-time market analysis",
                  "Portfolio optimization tips",
                  "Educational explanations",
                  "Risk assessment guidance",
                  "Trading strategy insights"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/subscribe" className="flex-1">
                <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to OMEGA
                </Button>
              </Link>
              <Link href="/education">
                <Button variant="outline" className="w-full sm:w-auto h-12">
                  Explore Free Content
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoadingSessions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-gray-600">Loading your conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">OMEGA AI</h1>
                  <p className="text-sm text-gray-500">Your Financial Assistant</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                OMEGA Plan
              </Badge>
            </div>
            <Button 
              onClick={createNewSession}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Main Chat Interface */}
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {!currentSession?.messages?.length ? (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to OMEGA AI
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    I'm your intelligent financial assistant. Ask me anything about investing, 
                    market trends, portfolio management, or financial strategies.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {conversationStarters.map((starter, index) => (
                    <Card 
                      key={index} 
                      className="cursor-pointer hover:shadow-md transition-shadow border-primary/20 hover:border-primary/40"
                      onClick={() => sendMessage(starter.question)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <starter.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{starter.title}</h4>
                            <p className="text-sm text-gray-600">{starter.question}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              currentSession.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex space-x-3 max-w-3xl ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user" 
                        ? "bg-primary text-white" 
                        : "bg-purple-100 text-purple-600"
                    }`}>
                      {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <div className={`text-xs mt-2 opacity-70 ${
                        msg.role === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-100">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-gray-600">OMEGA is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask OMEGA about investments, market trends, or financial strategies..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={() => sendMessage()}
                disabled={!message.trim() || isLoading}
                size="sm"
                className="px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              OMEGA AI can make mistakes. Always verify important financial information.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}