import React, { useEffect, useState } from "react";
import { BASE_URL, useGetHeroSectionQuery } from "../../store/api/appApi";
import { motion, AnimatePresence } from "framer-motion";

const EXPERTISES = [
  "Fashion",
  "Automotive",
  "Corporate",
  "Music Videos",
  "Documentaries",
  "Bridal",
  "Promotional",
];

const HeroSection: React.FC = () => {
  const { data, isLoading } = useGetHeroSectionQuery();
  const [currentExpertise, setCurrentExpertise] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpertise((prev) => (prev + 1) % EXPERTISES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center text-white bg-black">
        <div className="animate-pulse text-xl tracking-widest text-yellow-500">
          Loading...
        </div>
      </section>
    );
  }

  // Get the single background video or fallback
  const videoUrl = data?.data?.videoUrl
    ? `${BASE_URL}${data.data.videoUrl}#t=0.1`
    : "/assets/hero.mp4#t=0.1";

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden text-white bg-black"
    >
      {/* BACKGROUND VIDEO */}
      <video
        src={videoUrl}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full z-0 opacity-80 transform-gpu"
      />

      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-black/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full mt-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-yellow-500 uppercase tracking-[0.3em] md:tracking-[0.5em] font-semibold text-sm md:text-base mb-6"
        >
          Cinematographer & Director
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none mb-2"
        >
          We Create
        </motion.h1>

        <div className="h-[60px] sm:h-[80px] md:h-[120px] relative w-full flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentExpertise}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 text-center w-full"
            >
              {EXPERTISES[currentExpertise]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed mb-10"
        >
          Transforming visions into cinematic masterpieces. Specializing in
          high-end visuals for brands, artists, and life's greatest moments.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          onClick={() => (location.href = "#contact")}
          className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 rounded-sm backdrop-blur-sm"
        >
          Book a Shoot
        </motion.button>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gray-600 overflow-hidden">
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-full h-1/2 bg-yellow-500"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
