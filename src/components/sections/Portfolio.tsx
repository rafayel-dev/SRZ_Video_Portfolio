"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;

// Define your 5 playlists here
const SECTIONS = [
  {
    title: "Popular Vlogs",
    subtitle: "Here are some of our featured works!",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL8tjuJ1RdjKdQZyl_zt3pI6sP1EeWW34A",
  },
  {
    title: "Automotive",
    subtitle: "High-octane automotive videography.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog2M14g8a73jtE_elgGIUnIR",
  },
  {
    title: "Promotional Content",
    subtitle: "Engaging promos tailored for your brand.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog0cIBitFBjA4lSJzMkdlwCu",
  },

  {
    title: "Bridal & Makeover",
    subtitle: "Capturing the magic of weddings and makeovers.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog1ZjJtn_gWVuibHji4k_M7Q",
  },
  {
    title: "Restaurant",
    subtitle: "Delectable culinary stories and dining experiences.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog3g2hOkg0aTnmAGIWQhh-zZ",
  },
  {
    title: "Fashion",
    subtitle: "Trendy fashion shows and apparel showcases.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog1r7QUAPOjT648lBgrW-HdA",
  },
  {
    title: "OVC",
    subtitle: "High-quality Online Video Commercials.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog0WYrKaJ48hpnTKwlNI2dGR",
  },
  {
    title: "Documentary",
    subtitle: "In-depth storytelling and cinematic documentaries.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog0L7tn4TxET_FtBhg7Ue4et",
  },
  {
    title: "Saloon & Lifestyle",
    subtitle: "Premium styling and lifestyle aesthetics.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog3hV6hNp-Q6C218yh8LCC3H",
  },
  {
    title: "Business",
    subtitle: "Professional business promotional videos.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog39cscAqRH8ETGI8ScQucsU",
  },
  {
    title: "Corporate",
    subtitle: "Corporate events and documentaries.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog3Jtq7qW_tcOITr493ts2fQ",
  },
  {
    title: "Architecture",
    subtitle: "Stunning real estate and architecture shots.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLANz-i1Jvog3rwVBYyiMp8HvaK3_rejSP",
  },
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
  const [sectionVideos, setSectionVideos] = useState<{
    [key: number]: { id: string; title: string; thumbnail: string }[];
  }>({});
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const [slidesToShow, setSlidesToShow] = useState(4);
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
      } else if (window.innerWidth < 1200) {
        setSlidesToShow(3);
        setCenterMode(false);
      } else {
        setSlidesToShow(4);
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

        const fetchPromises = SECTIONS.map(async (section, index) => {
          const playlistId = extractPlaylistId(section.playlistUrl);
          if (!playlistId) return { index, videos: [] };

          try {
            const res = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`,
            );
            const data = await res.json();
            if (!data.items) {
              console.error(
                `YouTube API Error for section ${section.title}:`,
                data,
              );
              return { index, videos: [] };
            }

            const playlistVideos = data.items.map((item: any) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail:
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.default?.url,
            }));
            return { index, videos: playlistVideos };
          } catch (err) {
            console.error(
              `Error fetching playlist for section ${section.title}`,
              err,
            );
            return { index, videos: [] };
          }
        });

        const results = await Promise.all(fetchPromises);
        const newSectionVideos: Record<number, any[]> = {};
        results.forEach((result) => {
          newSectionVideos[result.index] = result.videos;
        });

        setSectionVideos(newSectionVideos);
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
      className="bg-black py-10 px-4"
      id="portfolio"
    >
      <div className="text-center">
        <p className="text-4xl text-yellow-500 tracking-widest font-bold mb-4">
          Our Portfolio
        </p>
      </div>
      {/* Sections */}
      {SECTIONS.map((section, index) => (
        <div key={index} className="">
          <div className="px-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {section.title}
            </h2>
            <p className="text-sm md:text-base text-yellow-500 tracking-widest mt-2">
              {section.subtitle}
            </p>
          </div>

          <div className="pb-4">
            {loading ? (
              <p className="text-center text-gray-400">Loading videos...</p>
            ) : (
              <Slider {...settings}>
                {(sectionVideos[index] || []).map((video, idx) => (
                  <div key={idx} className="md:p-3">
                    <div
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => !isDragging && setSelectedVideo(video.id)}
                    >
                      <img
                        src={video.thumbnail}
                        className="w-full h-52 md:h-80 object-cover rounded-lg group-hover:scale-102 duration-500"
                        alt={video.title}
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center duration-300">
                        <FaPlay className="text-white text-4xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      ))}

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
    </motion.section>
  );
};

export default Portfolio;
