import { useEffect, useState } from "react";
import { ProfileBankCard } from "./Bank/bankCard";
import { ProfileKycCard } from "./Kyc/kycCard";
import { ProfileNotification } from "./Notification/notificationCard";
import { ProfileCard } from "./ProfileCard/profileCard";
import { ProfileReferEarn } from "./ReferEarn/referEarn";
import { ProfileSetting } from "./Settings/setting";
import { POST } from "../../utils/webService";
import { GET_PROFILE_URL, LOGO_AND_BRAND } from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { Spinner } from "../../components/Spinner";
import ProfileBrandingDetails from "./BrandingDetails";
import RightSideModal from "../../components/CustomModal/customRightModal";
import { ResponsiveState } from "../../utils/responsiveState";
import BrandingModalContent from "./BrandingDetails/brandingModalContent";
import DocumentCard from "./DocumentsForInternational/DocumentsCard";

export const Profile = () => {
  const { isLgScreen } = ResponsiveState();
  const [profileData, setProfileData]: any = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [brandingModal, setBrandingModal] = useState(false);

  const [brandingModalDetails, setBrandingModalDetails] = useState<any>({
    image: "",
    imageUrl: "",
    brandName: "",
    file: null,
  });

  const getProfileData = async () => {
    const { data } = await POST(GET_PROFILE_URL, {});
    if (data?.success) {
      setProfileData(data?.data?.[0]);
      setBrandingModalDetails({
        ...brandingModalDetails,
        imageUrl: data?.data?.[0]?.privateCompany?.logoUrl,
        brandName: data?.data?.[0]?.privateCompany?.brandName,
      });
    } else {
      toast.error(data?.message);
    }
    setIsLoading(false);
  };

  const updateBrandingDetails = async () => {
    let formData = new FormData();
    formData.append("brandName", brandingModalDetails.brandName);
    formData.append("file", brandingModalDetails?.file);

    let img: any = new Image();
    img.src = brandingModalDetails?.imageUrl;

    img.onload = async function () {
      // Access the natural height and width of the image
      var height = img.naturalHeight;
      var width = img.naturalWidth;

      if (height > 200 || width > 700) {
        return toast.error(
          "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
        );
      } else {
        const { data } = await POST(LOGO_AND_BRAND, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (data?.success) {
          toast.success(data?.message);
          setBrandingModal(false);
          window.location.reload();
          // getProfileData();
        } else {
          toast.error(data?.message);
        }
      }
    };
  };

  useEffect(() => {
    (async () => {
      getProfileData();
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
          <ProfileCard
            ProfileDetails={profileData}
            getProfileData={getProfileData}
          />
          <ProfileKycCard KycDetails={profileData?.kycDetails} />

          {/* documents  */}

          <DocumentCard />

          <ProfileBankCard BankDetails={profileData?.bankDetails} />
          <ProfileBrandingDetails
            setBrandingModal={() => {
              setBrandingModal(true);
            }}
            BrandingDetails={profileData?.privateCompany}
          />
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

      <RightSideModal
        isOpen={brandingModal}
        onClose={() => setBrandingModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[30%]" : "mobile-modal-styles"
        }`}
      >
        <BrandingModalContent
          setBrandingModal={() => {
            setBrandingModal(false);
          }}
          brandingModalDetails={brandingModalDetails}
          setBrandingModalDetails={setBrandingModalDetails}
          updateBrandingDetails={updateBrandingDetails}
        />
      </RightSideModal>
    </div>
  );
};
