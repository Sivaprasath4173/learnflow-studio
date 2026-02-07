import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
}

export function InteractiveCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.3)',
    duration = 4,
    borderWidth = 2,
    colorFrom = '#714B6E',
    colorTo = '#0D8FDC',
    ...props
}: InteractiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                'relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 ease-out cursor-pointer overflow-hidden group',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Border Beam Effect - Only visible on hover */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
                style={{
                    padding: borderWidth,
                }}
            >
                <div
                    className="absolute inset-0 animate-border-beam"
                    style={{
                        // @ts-ignore
                        '--duration': `${duration}s`,
                        maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        borderRadius: 'inherit',
                        background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent, transparent)`,
                        offsetPath: `rect(0 100% 100% 0 round 1rem)`,
                        width: '60px',
                        height: '2px',
                    }}
                />
            </div>

            {/* Static background glow on hover (not following mouse) */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 80%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
                {children}
            </div>
        </div>
    );
}

// Simpler version
export function HoverCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.2)',
    ...props
}: InteractiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                'relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 ease-out hover:shadow-xl cursor-pointer overflow-hidden group',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Running line on border */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
            >
                <div
                    className="absolute inset-0 animate-border-beam"
                    style={{
                        // @ts-ignore
                        '--duration': `3s`,
                        offsetPath: `rect(0 100% 100% 0 round 1rem)`,
                        background: `linear-gradient(to right, #714B6E, #0D8FDC, transparent)`,
                        width: '80px',
                        height: '2px',
                    }}
                />
            </div>

            {/* Static glow effect on hover (not following mouse) */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 80%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
