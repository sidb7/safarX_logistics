import { useMediaQuery } from "react-responsive";
import ReferCode from "../../../assets/Profile/Refer/ReferCode.svg";
import ShareIcon from "../../../assets/Label/share.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";

import CustomButton from "../../../components/Button";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../components/Layout/breadcum";
export const ReferTab = () => {
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="h-full">
      <Breadcum label="Refer and Earn" />
      <div className="mt-[77px]">
        <div className="flex justify-center items-center">
          <img src={ReferCode} alt="" />
        </div>
        <div className="flex justify-center mt-[48px] p-3 text-[16px] font-semibold whitespace-nowrap">
          Referral Code - QYHR78171JEY
        </div>
        <div className="flex justify-center mt-[40px]">
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
      <BottomLayout callApi={() => {}} />
    </div>
  );
};
