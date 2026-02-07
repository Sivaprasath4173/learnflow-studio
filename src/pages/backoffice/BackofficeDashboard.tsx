import { useState } from 'react';
import {
  Users,
  Clock,
  PlayCircle,
  CheckCircle,
  Settings2,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock user enrollment data matching prototype
const mockUserData = [
  {
    id: 1,
    sNo: 1,
    courseName: 'Complete React Development Masterclass',
    participantName: 'Salman Khan',
    enrolledDate: 'Feb 14',
    startDate: 'Feb 16',
    timeSpent: '2:20',
    completionPercentage: 30,
    completedDate: 'Feb 21',
    status: 'in_progress',
  },
  {
    id: 2,
    sNo: 2,
    courseName: 'TypeScript for Professional Developers',
    participantName: 'Priya Sharma',
    enrolledDate: 'Feb 10',
    startDate: 'Feb 12',
    timeSpent: '5:45',
    completionPercentage: 100,
    completedDate: 'Feb 18',
    status: 'completed',
  },
  {
    id: 3,
    sNo: 3,
    courseName: 'UI/UX Design Fundamentals',
    participantName: 'Rahul Verma',
    enrolledDate: 'Feb 15',
    startDate: '-',
    timeSpent: '0:00',
    completionPercentage: 0,
    completedDate: '-',
    status: 'yet_to_start',
  },
  {
    id: 4,
    sNo: 4,
    courseName: 'Node.js Backend Development',
    participantName: 'Anita Desai',
    enrolledDate: 'Feb 08',
    startDate: 'Feb 09',
    timeSpent: '8:30',
    completionPercentage: 65,
    completedDate: '-',
    status: 'in_progress',
  },
  {
    id: 5,
    sNo: 5,
    courseName: 'Complete React Development Masterclass',
    participantName: 'Vikram Singh',
    enrolledDate: 'Feb 12',
    startDate: '-',
    timeSpent: '0:00',
    completionPercentage: 0,
    completedDate: '-',
    status: 'yet_to_start',
  },
  {
    id: 6,
    sNo: 6,
    courseName: 'Python for Data Science',
    participantName: 'Meera Patel',
    enrolledDate: 'Feb 05',
    startDate: 'Feb 06',
    timeSpent: '12:15',
    completionPercentage: 100,
    completedDate: 'Feb 15',
    status: 'completed',
  },
  {
    id: 7,
    sNo: 7,
    courseName: 'UI/UX Design Fundamentals',
    participantName: 'Arjun Reddy',
    enrolledDate: 'Feb 16',
    startDate: '-',
    timeSpent: '0:00',
    completionPercentage: 0,
    completedDate: '-',
    status: 'yet_to_start',
  },
  {
    id: 8,
    sNo: 8,
    courseName: 'Complete React Development Masterclass',
    participantName: 'Deepika Nair',
    enrolledDate: 'Feb 11',
    startDate: '-',
    timeSpent: '0:00',
    completionPercentage: 0,
    completedDate: '-',
    status: 'yet_to_start',
  },
];

// Available columns for customization
const availableColumns = [
  { key: 'sNo', label: 'S.No.' },
  { key: 'courseName', label: 'Course Name' },
  { key: 'participantName', label: 'Participant Name' },
  { key: 'enrolledDate', label: 'Enrolled Date' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'timeSpent', label: 'Time Spent' },
  { key: 'completionPercentage', label: 'Completion Percentage' },
  { key: 'completedDate', label: 'Completed Date' },
  { key: 'status', label: 'Status' },
];

export default function BackofficeDashboard() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'sNo',
    'courseName',
    'participantName',
    'enrolledDate',
    'startDate',
    'timeSpent',
    'completionPercentage',
    'completedDate',
    'status',
  ]);

  // Calculate stats from mock data
  const totalParticipants = mockUserData.length;
  const yetToStart = mockUserData.filter((u) => u.status === 'yet_to_start').length;
  const inProgress = mockUserData.filter((u) => u.status === 'in_progress').length;
  const completed = mockUserData.filter((u) => u.status === 'completed').length;

  const stats = [
    {
      title: 'Total Participants',
      value: totalParticipants,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Yet to Start',
      value: yetToStart,
      icon: Clock,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: PlayCircle,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Completed',
      value: completed,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            Completed
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            In Progress
          </Badge>
        );
      case 'yet_to_start':
        return (
          <Badge className="bg-muted text-muted-foreground border-muted">
            Yet to Start
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your courses and learners
        </p>
      </div>

      {/* Overview Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-full mb-3',
                      stat.bgColor
                    )}
                  >
                    <Icon className={cn('h-7 w-7', stat.color)} />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.title}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Users Table Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-accent rounded-full"></span>
            Users
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings2 className="h-4 w-4" />
                Columns
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns.includes(column.key)}
                  onCheckedChange={() => toggleColumn(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {visibleColumns.includes('sNo') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      S.No.
                    </th>
                  )}
                  {visibleColumns.includes('courseName') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Course Name
                    </th>
                  )}
                  {visibleColumns.includes('participantName') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Participant Name
                    </th>
                  )}
                  {visibleColumns.includes('enrolledDate') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Enrolled Date
                    </th>
                  )}
                  {visibleColumns.includes('startDate') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Start Date
                    </th>
                  )}
                  {visibleColumns.includes('timeSpent') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Time Spent
                    </th>
                  )}
                  {visibleColumns.includes('completionPercentage') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Completion %
                    </th>
                  )}
                  {visibleColumns.includes('completedDate') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Completed Date
                    </th>
                  )}
                  {visibleColumns.includes('status') && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockUserData.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {visibleColumns.includes('sNo') && (
                      <td className="px-4 py-3 text-sm">{user.sNo}</td>
                    )}
                    {visibleColumns.includes('courseName') && (
                      <td className="px-4 py-3 text-sm font-medium text-primary max-w-[200px] truncate">
                        {user.courseName}
                      </td>
                    )}
                    {visibleColumns.includes('participantName') && (
                      <td className="px-4 py-3 text-sm text-accent">
                        {user.participantName}
                      </td>
                    )}
                    {visibleColumns.includes('enrolledDate') && (
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {user.enrolledDate}
                      </td>
                    )}
                    {visibleColumns.includes('startDate') && (
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {user.startDate}
                      </td>
                    )}
                    {visibleColumns.includes('timeSpent') && (
                      <td className="px-4 py-3 text-sm text-accent">
                        {user.timeSpent}
                      </td>
                    )}
                    {visibleColumns.includes('completionPercentage') && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={user.completionPercentage}
                            className="h-2 w-16"
                          />
                          <span className="text-sm text-muted-foreground">
                            {user.completionPercentage}%
                          </span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.includes('completedDate') && (
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {user.completedDate}
                      </td>
                    )}
                    {visibleColumns.includes('status') && (
                      <td className="px-4 py-3">
                        {getStatusBadge(user.status)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
