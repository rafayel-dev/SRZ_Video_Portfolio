import React, { useRef } from "react";
import {
  FaFilm,
  FaWaveSquare,
  FaVolumeUp,
  FaMagic,
  FaRegFileAlt,
  FaPlay,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const VideoEditingProcess: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const processes = [
    {
      icon: <FaFilm className="text-5xl text-gray-300" />,
      title: "High-Quality Equipment",
    },
    {
      icon: <FaWaveSquare className="text-5xl text-gray-300" />,
      title: "Rough Cut Editing",
    },
    {
      icon: <FaVolumeUp className="text-5xl text-gray-300" />,
      title: "Sound Production",
    },
    {
      icon: <FaMagic className="text-5xl text-gray-300" />,
      title: "Fine Cut Editing",
    },
    {
      icon: <FaRegFileAlt className="text-5xl text-gray-300" />,
      title: "Review & Assembling",
    },
    {
      icon: <FaPlay className="text-5xl text-gray-300" />,
      title: "Viewers’ Test Premiere",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black py-28 px-6 md:px-20"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className=""
        >
          <p className="text-sm uppercase tracking-widest text-white mb-3">
            Learn More
          </p>
          <h2 className="text-5xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Video Editing <br /> Process
          </h2>
          <p className="text-white leading-relaxed text-base max-w-sm">
            Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia.
          </p>
        </motion.div>

        {/* Right side */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-x-22 gap-y-22">
          {processes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1 + 0.4,
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-[15px] font-semibold text-white leading-snug">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default VideoEditingProcess;
