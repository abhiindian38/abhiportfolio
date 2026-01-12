import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Certificate } from "./data";
import { MetallicOverlay } from "./MetallicOverlay";
import { ExternalLink } from "lucide-react";
import { motionTokens } from "./motion.config";

export const CertificateCard = ({ cert }: { cert: Certificate }) => {
    // Skeleton State
    const [isLoading, setIsLoading] = useState(true);

    // Micro-parallax logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 40, damping: 25 }); // Softer spring for weight
    const mouseY = useSpring(y, { stiffness: 40, damping: 25 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex flex-col gap-5 group">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }}
                whileInView={{
                    opacity: 0.9,
                    scale: 1,
                    filter: "grayscale(60%)", // Default state in view: muted
                    transition: { duration: 0.8, ease: motionTokens.easingLuxury }
                }}
                whileHover={{
                    opacity: 1,
                    scale: 1.02,
                    filter: "grayscale(0%)", // Focus state: Full Color
                    y: -5,
                    transition: { duration: 0.4, ease: "easeOut" }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative w-[300px] sm:w-[480px] aspect-[16/10] rounded-lg overflow-hidden cursor-pointer bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl dark:hover:shadow-[#D4AF37]/10 transition-all duration-500 will-change-transform"
                onClick={() => window.open(cert.link, '_blank')}
            >
                {/* Skeleton Shimmer */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-gray-900">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                )}

                {/* Image Layer */}
                <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setIsLoading(false)}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Cinematic Gradient for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Metallic Shimmer Overlay */}
                <MetallicOverlay />

                {/* Hover Action Badge (Minimalist) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border border-gray-100 dark:border-gray-800">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-gray-200">
                            View
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-900 dark:text-gray-200" />
                    </div>
                </div>

                {/* Border Highlight (Theme Aware) */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-gray-900/10 dark:group-hover:border-[#D4AF37]/20 transition-colors duration-500 pointer-events-none z-40" />
            </motion.div>

            {/* External Title & Metadata (Museum Style) */}
            <div className="pl-1 transition-opacity duration-300 opacity-70 group-hover:opacity-100">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 tracking-wide">
                    {cert.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 border-t border-gray-200 dark:border-gray-800 pt-2 w-max">
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em]">
                        {cert.issuer}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-600 font-mono">
                        // {cert.date}
                    </span>
                </div>
            </div>
        </div>
    );
};
