import React, { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface ParallaxVideoSlideProps {
  videoSrc: string;
  title: string;
  subtitle: string;
  description: string;
  scrollYProgress: any;
  slideIndex: number;
}

const ParallaxVideoSlide: React.FC<ParallaxVideoSlideProps> = ({
  videoSrc,
  title,
  subtitle,
  description,
  scrollYProgress,
}) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // parallax background motion
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // parallax text motion
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="relative flex items-center min-h-screen px-6 md:px-20 overflow-hidden text-white">
      {/* Background Video */}
      {isMobile ? (
        <motion.img
          style={{ y: videoY }}
          className="absolute inset-0 object-cover w-full min-h-screen"
          src="/assets/heroBg.jpg"
          alt="Parallax Background"
        />
      ) : (
        <motion.video
          style={{ y: videoY }}
          className="absolute inset-0 object-cover w-full min-h-screen"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/heroBg.jpg"
        />
      )}

      {/* Text section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10 mx-auto max-w-7xl mt-10 md:mt-0">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-2 text-sm tracking-widest text-gray-300 uppercase">
            {subtitle}
          </p>
          <h2 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">{title}</h2>
          <p className="text-lg text-gray-200">{description}</p>
        </motion.div>

        {/* Button */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <button
            className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 text-sm md:text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white hover:text-black"
            onClick={() => (location.href = '#contact')}
          >
            Contact Now
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxVideoSlide;
