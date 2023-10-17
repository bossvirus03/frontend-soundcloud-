import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import Container from "@mui/material/Container";
import { sendRequest } from "@/utils/api";
interface ITrackTop {
  _id: string;
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
  countLike: number;
  countPlay: number;
  // uploader: {
  //   _id: string;
  //   email: string;
  //   name: string;
  //   role: string;
  //   type: string;
  // };
  uploader: string;
  isDeleted: false;
}
export default async function HomePage() {
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: "http://localhost:3000/tracks/top",
    method: "POST",
    body: {
      category: "HIPHOP",
      limit: 5,
    },
  });
  console.log(res);

  return (
    <>
      <Container>
        <MainSlider />
        <MainSlider />
      </Container>
    </>
  );
}
