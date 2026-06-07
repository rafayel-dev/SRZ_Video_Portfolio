import React, { useEffect, useState } from "react";
import { BASE_URL, useGetHeroSectionQuery } from "../../store/api/appApi";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const { data, isLoading, isError } = useGetHeroSectionQuery();

  const slides = data?.data?.items || [];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ================= AUTO SLIDE CHANGE ================= */
  useEffect(() => {
    if (!slides.length) return;

    const timeout = setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % slides.length);
    }, slides[currentVideoIndex].duration * 1000);

    return () => clearTimeout(timeout);
  }, [currentVideoIndex, slides]);

  /* ================= PROGRESS BAR ================= */
  useEffect(() => {
    if (!slides.length) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, (slides[currentVideoIndex].duration * 1000) / 100);

    return () => clearInterval(interval);
  }, [currentVideoIndex, slides]);

  /* ================= STATES ================= */
  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  if (isError || !slides.length) {
    return (
      <section className="h-screen flex items-center justify-center text-white">
        Failed to load hero section
      </section>
    );
  }

  const currentSlide = slides[currentVideoIndex];

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden text-white"
    >
      {/* TOP TITLE */}
      <motion.h2
        key={`top-title-${currentVideoIndex}`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] md:left-[12%] text-5xl md:text-[120px] font-bold z-20"
      >
        {currentSlide.topTitle}
      </motion.h2>

      {/* BookNow Button */}
      <motion.button
        key={`book-now-${currentVideoIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
        onClick={() => (location.href = "#contact")}
        className="absolute top-[32%] right-[10%] md:right-[20%] w-20 h-20 md:w-28 md:h-28 bg-none border-2 border-yellow-400 text-yellow-400 text-sm md:text-base px-2 md:px-6 py-2 md:py-3 rounded-full font-bold z-20 cursor-pointer hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center text-center leading-tight"
      >
        Book Now
      </motion.button>

      {/* VIDEO */}
      <motion.div
        initial={{ filter: "blur(4px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#0b0b0b]"
      >
        <motion.video
          key={`vid-${currentSlide._id}`}
          src={`${BASE_URL}${currentSlide.videoUrl}`}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/heroBg.jpg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* BOTTOM TITLE */}
      <motion.h2
        key={`bottom-title-${currentVideoIndex}`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute justify-items-end bottom-[10%] right-[5%] md:right-[10%] text-5xl md:text-[120px] font-bold z-20"
      >
        {currentSlide.bottomTitle}
      </motion.h2>

      {/* PAGINATION */}
      <div className="absolute bottom-[8%] md:bottom-[4%] left-[5%] md:left-[8%] flex items-center space-x-3 z-20 text-xl">
        <span
          onClick={() =>
            setCurrentVideoIndex(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="cursor-pointer"
        >
          0{currentVideoIndex + 1}
        </span>

        <div className="w-[180px] h-0.5 bg-gray-500 overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span
          onClick={() =>
            setCurrentVideoIndex((prev) => (prev + 1) % slides.length)
          }
          className="cursor-pointer"
        >
          0{slides.length}
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
