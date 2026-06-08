import React from "react";
const videoSrc = "/assets/crossroads.mp4";
const rightImg = "/assets/rightImg.jpg";

const AerialStories: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden text-white bg-black ">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto px-4 md:px-0">
        {/* Left Video */}
        <div className="hidden md:block mt-0 overflow-hidden w-full h-auto md:h-165 md:w-155">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={rightImg}
            className="object-cover w-full h-full mt-0"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start ">
          {/* Text block overlapping the image */}
          <div className="mb-8 space-y-4 ">
            <p className="text-5xl md:text-7xl font-bold text-yellow-500 uppercase">
              Drone
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold ">
              Every flight's tells a story. With our drones, we explore angles that the human eye can’t see — transforming ordinary moments into extraordinary visuals.
            </h2>
            {/* <p className="leading-relaxed text-white ">
              Every flight's tells a story. With our drones, we explore angles that the human eye can’t see — transforming ordinary moments into extraordinary visuals.
            </p> */}
          </div>

          {/* Background image */}
          <img
            src={rightImg}
            alt="Aerial shot"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AerialStories;
