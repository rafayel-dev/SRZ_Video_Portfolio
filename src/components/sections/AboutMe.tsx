import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AboutMeImg from "../../assets/AboutMeImg.jpg";
import { useGetAboutQuery } from "../../store/api/appApi";

const AboutMe: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { data, error, isLoading } = useGetAboutQuery();

  // If there's an image from the API, use it, otherwise fallback to local asset
  const imageUrl = data?.data?.imageUrl
    ? `http://10.10.20.43:8000${data.data.imageUrl}`
    : AboutMeImg;
  const content = data?.data?.content;

  return (
    <section id="about-me" ref={ref} className="px-4 py-20 text-white bg-black">
      <div className="container flex flex-col items-center mx-auto md:flex-row">
        {/* Image */}
        <motion.div
          className="mb-8 md:w-1/3 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {isLoading ? (
            <div className="w-full h-110 bg-gray-700 rounded-lg animate-pulse max-w-sm mx-auto" />
          ) : error ? (
            <div className="w-full h-110 bg-red-700 text-white flex items-center justify-center rounded-lg max-w-sm mx-auto">
              Error loading image.
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Portrait"
              className="object-cover max-w-sm mx-auto rounded-lg shadow-lg h-110"
            />
          )}
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

          {isLoading ? (
            <div className="max-w-3xl mx-auto md:mx-0">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-full mb-4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-2/3 animate-pulse" />
            </div>
          ) : error ? (
            <p className="max-w-3xl mx-auto text-lg leading-relaxed md:mx-0 text-red-500">
              Error loading content.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto text-lg leading-relaxed md:mx-0"
              dangerouslySetInnerHTML={{ __html: content || "" }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
