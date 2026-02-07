import { useRef, useEffect } from 'react';

interface LightRaysProps {
    raysOrigin?: 'center' | 'top' | 'top-center';
    raysColor?: string;
    lightSpread?: number;
    rayLength?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    intensity?: number;
    blur?: number;
}

export function LightRays({
    raysOrigin = 'center',
    raysColor = '#ffffff',
    intensity = 1,
}: LightRaysProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const render = () => {
            time += 0.005;
            const { width, height } = canvas;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Set origin
            const x = width / 2;
            const y = raysOrigin.includes('top') ? 0 : height / 2;

            // Draw rays
            const rayCount = 20;
            for (let i = 0; i < rayCount; i++) {
                const angle = (Math.PI * 2 * i) / rayCount + time;
                const length = Math.max(width, height) * 1.5;

                const gradient = ctx.createLinearGradient(x, y, x + Math.cos(angle) * length, y + Math.sin(angle) * length);
                gradient.addColorStop(0, `${raysColor}00`); // Transparent at origin
                gradient.addColorStop(0.5, `${raysColor}${Math.floor(intensity * 40).toString(16)}`); // Color in middle
                gradient.addColorStop(1, `${raysColor}00`); // Transparent at end

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(angle - 0.1) * length, y + Math.sin(angle - 0.1) * length);
                ctx.lineTo(x + Math.cos(angle + 0.1) * length, y + Math.sin(angle + 0.1) * length);
                ctx.closePath();

                ctx.fillStyle = gradient;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [raysOrigin, raysColor, intensity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
