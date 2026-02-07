
import { GraduationCap, BookOpen, Brain, Rocket, Lightbulb, Laptop, Trophy, Target, Sparkles, Coffee, Headphones, Smartphone } from 'lucide-react';

export function AuthIllustration() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-950 flex items-center justify-center p-8" style={{ perspective: '1200px' }}>
            {/* Background Gradients & Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-950 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-50" />

            {/* Main 3D Composition Container */}
            <div className="relative z-10 w-full max-w-lg min-h-[400px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-5deg) rotateX(5deg)' }}>

                {/* Glowing Orb Backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

                {/* 3D Laptop - CSS Constructed */}
                <div className="relative w-[480px] h-[280px] group animate-float" style={{ animationDuration: '8s', transformStyle: 'preserve-3d' }}>

                    {/* Laptop Lid/Screen */}
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-900 rounded-t-xl rounded-b-md shadow-2xl border-[4px] border-slate-800 overflow-hidden transition-transform duration-700 group-hover:-translate-y-2" style={{ transformOrigin: 'bottom', transform: 'rotateX(0deg)' }}>
                        {/* Screen Bezel Gloss */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />

                        {/* Screen Content - LearnSphere Mini UI */}
                        <div className="absolute inset-2 bg-slate-950 rounded overflow-hidden flex flex-col items-center pt-8 relative">
                            {/* Navbar Mock */}
                            <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-white/5 flex items-center px-3 gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                <div className="ml-auto w-16 h-2 rounded-full bg-white/10" />
                            </div>
                            {/* Hero Content Mock */}
                            <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-br from-slate-900 to-slate-950">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-3/4 h-3 bg-white/20 rounded animate-pulse" />
                                <div className="w-1/2 h-2 bg-white/10 rounded" />
                                <div className="flex gap-2 mt-2">
                                    <div className="w-16 h-5 rounded bg-accent shadow-lg shadow-accent/20" />
                                    <div className="w-16 h-5 rounded border border-white/10" />
                                </div>
                                {/* Decorative Cards Mock */}
                                <div className="absolute bottom-[-20px] w-full flex justify-center gap-2 opacity-50 blur-[0.5px]">
                                    <div className="w-20 h-16 bg-slate-800 rounded-t-lg border border-white/5" />
                                    <div className="w-20 h-16 bg-slate-800 rounded-t-lg border border-white/5 translate-y-2" />
                                    <div className="w-20 h-16 bg-slate-800 rounded-t-lg border border-white/5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Laptop Base */}
                    <div className="absolute -bottom-[12px] left-[-5%] w-[110%] h-[16px] bg-slate-800 rounded-b-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]" style={{ transform: 'rotateX(90deg) translateZ(8px)' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-slate-600 rounded-b-md" />
                    </div>
                </div>

                {/* Floating Elements - "Semi-Illustrated Scene" */}

                {/* Coffee Cup */}
                <div className="absolute -right-8 bottom-12 animate-float" style={{ animationDelay: '1.5s', animationDuration: '6s', transform: 'translateZ(40px)' }}>
                    <div className="relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-[20deg] transition-transform">
                        <Coffee className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                    </div>
                </div>

                {/* Notebook */}
                <div className="absolute -left-12 bottom-20 animate-float" style={{ animationDelay: '2.5s', animationDuration: '7s', transform: 'translateZ(30px)' }}>
                    <div className="relative w-16 h-20 bg-indigo-500/20 backdrop-blur-md rounded-lg border border-indigo-500/30 flex items-center justify-center shadow-xl -rotate-[15deg] group-hover:-rotate-[10deg] transition-transform">
                        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-indigo-500/50" />
                        <BookOpen className="w-8 h-8 text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]" />
                    </div>
                </div>

                {/* Headphones */}
                <div className="absolute right-0 -top-12 animate-float" style={{ animationDelay: '0.5s', animationDuration: '5.5s', transform: 'translateZ(50px)' }}>
                    <div className="relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full border border-white/10 shadow-2xl rotate-[30deg]">
                        <Headphones className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                    </div>
                </div>

            </div>

            {/* Modern Overlay Text */}
            <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                    Your Personal
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary ml-2">Learning Space</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Immerse yourself in a world of knowledge with our cutting-edge platform designed for focus and growth.
                </p>
            </div>
        </div>
    );
}
