"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";

export default function ProductPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section id="platform" className="relative bg-slate-50/70 py-24 md:py-32 overflow-hidden bg-mesh">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute left-1/4 -top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 -bottom-20 h-80 w-80 rounded-full bg-violet-100/30 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="PLATFORM PREVIEW"
          heading="See Vivgram in Action"
          subtext="Watch how Vivgram streamlines your entire research facility operations from a single dashboard."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-2xl"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto rounded-md bg-slate-700 px-4 py-1 text-xs text-slate-400">
              app.vivgram.com/dashboard
            </div>
          </div>

          {/* Video container */}
          <div className="relative aspect-video bg-slate-900">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              controls={isPlaying}
              playsInline
              preload="metadata"
              poster="/video-poster.jpg"
              aria-label="Vivgram platform demo walkthrough"
            >
              {/* Replace this src with your actual video URL */}
              <source src="/demo-video.mp4" type="video/mp4" />
              <track kind="captions" src="/demo-captions.vtt" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>

            {/* Play overlay — shown until user clicks play */}
            {!isPlaying && (
              <button
                onClick={handlePlay}
                aria-label="Play demo video"
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#082B63]/90 via-[#0D4297]/85 to-[#082B63]/90 transition-opacity duration-300 hover:opacity-95"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                    <Play className="h-6 w-6 text-primary-700 ml-0.5" />
                  </div>
                </motion.div>
                <span className="text-sm font-medium text-white/80">
                  Watch Platform Demo
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
