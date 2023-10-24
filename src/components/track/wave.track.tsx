"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Tooltip } from "@mui/material";
import "./wave.scss";

const arrComments = [
  {
    id: 1,
    avatar: "http://localhost:3000/track_upload/imgTrack/1.jpg",
    moment: 10,
    user: "username 1",
    content: "just a comment1",
  },
  {
    id: 2,
    avatar: "http://localhost:3000/track_upload/imgTrack/1.jpg",
    moment: 30,
    user: "username 2",
    content: "just a comment3",
  },
  {
    id: 3,
    avatar: "http://localhost:3000/track_upload/imgTrack/1.jpg",
    moment: 50,
    user: "username 3",
    content: "just a comment3",
  },
];
const calLeft = (moment: number) => {
  const hardCodeDuration = 199;
  const percent = (moment / hardCodeDuration) * 100;
  return `${percent}%`;
};
function WaveTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
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
      height: 100,
      barWidth: 3,
      url: `/api?audio=${search}`,
    };
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useWavesurfer(containerRef, optionMemo);

  useEffect(() => {
    if (!wavesurfer) return;

    setIsPlaying(false);
    const timeEl = timeRef.current!;
    const durationEl = durationRef.current!;
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      //@ts-ignore
      (e) => (hover.style.width = `${e.offsetX}px`)
    );
    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on(
        "decode",
        (duration) => (durationEl.textContent = formatTime(duration))
      ),
      wavesurfer.on(
        "timeupdate",
        (currentTime) => (timeEl.textContent = formatTime(currentTime))
      ),
      wavesurfer.on("click", () => {
        wavesurfer.play();
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);
  // On play button click
  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 15,
          padding: 20,
          height: 400,
          background:
            "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            height: "calc(100% - 10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="info" style={{ display: "flex" }}>
            <div>
              <div
                onClick={() => onPlayClick()}
                style={{
                  borderRadius: "50%",
                  background: "#f50",
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {isPlaying === true ? (
                  <PauseIcon sx={{ fontSize: 30, color: "white" }} />
                ) : (
                  <PlayArrowIcon sx={{ fontSize: 30, color: "white" }} />
                )}
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div
                style={{
                  padding: "0 5px",
                  background: "#333",
                  fontSize: 30,
                  width: "fit-content",
                  color: "white",
                }}
              >
                Hỏi Dân IT's song
              </div>
              <div
                style={{
                  padding: "0 5px",
                  marginTop: 10,
                  background: "#333",
                  fontSize: 20,
                  width: "fit-content",
                  color: "white",
                }}
              >
                Eric
              </div>
            </div>
          </div>
          <div ref={containerRef} className={"waveform"}>
            <div className="time" ref={timeRef}>
              0:00
            </div>
            <div className="duration" ref={durationRef}>
              0:00
            </div>
            <div className="hover" ref={hoverRef}></div>
            <div
              className="overlay"
              style={{
                position: "absolute",
                height: "30px",
                width: "100%",
                bottom: "0",
                // background: "#ccc"
                backdropFilter: "brightness(0.5)",
              }}
            ></div>
            <div className="comments" style={{ position: "relative" }}>
              {arrComments.map((item) => {
                return (
                  <Tooltip title={item.content} arrow>
                    <img
                      key={item.id}
                      style={{
                        width: 20,
                        height: 20,
                        position: "absolute",
                        top: 71,
                        left: calLeft(item.moment),
                        zIndex: 20,
                      }}
                      src={item.avatar}
                      alt=""
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: "25%",
            padding: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#ccc",
              width: 250,
              height: 250,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WaveTrack;
