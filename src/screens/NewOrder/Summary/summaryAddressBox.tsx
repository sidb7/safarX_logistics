import React from "react";

interface ISummaryData  {
    locationImage: any;
    locationImage2: any;
    editImage: any;
    profileImage: any;
    contactImage: any;
    summaryTitle: string;
    summaryAddres: string;
    city: string;
    contactNumber: string;
    contactName?: string;
}

const productBox: React.FunctionComponent<ISummaryData> = ({
    locationImage = "",
    locationImage2 = "",
    editImage= "",
    profileImage ="",
    contactImage ="",
    summaryTitle = "",
    summaryAddres = "",
    city = "",
    contactNumber = "",
    contactName = "",
}) => {
    return (
      <div className="p-[12px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF]">
        
         
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <img src={locationImage} alt="" />
            <p className="text-[14px] font-medium">{summaryTitle}</p>
          </div>
          <div>
            <img src={editImage} alt=""/>
          </div>
        </div>
        
        <div className="flex flex-col gap-y-1 mt-3">
          <div className="flex flex-row items-center gap-2">
            {/* <img src={locationImage2} alt=""/> */}
            <p className="text-[12px] font-medium ml-[25px]">{summaryAddres}</p>
          </div>
          <p className="text-[12px] font-medium ml-[25px]">{city}</p>
          <div className="flex flex-row items-center gap-2 ml-[25px]">
          <img src={profileImage} alt="" />
          <p className="text-[12px] font-medium">{contactName}</p>
        </div>
        <div className="flex flex-row items-center gap-2 ml-[25px]">
          <img src={contactImage} alt="" />
          <p className="text-[12px] font-medium">{contactNumber}</p>
        </div>
        </div>
       
      </div>
    );
  };
  
  export default productBox;
  