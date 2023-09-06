import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Switch from "react-switch";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import CustomBrandingContent from "./CustomBrandingContent";

//Icons
import editIcon from "../../../assets/serv/edit.svg";
import AccordionUp from "../../../assets/AccordionUp.svg";
import MapIcon from "../../../assets/PickUp/MapIcon.svg";

const CustomBranding = () => {
  const [customBrandingModal, setCustomBrandingModal] = useState(false);
  const [customBrandingRightModal, setCustomBrandingRightModal] =
    useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);

  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="mb-7 lg:col-span-3 pb-16  ">
      <div className="flex flex-col  w-[372px] h-[134px] ">
        <div
          className={`grid grid-cols-2 p-2 ${
            toggleStatus
              ? "bg-[#E8E8E8] rounded-tr-lg w-[372px] h-[44px] rounded-tl-lg border-[1px]"
              : "shadow-md rounded "
          }`}
        >
          <h1 className="self-center justify-start text-[14px] font-semibold font-Open text-[#1C1C1C] lg:text-base ">
            Custom Branding
          </h1>

          <div
            className={`flex ${
              toggleStatus ? "justify-start" : "justify-end"
            } items-center gap-x-1`}
          >
            <button
              className={`${
                toggleStatus ? "bg-[#7CCA62]" : "bg-[#F35838]"
              } flex justify-end items-center gap-x-1 rounded w-[123px] h-[30px] px-[12px] py-[8px]`}
              onClick={() => {
                setToggleStatus(!toggleStatus);
              }}
            >
              <Switch
                onChange={() => {
                  setToggleStatus(!toggleStatus);
                }}
                checked={toggleStatus}
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
                {toggleStatus ? "ACTIVE" : "DEACTIVE"}
              </p>
            </button>
            {toggleStatus && <img src={editIcon} alt="" className="ml-2" />}
            {toggleStatus && <img src={AccordionUp} alt="" className="ml-2" />}
          </div>
        </div>
        {toggleStatus && (
          <div className=" border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2 pb-8">
            <div
              className="flex cursor-pointer "
              onClick={() => {
                isItLgScreen
                  ? setCustomBrandingRightModal(true)
                  : setCustomBrandingModal(true);
              }}
            >
              <img src={editIcon} alt="" className="ml-2 mr-2" />
              <p> Add Branding</p>
            </div>
          </div>
        )}
      </div>

      <RightSideModal
        isOpen={customBrandingRightModal}
        onClose={() => setCustomBrandingRightModal(false)}
        className="!w-[389px]"
      >
        <CustomBrandingContent
          title="Custom Branding"
          titleIcon={MapIcon}
          buttonText="UPDATE"
          inputLabel="Brand Name"
          onClick={() => setCustomBrandingRightModal(false)}
          // onCustomLandmarkSelection={handleLandmarkSelected}
        />
      </RightSideModal>
    </div>
  );
};

export default CustomBranding;
