import { useMediaQuery } from "react-responsive";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
// import DummyImage from "../../../assets/Profile/DummyImage.svg";
import { useNavigate } from "react-router-dom";
import LabelContainer from "../../../components/LabelContainer";

interface ProfileCardProps {
  BankDetails: any;
}

export const ProfileBankCard = (props: ProfileCardProps) => {
  const { BankDetails } = props;

  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  let kycCheck = sessionStorage.getItem("kycValue") as any;
  kycCheck = JSON.parse(kycCheck);
  kycCheck = kycCheck?.nextStep?.bank;

  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div
        className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
      >
        <div>
          <span className="text-base font-semibold text-[#1C1C1C] ml-4">
            Bank Details
          </span>
        </div>

        {!kycCheck && (
          <div>
            <img
              src={EditIcon}
              alt=""
              className="mr-4 cursor-pointer"
              // onClick={() => navigate("/profile/edit-bank")}
              onClick={() => navigate("/onboarding/wallet-details")}
            />
          </div>
        )}
      </div>

      {!isItLgScreen ? (
        <div>
          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Account Holder Name"
                info={BankDetails?.bankAccountHolderName}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Bank Name"
                info={BankDetails?.bankName}
                className="ml-3"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label=" Branch Name"
                info={BankDetails?.branchName}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="IFSC Code"
                info={BankDetails?.ifscCode}
                className="ml-3"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Account Type"
                info={BankDetails?.accountType}
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Account number"
                info={BankDetails?.bankAccountNumber}
                className="ml-3"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 my-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Cheque Details"
                info={BankDetails?.chequeDetails || "Cheque.png"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-y-8">
          <div className="flex flex-col mt-5 px-5">
            <LabelContainer
              label="Account Holder Name"
              info={BankDetails?.bankAccountHolderName}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="Bank Name"
              info={BankDetails?.bankName}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Branch Name"
              info={BankDetails?.branchName}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="IFSC Code"
              info={BankDetails?.ifscCode}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="Account Type"
              info={BankDetails?.accountType}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] mb-5 px-5">
            <LabelContainer
              label="Account number"
              info={BankDetails?.bankAccountNumber}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Cheque Details"
              info={BankDetails?.chequeDetails || "Cheque.png"}
              className="text-[12px]"
              classNameInfo="!text-[14px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
