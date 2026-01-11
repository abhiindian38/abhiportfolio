import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Building2 } from "lucide-react";

interface ExperienceProps {
    company: string;
    role: string;
    duration: string;
    description: string;
    highlights: string[];
}

const experiences: ExperienceProps[] = [
    {
        company: "Private Service-Based Company",
        role: "Full Stack Programmer",
        duration: "October 2025 – Present",
        description: "Currently contributing as a full stack programmer, building scalable and production-ready applications. Involved across the development lifecycle, working with modern frontend and backend technologies to deliver reliable systems.",
        highlights: [
            "Developing scalable frontend and backend applications",
            "Working with modern web technologies and frameworks",
            "Delivering production-grade, maintainable solutions"
        ],
    },
    {
        company: "Marvel Medi Revolutions",
        role: "Junior Tech Marketing Engineer",
        duration: "December 2024 – March 2025",
        description: "Worked in a fast-paced health-tech environment supporting digital marketing operations with technical insights. Contributed to improving the technical visibility and operational efficiency of health-based warehouse products.",
        highlights: [
            "Worked in a health-based product warehouse ecosystem",
            "Supported technical marketing workflows",
            "Assisted in improving digital product visibility and reach"
        ],
    },
    {
        company: "Google Developer Student Club (GDSC MLRITM)",
        role: "Outreach Team Lead Member (Technical)",
        duration: "March 2023 – May 2024",
        description: "Actively contributed to the technical growth of the student developer community by mentoring peers, collaborating with core leadership, and driving large-scale technical events. Played a key role in bridging technical knowledge with community engagement initiatives.",
        highlights: [
            "Mentored 50+ students in web development, cloud computing, and machine learning",
            "Worked closely under the Programming Lead to plan and execute initiatives",
            "Organized 3+ hackathons and coding competitions",
            "Engaged 200+ participants across workshops and events"
        ],
    }
];

const ExperienceCard = ({ exp, index }: { exp: ExperienceProps; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 sm:pl-16 py-2 group w-full"
        >
            {/* Contextual Vertical Line (Segment) */}
            <div
                className="absolute left-[9px] sm:left-[21px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800"
                aria-hidden="true"
            >
                {/* Active/Filled Line Animation */}
                <motion.div
                    className="w-full h-full bg-gray-900 dark:bg-white origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                />
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-0 sm:left-[10px] top-4 z-10 transition-transform duration-300 group-hover:scale-110">
                <motion.div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-[#121212] border-4 ${index === 0 ? 'border-gray-900 dark:border-white animate-pulse' : 'border-[#191919] dark:border-white group-hover:border-gray-900 dark:group-hover:border-gray-200'}`} // Improved hover state
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                </motion.div>
            </div>

            {/* Card Content */}
            <div className="w-full">
                <motion.div
                    whileHover={{ y: -4, x: 4 }}
                    className="w-full bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 relative overflow-hidden group/card"
                >
                    {/* Subtle Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#191919] dark:text-white leading-tight mb-1 group-hover/card:text-gray-900 dark:group-hover/card:text-white transition-colors">
                                    {exp.role}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <span className="text-base font-semibold text-gray-600 dark:text-gray-300 group-hover/card:text-gray-800 dark:group-hover/card:text-gray-200 transition-colors">
                                        {exp.company}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 self-start shrink-0">
                                <Calendar className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                    {exp.duration}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mb-6"> {/* Constrained text width for readability, but card is full width */}
                            {exp.description}
                        </p>

                        {/* Expandable Highlights */}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191919] dark:text-white hover:opacity-70 transition-all"
                            >
                                {isExpanded ? "Show Less" : "Key Highlights"}
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                                            {exp.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white shrink-0" />
                                                    <span className="leading-snug">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function Experience() {
    const containerRef = useRef(null);

    return (
        <section id="experience" className="pt-32 pb-8 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 sm:px-12" ref={containerRef}>
                {/* Header */}
                <div className="mb-16 sm:mb-20">
                    <div className="flex items-end gap-6 sm:gap-8">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Work Experience
                        </h2>
                        <div className="h-[3px] w-full bg-gray-900/30 dark:bg-white/30 mb-2"></div>
                    </div>
                </div>

                <div className="relative space-y-8"> {/* Full width container */}
                    {/* Continuous Background Line for the whole track */}
                    <div className="absolute left-[9px] sm:left-[21px] top-2 bottom-6 w-[2px] bg-gray-200 dark:bg-gray-800 z-0" />

                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
