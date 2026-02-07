import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseCard } from '@/components/courses/CourseCard';
import { mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const allTags = ['All', 'React', 'JavaScript', 'TypeScript', 'Design', 'Node.js', 'Python'];

export default function CoursesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter only published courses and apply visibility rules
  const filteredCourses = mockCourses.filter((course) => {
    // Only show published courses
    if (course.status !== 'published') return false;

    // Check visibility
    if (course.visibility === 'signed_in' && !isAuthenticated) return false;

    // Search filter
    if (search && !course.title.toLowerCase().includes(search.toLowerCase())) return false;

    // Tag filter
    if (selectedTag !== 'All' && !course.tags.includes(selectedTag)) return false;

    return true;
  });

  return (
    <div className="py-7 md:py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Explore Courses</h1>
          <p className="text-muted-foreground">
            Discover {filteredCourses.length} courses to boost your skills
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* View Toggle */}
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

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary/10"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className={cn(
            "grid gap-5",
            viewMode === 'grid'
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onAction={() => {
                  if (isAuthenticated) {
                    navigate(`/course/${course.id}`);
                  } else {
                    navigate(`/login?redirect=/course/${course.id}`);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
