import React from "react";
import AccessDeniedIcon from "../../assets/AccessDenied.svg";

const Index = () => {
  return (
    <div className="flex flex-col items-center gap-y-3 justify-center m-[8rem]">
      <img src={AccessDeniedIcon} alt="No Data" />
      <p className="text-xl font-Open font-semibold">Access Denied</p>
    </div>
  );
};

export default Index;
