import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxVideoSlide from "./ParallaxVideoSlide";
import { useGetCategoryMediaQuery, BASE_URL } from "../../store/api/appApi";

const ParallaxContent = ({ slideData }: { slideData: any[] }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen relative"
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
            className="sticky top-0 w-full min-h-screen"
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

const ParallaxSection = () => {
  const { data: categoryMedia } = useGetCategoryMediaQuery();

  const slideData = useMemo(() => {
    if (categoryMedia?.success) {
      return categoryMedia.data.map((item) => ({
        videoSrc: `${BASE_URL}/${item.video.replace(/\\/g, "/")}`,
        subtitle: item.topTitle,
        title: item.title,
        description: item.description,
      }));
    }
    return [];
  }, [categoryMedia]);

  if (!slideData.length) {
    return null; // Or a loading indicator
  }

  return <ParallaxContent slideData={slideData} />;
};

export default ParallaxSection;
