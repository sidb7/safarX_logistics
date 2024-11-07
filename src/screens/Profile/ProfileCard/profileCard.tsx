import { useMediaQuery } from "react-responsive";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import BlackEditIcon from "../../../assets/Profile/BlackEditIcon.svg";
import EmailIcon from "../../../assets/Profile/EmailIcon.svg";
import PhoneIcon from "../../../assets/Profile/PhoneIcon.svg";
import WebsiteIcon from "../../../assets/Profile/companyNameLogo.svg";
import ProfileIcon from "../../../assets/Profile/ProfileIcon.svg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { date_DD_MMM_YYY } from "../../../utils/dateFormater";
import OneButton from "../../../components/Button/OneButton";
import editIcon from "../../../assets/edit-black.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import EditProfile from "./editProfile";

interface ProfileCardProps {
  ProfileDetails?: any;
  getProfileData?: any;
}

const LabelComponent: React.FC<{
  label: string;
  className?: string;
  info: any;
  classNameInfo?: string;
}> = ({ label, className, info, classNameInfo }) => {
  return (
    <div className="flex flex-col">
      <span
        className={`text-[#1C1C1C] font-Open text-[18px]  leading-[22px] capitalize font-semibold ${className}`}
      >
        {label}
      </span>
      <span
        className={`font-Lato font-semibold leading-9 text-[#004EFF] text-[28px] capitalize lg:mt-1  ${classNameInfo}`}
      >
        {info}
      </span>
    </div>
  );
};

