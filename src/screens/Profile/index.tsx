import { ProfileBankCard } from "./Bank/bankCard";
import { ProfileKycCard } from "./Kyc/kycCard";
import { ProfileNotification } from "./Notification/notificationCard";
import { ProfileCard } from "./ProfileCard/profileCard";
import { ProfileReferEarn } from "./ReferEarn/referEarn";
import { ProfileSetting } from "./Settings/setting";

export const Profile = () => {
  return (
    <div className="mx-4">
      <ProfileCard />
      <ProfileKycCard />
      <ProfileBankCard />
      <ProfileNotification />
      <ProfileReferEarn />
      <ProfileSetting />
    </div>
  );
};
