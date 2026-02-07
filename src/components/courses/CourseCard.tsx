import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Play, Lock } from 'lucide-react';
import { Course, Enrollment } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  showProgress?: boolean;
  onAction?: () => void;
}

export function CourseCard({ course, enrollment, showProgress = false, onAction }: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getActionButton = () => {
    if (!enrollment) {
      if (course.accessRule === 'payment' && course.price) {
        return (
          <Button className="w-full" onClick={onAction}>
            Buy ${course.price}
          </Button>
        );
      }
      if (course.accessRule === 'invitation') {
        return (
          <Button variant="outline" className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" />
            Invitation Only
          </Button>
        );
      }
      return (
        <Button className="w-full" onClick={onAction}>
          Join Course
        </Button>
      );
    }

    if (enrollment.status === 'completed') {
      return (
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/course/${course.id}`}>
            <Play className="mr-2 h-4 w-4" />
            Review
          </Link>
        </Button>
      );
    }

    if (enrollment.status === 'yet_to_start') {
      return (
        <Button className="w-full" asChild>
          <Link to={`/course/${course.id}/learn`}>
            <Play className="mr-2 h-4 w-4" />
            Start
          </Link>
        </Button>
      );
    }

    return (
      <Button className="w-full" asChild>
        <Link to={`/course/${course.id}/learn`}>
          <Play className="mr-2 h-4 w-4" />
          Continue
        </Link>
      </Button>
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop'}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {course.status === 'published' && (
          <div className="absolute left-3 top-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur">
              <Star className="mr-1 h-3 w-3 fill-warning text-warning" />
              {course.rating.toFixed(1)}
            </Badge>
          </div>
        )}
        {course.accessRule === 'payment' && course.price && (
          <div className="absolute right-3 top-3">
            <Badge className="gradient-accent text-accent-foreground">
              ${course.price}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDuration(course.totalDuration)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.enrolledCount.toLocaleString()}
          </span>
        </div>

        {/* Progress */}
        {showProgress && enrollment && (
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} className="h-2" />
          </div>
        )}

        {/* Instructor */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {course.instructorName.charAt(0)}
          </div>
          <span className="text-muted-foreground">{course.instructorName}</span>
        </div>

        {/* Action */}
        {getActionButton()}
      </div>
    </div>
  );
}
