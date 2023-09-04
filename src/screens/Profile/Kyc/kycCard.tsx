import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import LabelContainer from "../../../components/LabelContainer";

interface KYCProps {
  KycDetails: any;
}

export const ProfileKycCard = (props: KYCProps) => {
  const { KycDetails } = props;

  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div
        className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
      >
        <div>
          <span className="text-base font-semibold text-[#1C1C1C] ml-4">
            KYC Details
          </span>
        </div>
        <div>
          <img
            src={EditIcon}
            alt=""
            className="mr-4 cursor-pointer"
            onClick={() => navigate("/profile/edit-kyc")}
          />
        </div>
      </div>

      {!isItLgScreen ? (
        <div>
          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="Full Name" info={KycDetails?.fullName} />
            </div>

            {/* <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Last Name"
                className={"ml-3"}
                classNameInfo="ml-3"
                info={KycDetails?.lastName}
              />
            </div> */}
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Aadhar Details"
                info={KycDetails?.aadharNumber}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="GST Details"
                className={"ml-3"}
                info={KycDetails?.gstNumber}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="PAN Details"
                info={KycDetails?.panNumber}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Plot no, Sector"
                info={KycDetails?.address?.plotNumber}
                className={"ml-3"}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Locality, Landmark"
                info={KycDetails?.address?.locality}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="City, Pin code"
                info={`${KycDetails?.address?.city}, ${KycDetails?.address?.pincode} `}
                className={"ml-3"}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 my-2">
            <div className="flex flex-col">
              <LabelContainer
                label="State, Country"
                info={`${KycDetails?.address?.state} , ${KycDetails?.address?.country}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-y-8">
          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="First Name"
              className="text-[12px]"
              info={KycDetails?.fullName}
              classNameInfo="!text-[14px]"
            />
          </div>

          {/* <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Last Name"
              className="text-[12px]"
              info={KycDetails?.lastName}
              classNameInfo="!text-[14px]"
            />
          </div> */}

          {/* <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Middle Name"
              className="text-[12px]"
              info={KycDetails?.middleName}
              classNameInfo="!text-[14px]"
            />
          </div> */}

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="GST Details"
              className="text-[12px]"
              info={KycDetails?.gstNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Aadhar Details"
              className="text-[12px]"
              info={KycDetails?.aadharNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="PAN Details"
              className="text-[12px]"
              info={KycDetails?.panNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Plot no, Sector"
              className="text-[12px]"
              info={KycDetails?.address?.plotNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Locality, Landmark"
              className="text-[12px]"
              info={KycDetails?.address?.locality}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="City, Pin code"
              className="text-[12px]"
              info={`${KycDetails?.address?.city}, ${KycDetails?.address?.pincode} `}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="State, Country"
              className="text-[12px]"
              info={`${KycDetails?.address?.state} , ${KycDetails?.address?.country}`}
              classNameInfo="!text-[14px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
