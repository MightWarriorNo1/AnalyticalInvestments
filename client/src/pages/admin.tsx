import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  TrendingUp,
  AlertCircle,
  Crown
} from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Course creation form state
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    lessons: 0,
    imageUrl: "",
  });

  // Protect route - only OMEGA users can access
  if (!user || user.plan !== "omega") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">OMEGA Plan Required</h2>
            <p className="text-gray-600 mb-6">
              Access to the admin panel is exclusive to OMEGA subscribers.
            </p>
            <Button className="w-full" onClick={() => window.location.href = "/pricing"}>
              Upgrade to OMEGA
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch data
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const { data: chatSessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["/api/chat-sessions"],
  });

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const response = await apiRequest("POST", "/api/courses", courseData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setNewCourse({
        title: "",
        description: "",
        level: "",
        duration: "",
        lessons: 0,
        imageUrl: "",
      });
      toast({
        title: "Course created successfully",
        description: "The new course has been added to the education hub.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create course",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.level) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required course information.",
        variant: "destructive",
      });
      return;
    }
    createCourseMutation.mutate(newCourse);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-amber-100 text-amber-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-primary" />
                Admin Control Panel
              </h1>
              <p className="text-gray-600">
                Manage content, monitor usage, and control platform features
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              OMEGA Administrator
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {coursesLoading ? "..." : courses?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chat Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sessionsLoading ? "..." : chatSessions?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Usage</p>
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="sessions">AI Sessions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New course created", user: "Admin", time: "2 hours ago", type: "course" },
                      { action: "AI session completed", user: "john_doe", time: "4 hours ago", type: "ai" },
                      { action: "User upgraded to OMEGA", user: "jane_smith", time: "6 hours ago", type: "upgrade" },
                      { action: "Course completed", user: "mike_wilson", time: "8 hours ago", type: "education" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "course" ? "bg-blue-100 text-blue-600" :
                          activity.type === "ai" ? "bg-purple-100 text-purple-600" :
                          activity.type === "upgrade" ? "bg-green-100 text-green-600" :
                          "bg-amber-100 text-amber-600"
                        }`}>
                          {activity.type === "course" ? <BookOpen className="w-4 h-4" /> :
                           activity.type === "ai" ? <MessageSquare className="w-4 h-4" /> :
                           activity.type === "upgrade" ? <TrendingUp className="w-4 h-4" /> :
                           <Eye className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: "AI Chat Service", status: "operational", uptime: "99.9%" },
                      { service: "Database", status: "operational", uptime: "100%" },
                      { service: "File Storage", status: "operational", uptime: "99.8%" },
                      { service: "Payment Processing", status: "operational", uptime: "99.9%" },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">{service.service}</span>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {service.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{service.uptime} uptime</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Create Course Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Course
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        placeholder="Enter course title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        placeholder="Course description"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Select value={newCourse.level} onValueChange={(value) => setNewCourse({...newCourse, level: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                          placeholder="e.g., 2 hours"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lessons">Number of Lessons</Label>
                        <Input
                          id="lessons"
                          type="number"
                          value={newCourse.lessons}
                          onChange={(e) => setNewCourse({...newCourse, lessons: parseInt(e.target.value) || 0})}
                          placeholder="12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          value={newCourse.imageUrl}
                          onChange={(e) => setNewCourse({...newCourse, imageUrl: e.target.value})}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={createCourseMutation.isPending}
                    >
                      {createCourseMutation.isPending ? "Creating..." : "Create Course"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {coursesLoading ? (
                      [...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-1/2 mb-2" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      ))
                    ) : courses?.length ? (
                      courses.map((course: any) => (
                        <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                              <div className="flex items-center space-x-2">
                                <Badge className={getLevelColor(course.level)}>
                                  {course.level}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {course.lessons} lessons • {course.duration}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No courses created yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent AI Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        <Skeleton className="h-3 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : chatSessions?.length ? (
                  <div className="space-y-4">
                    {chatSessions.map((session: any) => (
                      <div key={session.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Session #{session.id}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Messages: {Array.isArray(session.messages) ? session.messages.length : 0}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">Active</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No chat sessions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">AI Chat Enabled</h4>
                      <p className="text-sm text-gray-600">Allow users to chat with OMEGA AI</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Course Creation</h4>
                      <p className="text-sm text-gray-600">Allow admin course creation</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">User Registrations</h4>
                      <p className="text-sm text-gray-600">Allow new user sign-ups</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Platform Version</h4>
                    <p className="text-sm text-gray-600">v1.0.0</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Last Updated</h4>
                    <p className="text-sm text-gray-600">December 2024</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Database Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">AI Service</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
