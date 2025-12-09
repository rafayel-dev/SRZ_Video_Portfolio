import React from "react";
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
  // parallax background motion
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // parallax text motion
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="relative flex items-center min-h-screen px-20 overflow-hidden text-white">

      {/* Background Video */}
      <motion.video
        style={{ y: videoY }}
        className="absolute inset-0 object-cover w-full h-full"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Text section */}
      <div className="relative z-10 flex flex-row items-center justify-between w-full gap-10 mx-auto max-w-7xl">
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
          <h2 className="mb-6 text-6xl font-bold leading-tight">{title}</h2>
          <p className="text-lg text-gray-200">{description}</p>
        </motion.div>

        {/* Button */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <button className="flex items-center justify-center w-40 h-40 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white hover:text-black">
            Enter Now
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxVideoSlide;
