"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider, { Settings } from "react-slick";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
interface IProps {
  data: ITrackTop[];
  title: string;
}
function MainSlider(props: IProps) {
  const data = props.data;
  console.log(data.length);
  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  var settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      sx={{
        margin: "0 50px",
        ".track": {
          padding: "0 10px",
          img: {
            width: 150,
            height: 150,
          },
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
      <h2> {props.title} </h2>

      <Slider {...settings}>
        {data.map((item) => {
          return (
            <div className="track">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/track_upload/img_Track/${item.imgUrl}`}
                alt=""
              />
              <h4>{item.title}</h4>
              <h5>{item.description}</h5>
            </div>
          );
        })}
      </Slider>
      <Divider />
    </Box>
  );
}

export default MainSlider;
