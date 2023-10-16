import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FAQMobileGif from "../../../assets/FAQMobile.gif";

interface ITypeProps {}

const dummyData = [
  {
    content: "Upgrade to Silver plan & enjoy maximum benefit",
    icon: FAQMobileGif,
  },
  {
    content: "Upgrade to Silver plan & enjoy maximum benefit",
    icon: FAQMobileGif,
  },
  {
    content: "Upgrade to Silver plan & enjoy maximum benefit",
    icon: FAQMobileGif,
  },
  {
    content: "Upgrade to Silver plan & enjoy maximum benefit",
    icon: FAQMobileGif,
  },
];

const Carousel = (props: ITypeProps) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <Slider {...settings}>
      {dummyData?.map((eachCard: any, index: number) => {
        return (
          <div className="flex relative  ">
            <p className="font-Open font-semibold text-sm leading-[22px] px-4 py-4 w-2/3   text-[#1C1C1C]">
              {eachCard.content}
            </p>
            <div className="absolute top-0 right-4  z-999">
              <img src={eachCard.icon} alt="" width={90} height={90} />
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default Carousel;
