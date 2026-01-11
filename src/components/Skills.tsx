import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Terminal,
    Globe,
    Layout,
    Server,
    Figma,
} from "lucide-react";

// Skill Data Mapping
const skills = [
    // --- Languages ---
    { name: "Java", icon: "/java-wordmark.svg", type: "image" },
    { name: "Python", icon: "/python.svg", type: "image" },
    { name: "PHP", icon: "/php.svg", type: "image" },
    { name: "C++", icon: Code2, type: "lucide" },
    { name: "JavaScript", icon: "/javascript-svgrepo-com.svg", type: "image" },
    { name: "TypeScript", icon: "/file-type-vscode.svg", type: "image" },
    // --- Frontend ---
    { name: "React", icon: "/react.svg", type: "image" },
    { name: "HTML5", icon: "/html-5.svg", type: "image" },
    { name: "CSS3", icon: "/css3.svg", type: "image" },
    { name: "Tailwind", icon: Layout, type: "lucide" },
    { name: "Vite", icon: "/vitejs.svg", type: "image" },
    { name: "Three.js", icon: Globe, type: "lucide" },
    { name: "Chart.js", icon: "/react.svg", type: "image", isGeneric: true },
    // --- Backend ---
    { name: "Spring", icon: "/spring.svg", type: "image" },
    { name: "Spring Boot", icon: "/springboot.svg", type: "image" },
    { name: "Hibernate", icon: Database, type: "lucide" },
    { name: "MySQL", icon: Database, type: "lucide" },
    { name: "JDBC", icon: Server, type: "lucide" },
    // --- Tools/DevOps ---
    { name: "Git", icon: "/git.svg", type: "image" },
    { name: "GitHub", icon: "/github-stroke-16.svg", type: "image" },
    { name: "Linux", icon: Terminal, type: "lucide" },
    { name: "Jira", icon: "/jira.svg", type: "image" },
    { name: "Scrum", icon: "/scrum-svgrepo-com.svg", type: "image" },
    { name: "Figma", icon: Figma, type: "lucide" },
];

const SkillTile = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
    // Randomized floating parameters
    const randomDuration = 3 + Math.random() * 2;
    const randomY = 4 + Math.random() * 6; // Reduced float distance for compact feel

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.03 // Faster stagger
            }}
            className="relative group"
        >
            <motion.div
                animate={{ y: [0, -randomY, 0] }}
                transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }}
                className="
                    flex flex-col items-center justify-center 
                    w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22
                    bg-white dark:bg-[#1a1a1a] 
                    rounded-xl sm:rounded-2xl
                    border border-gray-100 dark:border-gray-800 
                    shadow-sm hover:shadow-lg dark:hover:shadow-primary/20
                    transition-all duration-300
                    cursor-pointer
                    relative
                    overflow-hidden
                "
                whileHover={{ scale: 1.1, y: -4, rotate: [-1, 1, 0] }} // Added subtle wiggle
            >
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine" />
                </div>

                {/* Icon */}
                <div className="relative z-10 p-2">
                    {skill.type === "image" ? (
                        <img
                            src={skill.icon as string}
                            alt={skill.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                    ) : (
                        <skill.icon
                            className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-primary transition-colors duration-300"
                        />
                    )}
                </div>

                {/* Compact Label */}
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mt-1">
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
};

export default function Skills() {
    return (
        <section id="skills" className="pt-24 pb-12 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Header */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-end gap-6 sm:gap-8">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Skills
                        </h2>
                        <div className="h-[3px] w-full bg-gray-900/30 dark:bg-white/30 mb-2"></div>
                    </div>
                </div>

                {/* Compact Dense Grid */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5">
                    {skills.map((skill, index) => (
                        <SkillTile key={index} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
