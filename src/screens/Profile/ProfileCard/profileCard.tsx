import { useMediaQuery } from "react-responsive";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import BlackEditIcon from "../../../assets/Profile/BlackEditIcon.svg";
import EmailIcon from "../../../assets/Profile/EmailIcon.svg";
import PhoneIcon from "../../../assets/Profile/PhoneIcon.svg";
import WebsiteIcon from "../../../assets/Profile/WebsiteIcon.svg";
import ProfileIcon from "../../../assets/Profile/ProfileIcon.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  ProfileDetails?: any;
}

const LabelComponent: React.FC<{
  label: string;
  className?: string;
  info: string;
  classNameInfo?: string;
}> = ({ label, className, info, classNameInfo }) => {
  return (
    <div className="flex flex-col">
      <span className={`text-[#1C1C1C] font-semibold ${className}`}>
        {label}
      </span>
      <span className={`text-[16px] text-[#004EFF] ${classNameInfo}`}>
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

  const navigate = useNavigate();

  const isItLgScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <div className="flex flex-col">
      <div className="md:grid md:grid-cols-2">
        <div className="grid grid-cols-3 border-[1px] border-[#E8E8E8] rounded-md mt-4">
          <div className="flex flex-col col-span-1 items-center py-4 ">
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
                src={`${
                  profileImageUrl && profileImageUrl !== "N/A"
                    ? profileImageUrl
                    : ProfileIcon
                }`}
                alt="Profile"
                className="w-[82px] "
              />
            </div>
            <span className="text-[12px] text-[#1C1C1C]">
              Seller ID: {sellerId}
            </span>
          </div>
          <div className="col-span-2 whitespace-nowrap flex flex-col space-y-1 text-[14px] font-normal py-4">
            <span className="flex justify-between">
              {`${firstName} ${lastName}`}
              <img
                src={BlackEditIcon}
                alt=""
                className="pr-4 cursor-pointer"
                onClick={() => navigate("/profile/edit-profile")}
              />
            </span>
            <span className="flex">
              <img src={EmailIcon} alt="Email" className="w-[16px] mr-1" />
              {email}
            </span>
            <span className="flex">
              <img src={PhoneIcon} alt="Phone" className="w-[16px] mr-1" />
              {`+91 ${contactNumber}`}
            </span>
            <span className="flex">
              <img src={WebsiteIcon} alt="Website" className="w-[16px] mr-1" />
              {companyName}
            </span>
          </div>
        </div>
      </div>

      {!isItLgScreen ? (
        <div>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col drop-shadow-sm rounded-md bg-[#F2F6FF] w-[148px] h-[74px]">
              <LabelComponent
                label="Yaari Points"
                className={"text-[14px] pl-2 py-2"}
                info={yaariPoints || "0"}
                classNameInfo="pl-2 py-2"
              />
            </div>
            <div className="flex flex-col drop-shadow-sm rounded-md bg-[#FDF6EA] w-[148px] h-[74px]">
              <LabelComponent
                label="Wallet Balance"
                className={"text-[14px] pl-2 py-2"}
                info={walletBalance || "0"}
                classNameInfo="pl-2 py-2"
              />
            </div>
          </div>

          <div className="flex flex-col w-full font-semibold border-[1px] border-[#E8E8E8] rounded-md h-[86px] p-2 mt-4">
            <div className="flex justify-between mt-4">
              <span className="text-[16px] font-[#1C1C1C]">{activePlan}</span>
              <span className="text-[14px] text-[#004EFF] underline underline-offset-4 decoration-[#004EFF]">
                CHANGE
              </span>
            </div>
            <div className="flex mt-2">
              <span className="text-[14px] text-[#494949]">
                Activited since Jun 2023
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 mt-4 gap-4">
          <div className="flex flex-col justify-center drop-shadow-sm rounded-md bg-[#F2F6FF]">
            <LabelComponent
              label="Yaari Points"
              className={"text-[18px] pl-3"}
              info={yaariPoints || "0"}
              classNameInfo="!text-[28px] !text-[#004EFF] pl-3"
            />
          </div>
          <div className="flex flex-col justify-center rop-shadow-sm rounded-md bg-[#FDF6EA]">
            <LabelComponent
              label="Wallet Balance"
              className={"text-[18px] pl-3"}
              info={walletBalance || "0"}
              classNameInfo="!text-[28px] !text-[#004EFF] pl-3"
            />
          </div>
          <div className="flex flex-col font-semibold border-[1px] border-[#E8E8E8] rounded-md p-4">
            <div className="flex justify-between">
              <span className="text-[20px] font-semibold font-[#1C1C1C]">
                {activePlan}
              </span>
              <span className="text-[14px] md:text-[12px] text-[#fff] border-1 border-[#1C1C1C] font-normal bg-[#1C1C1C] px-4 py-2 rounded cursor-pointer">
                CHANGE
              </span>
            </div>
            <div className="flex mt-2">
              <span className="text-[14px] text-[#494949]">
                Activited since Jun 2023
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
