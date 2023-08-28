import React from "react";
import NoDataFound from "../../assets/NoDataFound.gif";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center m-[8rem]">
      <img className="w-[130px]" src={NoDataFound} alt="No Data" />
      <p>NO DATA FOUND</p>
    </div>
  );
};

export default NotFound;
