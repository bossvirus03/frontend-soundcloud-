"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
function WaveTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${search}`,
    });
  }, []);
  return <div ref={containerRef}>wave track</div>;
}

export default WaveTrack;
