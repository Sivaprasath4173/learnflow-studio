
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call to register user and notify admin/instructor
        setTimeout(async () => {
            try {
                console.log('Registering user:', { name, email, role: 'learner' });
                console.log('Notification sent to admin and instructor about new user signup');

                toast.success('Account created successfully! Welcome to LearnSphere.');

                // Auto login after registration
                await login(email, password, 'learner');
                navigate('/my-courses');
            } catch (error) {
                console.error('Registration failed:', error);
                toast.error('Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo */}
                    <div className="mb-8">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                                <GraduationCap className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">LearnSphere</span>
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">Create an account</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative mt-1">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative mt-1">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                                I agree to the{' '}
                                <a href="#" className="font-medium text-primary hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-medium text-primary hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right - Image */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="max-w-md text-center text-primary-foreground">
                        <h3 className="mb-4 text-3xl font-bold">Join our community</h3>
                        <p className="text-lg opacity-90">
                            Get unlimited access to the best courses from top instructors and industry experts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
