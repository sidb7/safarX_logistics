import { useEffect, useState } from "react";
import { ProfileBankCard } from "./Bank/bankCard";
import { ProfileKycCard } from "./Kyc/kycCard";
import { ProfileNotification } from "./Notification/notificationCard";
import { ProfileCard } from "./ProfileCard/profileCard";
import { ProfileReferEarn } from "./ReferEarn/referEarn";
import { ProfileSetting } from "./Settings/setting";
import { POST } from "../../utils/webService";
import { GET_PROFILE_URL } from "../../utils/ApiUrls";
import { toast } from "react-toastify";

export const Profile = () => {
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
    <div className="mx-4">
      <ProfileCard ProfileDetails={profileData} />
      <ProfileKycCard KycDetails={profileData?.kycDetails} />
      <ProfileBankCard BankDetails={profileData?.bankDetails} />
      <div className="lg:grid lg:grid-cols-2 gap-4">
        <ProfileNotification />
        <ProfileReferEarn />
        <ProfileSetting ProfileDetails={profileData} />
      </div>
    </div>
  );
};
