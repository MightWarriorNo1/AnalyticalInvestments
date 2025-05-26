import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/education/course-card";
import { BookOpen, Clock, Users, Award, ArrowRight, Play } from "lucide-react";

export default function Education() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Default courses if none exist in database
  const defaultCourses = [
    {
      id: 1,
      title: "Investing Fundamentals",
      description: "Learn the basics of investing, risk management, and portfolio construction.",
      level: "beginner",
      duration: "2 hours",
      lessons: 12,
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    },
    {
      id: 2,
      title: "Technical Analysis",
      description: "Master chart patterns, indicators, and market timing strategies.",
      level: "intermediate",
      duration: "4 hours",
      lessons: 18,
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    },
    {
      id: 3,
      title: "AI in Finance",
      description: "Understand how AI transforms trading and investment decisions.",
      level: "advanced",
      duration: "6 hours",
      lessons: 24,
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    },
    {
      id: 4,
      title: "Portfolio Management",
      description: "Advanced strategies for building and managing diversified portfolios.",
      level: "intermediate",
      duration: "3 hours",
      lessons: 15,
      imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    },
    {
      id: 5,
      title: "Risk Assessment",
      description: "Learn to identify, measure, and manage investment risks effectively.",
      level: "beginner",
      duration: "2.5 hours",
      lessons: 14,
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    },
    {
      id: 6,
      title: "Market Psychology",
      description: "Understand behavioral finance and market sentiment analysis.",
      level: "advanced",
      duration: "5 hours",
      lessons: 20,
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240"
    }
  ];

  const displayCourses = courses?.length ? courses : defaultCourses;

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Education Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Free courses and resources to help you master investing fundamentals 
              and advanced strategies. Learn at your own pace with expert-curated content.
            </p>
            <div className="flex justify-center space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>20+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>5,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Courses Available", value: "20+", icon: BookOpen },
              { label: "Hours of Content", value: "100+", icon: Clock },
              { label: "Active Students", value: "5,000+", icon: Users },
              { label: "Completion Rate", value: "89%", icon: Award }
            ].map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Learn by Skill Level
            </h2>
            <p className="text-xl text-gray-600">
              Choose courses that match your experience and learning goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: "Beginner",
                title: "Start Your Journey",
                description: "Perfect for those new to investing. Learn the fundamentals and build a strong foundation.",
                color: "from-green-50 to-emerald-50",
                textColor: "text-green-800",
                bgColor: "bg-green-600",
                courseCount: displayCourses.filter(course => course.level === "beginner").length
              },
              {
                level: "Intermediate",
                title: "Build Your Skills",
                description: "Advance your knowledge with practical strategies and real-world applications.",
                color: "from-amber-50 to-orange-50",
                textColor: "text-amber-800",
                bgColor: "bg-amber-600",
                courseCount: displayCourses.filter(course => course.level === "intermediate").length
              },
              {
                level: "Advanced",
                title: "Master the Markets",
                description: "Dive deep into sophisticated concepts and professional-level techniques.",
                color: "from-red-50 to-rose-50",
                textColor: "text-red-800",
                bgColor: "bg-red-600",
                courseCount: displayCourses.filter(course => course.level === "advanced").length
              }
            ].map((category, index) => (
              <Card key={index} className={`bg-gradient-to-br ${category.color} border-0`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${category.bgColor} text-white rounded-xl flex items-center justify-center mb-6`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <Badge className={`${category.textColor} mb-4`}>{category.level}</Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="text-sm text-gray-500">
                    {category.courseCount} courses available
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600">
              Start learning today with our comprehensive course library.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button className="btn-primary">
              View All Courses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Structured Learning Paths
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Follow our expertly designed learning paths to build knowledge progressively. 
                  Each path combines theory with practical applications and real-world examples.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Investment Fundamentals Track",
                    courses: "4 courses",
                    duration: "12 hours",
                    description: "Master the basics from portfolio theory to risk management."
                  },
                  {
                    title: "Technical Analysis Mastery",
                    courses: "3 courses",
                    duration: "10 hours",
                    description: "Learn to read charts, identify patterns, and time your trades."
                  },
                  {
                    title: "AI & Modern Finance",
                    courses: "2 courses",
                    duration: "8 hours",
                    description: "Understand how technology is reshaping investment strategies."
                  }
                ].map((path, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{path.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{path.courses}</span>
                            <span>•</span>
                            <span>{path.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Free Certification</h3>
                    <p className="text-gray-600">
                      Complete any learning path and earn a certificate to showcase your expertise 
                      in financial analysis and investment strategies.
                    </p>
                    <Button className="btn-primary w-full">
                      Start Learning Path
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-primary/10 to-blue-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Why Choose Our Education Hub?</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Expert-curated content from industry professionals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Interactive exercises and real-world case studies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Progress tracking and achievement badges</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Mobile-friendly for learning on the go</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
