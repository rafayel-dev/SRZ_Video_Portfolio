import React, { useState, useEffect } from "react";
import video1 from "../../assets/Videos/DSC00549-scaled.webp";
import video2 from "../../assets/Videos/DSC02340-scaled.webp";
import video3 from "../../assets/Videos/DSC06373-scaled.webp";

const heroSlidesData = [
  {
    videoSrc: video1,
    videoText: "Video",
    productionText: "Production",
    duration: 2,
  },
  {
    videoSrc: video2,
    videoText: "Works",
    productionText: "Creative",
    duration: 2,
  },
  {
    videoSrc: video3,
    videoText: "Visual",
    productionText: "Stories",
    duration: 2,
  },
];

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % heroSlidesData.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(progressInterval);
  }, [currentVideoIndex]);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden text-white"
    >
      {/* TEXT LEFT TOP */}
      <h2 className="absolute top-[18%] left-[10%] text-[150px] font-bold leading-none z-20">
        {heroSlidesData[currentVideoIndex].videoText}
      </h2>

      {/* CENTER IMAGE */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={heroSlidesData[currentVideoIndex].videoSrc}
          alt=""
          className="object-cover w-full pt-0 mt-0 h-full"
        />
      </div>

      {/* TEXT LEFT BOTTOM */}
      <h2 className="absolute bottom-[20%] left-[15%] text-[140px] font-bold leading-none z-20">
        {heroSlidesData[currentVideoIndex].productionText}
      </h2>

      {/* PAGINATION */}
      <div className="absolute bottom-[4%] left-[8%] flex items-center space-x-3 z-20 text-xl">
        <span>0{currentVideoIndex + 1}</span>

        <div className="w-[180px] h-0.5 bg-gray-500 overflow-hidden">
          <div
            className="h-full transition-all duration-75 bg-white"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>0{heroSlidesData.length}</span>
      </div>
    </section>
  );
};

export default HeroSection;
