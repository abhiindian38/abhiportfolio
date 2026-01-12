import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { certificates } from "./data";
import { CertificateCard } from "./CertificateCard";

export default function Certifications() {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Dynamic Scroll Calculation
    const [scrollRange, setScrollRange] = useState(0);

    useEffect(() => {
        const updateScrollMetrics = () => {
            if (scrollContainerRef.current) {
                const totalWidth = scrollContainerRef.current.scrollWidth;
                const visibleWidth = window.innerWidth;
                const distance = totalWidth - visibleWidth;

                // Add padding for clean exit
                const padding = visibleWidth * 0.05;
                setScrollRange(distance + padding);
            }
        };

        updateScrollMetrics();
        window.addEventListener("resize", updateScrollMetrics);
        // Delay to allow image/layout settlement
        const timeout = setTimeout(updateScrollMetrics, 200);

        return () => {
            window.removeEventListener("resize", updateScrollMetrics);
            clearTimeout(timeout);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30, // Heavier damping for luxury feel
        restDelta: 0.001
    });

    const x = useTransform(smoothProgress, [0, 1], ["0px", `-${scrollRange}px`]);

    return (
        <section
            ref={targetRef}
            id="certifications"
            className="relative h-[250vh] bg-gray-50 dark:bg-[#121212]" // Compacted Height
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header Container - EXACT COPY */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto px-6 sm:px-12 w-full mb-10 sm:mb-14" // Compacted Margins
                >
                    <div className="flex items-end gap-6 sm:gap-8">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Certifications
                        </h2>
                        <div className="h-[3px] w-full bg-gray-900/30 dark:bg-white/30 mb-2"></div>
                    </div>
                </motion.div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    ref={scrollContainerRef}
                    style={{ x }}
                    className="flex gap-6 sm:gap-10 pl-6 sm:pl-12 w-max items-start py-8 will-change-transform" // Tightened Gap
                >
                    {certificates.map((cert) => (
                        <CertificateCard key={cert.id} cert={cert} />
                    ))}
                    {/* End Padding */}
                    <div className="w-[15vw] shrink-0" />
                </motion.div>

                {/* Scrubber (Luxury) */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-gray-200 dark:bg-gray-800 w-full">
                    <motion.div
                        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
                        className="h-full bg-gray-900 dark:bg-white/80"
                    />
                </div>
            </div>
        </section>
    );
}
