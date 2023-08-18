import { useLocation } from "react-router-dom";
import CustomDropDown from "../../../components/DropDown";
import CustomInputBox from "../../../components/Input";
import { useState } from "react";
import { POST } from "../../../utils/webService";
import { UPDATE_SELLER } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../components/Layout/breadcum";

const options = [
  { value: "Saving", label: "Saving" },
  { value: "Current", label: "Current" },
];
export const EditProfileBank = () => {
  const { BankDetails } = useLocation().state;
  const [editBankDetails, setEditBankDetails] = useState(BankDetails);

  const changeHandler = (key: string, event: any) => {
    setEditBankDetails({ ...editBankDetails, [key]: event.target.value });
  };

  const updateBankDetails = async () => {
    const { data } = await POST(UPDATE_SELLER, {
      data: { bankDetails: editBankDetails },
    });
    if (data.success) {
      setEditBankDetails(data?.data?.bankDetails);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="h-full">
      <Breadcum label="Bank Details" />

      <div className="mx-4 mt-4 space-y-4 lg:grid lg:grid-cols-3 gap-4">
        <CustomInputBox
          containerStyle={"self-end"}
          label="Account holder name"
          className="!font-normal"
          value={editBankDetails?.bankAccountHolderName}
          onChange={(e) => changeHandler("bankAccountHolderName", e)}
        />
        <CustomInputBox
          label="Bank name"
          className="!font-normal"
          value={editBankDetails?.bankName}
          onChange={(e) => changeHandler("bankName", e)}
        />
        <CustomInputBox
          label="Branch name"
          className="!font-normal"
          value={editBankDetails?.branchName}
          onChange={(e) => changeHandler("branchName", e)}
        />
        <CustomInputBox
          label="IFSC code"
          className="!font-normal"
          value={editBankDetails?.ifscCode}
          onChange={(e) => changeHandler("ifscCode", e)}
        />
        <CustomDropDown
          options={options}
          value={editBankDetails?.accountType}
          onChange={(e) => changeHandler("accountType", e)}
        />
        <CustomInputBox
          label="Account number"
          className="!font-normal"
          value={editBankDetails?.bankAccountNumber}
          onChange={(e) => changeHandler("bankAccountNumber", e)}
        />
      </div>
      <BottomLayout callApi={updateBankDetails} />
    </div>
  );
};
