import React from "react";

interface ISummaryData {
  locationImage: any;
  locationImage2: any;
  isEditIcon?: boolean;
  warehouse?: string;
  editImage: any;
  profileImage: any;
  contactImage: any;
  summaryTitle: string;
  summaryAddres: string;
  city: string;
  isContactNumber?: boolean;
  isContactName?: boolean;
  contactNumber: string;
  contactName?: string;
}

const productBox: React.FunctionComponent<ISummaryData> = ({
  locationImage = "",
  locationImage2 = "",
  editImage = "",
  profileImage = "",
  contactImage = "",
  summaryTitle = "",
  summaryAddres = "",
  city = "",
  contactNumber = "",
  contactName = "",
  isEditIcon,
  isContactName,
  isContactNumber,
  warehouse = "",
}) => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-x-2 mb-4 ">
          <img src={locationImage} alt="" />
          <p className="text-[14px] font-medium font-Open lg:text-[18px]">
            {summaryTitle}
          </p>
        </div>
        {isEditIcon && (
          <div>
            <img src={editImage} alt="" className="lg:hidden" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="font-semibold font-Open text-[12px] text-[#004EFF] ml-[25px] lg:text-[16px]">
          {warehouse}
        </p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-[12px] font-medium font-Open ml-[25px] w-[90%]  lg:text-[16px] lg:font-semibold">
            {summaryAddres}
          </p>
        </div>
        <p className="text-[12px] font-medium ml-[25px] font-Open lg:text-[16px] lg:font-semibold">
          {city}
        </p>
        {isContactName && (
          <div className="flex flex-row items-center gap-2 ml-[25px]">
            <img src={profileImage} alt="" />
            <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
              {contactName}
            </p>
          </div>
        )}

        {isContactNumber && (
          <div className="flex flex-row items-center gap-2 ml-[25px]">
            <img src={contactImage} alt="" />
            <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
              {contactNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default productBox;
