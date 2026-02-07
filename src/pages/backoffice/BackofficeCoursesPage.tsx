import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Grid,
  List,
  MoreHorizontal,
  Edit,
  Share2,
  Eye,
  Trash2,
  BookOpen,
  Clock,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockCourses } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function BackofficeCoursesPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newCourseDialogOpen, setNewCourseDialogOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  const [courses, setCourses] = useState<any[]>(mockCourses);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleCreateCourse = () => {
    const newCourse = {
      id: `new-course-${Date.now()}`,
      title: newCourseName,
      description: 'New course description',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop', // Default placeholder
      tags: ['New'],
      status: 'draft' as const,
      visibility: 'everyone' as const,
      accessRule: 'open' as const,
      instructorId: 'curr-user', // In real app, this would be current user's ID
      instructorName: 'Current User',
      totalLessons: 0,
      totalDuration: 0,
      viewsCount: 0,
      enrolledCount: 0,
      rating: 0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCourses([newCourse, ...courses]);
    setNewCourseDialogOpen(false);
    setNewCourseName('');
    toast.success('Course created successfully');
  };

  const handleShare = (courseId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/course/${courseId}`);
    toast.success('Course link copied to clipboard');
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    toast.success('Course deleted successfully');
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and content
          </p>
        </div>
        <Dialog open={newCourseDialogOpen} onOpenChange={setNewCourseDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="course-name">Course Name</Label>
                <Input
                  id="course-name"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Enter course name..."
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewCourseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse} disabled={!newCourseName.trim()}>
                  Create Course
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Courses Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  {course.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 line-clamp-2 font-semibold">{course.title}</h3>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {course.viewsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.totalLessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(course.totalDuration)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/backoffice/courses/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(course.id)} className="cursor-pointer">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to={`/course/${course.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id)}
                        className="text-destructive cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card">
          <div className="divide-y divide-border">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{course.title}</h3>
                    <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {course.viewsCount} views
                    </span>
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
                      {course.enrolledCount} enrolled
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/backoffice/courses/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(course.id)} className="cursor-pointer">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to={`/course/${course.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id)}
                        className="text-destructive cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No courses found</h3>
          <p className="mb-4 text-muted-foreground">
            {search ? 'Try a different search term' : 'Create your first course to get started'}
          </p>
          {!search && (
            <Button onClick={() => setNewCourseDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
