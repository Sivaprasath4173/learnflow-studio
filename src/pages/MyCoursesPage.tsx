import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { GamificationPanel } from '@/components/gamification/GamificationPanel';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle, Clock, PlayCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get user's enrolled courses with enrollment data
  const enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((enrollment) => ({
      course: mockCourses.find((c) => c.id === enrollment.courseId)!,
      enrollment,
    }))
    .filter((item) => item.course);

  const filterByStatus = (status?: string) => {
    let filtered = enrolledCourses;

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter((item) => item.enrollment.status === status);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.course.title.toLowerCase().includes(query) ||
        item.course.description.toLowerCase().includes(query) ||
        item.course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const stats = {
    all: enrolledCourses.length,
    yet_to_start: enrolledCourses.filter((e) => e.enrollment.status === 'yet_to_start').length,
    in_progress: enrolledCourses.filter((e) => e.enrollment.status === 'in_progress').length,
    completed: enrolledCourses.filter((e) => e.enrollment.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-10">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-1 text-4xl font-extrabold tracking-tight">My Courses</h1>
            <p className="text-sm text-muted-foreground">
              Track your progress and continue learning
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9 rounded-full bg-background shadow-sm focus-visible:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 grid w-full grid-cols-4 rounded-xl bg-muted p-1">
                <TabsTrigger value="all" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition transition-all duration-200 ease-out hover:bg-background/70">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">All</span>
                  <span className="text-xs text-muted-foreground">({stats.all})</span>
                </TabsTrigger>
                <TabsTrigger value="yet_to_start" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition transition-all duration-200 ease-out hover:bg-background/70">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">To Start</span>
                  <span className="text-xs text-muted-foreground">({stats.yet_to_start})</span>
                </TabsTrigger>
                <TabsTrigger value="in_progress" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition transition-all duration-200 ease-out hover:bg-background/70">
                  <PlayCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">In Progress</span>
                  <span className="text-xs text-muted-foreground">({stats.in_progress})</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition transition-all duration-200 ease-out hover:bg-background/70">
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Completed</span>
                  <span className="text-xs text-muted-foreground">({stats.completed})</span>
                </TabsTrigger>
              </TabsList>

              {['all', 'yet_to_start', 'in_progress', 'completed'].map((tab) => (
                <TabsContent
                  key={tab}
                  value={tab}
                  className="data-[state=inactive]:hidden"
                >
                  {filterByStatus(tab).length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-2 duration-300 will-change-[opacity,transform]">
                      {filterByStatus(tab).map(({ course, enrollment }) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          enrollment={enrollment}
                          showProgress
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 will-change-[opacity,transform]">
                      <div className="mb-4 rounded-full bg-background p-5 shadow-sm">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">No courses found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? `No courses match "${searchQuery}"`
                          : tab === 'all'
                            ? "You haven't enrolled in any courses yet"
                            : `You don't have any ${tab.replace('_', ' ')} courses`
                        }
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last sticky top-24">
            <GamificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
