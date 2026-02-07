import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Award, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { InteractiveCard, HoverCard } from '@/components/ui/interactive-card';
import { LightRays } from '@/components/ui/light-rays';
import { FloatingBlobs } from '@/components/ui/floating-blobs';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full screen height */}
      <section className="relative overflow-hidden min-h-screen flex items-center py-7 md:py-12 px-4 md:px-12">
        {/* Premium Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Secondary subtle gradient for depth */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
          }}
        />

<<<<<<< HEAD
=======
        {/* Premium Spotlight Effect */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          lightSpread={0.55}
          rayLength={0.75}
          saturation={0.35}
          followMouse
          mouseInfluence={0.03}
          intensity={0.4}
          blur={80}
        />

>>>>>>> 0ed306960fccfab070e5f8d3a6cd635b086e4f7d
        {/* Subtle noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Adjusted Spotlight Effect */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          lightSpread={0.5}
          rayLength={0.7}
          saturation={0.3}
          intensity={0.25}
          className="opacity-40"
        />

        {/* Floating background elements */}
        {/* Removed the floating blob div as per instruction */}

        {/* Content - Compact layout as requested */}
        <div className="container relative z-10 mx-auto px-0">
          <div className="max-w-2xl text-left">
            {/* Badge - Smaller padding */}
            <div
              className="mb-6 inline-flex items-center rounded-full border border-primary/40 bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white shadow-xl animate-fade-in"
            >
              <Award className="mr-2 h-3.5 w-3.5 text-accent" />
              Over 50,000 active learners
            </div>

            {/* Main Heading - Reduced sizes */}
            <h1
<<<<<<< HEAD
              className="mb-5 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl animate-fade-in text-white leading-[1.2]"
=======
              className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in text-white"
>>>>>>> 0ed306960fccfab070e5f8d3a6cd635b086e4f7d
              style={{
                animationDelay: '0.2s',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}
            >
              Master New Skills <br />
              With{' '}
              <span
                className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient block mt-1"
              >
                LearnSphere
              </span>
            </h1>

            {/* Subtext - Reduced sizes */}
            <p
              className="mb-8 text-lg animate-fade-in font-medium max-w-lg text-gray-200 leading-relaxed md:text-xl"
              style={{
                animationDelay: '0.4s',
                textShadow: '0 1px 10px rgba(0,0,0,0.4)'
              }}
            >
<<<<<<< HEAD
              Learn from industry titans at your own pace.
              Earn recognized badges and transform your career
              with interactive, hands-on courses.
=======
              Discover courses taught by industry experts. Learn at your own pace,
              earn badges, and transform your career with hands-on learning.
>>>>>>> 0ed306960fccfab070e5f8d3a6cd635b086e4f7d
            </p>

            {/* Buttons - More compact */}
            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 rounded-xl font-bold text-base px-8 bg-accent hover:bg-accent/90 text-white shadow-xl transition-all hover:scale-105 active:scale-95 group"
                asChild
              >
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Courses
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 rounded-xl bg-white/5 hover:bg-white/10 border-white/20 text-white font-bold text-base px-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 group"
                  asChild
                >
                  <Link to="/register">
                    Join Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section >

      {/* Features Section */}
      <section className="relative py-7 md:py-12 overflow-hidden">
        {/* Colorful floating background */}
        <FloatingBlobs />

        <div className="container relative z-10">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl text-primary">Why Choose LearnSphere?</h2>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Join thousands of learners who have transformed their careers through our platform.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <InteractiveCard
                glowColor="rgba(113, 75, 110, 0.4)"
                className="h-full shadow-lg border-primary/10"
              >
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl bg-primary/10 p-4 w-fit">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Expert Instructors</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Learn from industry professionals with real-world experience and proven track records.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            <div>
              <InteractiveCard
                glowColor="rgba(13, 143, 220, 0.4)"
                className="h-full shadow-lg border-accent/10"
              >
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl bg-accent/10 p-4 w-fit">
                    <Play className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">High-Quality Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Access professionally produced videos, interactive quizzes, and comprehensive materials.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            <div>
              <InteractiveCard
                glowColor="rgba(113, 75, 110, 0.4)"
                className="h-full shadow-lg border-primary/10"
              >
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl bg-primary/10 p-4 w-fit">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Earn Certificates</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Get recognized for your achievements with certificates and badges you can share.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-7 md:py-12 bg-muted/30 overflow-hidden">
        {/* Background glow for this section too */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[150px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl text-primary">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Start your learning journey in just three simple steps.
            </p>
          </div>

<<<<<<< HEAD
          <div className="grid gap-5 md:grid-cols-3">
=======
          <div className="grid gap-8 md:grid-cols-3">
>>>>>>> 0ed306960fccfab070e5f8d3a6cd635b086e4f7d
            {[
              {
                step: '01',
                title: 'Choose a Course',
                description: 'Browse our catalog and find courses that match your interests and goals.',
                icon: BookOpen,
                color: 'rgba(113, 75, 110, 0.2)'
              },
              {
                step: '02',
                title: 'Learn at Your Pace',
                description: 'Watch videos, read materials, and complete quizzes when it suits you.',
                icon: Play,
                color: 'rgba(13, 143, 220, 0.2)'
              },
              {
                step: '03',
                title: 'Earn Recognition',
                description: 'Complete courses to earn points, badges, and shareable certificates.',
                icon: CheckCircle,
                color: 'rgba(113, 75, 110, 0.2)'
              },
            ].map((item, index) => (
              <div key={index}>
                <HoverCard
                  className="relative group border-white/5 glass shadow-lg hover:shadow-xl transition-all"
                  glowColor={item.color}
                >
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary font-bold text-xl transition-transform">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{item.description}</p>
                </HoverCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<<<<<<< HEAD
      <section className="relative py-7 md:py-12 overflow-hidden border-t">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse-glow" />

        <div className="container relative z-10">
          <div className="text-left max-w-3xl">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-primary">Ready to Start Learning?</h2>
            <p className="mb-10 text-xl text-muted-foreground leading-relaxed">
              Join thousands of learners and start your journey today.
              Unlock your potential with LearnSphere's expert-led curriculum.
=======
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of learners and start your journey today.
              It's free to get started.
>>>>>>> 0ed306960fccfab070e5f8d3a6cd635b086e4f7d
            </p>
            <div className="flex flex-col items-start justify-start gap-6 sm:flex-row">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold shadow-xl hover:scale-105 transition-transform" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold bg-white/5 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform" asChild>
                  <Link to="/register">Create Free Account</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
