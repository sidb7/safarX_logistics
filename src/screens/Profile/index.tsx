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
      <div className="lg:grid lg:grid-cols-2 gap-4">
        <ProfileNotification />
        <ProfileReferEarn />
        <ProfileSetting />
      </div>
    </div>
  );
};
