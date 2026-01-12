import { motion } from "framer-motion";

export const MetallicOverlay = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl mix-blend-overlay">
            {/* Shimmer Base */}
            <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1], // Luxury easing
                    repeat: 0
                }}
                className="w-full h-full absolute inset-0 transform"
            >
                {/* 
                  Refined Multi-Stop Refraction Gradient:
                  - Transparent
                  - Sharp Highlight (White/Bright Gold)
                  - Soft Diffusion (Silver/Champagne)
                  - Transparent
                  This creates a "brushed metal" fast sweep effect.
               */}
                <div className="w-[80%] h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/40 via-white/80 to-transparent dark:from-transparent dark:via-[#F8F3BF]/20 dark:via-[#F8F3BF]/50 dark:to-transparent" />
            </motion.div>

            {/* Static Specular Noise for Texture (optional, keeps it grounded) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:to-black/20 opacity-30" />
        </div>
    );
};
