import React, { useEffect, useState } from "react";
import LabelContainer from "../../../components/LabelContainer";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import ProfileIcon from "../../../assets/Profile/ProfileIcon.svg";

interface ITypeProps {
  BrandingDetails?: any;
  brandingModal?: boolean;
  setBrandingModal?: () => void;
}

const Index = (props: ITypeProps) => {
  const { BrandingDetails, setBrandingModal } = props;
  const [data, setData] = useState<any>(BrandingDetails);
  useEffect(() => {
    setData(BrandingDetails);
  }, [BrandingDetails]);

  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div
        className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
      >
        <div>
          <span className="text-base font-semibold text-[#1C1C1C] ml-4">
            Branding Details
          </span>
        </div>

        <div>
          <img
            src={EditIcon}
            alt=""
            className="mr-4 cursor-pointer"
            onClick={setBrandingModal}
          />
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex flex-col col-span-2 items-start py-2 pr-4  pl-3 ">
          <div
            style={{
              width: "80px",
              height: "80px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={`${data?.logoUrl || ProfileIcon}`}
              alt="Profile"
            />
          </div>
          <span className="text-sm font-Lato mt-1 leading-5 capitalize  text-[#777777]">
            Brand Logo
          </span>
        </div>

        <div className="flex flex-col  ml-6">
          <LabelContainer
            label="Brand Name"
            info={data?.brandName}
            className="text-[12px]"
            classNameInfo="!text-[14px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
