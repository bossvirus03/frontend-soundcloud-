import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import Container from "@mui/material/Container";
import { sendRequest } from "@/utils/api";

export default async function HomePage() {
  const chill = await sendRequest<IBackendRes<ITrackTop>>({
    url: "http://localhost:3000/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });
  const hiphop = await sendRequest<IBackendRes<ITrackTop>>({
    url: "http://localhost:3000/tracks/top",
    method: "POST",
    body: {
      category: "HIPHOP",
      limit: 10,
    },
  });
  const party = await sendRequest<IBackendRes<ITrackTop>>({
    url: "http://localhost:3000/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });

  return (
    <>
      <Container>
        <MainSlider data={chill?.data ?? []} title={"Top Chill"} />
        <MainSlider data={hiphop?.data ?? []} title={"Top hiphop"} />
        <MainSlider data={party?.data ?? []} title={"Top party"} />
      </Container>
    </>
  );
}
