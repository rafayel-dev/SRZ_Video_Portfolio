import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const PLAYLIST_IDS = [
  "https://www.youtube.com/playlist?list=PL8tjuJ1RdjKcOsdaO3TBxluYyCeHllMar",
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    slidesToShow: 3,
    swipeToSlide: true,
    draggable: true,
    centerMode: true,
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
      className="bg-black py-22 px-6"
      id="portfolio"
    >
      <div className="text-center">
        <p className="text-sm text-yellow-500 tracking-widest mb-4">
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
              <div key={idx} className="p-3">
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => !isDragging && setSelectedVideo(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    className="w-full h-80 object-cover rounded-lg group-hover:scale-105 duration-500"
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
