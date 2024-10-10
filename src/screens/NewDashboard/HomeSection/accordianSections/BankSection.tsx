import React, { useState } from "react";
import CustomInputBox from "../../../../components/Input";
import { POST_ADD_BANK_DETAILS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import OneButton from "../../../../components/Button/OneButton";
import CustomRadioButton from "../../../../components/RadioButton/Index";

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
          <p className="font-Open text-[#323232] text-sm font-normal leading-[18px] tracking-wide">
            Do you accept COD transactions for your orders?
          </p>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <CustomRadioButton
              name="Yes"
              value="yes"
              // checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              style={{ accentColor: "black" }}
            />
            <span className="font-Open text-sm font-normal leading-[18px] ">
              Yes
            </span>
          </div>
          <div className="flex items-center">
            <CustomRadioButton
              name="No"
              value="no"
              // checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              style={{ accentColor: "black" }}
            />
            <span className="font-Open text-sm font-normal leading-[18px] ">
              No
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex md:flex-row gap-5">
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
