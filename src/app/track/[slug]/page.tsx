"use client";

import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
function DetailTrackPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  return (
    <Container>
      <div>
        <WaveTrack />
      </div>
    </Container>
  );
}
export default DetailTrackPage;
