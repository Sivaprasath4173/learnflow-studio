import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { mockCourses, mockEnrollments } from '@/data/mockData';

const stats = [
  {
    title: 'Total Courses',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: BookOpen,
  },
  {
    title: 'Total Learners',
    value: '2,847',
    change: '+124',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Completion Rate',
    value: '78%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Avg. Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Award,
  },
];

export default function BackofficeDashboard() {
  const recentCourses = mockCourses.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your courses and learners
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      stat.trend === 'up'
                        ? 'border-success/30 bg-success/10 text-success'
                        : 'border-destructive/30 bg-destructive/10 text-destructive'
                    }
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Courses</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/backoffice/courses">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{course.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{course.totalLessons} lessons</span>
                      <span>•</span>
                      <span>{course.enrolledCount} enrolled</span>
                    </div>
                  </div>
                  <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Learner Progress</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/backoffice/reports">View Reports</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'React Masterclass', progress: 78, learners: 1205 },
                { name: 'TypeScript Course', progress: 65, learners: 892 },
                { name: 'UI/UX Design', progress: 89, learners: 1567 },
                { name: 'Node.js Backend', progress: 45, learners: 634 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.learners} learners • {item.progress}% avg completion
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Button variant="outline" className="h-auto flex-col gap-2 py-6" asChild>
              <Link to="/backoffice/learners">
                <Users className="h-6 w-6" />
                <span>Manage Learners</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6" asChild>
              <Link to="/backoffice/reports">
                <TrendingUp className="h-6 w-6" />
                <span>View Reports</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6" asChild>
              <Link to="/backoffice/settings">
                <Award className="h-6 w-6" />
                <span>Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
