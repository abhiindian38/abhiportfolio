import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUp, 
  Home, 
  User, 
  Layers, 
  Mail, 
  Copy, 
  Check,
  MessageCircle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Footer() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const email = "your.email@example.com"; // Replace with your actual email

  // Time Logic
  const [now, setNow] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setNow(timeString);
      } catch {
        setNow(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Handle Copy Email
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: t.nav.home, href: "/", icon: Home },
    { label: t.nav.about, href: `/#${t.sections.about}`, icon: User },
    { label: t.nav.projects, href: `/#${t.sections.projects}`, icon: Layers },
    { label: t.nav.contact, href: `/#${t.sections.contact}`, icon: Mail },
  ];

  // Small wrapper to render the provided WhatsApp SVG from /public
  const WhatsAppIcon = ({ className }: { className?: string }) => (
    // using the public path so Vite serves it at runtime
    <img src="/whatsapp-glyph-black-logo-svgrepo-com.svg" alt="WhatsApp" className={cn("w-5 h-5 filter dark:invert", className)} />
  );

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/abhiindian38", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-gupta-686a962a3/", icon: Linkedin },
    { label: "WhatsApp", href: "https://wa.me/917093398106", icon: WhatsAppIcon },
    { label: "X (Twitter)", href: "https://x.com/whyabhishekh", icon: Twitter },
  ];

  // Animation Variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  if (!mounted) return null;

  return (
    <footer className="relative w-full bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Premium Gradient Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-7xl mx-auto px-6 py-16 md:px-12"
      >
        {/* Top Section: CTA & Copy Email */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <motion.div variants={itemVars} className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Let's create something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                extraordinary.
              </span>
            </h2>
            <div className="flex items-center gap-4 group">
              <button 
                onClick={handleCopy}
                className="relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span>{copied ? "Email Copied" : "Copy Email"}</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Available for work</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links - Stacked for premium look */}
          <motion.nav variants={itemVars} className="grid grid-cols-2 gap-x-12 gap-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <link.icon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                <span className="text-lg font-medium tracking-tight -translate-x-6 group-hover:translate-x-0 transition-transform duration-300">
                  {link.label}
                </span>
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Bottom Section: Info & Socials */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Time */}
          <motion.div variants={itemVars} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span>{now}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-zinc-300 dark:bg-zinc-800" />
            <div>
              © {year} Abhishek. {t.footer.rights}
            </div>
          </motion.div>

          {/* Socials & Scroll Top */}
          <motion.div variants={itemVars} className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 group relative"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}