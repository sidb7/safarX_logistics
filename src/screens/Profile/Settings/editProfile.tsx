import CustomInputBox from "../../../components/Input";
import { useEffect, useState } from "react";
import { GET_PROFILE_URL, UPDATE_SELLER } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-toastify";
export const EditProfile = () => {
  const [profileData, setProfileData] = useState<any>({});

  const changeHandler = (key: string, event: any) => {
    setProfileData({ ...profileData, [key]: event.target.value });
  };

  const updateProfile = async () => {
    const { data } = await POST(UPDATE_SELLER, {
      data: profileData,
    });
    if (data.success) {
      setProfileData(data?.data);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_URL, {});
      if (data.success) {
        setProfileData(data.data[0]);
      } else {
        toast.error(data.message);
      }
    })();
  }, []);

  return (
    <div className="h-full">
      <Breadcum label="KYC Details" />
      <div className="flex flex-col mx-4 mt-4 gap-y-4">
        <div className="flex flex-col justify-center items-center mb-4">
          <div
            style={{
              width: "82px",
              height: "82px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mask: "radial-gradient(circle, transparent 50%, black 50%)",
              }}
              // src={ProfileIcon}
              src={profileData?.profileImageUrl}
              alt="Profile"
              className="w-[82px]"
            />
          </div>
          <span className="text-[10px] font-normal text-[#494949]">
            Dimention: 68x68 Pixels | Image Size: 230 KB
          </span>
        </div>
        <CustomInputBox label="Seller ID" value={profileData?.sellerId} />
        <CustomInputBox
          label="Name"
          value={`${profileData?.firstName} ${profileData?.middleName} ${profileData?.lastName}`}
        />
        <CustomInputBox label="Email ID" value={profileData?.email} />
        <CustomInputBox
          inputType="text"
          inputMode="numeric"
          maxLength={10}
          label="Contact Number"
          value={profileData?.contactNumber}
          onChange={(e) => changeHandler("contactNumber", e)}
        />
        <CustomInputBox
          label="Brand Website"
          value={profileData?.brandWebsite}
          onChange={(e) => changeHandler("brandWebsite", e)}
        />
      </div>
      <BottomLayout callApi={updateProfile} />
    </div>
  );
};
