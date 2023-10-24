"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

//Wavesurfer hook

function WaveTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  const option = {
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: `/api?audio=${search}`,
  };
  const optionMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${search}`,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionMemo);
  return <div ref={containerRef}>wave track</div>;
}

export default WaveTrack;
