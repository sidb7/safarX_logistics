import React, { useState, useMemo } from "react";
import CustomInputBox from "../../../../components/Input";
import { POST_ADD_BANK_DETAILS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import OneButton from "../../../../components/Button/OneButton";
import CustomRadioButton from "../../../../components/RadioButton/Index";

interface IBankSectionProps {
  onNoSelected: any;
  bankLoadingState: any;
  setBankLoadingState: any;
}

const BankSection: React.FunctionComponent<IBankSectionProps> = ({
  onNoSelected,
  bankLoadingState,
  setBankLoadingState,
}) => {
  const [codAccepted, setCodAccepted] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [ifscCode, setIfscCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState<any>();
  const [branchName, setBranchName] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
  const [errors, setErrors] = useState({
    accountName: "",
    ifscCode: "",
  });

  // Validation functions
  const validateAccountNumber = (value: string) => {
    if (!value) return "Account number is required";
    if (value.length < 9 || value.length > 18)
      return "Account number must be between 9 and 18 digits";
    if (!/^\d+$/.test(value)) return "Account number must contain only digits";
    return "";
  };

  const validateIFSC = (value: string) => {
    if (!value) return "IFSC code is required";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value))
      return "Invalid IFSC code format";
    return "";
  };

  // Handle account number change with validation
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setAccountName(value);
    setErrors((prev) => ({
      ...prev,
      accountName: validateAccountNumber(value),
    }));
  };

  // Handle IFSC code change with validation
  const handleIFSCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setIfscCode(value);
    setErrors((prev) => ({
      ...prev,
      ifscCode: validateIFSC(value),
    }));
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return accountName && ifscCode && !errors.accountName && !errors.ifscCode;
  }, [accountName, ifscCode, errors]);

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

    try {
      const datas = await POST(POST_ADD_BANK_DETAILS, payload);
      setBankLoadingState(true);
      if (datas?.data?.success) {
        toast.success("Bank Details verified successfully");
        setLoading(false);
        window?.dataLayer?.push({
          event: "seller_bank_verification",
          seller_bank_verification: true,
        });
        setBankLoadingState(false);
      } else {
        toast.error(datas?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      setLoading(false);
      setBankLoadingState(true);
    }
  };

  const handleRadioChange = (value: string) => {
    setCodAccepted(value);
    if (value === "no") {
      onNoSelected();
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
        <div className="flex gap-x-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleRadioChange("yes")}
          >
            <CustomRadioButton
              name="codAccepted"
              value="yes"
              checked={codAccepted === "yes"}
              onChange={() => handleRadioChange("yes")}
              inputClassName="h-full m-2"
              style={{ accentColor: "black" }}
            />
            <span className="font-Open text-sm font-normal leading-[18px]">
              Yes
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleRadioChange("no")}
          >
            <CustomRadioButton
              name="codAccepted"
              value="no"
              checked={codAccepted === "no"}
              onChange={() => handleRadioChange("no")}
              inputClassName="h-full m-2"
              style={{ accentColor: "black" }}
            />
            <span className="font-Open text-sm font-normal leading-[18px]">
              No
            </span>
          </div>
        </div>
        {codAccepted === "yes" && (
          <>
            <div className="flex flex-col md:flex md:flex-row gap-5">
              <div className="min-w-[240px]">
                <CustomInputBox
                  containerStyle={`lg:!w-auto`}
                  label="Account Number"
                  id="accountNumber"
                  inputType="text"
                  inputMode="numeric"
                  value={accountName}
                  maxLength={18}
                  labelClassName="!font-Open"
                  className={` ${
                    errors.accountName && "!border-[#F35838]"
                  } md:!w-[320px] !font-Open`}
                  onChange={handleAccountNumberChange}
                />
                {errors.accountName && (
                  <div className="flex items-center gap-x-1 mt-1 ">
                    <img
                      src={"path_to_error_icon"}
                      alt=""
                      width={10}
                      height={10}
                    />
                    <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                      {errors.accountName}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-[240px]">
                <CustomInputBox
                  label="IFSC Code"
                  containerStyle={`lg:!w-auto`}
                  maxLength={11}
                  value={ifscCode}
                  inputType="text"
                  id="ifscCode"
                  className={`${
                    errors.ifscCode && "!border-[#F35838]"
                  } md:!w-[320px] !font-Open`}
                  onChange={handleIFSCChange}
                />
                {errors.ifscCode && (
                  <div className="flex items-center gap-x-1 mt-1 ">
                    <img
                      src={"path_to_error_icon"}
                      alt=""
                      width={10}
                      height={10}
                    />
                    <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                      {errors.ifscCode}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-start pt-1">
              <OneButton
                text={loading ? "VERIFYING..." : "VERIFY"}
                onClick={postAccountDetails}
                variant="tertiary"
                className="!bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid || loading}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BankSection;
