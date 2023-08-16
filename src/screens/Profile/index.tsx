import { useEffect, useState } from "react";
import { ProfileBankCard } from "./Bank/bankCard";
import { ProfileKycCard } from "./Kyc/kycCard";
import { ProfileNotification } from "./Notification/notificationCard";
import { ProfileCard } from "./ProfileCard/profileCard";
import { ProfileReferEarn } from "./ReferEarn/referEarn";
import { ProfileSetting } from "./Settings/setting";
import { POST } from "../../utils/webService";
import { GET_PROFILE_URL } from "../../utils/ApiUrls";

export const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_URL, {});
      console.log("🚀 ~ file: index.tsx:16 ~ data:", data)
    })();
  }, []);
  return (
    <div className="mx-4">
      <ProfileCard />
      <ProfileKycCard />
      <ProfileBankCard />
      <div className="lg:grid lg:grid-cols-2 gap-4">
        <ProfileNotification />
        <ProfileReferEarn />
        <ProfileSetting />
      </div>
    </div>
  );
};
