"use client";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
function WaveTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/track_upload/audio_Track/1.mp3`,
    });
  }, []);
  return <div ref={containerRef}>wave track</div>;
}

export default WaveTrack;
