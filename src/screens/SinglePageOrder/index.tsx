import React from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  return (
    <>
      <div>
        <Breadcrum label="Add New Order" />

        <div className="flex gap-5 mx-5">
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <div className=" border-2 border-gray-300 min-h-[222px] max-h-[268px]"></div>
              <div className=" border-2 border-gray-300 min-h-[222px] max-h-[268px]"></div>
              {/* <div className=" border-2 border-gray-300 min-h-[222px] max-h-[268px]"></div> */}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="border-2 border-gray-300 h-[268px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
