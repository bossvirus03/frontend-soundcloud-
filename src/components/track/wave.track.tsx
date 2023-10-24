"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";

function WaveTrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  const option = {
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: `/api?audio=${search}`,
  };
  const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    const canvas = document.createElement("canvas");
    const ctx = document.createElement("canvas").getContext("2d")!;
    // Define the waveform gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    const progressGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#EE772F"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#EB4926"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#F6B094"
    ); // Bottom color
    progressGradient.addColorStop(1, "#F6B094"); // Bottom color

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      height: 150,
      barWidth: 2,
      url: `/api?audio=${search}`,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionMemo);

  // On play button click
  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
      setIsPlaying(wavesurfer.isPlaying());
    }
  }, [wavesurfer]);
  return (
    <>
      <div ref={containerRef}>wave track</div>
      <div>
        <button onClick={onPlayClick}>
          {isPlaying === true ? "pause" : "play"}
        </button>
      </div>
    </>
  );
}

export default WaveTrack;
