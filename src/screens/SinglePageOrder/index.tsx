import React from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import AddressCardDetails from "./AddressDetails";
import PackageDetails from "./PackageDetais/index";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  return (
    <>
      <div>
        <Breadcrum label="Add New Order" />

        <div className="flex gap-x-6 mx-5 mt-2">
          <div className="flex-1">
            <div className="flex flex-col gap-5">
              <AddressCardDetails />
              {/* <div className=" border-[1px] rounded-md border-[#004EFF] min-h-[222px] max-h-[268px]"></div> */}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <PackageDetails />
              {/* <div className="border-2 border-gray-300 h-[268px]"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
