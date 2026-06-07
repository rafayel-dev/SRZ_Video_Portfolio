"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
const PLAYLIST_IDS = [
  "https://www.youtube.com/playlist?list=PL8tjuJ1RdjKdQZyl_zt3pI6sP1EeWW34A",
];

// Playlist
const extractPlaylistId = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("list") || url;
  } catch {
    return url;
  }
};

const getYouTubeEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

const Portfolio: React.FC = () => {
  const [videos, setVideos] = useState<
    { id: string; title: string; thumbnail: string }[]
  >([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [centerMode, setCenterMode] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
        setCenterMode(false);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
        setCenterMode(false);
      } else {
        setSlidesToShow(3);
        setCenterMode(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        setLoading(true);

        const allVideos: any[] = [];
        for (const list of PLAYLIST_IDS) {
          const playlistId = extractPlaylistId(list);

          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
          );

          const data = await res.json();

          if (!data.items) {
            console.error("YouTube API Error:", data);
            continue;
          }

          const playlistVideos = data.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail:
              item.snippet.thumbnails.high?.url ||
              item.snippet.thumbnails.default?.url,
          }));

          allVideos.push(...playlistVideos);
        }

        setVideos(allVideos);
      } catch (err) {
        console.error("Playlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaylists();
  }, []);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    swipeToSlide: true,
    draggable: true,
    centerMode: centerMode,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black py-12 px-4"
      id="portfolio"
    >
      <div className="text-center">
        <p className="text-2xl text-yellow-500 tracking-widest mb-4">
          Our Portfolio
        </p>
        <h2 className="text-5xl font-bold text-white">Creative Works</h2>
      </div>

      <div className="py-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading videos...</p>
        ) : (
          <Slider {...settings}>
            {videos.map((video, idx) => (
              <div key={idx} className="md:p-3">
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => !isDragging && setSelectedVideo(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    className="w-full h-52 md:h-80 object-cover rounded-lg group-hover:scale-102 duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center duration-300">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}

        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo)}
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Portfolio;
