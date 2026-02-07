import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Save,
  Eye,
  Users,
  Mail,
  Upload,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Play,
  FileText,
  Image,
  HelpCircle,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockCourses, mockLessons } from '@/data/mockData';
import { LessonType } from '@/types';
import { cn } from '@/lib/utils';

const getLessonIcon = (type: LessonType) => {
  switch (type) {
    case 'video': return Play;
    case 'document': return FileText;
    case 'image': return Image;
    case 'quiz': return HelpCircle;
    default: return FileText;
  }
};

export default function CourseEditorPage() {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.courseId === courseId);
  // @ts-ignore - Mock data typing shortcut
  const [lessonsList, setLessonsList] = useState<any[]>(lessons);

  const [isPublished, setIsPublished] = useState(course?.status === 'published');
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [visibility, setVisibility] = useState<string>(course?.visibility || 'everyone');
  const [accessRule, setAccessRule] = useState<string>(course?.accessRule || 'open');
  const [price, setPrice] = useState(course?.price?.toString() || '');
  const [website, setWebsite] = useState(course?.website || '');
  const [responsibleId, setResponsibleId] = useState(course?.instructorId || '');
  const [courseImage, setCourseImage] = useState(course?.image || '');
  const [addAttendeeOpen, setAddAttendeeOpen] = useState(false);
  const [contactAttendeeOpen, setContactAttendeeOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<LessonType>('video');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImage(reader.result as string);
        toast.success('Course image updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactAttendee = () => {
    // Mock implementation
    setContactAttendeeOpen(false);
    toast.success('Message sent to attendees successfully');
  };

  const handleAddLesson = () => {
    const newLesson = {
      id: `new-lesson-${Date.now()}`,
      courseId: courseId!,
      title: newLessonTitle,
      description: '',
      type: newLessonType,
      order: lessonsList.length + 1,
      duration: 10,
      content: {},
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setLessonsList([...lessonsList, newLesson]);
    setLessonDialogOpen(false);
    setNewLessonTitle('');
    setNewLessonType('video');
    toast.success('Lesson added successfully');
  };

  const handleAddAttendee = () => {
    // Mock implementation
    setAddAttendeeOpen(false);
    toast.success('Attendee added successfully');
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Course not found</h1>
          <Button asChild>
            <Link to="/backoffice/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/backoffice/courses">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Course</h1>
            <p className="text-sm text-muted-foreground">{course.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Published</span>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
          <Button variant="outline" asChild>
            <Link to={`/course/${courseId}`}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setAddAttendeeOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            Add Attendees
          </Button>
          <Button variant="outline" onClick={() => setContactAttendeeOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button onClick={() => toast.success('Course changes saved')}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Course Image */}
      <div className="flex items-start gap-6">
        <div className="relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 group">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            onChange={handleImageUpload}
          />
          {courseImage ? (
            <img
              src={courseImage}
              alt={title || 'Course Image'}
              className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-2 right-2 z-10 pointers-events-none"
          >
            Change Image
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="title">Course Title <span className="text-destructive">*</span></Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title..."
              className="mt-1"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="website">Website {isPublished && <span className="text-destructive">*</span>}</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className={cn("mt-1", isPublished && !website && "border-destructive")}
              />
            </div>
            <div>
              <Label>Responsible</Label>
              <Select value={responsibleId} onValueChange={setResponsibleId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select course admin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inst-1">Sarah Johnson</SelectItem>
                  <SelectItem value="inst-2">Michael Chen</SelectItem>
                  <SelectItem value="inst-3">Emily Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button className="ml-1 hover:text-destructive">×</button>
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-3 w-3" />
                Add Tag
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Settings</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lessons ({lessonsList.length})</h3>
            <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Lesson</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="lesson-title">Lesson Title</Label>
                    <Input
                      id="lesson-title"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      placeholder="Enter lesson title..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Lesson Type</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(['video', 'document', 'image', 'quiz'] as LessonType[]).map((type) => {
                        const Icon = getLessonIcon(type);
                        return (
                          <button
                            key={type}
                            onClick={() => setNewLessonType(type)}
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-colors",
                              newLessonType === type
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="capitalize">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setLessonDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button disabled={!newLessonTitle.trim()} onClick={handleAddLesson}>
                      Add Lesson
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-xl border border-border bg-card">
            {lessonsList.length > 0 ? (
              <div className="divide-y divide-border">
                {lessonsList.map((lesson) => {
                  const Icon = getLessonIcon(lesson.type);
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                    >
                      <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                      <div className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                        "bg-primary/10 text-primary"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {lesson.type} • {lesson.duration} min
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No lessons yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Add your first lesson to get started
                </p>
                <Button onClick={() => setLessonDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Description Tab */}
        <TabsContent value="description">
          <div className="rounded-xl border border-border bg-card p-6">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a detailed description of your course..."
              className="mt-2 min-h-[200px]"
            />
          </div>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label>Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="signed_in">Signed In Users Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  Who can see this course in the catalog
                </p>
              </div>

              <div>
                <Label>Access Rule</Label>
                <Select value={accessRule} onValueChange={setAccessRule}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open (Free)</SelectItem>
                    <SelectItem value="invitation">On Invitation</SelectItem>
                    <SelectItem value="payment">On Payment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  How users can access this course
                </p>
              </div>

              {accessRule === 'payment' && (
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="49.99"
                    className="mt-2"
                  />
                </div>
              )}


            </div>
          </div>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Quiz Reward Settings</h3>
            <p className="mb-6 text-muted-foreground">
              Configure how many points learners earn based on their quiz attempts
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: '1st Attempt', default: 30 },
                { label: '2nd Attempt', default: 20 },
                { label: '3rd Attempt', default: 10 },
                { label: '4th+ Attempt', default: 5 },
              ].map((item) => (
                <div key={item.label}>
                  <Label>{item.label}</Label>
                  <div className="relative mt-2">
                    <Input
                      type="number"
                      defaultValue={item.default}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Attendee Wizard */}
      <Dialog open={addAttendeeOpen} onOpenChange={setAddAttendeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
            <DialogDescription>
              Add a new learner to this course directly by email.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="learner-email">Learner Email</Label>
            <Input id="learner-email" placeholder="learner@example.com" className="mt-2" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAttendeeOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAttendee}>Add Learner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Wizard */}
      <Dialog open={contactAttendeeOpen} onOpenChange={setContactAttendeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Attendees</DialogTitle>
            <DialogDescription>
              Send an email to all learners enrolled in this course.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Course Update..." className="mt-2" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." className="mt-2 min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactAttendeeOpen(false)}>Cancel</Button>
            <Button onClick={handleContactAttendee}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
