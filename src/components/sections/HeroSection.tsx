import React, { useState, useEffect } from "react";
import video1 from "../../assets/Videos/heroVideo1.mp4";
import video2 from "../../assets/Videos/heroVideo2.mp4";
import video3 from "../../assets/Videos/heroVideo3.mp4";

const heroSlidesData = [
  {
    videoUrl: video1,
    topTitle: "Video",
    bottomTitle: "Production",
    duration: 10,
  },
  {
    videoUrl: video2,
    topTitle: "Works",
    bottomTitle: "Creative",
    duration: 10,
  },
  {
    videoUrl: video3,
    topTitle: "Visual",
    bottomTitle: "Stories",
    duration: 10,
  },
];

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto slide change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroSlidesData.length);
    }, heroSlidesData[currentVideoIndex].duration * 1000);

    return () => clearTimeout(timeout);
  }, [currentVideoIndex]);

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
      <h2 className="absolute top-[15%] left-[15%] text-[150px] font-bold leading-none z-20">
        {heroSlidesData[currentVideoIndex].topTitle}
      </h2>

      {/* Book Now Button */}
      {/* <button>Book Now</button> */}

      {/* CENTER VIDEO */}
      <div className="w-full h-full overflow-hidden">
        <video
          key={currentVideoIndex}
          src={heroSlidesData[currentVideoIndex].videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        />
      </div>

      {/* TEXT LEFT BOTTOM */}
      <h2 className="absolute bottom-[15%] left-[50%] text-[140px] font-bold leading-none z-20">
        {heroSlidesData[currentVideoIndex].bottomTitle}
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
