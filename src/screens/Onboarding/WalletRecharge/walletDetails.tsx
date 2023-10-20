import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomInputBox from "../../../components/Input";
import CustomDropDown from "../../../components/DropDown";
import CustomButton from "../../../components/Button";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import { POST_ADD_BANK_DETAILS } from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import NavBar from "../../../layout/Old_NavBar";
import { Spinner } from "../../../components/Spinner";

const modalTitle = () => {
  return (
    <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
      <img
        className="my-auto ml-6  h-[25px] object-contain"
        src={CompanyLogo}
        alt="Company Logo"
      />
    </div>
  );
};

const WalletDetails = () => {
  const { isLgScreen } = ResponsiveState();
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState<any>();
  const [bankName, setBankName] = useState<any>();
  const [branchName, setBranchName] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
  const [ifscCode, setIfscCode] = useState<any>();

  const [walletRechargeModalOpen, setWalletRechargeModalOpen] = useState(false);

  const WalletBankDetails = () => {
    const postAccountDetails = async () => {
      setLoading(true);
      const payload = {
        bankName: bankName,
        branchName: branchName,
        bankAccountHolderName: "",
        ifscCode: ifscCode,
        accountType: accountType,
        bankAccountNumber: accountName,
      };

      const datas = await POST(POST_ADD_BANK_DETAILS, payload);

      if (datas?.data?.success) {
        toast.success("Bank Details verified successfully");
        setWalletRechargeModalOpen(true);
        setLoading(false);
        navigate("/onboarding/wallet-payment");
      } else {
        toast.error(datas?.data?.message);
        setLoading(false);
      }
    };

    const dropdownArr = [
      {
        label: "Choose Account Type",
        value: "",
      },
      {
        label: "Saving",
        value: "Saving",
      },
      {
        label: "Current",
        value: "Current",
      },
    ];

    return (
      <div className="h-full w-full">
        {!isLgScreen ? (
          <header className="fixed top-0 z-50 w-full ">
            <NavBar />
          </header>
        ) : (
          modalTitle()
        )}
        <div className="text-center lg:mt-24 mb-4  mt-[148px]">
          <h1 className="font-Lato text-[22px] font-bold leading-7 text-center">
            Welcome to Shipyaari
          </h1>
          <p className="mt-3 text-[16px] font-light leading-[22px] font-Open">
            Please fill your bank details
          </p>
        </div>
        <div className="flex flex-col items-center  p-5 ">
          <div>
            <CustomInputBox
              containerStyle={`lg:!w-auto`}
              value={accountName || ""}
              inputMode="numeric"
              label="Account Number"
              className="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem]"
              maxLength={50}
              onChange={(e) => setAccountName(+e.target.value)}
            />
          </div>
          <div>
            <CustomInputBox
              label="IFSC Code"
              containerStyle={`lg:!w-auto mt-4`}
              maxLength={11}
              value={ifscCode}
              inputType="text"
              className="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem]"
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            />
          </div>

          {/* <div>
            <CustomInputBox
              label="Bank Name"
              containerStyle={`lg:!w-auto mt-4`}
              inputType="text"
              className="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem]"
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div>
            <CustomInputBox
              label="Branch Name"
              containerStyle={`lg:!w-auto mt-4`}
              inputType="text"
              className="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem]"
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <CustomDropDown
              value={accountType}
              options={dropdownArr}
              onChange={(e) => setAccountType(e.target.value)}
              wrapperClass="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem] lg:m-auto "
            />
          </div> */}
          <div className="!w-[18rem] sm:!w-[22rem] md:!w-[28rem] lg:!w-[20rem] m-auto mt-4">
            <CustomButton
              text={"VERIFY BANK"}
              onClick={() => postAccountDetails()}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : isLgScreen ? (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={openModal}
          // onRequestClose={() => setIsRechargeModalOpen(false)}
          className="!h-[36rem] lg:!h-[37.265rem] lg:!w-[31.25rem] !w-[20rem] md:!h-[600px] md:!w-[31.25rem]"
        >
          {WalletBankDetails()}
        </CenterModal>
      ) : (
        WalletBankDetails()
      )}
    </>
  );
};

export default WalletDetails;
