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
import { Breadcrum } from "../../components/Layout/breadcrum";
import { Spinner } from "../../components/Spinner";

export const Profile = () => {
  const [profileData, setProfileData]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_URL, {});
      if (data?.success) {
        setProfileData(data?.data?.[0]);
      } else {
        toast.error(data?.message);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="mx-4">
      <div className="">
        <Breadcrum label="Profile" />
      </div>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <ProfileCard ProfileDetails={profileData} />
          <ProfileKycCard KycDetails={profileData?.kycDetails} />
          <ProfileBankCard BankDetails={profileData?.bankDetails} />
          <div className="lg:grid lg:grid-cols-2 gap-4">
            <ProfileNotification />
            <ProfileReferEarn
              ReferData={{
                referCode: profileData?.refferalCode,
                referImage: profileData?.refferalCodeImageUrl,
              }}
            />
            <ProfileSetting ProfileDetails={profileData} />
          </div>
        </>
      )}
    </div>
  );
};
