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
        </div>
    );
}

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
        </div>
    );
}
