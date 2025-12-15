import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ParallaxSection from "./components/sections/ParallaxSection";
import HeroSection from "./components/sections/HeroSection";
import Portfolio from "./components/sections/Portfolio";
import AerialStories from "./components/sections/AerialStories";
// import VideoEditingProcess from "./components/sections/VideoEditingProcess";
// import Masterpieces from "./components/sections/Masterpieces";
import Contact from "./components/sections/Contact";
import AboutMe from "./components/sections/AboutMe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <HeroSection />
                <Portfolio />
                <AerialStories />
                {/* <VideoEditingProcess /> */}
                <ParallaxSection />
                {/* <Masterpieces /> */}
                <Contact />
                <AboutMe />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
