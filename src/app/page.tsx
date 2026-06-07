"use client";

import ParallaxSection from "../components/sections/ParallaxSection";
import HeroSection from "../components/sections/HeroSection";
import Portfolio from "../components/sections/Portfolio";
import AerialStories from "../components/sections/AerialStories";
import Contact from "../components/sections/Contact";
import AboutMe from "../components/sections/AboutMe";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Portfolio />
      <AerialStories />
      <ParallaxSection />
      <Contact />
      <AboutMe />
    </>
  );
}
