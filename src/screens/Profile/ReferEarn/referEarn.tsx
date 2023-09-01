import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomButton from "../../../components/Button";
import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import ReferEarn from "../../../assets/Profile/ReferEarn.svg";
import { useNavigate } from "react-router-dom";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import ShareIcon from "../../../assets/Label/share.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";

export const ProfileReferEarn = ({ ReferData }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const navigateTo = () => {
    if (!isItLgScreen) navigate("/profile/refer-earn");
    else setIsOpen(true);
  };
  return (
    <>
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
        onClick={navigateTo}
      >
        <div className={`flex justify-between items-center h-[44px]`}>
          <div className="flex">
            <img className="ml-4" src={ReferEarn} alt="" />
            <span className="text-base font-semibold text-[#1C1C1C] ml-2">
              Refer and Earn
            </span>
          </div>
          <div className="mr-4">
            <img src={RightArrowIcon} alt="" className="ml-4" />
          </div>
        </div>
      </div>
      <RightSideModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        wrapperClassName="!justify-start outline-none"
      >
        <div className="flex flex-col w-full p-4 mt-5 ">
          <div className="flex justify-between w-full ">
            <div className="text-[24px] font-normal">Refer And Earn</div>
            <div>
              <img
                src={CrossIcon}
                onClick={() => setIsOpen(false)}
                alt="close Icon"
                width="25px"
              />{" "}
            </div>
          </div>
          <div className="flex flex-col mt-8 gap-y-4 w-ful justify-center items-center">
            <img
              src={ReferData?.referImage}
              alt="Referral Code"
              className="w-[156px] mt-[10rem]"
            />
            <p className="p-3 mt-4 text-[16px] font-semibold whitespace-nowrap">
              Referral Code - {ReferData?.referCode}
            </p>
          </div>
        </div>
        <div style={{ width: "-webkit-fill-available" }}>
          <footer
            style={{ width: "-webkit-fill-available" }}
            className=" fixed  bottom-0	"
          >
            <div
              style={{
                width: "-webkit-fill-available",
                boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
              }}
              className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[10px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
            >
              <div className="flex justify-center">
                <div className="p-2">
                  <CustomButton
                    text="SHARE"
                    showIcon={true}
                    icon={ShareIcon}
                    onClick={() => {}}
                    className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
                  />
                </div>
                <div className="p-2">
                  <CustomButton
                    text="COPY"
                    showIcon={true}
                    icon={CopyIcon}
                    onClick={() => {}}
                    className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </RightSideModal>
    </>
  );
};
