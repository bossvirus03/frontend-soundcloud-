"use client";
import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
function WaveTrack() {
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: document.getElementById("hoidanit")!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/track_upload/audio_Track/1.mp3`,
    });
  }, []);
  return <div id="hoidanit">wave track</div>;
}

export default WaveTrack;
