import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomInputBox from "../../../components/Input";
import CustomDropDown from "../../../components/DropDown";
import CustomButton from "../../../components/Button";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import { POST_ADD_BANK_DETAILS } from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { toast } from "react-hot-toast";
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
  const { isLgScreen, isMdScreen } = ResponsiveState();
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
    //getting the sellerID
    const sellerId = sessionStorage.getItem("sellerId");

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
        navigate("/dashboard/overview");
        //gtm
        window?.dataLayer?.push({
          event: "seller_bank_verification",
          sellerId: sellerId,
          seller_bank_verification: true,
        });
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
      <div
        className={`${
          isMdScreen ? " m-auto !w-[500px]  !h-[600px] " : "w-full !h-full"
        }flex flex-col justify-center relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow h-full" : ""}`}>
          {modalTitle()}

          <div className="customScroll ">
            <div className="text-center md:mt-24 mb-[44px]  mt-[108px]">
              <h1 className="font-Lato text-[22px] font-bold leading-7 text-center">
                Welcome to Shipyaari
              </h1>
              <p className="mt-3 text-[16px] font-light leading-[22px] text-[#494949] font-Open">
                Please fill your bank details
              </p>
            </div>
            <div className="flex flex-col items-center mx-5 md:mx-[90px] ">
              <div className="w-full">
                <CustomInputBox
                  containerStyle={`!w-full`}
                  value={accountName || ""}
                  inputMode="numeric"
                  label="Account Number"
                  className="!w-full "
                  maxLength={50}
                  onChange={(e) => setAccountName(+e.target.value)}
                  id="accountNumber"
                />
              </div>
              <div className="w-full">
                <CustomInputBox
                  label="IFSC Code"
                  containerStyle={`!w-full mt-4`}
                  maxLength={11}
                  value={ifscCode}
                  inputType="text"
                  id="ifscCode"
                  className="!w-full"
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
              <div className="!w-full m-auto mt-4">
                <CustomButton
                  text={"VERIFY BANK"}
                  onClick={() => postAccountDetails()}
                />
              </div>
            </div>
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
      ) : isMdScreen ? (
        <div className="flex h-[100vh]">{WalletBankDetails()}</div>
      ) : (
        WalletBankDetails()
      )}
    </>
  );
};

export default WalletDetails;
