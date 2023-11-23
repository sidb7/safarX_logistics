import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Switch from "react-switch";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import CustomBrandingContent from "./CustomBrandingContent";

//Icons
import editIcon from "../../../../assets/serv/edit.svg";
import AccordionUp from "../../../../assets/AccordionUp.svg";
import MapIcon from "../../../../assets/PickUp/MapIcon.svg";
import LabelContainer from "../../../../components/LabelContainer";

interface ICustomBrandingProps {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
  };
}

const CustomBranding: React.FunctionComponent<ICustomBrandingProps> = ({
  data: { pickupAddress, setPickupAddress },
}) => {
  const [customBrandingModal, setCustomBrandingModal] = useState(false);
  const [customBrandingRightModal, setCustomBrandingRightModal] =
    useState(false);
  const branding = pickupAddress.branding;
  const isActive = pickupAddress.branding.isActive;

  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div
      className={` ${
        isActive && "!mb-[130px]"
      } grid grid-cols-1 lg:col-span-3 px-5`}
    >
      <div className="flex flex-col  lg:w-[372px] h-[134px] ">
        <div
          className={`grid grid-cols-2 p-2 ${
            isActive
              ? "bg-[#E8E8E8] rounded-tr-lg  lg:w-[372px] h-[44px] rounded-tl-lg border-[1px]"
              : "shadow-md rounded "
          }`}
        >
          <h1 className="self-center justify-start text-[14px] font-semibold font-Open text-[#1C1C1C] lg:text-base ">
            Custom Branding
          </h1>

          <div
            className={`flex ${
              isActive ? "justify-start" : "justify-end"
            } items-center gap-x-1`}
          >
            <button
              className={`${
                isActive ? "bg-[#7CCA62]" : "bg-[#F35838]"
              } flex justify-end items-center gap-x-1 rounded w-[123px] h-[30px] px-[12px] py-[8px]`}
              onClick={() => {
                setPickupAddress((prevData: any) => ({
                  ...prevData,
                  branding: {
                    ...prevData.branding,
                    isActive: !isActive,
                  },
                }));
              }}
            >
              <Switch
                onChange={() => {
                  setPickupAddress((prevData: any) => ({
                    ...prevData,
                    branding: {
                      ...prevData.branding,
                      isActive: !isActive,
                    },
                  }));
                }}
                checked={isActive}
                onColor="#FFFFF"
                onHandleColor="#7CCA62"
                offColor="#FFFFF"
                offHandleColor="#F35838"
                handleDiameter={4}
                uncheckedIcon={false}
                checkedIcon={false}
                height={8}
                width={14}
              />

              <p className="text-[#FFFFFF] font-semibold font-Open text-[14px] px-[8px] pb-[2px] ">
                {isActive ? "ACTIVE" : "DEACTIVE"}
              </p>
            </button>
            {isActive && (
              <img
                src={editIcon}
                alt=""
                className="ml-2 cursor-pointer"
                onClick={() => setCustomBrandingRightModal(true)}
              />
            )}
            {isActive && (
              <img src={AccordionUp} alt="" className="ml-2 cursor-pointer" />
            )}
          </div>
        </div>
        {isActive && (
          <div
            className="grid grid-cols-2 items-center border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2"
            onClick={() => {
              isItLgScreen
                ? setCustomBrandingRightModal(true)
                : setCustomBrandingModal(true);
            }}
          >
            <div className="flex flex-col mt-2 px-2">
              <LabelContainer
                label="Brand Name"
                className="text-[12px]"
                info={branding?.name}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mt-2 px-2 border-l-[1px]">
              <LabelContainer
                label="Brand Address"
                className="text-[12px]"
                info={
                  branding?.address.length > 20
                    ? `${branding?.address?.substring(0, 20)} ...`
                    : branding?.address
                }
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col my-2 px-2">
              <LabelContainer
                label="Brand Contact"
                className="text-[12px]"
                info={branding?.contact?.mobileNo}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col my-2 px-2 border-l-[1px]">
              <LabelContainer
                label="Brand Logo"
                className="text-[12px]"
                info={" "}
                classNameInfo="!text-[14px]"
              />
            </div>
          </div>
        )}
      </div>

      <RightSideModal
        isOpen={customBrandingRightModal}
        onClose={() => setCustomBrandingRightModal(false)}
        className="w-full md:!w-[389px]"
      >
        <CustomBrandingContent
          title="Custom Branding"
          titleIcon={MapIcon}
          buttonText="UPDATE"
          inputLabel="Brand Name"
          onClick={() => setCustomBrandingRightModal(false)}
          data={{ pickupAddress, setPickupAddress }}
        />
      </RightSideModal>
    </div>
  );
};

export default CustomBranding;
