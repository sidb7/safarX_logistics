import ShareIcon from "../../../assets/Label/share.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";

import CustomButton from "../../../components/Button";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../components/Layout/breadcrum";
import { POST } from "../../../utils/webService";
import { GET_PROFILE_URL } from "../../../utils/ApiUrls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const ReferTab = () => {
  const [profileData, setProfileData]: any = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_URL, {});
      if (data?.success) {
        setProfileData(data?.data?.[0]);
      } else {
        toast.error(data?.message);
      }
    })();
  }, []);
  return (
    <div className="h-full">
      <Breadcum label="Refer and Earn" />
      <div className="mt-[77px]">
        <div className="flex justify-center items-center">
          <img
            src={profileData?.refferalCodeImageUrl}
            alt="Refer Code"
            className="w-[156px]"
          />
        </div>
        <div className="flex justify-center mt-[48px] p-3 text-[16px] font-semibold whitespace-nowrap">
          Referral Code - {profileData?.refferalCode}
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
