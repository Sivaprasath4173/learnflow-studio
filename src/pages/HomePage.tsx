import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { InteractiveCard, HoverCard } from '@/components/ui/interactive-card';
import { LightRays } from '@/components/ui/light-rays';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Premium Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Secondary subtle gradient for depth */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
          }}
        />

        {/* Premium Spotlight Effect */}
        <LightRays
          raysColor="#7c3aed"
          lightSpread={0.55}
          rayLength={0.75}
          saturation={0.35}
          followMouse
          mouseInfluence={0.03}
          intensity={0.4}
          blur={80}
        />

        {/* Subtle noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge - Using primary color */}
            <div
              className="mb-8 inline-flex items-center rounded-full border border-primary/40 bg-primary/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-white shadow-lg animate-fade-in"
            >
              <Award className="mr-2 h-4 w-4" />
              Trusted by 50,000+ learners worldwide
            </div>

            {/* Main Heading - White text for dark background */}
            <h1
              className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in text-white"
              style={{ animationDelay: '0.1s' }}
            >
              Master New Skills with{' '}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                LearnSphere
              </span>
            </h1>
            <p
              className="mb-10 text-lg text-slate-300 md:text-xl max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Discover courses taught by industry experts. Learn at your own pace,
              earn badges, and transform your career with hands-on learning.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LearnSphere?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers through our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <InteractiveCard glowColor="rgba(139, 92, 246, 0.3)">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Expert Instructors</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from industry professionals with real-world experience and proven track records.
                  </p>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard glowColor="rgba(6, 182, 212, 0.3)">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <Play className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">High-Quality Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Access professionally produced videos, interactive quizzes, and comprehensive materials.
                  </p>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard glowColor="rgba(139, 92, 246, 0.3)">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Earn Certificates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get recognized for your achievements with certificates and badges you can share.
                  </p>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey in just three simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <HoverCard>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Browse Courses</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our catalog and find courses that match your interests and goals.
                </p>
              </div>
            </HoverCard>

            <HoverCard>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Enroll & Learn</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up for courses and access content anytime, anywhere at your own pace.
                </p>
              </div>
            </HoverCard>

            <HoverCard>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Earn Badges</h3>
                <p className="text-sm text-muted-foreground">
                  Complete courses, earn badges, and showcase your new skills.
                </p>
              </div>
            </HoverCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8">
              Join our community of learners and take the first step towards mastering new skills.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" asChild>
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
