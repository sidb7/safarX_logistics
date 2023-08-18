import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import LabelContainer from "../../../components/LabelContainer";

interface KYCProps {
  KycDetails: any;
}

export const ProfileKycCard = (props: KYCProps) => {
  const aadharFile = props?.KycDetails?.aadharFile;
  const aadharNumber = props?.KycDetails?.aadharNumber;
  const address = props?.KycDetails?.address;
  const firstName = props?.KycDetails?.firstName;
  const gstFile = props?.KycDetails?.gstFile;
  const gstNumber = props?.KycDetails?.gstNumber;
  const lastName = props?.KycDetails?.lastName;
  const middleName = props?.KycDetails?.middleName;
  const panFile = props?.KycDetails?.panFile;
  const panNumber = props?.KycDetails?.panNumber;

  const city = props?.KycDetails?.address?.city;
  const country = props?.KycDetails?.address?.country;
  const district = props?.KycDetails?.address?.district;
  const locality = props?.KycDetails?.address?.locality;
  const pincode = props?.KycDetails?.address?.pincode;
  const plotNumber = props?.KycDetails?.address?.plotNumber;
  const state = props?.KycDetails?.address?.state;

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
            className="mr-4"
            onClick={() =>
              navigate("/profile/profileEdit-kyc", {
                state: { KycDetailsProps: props?.KycDetails },
              })
            }
          />
        </div>
      </div>

      {!isItLgScreen ? (
        <div>
          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="First Name" info={firstName} />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Last Name"
                className={"ml-3"}
                classNameInfo="ml-3"
                info={lastName}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="Middle Name" info={middleName} />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="GST Details"
                className={"ml-3"}
                info={gstNumber}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="Aadhar Details" info={aadharNumber} />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="PAN Details"
                className={"ml-3"}
                info={panNumber}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="Plot no, Sector" info={plotNumber} />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Locality, Landmark"
                className={"ml-3"}
                info={locality}
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 my-2">
            <div className="flex flex-col">
              <LabelContainer
                label="City, Pin code"
                info={`${city}, ${pincode} `}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="State, Country"
                className="ml-3"
                info={`${state} , ${country}`}
                classNameInfo="ml-3"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-y-8">
          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="First Name"
              className="text-[12px]"
              info={firstName}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Last Name"
              className="text-[12px]"
              info={lastName}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Middle Name"
              className="text-[12px]"
              info={middleName}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="GST Details"
              className="text-[12px]"
              info={gstNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Aadhar Details"
              className="text-[12px]"
              info={aadharNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="PAN Details"
              className="text-[12px]"
              info={panNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Plot no, Sector"
              className="text-[12px]"
              info={plotNumber}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Locality, Landmark"
              className="text-[12px]"
              info={locality}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="City, Pin code"
              className="text-[12px]"
              info={`${city}, ${pincode} `}
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="State, Country"
              className="text-[12px]"
              info={`${state} , ${country}`}
              classNameInfo="!text-[14px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
