import { Suspense, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import emailjs from "@emailjs/browser";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LazyBeams from "./components/LazyBeams";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import { useLanguage } from "@/lib/useLanguage";
import Experience from "./components/Experience";

export default function App() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using EmailJS for client-side email sending
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ lastName: "", firstName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <Helmet>
        <title>Portfolio - Abhishek</title>
        <meta
          name="description"
          content="Web development and design student. Creating intuitive and aesthetic digital experiences."
        />
        <meta property="og:title" content="Abhishek - Portfolio" />
        <meta
          property="og:description"
          content="Web development and design student. Creating intuitive and aesthetic digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abhishek.com" />
        <meta property="og:image" content="/thumbnail.png" />
      </Helmet>

      <div className="relative h-screen">
        <div className="absolute inset-0 w-full h-full -z-10">
          <Suspense
            fallback={
              <div className="absolute inset-0 w-full h-full bg-[#dddddd] dark:bg-[#070707]" />
            }
          >
            <LazyBeams
              beamWidth={3}
              beamHeight={25}
              beamNumber={10}
              speed={2}
              noiseIntensity={2}
              scale={0.2}
              rotation={30}
            />
          </Suspense>
        </div>

        <Navbar />

        <div className="absolute bottom-8 left-8 flex flex-col gap-3">
          <a
            href="https://wa.me/917093398106"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-300"
            aria-label="WhatsApp"
          >
            <img src="/whatsapp-glyph-black-logo-svgrepo-com.svg" alt="WhatsApp" className="w-6 h-6 filter dark:invert" />
          </a>
          <a
            href="https://x.com/whyabhishekh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-300"
            aria-label="X (Twitter)"
          >
            <svg
              className="w-[1.2rem] h-[1.2rem]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/abhishek"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-300"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/abhiindian38"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-300"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="mailto:abhiindian38@gmail.com"
            className="w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white hover:opacity-60 transition-opacity duration-300"
            aria-label="Email"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="envelope"
              className="svg-inline--fa fa-envelope w-5 h-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
              ></path>
            </svg>
          </a>
        </div>

        <div
          className="flex h-full flex-col items-center justify-center p-24"
          role="main"
          aria-label="Main content"
        >
          <div
            className="relative mb-8 w-full max-w-5xl mx-auto flex justify-center items-center perspective-1000"
          >

            <svg
              className="absolute top-3 left-1/2 -translate-x-1/2 -z-10 h-[6rem] w-auto max-w-[95vw] md:hidden"
              viewBox="0 0 600 150"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="strokeGradientMobileLight"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="60%" stopColor="#191919" stopOpacity="0" />
                  <stop offset="100%" stopColor="#191919" stopOpacity="1" />
                </linearGradient>
                <linearGradient
                  id="strokeGradientMobileDark"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
              </defs>
              <style>{`
                .text-name-mobile { stroke: url(#strokeGradientMobileLight); }
                @media (prefers-color-scheme: dark) {
                  .dark .text-name-mobile { stroke: url(#strokeGradientMobileDark); }
                }
                .dark .text-name-mobile { stroke: url(#strokeGradientMobileDark); }
              `}</style>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-name-mobile font-bold"
                fill="transparent"
                strokeWidth="2"
                style={{ fontSize: "94px", fontFamily: "inherit" }}
              >
                Abhishek
              </text>
            </svg>
            <svg
              className="absolute top-7 left-1/2 -translate-x-1/2 -z-10 h-[8rem] hidden md:block lg:hidden"
              viewBox="0 0 800 150"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="strokeGradientTablet"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="60%"
                    stopColor="currentColor"
                    stopOpacity="0"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="1"
                  />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-bold fill-transparent"
                stroke="url(#strokeGradientTablet)"
                strokeWidth="2"
                style={{ fontSize: "112px", fontFamily: "inherit" }}
              >
                Abhishek
              </text>
            </svg>
            <svg
              className="absolute top-12 left-1/2 -translate-x-1/2 -z-10 h-[9rem] hidden lg:block"
              viewBox="0 0 800 150"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="strokeGradientDesktop"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="60%"
                    stopColor="currentColor"
                    stopOpacity="0"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="1"
                  />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-bold fill-transparent"
                stroke="url(#strokeGradientDesktop)"
                strokeWidth="2"
                style={{ fontSize: "133px", fontFamily: "inherit" }}
              >
                Abhishek
              </text>
            </svg>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center relative z-10 whitespace-nowrap">
              Abhishek
            </h1>
          </div>

          <a
            href={`#${t.sections.about}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(`#${t.sections.about}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 group"
            aria-label="Scroll"
          >
            <svg
              className="w-6 h-6 text-gray-900 dark:text-white opacity-60 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>

      <section
        id={t.sections.about}
        className="pt-32 pb-8 bg-gray-50 dark:bg-[#121212]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-16 sm:mb-20">
            <div className="flex items-end gap-6 sm:gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                About
              </h2>
              <div className="h-[2px] w-full bg-gray-900/10 dark:bg-white/10 mb-2"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="relative w-full h-80 sm:w-72 sm:h-[22rem] sm:mx-auto md:mx-0 rounded-[1.5rem] overflow-hidden group">
                <LazyLoadImage
                  src="/myimg.jpg"
                  alt="Abhishek"
                  effect="blur"
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  wrapperClassName="w-full h-full !block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                  <p className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Abhishek
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-8">
                <h3 className="text-4xl sm:text-5xl font-bold text-[#191919] dark:text-white mb-2 leading-tight">
                  Abhishek
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t.about.tags.location}
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    {t.about.tags.webDev}
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    {t.about.tags.webDesign}
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    {t.about.tags.uxUi}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed text-justify">
                  {t.about.description}
                </p>
              </div>

              <div className="mb-8">
                <h5 className="text-2xl sm:text-3xl font-bold mb-6 text-[#191919] dark:text-white">
                  {t.about.education.title}
                </h5>
                <div className="relative space-y-6">
                  <div
                    className="absolute left-[7px] bottom-0 w-[2px] bg-[#191919] dark:bg-white"
                    style={{ height: "calc(100% - 2rem)" }}
                  ></div>
                  <div className="absolute left-[7px] top-0 w-[2px] bg-gray-300 dark:bg-gray-700 h-8"></div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-[3px] border-[#191919] dark:border-white"></div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-lg font-bold text-[#191919] dark:text-white uppercase">
                          {t.about.education.btech.location}
                        </h6>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {t.about.education.btech.degree}
                        </p>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          {t.about.education.btech.cgpa}
                        </p>
                      </div>
                      <span className="text-sm italic text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        {t.about.education.btech.date}
                      </span>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#191919] dark:bg-white"></div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-lg font-bold text-[#191919] dark:text-white uppercase">
                          {t.about.education.inter.location}
                        </h6>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {t.about.education.inter.degree}
                        </p>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          {t.about.education.inter.marks}
                        </p>
                      </div>
                      <span className="text-sm italic text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        {t.about.education.inter.date}
                      </span>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#191919] dark:bg-white"></div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-lg font-bold text-[#191919] dark:text-white uppercase">
                          {t.about.education.school.location}
                        </h6>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                          {t.about.education.school.degree}
                        </p>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          {t.about.education.school.gpa}
                        </p>
                      </div>
                      <span className="text-sm italic text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        {t.about.education.school.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <a
                  href={t.about.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#191919] dark:bg-white text-white dark:text-[#191919] rounded-lg text-base font-semibold hover:opacity-80 transition-opacity duration-300"
                >
                  {t.about.viewCV}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link-icon lucide-external-link"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Skills />

      <Certifications />

      <Experience />

      <Projects />

      <section
        id={t.sections.contact}
        className="pt-32 pb-24 bg-gray-50 dark:bg-[#121212]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-16 sm:mb-20">
            <div className="flex items-end gap-6 sm:gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                {t.contact.title}
              </h2>
              <div className="h-[3px] w-full bg-gray-900/30 dark:bg-white/30 mb-2"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <LazyLoadImage
                      src="/myimg.jpg"
                      alt="Abhishek"
                      effect="blur"
                      className="w-full h-full object-cover object-top"
                      wrapperClassName="w-full h-full !block"
                    />
                  </div>
                  <div>
                    <h3 className="text-[2rem] font-bold text-[#191919] dark:text-white mb-1 translate-y-[-5px]">
                      Abhishek
                    </h3>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 border border-green-600 dark:border-green-500 rounded-full text-sm font-medium text-green-700 dark:text-green-400 leading-none translate-y-[-5px]">
                      <span className="relative inline-flex">
                        <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></span>
                        <span className="absolute top-0 left-0 w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full animate-ping-visible"></span>
                      </span>
                      <span className="translate-y-[-1px]">{t.contact.infos.available}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="text-lg font-semibold text-[#191919] dark:text-white mb-4">
                  {t.contact.infos.usefulLinks}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://linkedin.com/in/abhishek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="translate-y-[-1px]">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/abhiindian38"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#191919] dark:bg-white text-white dark:text-[#191919] rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="translate-y-[-1px]">GitHub</span>
                  </a>
                  <a
                    href="https://wa.me/917093398106"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <img src="/whatsapp-icon-logo-svgrepo-com.svg" alt="WhatsApp" className="w-4 h-4" />
                    <span className="translate-y-[-1px]">WhatsApp</span>
                  </a>
                  <a
                    href="https://x.com/whyabhishekh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.814L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="translate-y-[-1px]">X</span>
                  </a>
                </div>
              </div>

              <a
                href="mailto:abhiindian38@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-[#222222] text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                </svg>
                <span className="translate-y-[-1px]">abhiindian38@gmail.com</span>
              </a>

              <a
                href="tel:+917093398106"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-[#222222] text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-[#2a2a2a] transition-colors mt-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.82 3.76 5.14 6.58 6.58l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="translate-y-[-1px]">+91 70933 98106</span>
              </a>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-[2rem] font-semibold text-[#191919] dark:text-white mb-4">
                {t.contact.form.title}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t.contact.form.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#191919] dark:focus:ring-white transition-shadow"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t.contact.form.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#191919] dark:focus:ring-white transition-shadow"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.form.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#191919] dark:focus:ring-white transition-shadow"
                />
                <textarea
                  name="message"
                  placeholder={t.contact.form.message}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#191919] dark:focus:ring-white transition-shadow resize-none"
                ></textarea>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#191919] dark:bg-white text-white dark:text-[#191919] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="translate-y-[-1px]">
                      {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                    </span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      {t.contact.form.success}
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {t.contact.form.error}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
