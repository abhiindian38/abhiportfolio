import { motion } from "framer-motion";
import { ExternalLink, Github, MonitorOff } from "lucide-react";

// Exact Project Data
const projects = [
    {
        title: "Suno 2025",
        // Placeholder image logic - since actual image might be missing, using a gradient or generic pattern if not found
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2808&auto=format&fit=crop", // Futuristic/Music vibe
        description: "A high-fidelity, futuristic cinematic discovery platform for Indian films and music, designed as an immersive intelligence interface.",
        tech: ["React 18", "Vite", "Tailwind", "Framer Motion", "TMDB API"],
        demo: "https://suno-2025.vercel.app",
        code: "https://github.com/yourusername/suno-2025",
        available: true
    },
    {
        title: "Facial Emotion Detection",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2000&auto=format&fit=crop", // AI/Tech vibe
        description: "Real-time facial expression recognition system using live video streams and CNN for emotion classification.",
        tech: ["Python", "TensorFlow", "OpenCV", "Flask", "CNN"],
        demo: "#",
        code: "https://github.com/abhiindian38/Facial-Emotion-Detection-using-Convolutional-Neural-Network",
        available: false
    },
    {
        title: "HerboSphere",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1567&auto=format&fit=crop", // Nature/Plant vibe
        description: "Virtual herbal garden combining AYUSH knowledge with 3D exploration and immersive learning.",
        tech: ["React", "Three.js", "Node.js", "MongoDB", "TensorFlow"],
        demo: "#",
        code: "https://github.com/abhiindian38/HerboSphere/tree/master",
        available: false
    }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/10 dark:bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10" />

                {/* Floating Title (Mobile/Card Design) - Embedded at bottom left of image for futuristic look */}
                <div className="absolute bottom-4 left-5 z-20">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {project.title}
                        <span className="block h-[3px] w-0 bg-primary mt-1 group-hover:w-full transition-all duration-300 ease-out" />
                    </h3>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                            <span
                                key={i}
                                className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border border-transparent hover:border-primary/20 hover:text-primary transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50 pt-4 mt-auto">
                    {/* Live Demo Button */}
                    {project.available ? (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white hover:text-primary transition-colors group/link"
                        >
                            Live Demo
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                    ) : (
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 cursor-not-allowed group/disabled">
                            <span className="relative">
                                Demo N/A
                                {/* Tooltip */}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-black rounded opacity-0 group-hover/disabled:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Unavailable
                                </span>
                            </span>
                            <MonitorOff className="w-3.5 h-3.5" />
                        </div>
                    )}

                    {/* Code Link */}
                    <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        title="View Code"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default function Projects() {
    return (
        <section id="projects" className="pt-32 pb-8 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* EXACT Header Match from App.tsx */}
                <div className="mb-16 sm:mb-20">
                    <div className="flex items-end gap-6 sm:gap-8">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            My Projects
                        </h2>
                        <div className="h-[3px] w-full bg-gray-900/30 dark:bg-white/30 mb-2"></div>
                    </div>
                </div>

                {/* Futuristic Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
