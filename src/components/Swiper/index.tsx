import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideProps {
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface SliderProps {
  children: React.ReactNode;
  settings?: {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
  };
}

const SimpleSlider: React.FC<SliderProps> = ({
  children,
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  },
}) => {
  return <Slider {...settings}>{children}</Slider>;
};

export { SimpleSlider, Slide };
