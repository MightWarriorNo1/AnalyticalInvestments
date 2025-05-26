import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Play } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  imageUrl?: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
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

  const handleStartCourse = () => {
    // In a real implementation, this would navigate to the course content
    alert(`Starting course: ${course.title}`);
  };

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden">
        {course.imageUrl && (
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" variant="secondary" className="gap-2">
            <Play className="w-4 h-4" />
            Preview
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={`${getLevelColor(course.level)} font-medium`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <Button 
            onClick={handleStartCourse}
            variant="link" 
            className="text-primary font-medium hover:text-primary/80 p-0"
          >
            Start Course
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
