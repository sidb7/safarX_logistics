import Checkbox from "../../../../components/CheckBox";
import React from "react";
import DummyImage from "../../../../assets/CargoRating .png";

interface IContactData {
  props: {
    profileImage: any;
    profileImage1: any;
    header: string;
    editImage: any;
    role: string;
    personName: string;
    phoneIcon: any;
    personContact: string;
  }[];
}

const CustomPickupLocation: React.FunctionComponent<IContactData> = ({
  props,
}) => {
  return (
    <>
      {props?.map((each: any, index: any) => {
        return (
          <div
            className="p-[12px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF] mx-5 my-4"
            key={index}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-[11px]">
                <img src={each.profileImage} alt="" className="w-4 h-4" />
                <p className="text-[14px] font-medium">{each.header}</p>
              </div>
              <div>
                <img src={each.editImage} alt="" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center  mt-3">
              <div>
                <Checkbox checkboxClassName="gap-2" />
              </div>
              <p className="text-[12px] text-[#3371FF] font-medium">
                {each.role}
              </p>
            </div>

            <div className="ml-5">
              <div className="flex gap-x-2 items-center mt-1">
                <img src={each.profileImage} alt="" className="w-5 h-5" />
                <p className="text-[12px] font-normal">{each.personName}</p>
              </div>
              <div className="flex items-center gap-x-2 mt-2">
                <img src={each.phoneIcon} alt="" className="w-4 h-4" />
                <p className="text-[12px] font-normal">
                  {"+" + each.personContact}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default CustomPickupLocation;
