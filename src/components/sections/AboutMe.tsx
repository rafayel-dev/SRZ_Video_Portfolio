import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AboutMeImg from "../../assets/AboutMeImg.jpg";

const AboutMe: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about-me"
      ref={ref}
      className="px-4 py-20 text-white bg-black"
    >
      <div className="container flex flex-col items-center mx-auto md:flex-row">
        
        {/* Image */}
        <motion.div
          className="mb-8 md:w-1/3 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <img
            src={AboutMeImg}
            alt="Portrait"
            className="object-cover max-w-sm mx-auto rounded-lg shadow-lg h-110"
          />
        </motion.div>

        {/* Text */}
        <div className="text-center md:w-2/3 md:pl-10 md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 text-4xl font-semibold text-yellow-500"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg leading-relaxed md:mx-0"
          >
            I’m Sheikh Riaz — a cinematographer, filmmaker, and storyteller.
            I believe every frame has a voice, and every journey carries a story.
            From travel films to weddings to commercial projects, I focus on
            real emotion, natural light, and honest storytelling. My goal is
            simple: to capture moments in a way that feels alive, cinematic, and
            unforgettable.

            <br /><br />
            <strong>Gear I Use:</strong><br />
            Camera — Sony FX3<br />
            Lens — Sigma 50 1.4 DG DN Art, Tamron 20-40 f2.8 iii<br />
            Gimble — DJI Ronin RS4<br />
            Light Setup
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
