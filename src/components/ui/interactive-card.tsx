<<<<<<< HEAD
import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
    glowColor?: string;
    children: React.ReactNode;
}

export function InteractiveCard({
    className,
    glowColor = "rgba(113, 75, 110, 0.3)",
    children,
    ...props
}: InteractiveCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg",
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
=======
import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

export function InteractiveCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.3)',
    ...props
}: InteractiveCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setGlowPosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                'relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 ease-out cursor-pointer overflow-hidden',
                className
            )}
            style={{
                transform,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Glow effect that follows mouse */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 50%)`,
                }}
            />

            {/* Border glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 70%)`,
                    padding: '1px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                }}
            />

            {/* Content */}
            <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                {children}
            </div>
>>>>>>> 88d8ff07062df7884bfb954e511032d4a46d87df
        </div>
    );
}

<<<<<<< HEAD
export function HoverCard({
    className,
    glowColor = "rgba(113, 75, 110, 0.3)",
    children,
    ...props
}: InteractiveCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
=======
// Simpler version without 3D tilt, just hover effects
export function HoverCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.2)',
    ...props
}: InteractiveCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                'relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden group',
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            {/* Glow effect that follows mouse */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
>>>>>>> 88d8ff07062df7884bfb954e511032d4a46d87df
        </div>
    );
}
