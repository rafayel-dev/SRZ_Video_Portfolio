import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxVideoSlide from "./ParallaxVideoSlide";

import Fashion from "../../assets/portfolioCategory/pexels3.mp4";
import Commercial from "../../assets/portfolioCategory/pexels4.mp4";
import Wedding from "../../assets/portfolioCategory/pexels5.mp4";
import Architecture from "../../assets/portfolioCategory/pexels5.mp4";
import Industrial from "../../assets/portfolioCategory/pexels5.mp4";
import Automotive from "../../assets/portfolioCategory/pexels5.mp4";
import MusicVideo from "../../assets/portfolioCategory/pexels5.mp4";
import OVC from "../../assets/portfolioCategory/pexels5.mp4";
import Corporate from "../../assets/portfolioCategory/pexels5.mp4";

const slideData = [
  {
    videoSrc: Fashion,
    subtitle: "Brand Identity",
    title: "Fashion",
    description:
      "From runway to real life, we create fashion films that celebrate beauty, movement, and emotion in every frame.",
  },
  {
    videoSrc: Commercial,
    subtitle: "Film Production",
    title: "Commercial",
    description:
      "A great commercial is more than visuals — it’s emotion, rhythm, and storytelling. We bring brands to life through cinematic ads that inspire and engage.",
  },
  {
    videoSrc: Wedding,
    subtitle: "Post Production",
    title: "Wedding",
    description:
      "Your wedding is more than a day — it’s a story of love, laughter, and memories. We turn those moments into a beautiful cinematic journey.",
  },
  {
    videoSrc: Architecture,
    subtitle: "Post Production",
    title: "Architecture",
    description:
      "Every structure has a story. From modern lines to classic curves, we frame architecture as living art through cinematic visuals.",
  },
  {
    videoSrc: Industrial,
    subtitle: "Post Production",
    title: "Industrial",
    description:
      "Showcasing industrial operations with precision and clarity, highlighting machinery, workflow, and production processes in cinematic detail.",
  },
  {
    videoSrc: Automotive,
    subtitle: "Post Production",
    title: "Music Video",
    description:
      "Capturing the thrill of motion and design—cinematic visuals of cars, bikes, and automotive events with dynamic angles and sleek composition.",
  },
  {
    videoSrc: MusicVideo,
    subtitle: "Post Production",
    title: "Automotive",
    description:
      "Transforming music into visual art, blending mood, lighting, and cinematic techniques to create unforgettable videos.",
  },
  {
    videoSrc: OVC,
    subtitle: "Post Production",
    title: "OVC",
    description:
      "Creating impactful video content for online platforms, blending aesthetics, motion, and narrative for maximum engagement.",
  },
  {
    videoSrc: Corporate,
    subtitle: "Post Production",
    title: "Corporate",
    description:
      "Telling your company’s story through engaging cinematography, highlighting people, processes, and corporate culture.",
  },
];

const ParallaxSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${slideData.length * 100}vh` }}
    >
      {slideData.map((slide, index) => {
        const start = index / slideData.length;
        const end = (index + 1) / slideData.length;

        const slideY = useTransform(
          scrollYProgress,
          [start, end],
          ["0%", "0%"]
        );

        return (
          <motion.div
            key={index}
            style={{ y: slideY }}
            className="sticky top-0 w-full h-screen"
          >
            <ParallaxVideoSlide
              slideIndex={index}
              scrollYProgress={scrollYProgress}
              {...slide}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParallaxSection;
