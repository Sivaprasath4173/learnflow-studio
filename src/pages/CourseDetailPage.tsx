import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  ChevronRight,
  CheckCircle,
  Lock,
  FileText,
  Image,
  HelpCircle,
  Search,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCourses, mockLessons, mockReviews, mockEnrollments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Lesson, LessonType } from '@/types';
import { cn } from '@/lib/utils';

const getLessonIcon = (type: LessonType) => {
  switch (type) {
    case 'video': return Play;
    case 'document': return FileText;
    case 'image': return Image;
    case 'quiz': return HelpCircle;
    default: return BookOpen;
  }
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchLesson, setSearchLesson] = useState('');

  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.courseId === courseId);
  const reviews = mockReviews.filter((r) => r.courseId === courseId);
  const enrollment = mockEnrollments.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );

  if (!course) {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Course not found</h1>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Calculate completed lessons based on enrollment progress
  const completedLessonsCount = enrollment
    ? Math.ceil((enrollment.progress / 100) * lessons.length)
    : 0;

  const incompleteLessonsCount = lessons.length - completedLessonsCount;

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchLesson.toLowerCase())
  );

  const handleLessonClick = (lesson: Lesson) => {
    navigate(`/course/${courseId}/learn`, {
      state: { lessonId: lesson.id }
    });
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Course Header */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left - Info */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{course.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                {course.enrolledCount.toLocaleString()} enrolled
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-5 w-5" />
                {course.totalLessons} lessons
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                {formatDuration(course.totalDuration)}
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="gradient-primary text-primary-foreground">
                  {course.instructorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="font-medium">{course.instructorName}</p>
              </div>
            </div>
          </div>

          {/* Right - Card */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              <div className="aspect-video">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                {enrollment ? (
                  <>
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Your Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    <Button className="w-full" size="lg" asChild>
                      <Link to={`/course/${course.id}/learn`}>
                        <Play className="mr-2 h-5 w-5" />
                        {enrollment.status === 'yet_to_start' ? 'Start Learning' : 'Continue Learning'}
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    {course.accessRule === 'payment' && course.price ? (
                      <>
                        <div className="mb-4 text-center">
                          <span className="text-3xl font-bold">${course.price}</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Buy Now
                        </Button>
                      </>
                    ) : course.accessRule === 'invitation' ? (
                      <Button className="w-full" size="lg" variant="outline" disabled>
                        <Lock className="mr-2 h-5 w-5" />
                        Invitation Only
                      </Button>
                    ) : isAuthenticated ? (
                      <Button className="w-full" size="lg">
                        Enroll Now - Free
                      </Button>
                    ) : (
                      <Button className="w-full" size="lg" asChild>
                        <Link to="/login">Sign In to Enroll</Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Course Info Section */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="aspect-video w-full">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 text-2xl font-bold">{course.title}</h2>
                  <p className="mb-6 text-muted-foreground">{course.description}</p>
                </div>
              </div>

              {/* Progress Section */}
              {enrollment && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold">Your Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Statistics Section */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Lessons</p>
                      <p className="mt-2 text-2xl font-bold">{lessons.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="mt-2 text-2xl font-bold">{completedLessonsCount}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success opacity-50" />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="mt-2 text-2xl font-bold">{incompleteLessonsCount}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                </div>
              </div>

              {/* Lessons List Section */}
              <div className="rounded-xl border border-border bg-card">
                {/* Search */}
                <div className="border-b border-border p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      value={searchLesson}
                      onChange={(e) => setSearchLesson(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Lesson List */}
                <div className="divide-y divide-border">
                  {filteredLessons.map((lesson, index) => {
                    const Icon = getLessonIcon(lesson.type);
                    const isCompleted = index < completedLessonsCount;
                    const isLocked = !enrollment && !isCompleted;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && handleLessonClick(lesson)}
                        disabled={isLocked}
                        className={cn(
                          "flex w-full items-center gap-4 p-4 transition-colors text-left",
                          isLocked ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"
                        )}
                      >
                        <div className={cn(
                          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                          isCompleted ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        )}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-medium truncate",
                            isCompleted && "text-muted-foreground"
                          )}>
                            {lesson.title}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {lesson.type} • {lesson.duration} min
                          </p>
                        </div>
                        {isLocked ? (
                          <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="rounded-xl border border-border bg-card">
              {/* Lesson List */}
              <div className="divide-y divide-border">
                {filteredLessons.map((lesson, index) => {
                  const Icon = getLessonIcon(lesson.type);
                  const isCompleted = index < completedLessonsCount;
                  const isLocked = !enrollment && !isCompleted;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => !isLocked && handleLessonClick(lesson)}
                      disabled={isLocked}
                      className={cn(
                        "flex w-full items-center gap-4 p-4 transition-colors text-left",
                        isLocked ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                        isCompleted ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-medium truncate",
                          isCompleted && "text-muted-foreground"
                        )}>
                          {lesson.title}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {lesson.type} • {lesson.duration} min
                        </p>
                      </div>
                      {isLocked ? (
                        <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>
<<<<<<< HEAD
=======

>>>>>>> 4a52212 (b-3)
          <TabsContent value="reviews">
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{course.rating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(course.rating)
                            ? "fill-warning text-warning"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.reviewsCount} reviews
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback className="gradient-primary text-primary-foreground">
                            {review.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= review.rating
                                ? "fill-warning text-warning"
                                : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
