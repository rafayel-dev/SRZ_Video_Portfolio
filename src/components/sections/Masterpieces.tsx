import React, { useRef } from "react";
const card1 = "/assets/card1.jpg";
const card2 = "/assets/card2.jpg";
const card3 = "/assets/card3.jpg";
const bgMask = "/assets/h2-mask.png";
import { motion, useInView } from "framer-motion";

const Masterpieces: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-black text-white py-20 text-center overflow-hidden z-10"
    >
      {/* Background image */}
      <div
        className=" bg-cover bg-center opacity-40 absolute inset-0 w-full h-full  -z-10"
        style={{ backgroundImage: `url(${bgMask})` }}
      ></div>
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.0, ease: "easeOut", delay: 0.2 }}
          className="text-xl font-semibold tracking-widest uppercase text-yellow-500"
        >
          CREATIVE VISION
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-3xl font-semibold mt-6 mb-14 text-white"
        >
          Editing isn’t just about cutting scenes it’s about crafting emotions. From the first draft to the final grade, <br /> we focus on rhythm, mood, and story flow to bring every project to life.
        </motion.h2>
        <div className="flex justify-between gap-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className=""
          >
            <img
              src={card3}
              alt="Professional Editing"
              className="w-full h-auto hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-2xl font-semibold mt-5">Professional Editing</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            className=""
          >
            <img
              src={card2}
              alt="Professional Editing"
              className="w-full h-auto hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-2xl font-semibold mt-5">
              Colour Grading
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            className=""
          >
            <img
              src={card1}
              alt="Formats & Effects"
              className="w-full h-auto hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-2xl font-semibold mt-5">Fx & Effects</h3>
          </motion.div>
        </div>
        {/* <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          className="bg-yellow-500 text-black font-bold py-4 px-8 rounded-md hover:bg-yellow-400 transition-colors"
        >
          Learn More
        </motion.button> */}
      </div>
    </motion.section>
  );
};

export default Masterpieces;
