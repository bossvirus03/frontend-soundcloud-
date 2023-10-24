"use client";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "@/utils/customHook";
function AppFooter() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container style={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            style={{
              boxShadow: "unset",
              background: "#f2f2f2",
            }}
            autoPlay
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/track_upload/audioTrack/1.mp3`}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
              paddingLeft: 45,
            }}
          >
            <div style={{ color: "#ccc" }}>Loi</div>
            <div style={{ color: "black" }}>to chim</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppFooter;
