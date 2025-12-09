import React, { useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import contactBg from "../../assets/contactBg.jpg";
import { motion, useInView } from "framer-motion";

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="contact"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-end p-12"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* Contact Form Container */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 bg-black/70 backdrop-blur-sm p-10 max-w-2xl w-full mr-20"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-red-400 text-sm font-semibold uppercase mb-2 tracking-wide"
        >
          Contact Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-4xl font-bold text-white mb-8 leading-tight"
        >
          Have questions? <br /> Get in touch!
        </motion.h2>

        <form className="grid grid-cols-2 gap-6">
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            type="text"
            placeholder="First Name"
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            type="text"
            placeholder="Last Name"
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            type="email"
            placeholder="Email"
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            type="tel"
            placeholder="Phone"
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
            placeholder="Message"
            className="col-span-2 bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
            rows={4}
          ></motion.textarea>

          {/* Centered Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-10 flex items-center gap-2 transition-all duration-300"
            >
              <FaPaperPlane className="w-5 h-5" />
              Get In Touch
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
