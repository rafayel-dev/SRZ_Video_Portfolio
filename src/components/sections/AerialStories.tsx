import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const videoSrc = "/assets/Drone.mp4";

const AerialStories: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref} 
      className="relative flex items-center justify-center min-h-[60vh] md:min-h-[80vh] overflow-hidden text-white bg-black py-20"
    >
      {/* Background Video */}
      <video
        src={`${videoSrc}#t=0.1`}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      
      {/* Dark Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-10 opacity-90" />

      {/* Centered Content */}
      <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl flex flex-col items-center justify-center">
        
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-yellow-500 uppercase tracking-wider mb-6 md:mb-8 drop-shadow-2xl"
        >
          Drone
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-4xl font-light text-gray-100 leading-relaxed md:leading-snug drop-shadow-lg"
        >
          Every flight tells a story. With our drones, we explore angles that the human eye can’t see — transforming ordinary moments into extraordinary visuals.
        </motion.h2>

      </div>
    </section>
  );
};

export default AerialStories;
