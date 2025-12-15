import React, { useEffect, useState } from "react";
import { useGetHeroSectionQuery } from "../../store/api/appApi";

const BASE_URL = "http://10.10.20.43:8000";

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
      <h2 className="absolute top-[15%] left-[15%] text-[150px] font-bold z-20">
        {currentSlide.topTitle}
      </h2>

      {/* VIDEO */}
      <div className="w-full h-full overflow-hidden">
        <video
          key={currentSlide._id}
          src={`${BASE_URL}${currentSlide.videoUrl}`}
          autoPlay
          muted
          playsInline
          className="object-cover w-full h-full"
        />
      </div>

      {/* BOTTOM TITLE */}
      <h2 className="absolute bottom-[15%] left-[50%] text-[140px] font-bold z-20">
        {currentSlide.bottomTitle}
      </h2>

      {/* PAGINATION */}
      <div className="absolute bottom-[4%] left-[8%] flex items-center space-x-3 z-20 text-xl">
        <span>0{currentVideoIndex + 1}</span>

        <div className="w-[180px] h-0.5 bg-gray-500 overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span>0{slides.length}</span>
      </div>
    </section>
  );
};

export default HeroSection;