export const ProfileCard = (props: ProfileCardProps) => {
  const sellerId = props?.ProfileDetails?.sellerId;
  const profileImageUrl = props?.ProfileDetails?.profileImageUrl;
  const firstName = props?.ProfileDetails?.firstName;
  const lastName = props?.ProfileDetails?.lastName;
  const email = props?.ProfileDetails?.email;
  const contactNumber = props?.ProfileDetails?.contactNumber;
  const companyName = props?.ProfileDetails?.companyName;
  const activePlan = props?.ProfileDetails?.activePlan;
  const yaariPoints = props?.ProfileDetails?.yaariPoints;
  const walletBalance = props?.ProfileDetails?.walletBalance;
  const companyDisplayName = props?.ProfileDetails?.privateCompany?.name;
  const activePlanExpiry = props?.ProfileDetails?.activePlanExpiry;
  const planStartDate = props?.ProfileDetails?.planStartDate;
  const AccDetailsContactNo =
    props?.ProfileDetails?.privateCompany?.accountDetails?.contactNumber;
  const AccDetailsEmail =
    props?.ProfileDetails?.privateCompany?.accountDetails?.email;
  const OpDetailsContactNo =
    props?.ProfileDetails?.privateCompany?.operationDetails?.contactNumber;
  const OpDetailsEmail =
    props?.ProfileDetails?.privateCompany?.operationDetails?.email;
  const { getProfileData } = props;

  const [kycValue, setKycValue] = useState();
  const [showModal, setShowModal] = useState(false);
  let currentBalance = parseFloat(walletBalance?.toFixed(2));
  useEffect(() => {
    const kyc = localStorage.getItem("setKycValue") as any;
    setKycValue(kyc);
  }, []);

  const navigate = useNavigate();

  const isItLgScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <>
      <div className="flex flex-col">
        {/* <div className="md:grid md:grid-cols-2">
          <div className="grid grid-cols-6 border-[1px] border-[#E8E8E8] rounded-lg">
            <div className="flex flex-col col-span-1 items-start py-2 pr-4 pl-3 ">
              <div
                style={{
                  width: "auto",
                  height: "auto",
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
                  src={`${
                    profileImageUrl && profileImageUrl !== "N/A"
                      ? profileImageUrl
                      : ProfileIcon
                  }`}
                  id="myProfileLogo"
                  alt="Profile"
                  className="w-[82px]"
                />
              </div>
              <span className="text-[14px] font-Lato font-normal leading-5 capitalize text-[#1C1C1C]">
                Seller ID: {sellerId}
              </span>
            </div>
            <div className="col-span-5  whitespace-nowrap flex flex-col space-y-2 py-2 pr-4 pl-3">
              <div className="flex justify-between items-center">
                <span className="flex justify-between font-Lato font-semibold leading-7 capitalize">
                  {`${firstName} ${lastName}`}
                  {kycValue === "true" ? (
                    ""
                  ) : (
                    // <img
                    //   src={BlackEditIcon}
                    //   alt=""
                    //   className="pr-4 cursor-pointer"
                    //   onClick={() => navigate("/profile/edit-profile")}
                    // />
                    <></>
                  )}
                </span>
                <button
                  className="cursor-pointer w-[20px]"
                  onClick={() => setShowModal(true)}
                >
                  <img src={editIcon} alt="" />
                </button>
              </div>
              <span className="flex font-Lato text-[16px] font-normal leaimport RightSideModal from "./RightSideModal";
ding-6">
                <img src={EmailIcon} alt="Email" className="w-[16px] mr-2" />
                {email}
              </span>
              <span className="flex font-Lato text-[16px] font-normal leading-6">
                <img src={PhoneIcon} alt="Phone" className="w-[16px] mr-2" />
                {`+91 ${contactNumber}`}
              </span>
              <span className="flex font-Lato text-[16px] font-normal leading-6 capitalize">
                <img
                  src={WebsiteIcon}
                  alt="Website"
                  className="w-[16px] mr-2"
                />
                {companyDisplayName}
              </span>
            </div>


          </div>
        </div> */}
        <div className="md:grid md:grid-cols-1">
          <div className="grid grid-cols-1 md:grid-cols-12 border-[1px] border-[#E8E8E8] rounded-lg p-4 gap-4 relative">
            {/* Profile Image and Seller ID */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <div
                className="w-20 h-20 overflow-hidden rounded-full mb-2 border border-gray-100"
                style={{
                  mask: "",
                }}
              >
                <img
                  src={`${
                    profileImageUrl &&
                    profileImageUrl !== "N/A" &&
                    profileImageUrl !== ""
                      ? profileImageUrl
                      : ProfileIcon
                  }`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-Lato font-normal leading-5 text-[#1C1C1C]">
                Seller ID: {sellerId}
              </span>
            </div>

            {/* Main Profile Information */}
            <div className="md:col-span-4 flex flex-col space-y-2">
              <span className="font-Lato font-semibold text-xl leading-7 capitalize">
                {`${firstName} ${lastName}`}
              </span>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={EmailIcon} alt="Email" className="w-4 mr-2" />
                {email}
              </span>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={PhoneIcon} alt="Phone" className="w-4 mr-2" />
                {`+91 ${contactNumber}`}
              </span>
              <span className="flex items-center font-Lato text-base font-normal leading-6 capitalize">
                <img src={WebsiteIcon} alt="Website" className="w-4 mr-2" />
                {companyDisplayName}
              </span>
            </div>

            {/* Account Details Section */}
            <div className="md:col-span-3 flex flex-col space-y-2">
              <h3 className="font-Lato font-semibold text-lg mb-2">
                Account Details
              </h3>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={EmailIcon} alt="Email" className="w-4 mr-2" />
                {AccDetailsEmail ? (
                  AccDetailsEmail
                ) : (
                  <span className="text-gray-400  text-sm">Not Available</span>
                )}
              </span>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={PhoneIcon} alt="Phone" className="w-4 mr-2" />
                {AccDetailsContactNo ? (
                  `+91 ${AccDetailsContactNo}`
                ) : (
                  <span className="text-gray-400  text-sm">Not Available</span>
                )}
              </span>
            </div>

            {/* Operations Details Section */}
            <div className="md:col-span-3 flex flex-col space-y-2">
              <h3 className="font-Lato font-semibold text-lg mb-2">
                Operations Details
              </h3>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={EmailIcon} alt="Email" className="w-4 mr-2" />
                {OpDetailsEmail ? (
                  OpDetailsEmail
                ) : (
                  <span className="text-gray-400  text-sm">Not Available</span>
                )}
              </span>
              <span className="flex items-center font-Lato text-base font-normal leading-6">
                <img src={PhoneIcon} alt="Phone" className="w-4 mr-2" />
                {OpDetailsContactNo ? (
                  `+91 ${OpDetailsContactNo}`
                ) : (
                  <span className="text-gray-400  text-sm">Not Available</span>
                )}
              </span>
            </div>

            {/* Edit Button */}
            <button
              className="absolute top-4 right-4 cursor-pointer w-5 h-5"
              onClick={() => setShowModal(true)}
            >
              <img src={editIcon} alt="Edit" className="w-full h-full" />
            </button>
          </div>
        </div>

        {!isItLgScreen ? (
          <div>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col drop-shadow-sm rounded-md bg-[#FDF6EA] w-[148px] h-[74px]">
                <LabelComponent
                  label="Wallet Balance"
                  className={"!text-[14px] !leading-5 pl-2 py-2"}
                  info={currentBalance || "0"}
                  classNameInfo="!text-[16px] !leading-[22px] pl-[9px]"
                />
              </div>
              <div className="flex flex-col drop-shadow-sm rounded-md bg-[#F2F6FF] w-[148px] h-[74px]">
                <LabelComponent
                  label="Yaari Points"
                  className={"!text-[14px] !leading-5 pl-2 py-2"}
                  info={yaariPoints || "0"}
                  classNameInfo="!text-[16px] !leading-[22px] pl-[9px]"
                />
              </div>
            </div>

            <div className="flex flex-col w-full font-semibold border-[1px] border-[#E8E8E8] rounded-md h-[86px] p-2 mt-4">
              <div className="flex justify-between mt-4">
                <span className="text-[16px] font-[#1C1C1C]">
                  {activePlan || "Not Assigned Yet"}
                </span>
                {/* <span
                                className="text-[14px] text-[#004EFF] underline underline-offset-4 decoration-[#004EFF]"
                                onClick={() => {
                                    navigate("/subscription/plans");
                                }}
                            >
                                UPGRADE
                            </span> */}
                <OneButton
                  text={"UPGRADE"}
                  className="text-[14px] text-[#004EFF] underline underline-offset-4 decoration-[#004EFF]"
                  onClick={() => navigate("/subscription/plans")}
                  variant="primary"
                />
              </div>
              <div className="flex mt-2">
                <span className="text-[14px] text-[#494949]">
                  {/* Activited since Jun 2023 */}
                  {`Activated Since ${
                    !planStartDate ? "" : date_DD_MMM_YYY(planStartDate)
                  }`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 mt-4 gap-4">
            <div className="flex flex-col justify-center rop-shadow-sm rounded-md bg-[#FDF6EA]">
              <LabelComponent
                label="Wallet Balance"
                className={"pl-3"}
                info={`${`\u20B9`} ${currentBalance || 0}`}
                classNameInfo="pl-3"
              />
            </div>
            <div className="flex flex-col justify-center drop-shadow-sm rounded-md bg-[#F2F6FF]">
              <LabelComponent
                label="Yaari Points"
                className={"pl-3"}
                info={yaariPoints || "0"}
                classNameInfo="pl-3"
              />
            </div>
            <div className="flex flex-col font-semibold border-[1px] border-[#E8E8E8] rounded-md p-4">
              <div className="flex justify-between">
                <span className="text-[20px] font-semibold font-[#1C1C1C]">
                  {activePlan || "Not Assigned Yet"}
                </span>
                {/* <span
                className="text-[14px] md:text-[12px] text-[#fff] border-1 border-[#1C1C1C] font-normal bg-[#1C1C1C] px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                  navigate("/plans");
                }}
              >
                UPGRADE
              </span> */}
                <OneButton
                  text={"UPGRADE"}
                  className=" "
                  onClick={() => {
                    navigate("/subscription/plans");
                  }}
                  variant="primary"
                  textTransform="uppercase"
                />
              </div>
              <div className="flex mt-2">
                <span className="font-Open font-normal text-sm text-[#1C1C1C] leading-[18px]">
                  {`Activated Since ${
                    !planStartDate ? "" : date_DD_MMM_YYY(planStartDate)
                  }`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <RightSideModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        // className="w-[500px] !justify-between !items-stretch !hidden lg:!block"
        className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px] !justify-between !items-stretch"
        wrapperClassName="overflow-y-auto"
      >
        <EditProfile
          onClose={setShowModal}
          getProfileData={getProfileData}
          ProfileDetails={props.ProfileDetails}
        />
      </RightSideModal>
    </>
  );
};
