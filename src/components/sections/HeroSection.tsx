import React, { useEffect, useState } from "react";
import { BASE_URL, useGetHeroSectionQuery } from "../../store/api/appApi";

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
      <h2 className="absolute top-[15%] left-[12%] text-[120px] font-bold z-20">
        {currentSlide.topTitle}
      </h2>

      {/* BookNow Button */}
      <button onClick={() => (location.href = '#contact')} className="absolute top-[32%] right-[20%] w-28 h-28 bg-none border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-bold z-20 cursor-pointer hover:bg-yellow-400 hover:text-black transition-all duration-300">
        Book Now
      </button>

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
      <h2 className="absolute justify-items-end bottom-[10%] right-[10%] text-[120px] font-bold z-20">
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
