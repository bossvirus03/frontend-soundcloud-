"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

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
  const optionMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
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
