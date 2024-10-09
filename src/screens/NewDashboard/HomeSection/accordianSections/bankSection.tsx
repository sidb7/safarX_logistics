import React, { useState } from "react";
import CustomInputBox from "../../../../components/Input";
import { POST_ADD_BANK_DETAILS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import OneButton from "../../../../components/Button/OneButton";

interface IBankSectionProps {}

const BankSection: React.FunctionComponent<IBankSectionProps> = (props) => {
  const [accountName, setAccountName] = useState<any>();
  const [ifscCode, setIfscCode] = useState<any>();
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState<any>();
  const [branchName, setBranchName] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
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
      // setWalletRechargeModalOpen(true);
      setLoading(false);
      // navigate("/dashboard/overview");
      // navigate("/orders/quick-order-place");
      //gtm
      window?.dataLayer?.push({
        event: "seller_bank_verification",
        // sellerId: sellerId, this needs to be confirmed and get the seller id
        seller_bank_verification: true,
      });
    } else {
      toast.error(datas?.data?.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="pt-4">
          <p className="font-Open text-[15px] lg:text-base font-normal leading-8 lg:!leading-[26px]">
            are you a COD Seller ?
          </p>
        </div>
        <div className="flex gap-5">
          <div className="min-w-[240px]">
            <CustomInputBox
              containerStyle={`lg:!w-full`}
              value={accountName || ""}
              inputMode="numeric"
              label="Account Number"
              className="!w-full "
              maxLength={50}
              onChange={(e) => setAccountName(e.target.value)}
              id="accountNumber"
            />
          </div>
          <div className="min-w-[240px]">
            <CustomInputBox
              label="IFSC Code"
              containerStyle={`lg:!w-full`}
              maxLength={11}
              value={ifscCode}
              inputType="text"
              id="ifscCode"
              className="!w-full"
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex justify-start pt-1">
          <OneButton
            text={"VERIFY"}
            onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default BankSection;
