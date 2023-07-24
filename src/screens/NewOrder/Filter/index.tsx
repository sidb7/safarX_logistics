import React from "react";
import CustomAccordian from "../../../components/CustomAccordian";
import dummyDatas from "../../NewOrder/Filter/dummyFile.json";

type Props = {};

const index = (props: Props) => {
  console.log("data", dummyDatas);

  return (
    <div>
      <CustomAccordian
        cardClassName="lg:!px-0 lg:!mt-4"
        dummyDatas={dummyDatas}
      />
    </div>
  );
};

export default index;
