import React from "react";
import ReverDummyJson from "./reverseDummy.json";

// ${
//   isActiveItemAccordionOpen && activeItem === roleData?.id
//     ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
//     : "bg-white"
// }
const index = () => {
  console.log("ReverDummyJson", ReverDummyJson);

  return (
    <div className="accordionContainerBoxStyle">
      <div
        className={`cursor-pointer px-4 py-3 flex justify-between items-center  bg-[#F6F6F6] rounded-none rounded-t-lg`}
        // onClick={() => toggleAccordion(roleData?.id)}
        // key={index}
      ></div>
    </div>
  );
};

export default index;
