import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Brain, Send, User, AlertCircle, Loader2 } from "lucide-react";

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

export default function ChatInterface() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

  // Fetch chat sessions
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["/api/chat-sessions"],
    enabled: !!user && user.plan === "omega",
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, sessionId }: { message: string; sessionId?: number }) => {
      const response = await apiRequest("POST", "/api/chat", { message, sessionId });
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentSessionId(data.sessionId);
      queryClient.invalidateQueries({ queryKey: ["/api/chat-sessions"] });
      setMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    sendMessageMutation.mutate({
      message: message.trim(),
      sessionId: currentSessionId || undefined,
    });
  };

  // Get current session messages
  const currentSession = sessions?.find((s: ChatSession) => s.id === currentSessionId) || sessions?.[0];
  const messages = currentSession?.messages || [];

  if (!user || user.plan !== "omega") {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">OMEGA Plan Required</h3>
        <p className="text-gray-600 text-sm">
          Upgrade to OMEGA to chat with our AI assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-96">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">OMEGA AI</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {sessionsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">Start a conversation</h4>
            <p className="text-gray-600 text-sm">
              Ask me anything about investments, market analysis, or financial planning.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Brain className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-xs lg:max-w-sm p-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.role === "user" ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator for pending response */}
            {sendMessageMutation.isPending && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600">OMEGA is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask OMEGA anything..."
            className="flex-1"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="px-3"
          >
            {sendMessageMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          OMEGA AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
