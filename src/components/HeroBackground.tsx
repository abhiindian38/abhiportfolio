import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function HeroBackground() {
    const { resolvedTheme } = useTheme();

    // Mouse position state for parallax
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized mouse position (-1 to 1)
            const normalizedX = (e.clientX / window.innerWidth) - 0.5;
            const normalizedY = (e.clientY / window.innerHeight) - 0.5;

            // Limit displacement to small percentage (opposite direction)
            // 1% displacement = window.innerWidth * 0.01
            x.set(normalizedX * -20); // Move roughly 20px max
            y.set(normalizedY * -20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none mix-blend-difference">
            {/* Container for images with parallax */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%] flex items-center justify-center"
                style={{ x: springX, y: springY }}
            >
                {/* Light Theme Background */}
                <motion.img
                    src="/bg-light.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: resolvedTheme === "light" ? 1 : 0 }}
                    animate={{
                        opacity: resolvedTheme === "light" ? 1 : 0,
                        scale: [1, 1.03, 1], // Breathe animation
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />

                {/* Dark Theme Background */}
                <motion.img
                    src="/bg-dark.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: resolvedTheme === "dark" ? 1 : 0 }}
                    animate={{
                        opacity: resolvedTheme === "dark" ? 1 : 0,
                        scale: [1, 1.03, 1], // Breathe animation
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />
            </motion.div>

            {/* Cinematic Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Vignette Overlay for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 opacity-60 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.15) 100%)' }}
            />
        </div>
    );
}
