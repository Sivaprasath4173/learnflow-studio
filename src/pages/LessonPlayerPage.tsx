import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  Play, 
  FileText, 
  Image, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  Download,
  ExternalLink,
  BookOpen,
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockCourses, mockLessons, mockEnrollments } from '@/data/mockData';
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

export default function LessonPlayerPage() {
  const { courseId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1', 'l2']);

  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.courseId === courseId);
  const enrollment = mockEnrollments.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );

  // Handle navigation to specific lesson from CourseDetailPage
  useEffect(() => {
    const lessonId = (location.state as any)?.lessonId;
    if (lessonId && lessons.length > 0) {
      const index = lessons.findIndex((l) => l.id === lessonId);
      if (index !== -1) {
        setCurrentLessonIndex(index);
      }
    }
  }, [lessons]);

  const currentLesson = lessons[currentLessonIndex];

  if (!course || !currentLesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Content not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  const markComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
  };

  const goToNext = () => {
    markComplete();
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const renderContent = () => {
    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              src={currentLesson.content.videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case 'document':
        return (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 py-20">
            <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">{currentLesson.content.documentName}</p>
            {currentLesson.content.allowDownload && (
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Document
              </Button>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="overflow-hidden rounded-lg">
            <img
              src={currentLesson.content.imageUrl}
              alt={currentLesson.title}
              className="w-full object-contain"
            />
          </div>
        );
      case 'quiz':
        return (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
              <HelpCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{currentLesson.title}</h3>
            <p className="mb-6 text-muted-foreground">Test your knowledge with this quiz</p>
            <Button size="lg" asChild>
              <Link to={`/course/${courseId}/quiz/${currentLesson.content.quizId}`}>
                Start Quiz
              </Link>
            </Button>
          </div>
        );
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Course Info */}
        <div className="border-b border-border p-4">
          <h2 className="mb-2 font-semibold line-clamp-2">{course.title}</h2>
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            {completedLessons.length} of {lessons.length} lessons completed
          </p>
        </div>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto">
          {lessons.map((lesson, index) => {
            const Icon = getLessonIcon(lesson.type);
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrent = index === currentLessonIndex;

            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors",
                  isCurrent && "bg-primary/5",
                  !isCurrent && "hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm",
                  isCompleted && "bg-success/10 text-success",
                  isCurrent && !isCompleted && "bg-primary/10 text-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    "truncate text-sm font-medium",
                    isCurrent && "text-primary"
                  )}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {lesson.type} • {lesson.duration} min
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex items-center gap-4 border-b border-border bg-card px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">{currentLesson.title}</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {currentLesson.type} • Lesson {currentLessonIndex + 1} of {lessons.length}
            </p>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-4xl">
            {renderContent()}

            {/* Description */}
            {currentLesson.description && (
              <div className="mt-6">
                <h3 className="mb-2 font-semibold">About this lesson</h3>
                <p className="text-muted-foreground">{currentLesson.description}</p>
              </div>
            )}

            {/* Attachments */}
            {currentLesson.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Paperclip className="h-4 w-4" />
                  Attachments
                </h3>
                <div className="space-y-2">
                  {currentLesson.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
                    >
                      {attachment.type === 'file' ? (
                        <Download className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="flex-1 text-sm font-medium">{attachment.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <footer className="flex items-center justify-between border-t border-border bg-card p-4">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentLessonIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={goToNext}>
            {currentLessonIndex === lessons.length - 1 ? (
              'Complete Course'
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </footer>
      </main>
    </div>
  );
}
