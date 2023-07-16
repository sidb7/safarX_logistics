import React from "react";
import CustomAccordian from "../../../components/CustomAccordian";
import dummyDatas from "../../NewOrder/Filter/dummyFile.json";

type Props = {};

const index = (props: Props) => {
  console.log("data", dummyDatas);

  return (
    <div>
      <CustomAccordian dummyDatas={dummyDatas} />
    </div>
  );
};

export default index;
