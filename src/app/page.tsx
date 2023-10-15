import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import Container from "@mui/material/Container";

export default function HomePage() {
  return (
    <>
      <Container>
        <MainSlider />
        <MainSlider />
      </Container>
    </>
  );
}
