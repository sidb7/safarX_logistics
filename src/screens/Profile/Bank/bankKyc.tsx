import CustomDropDown from "../../../components/DropDown";
import CustomInputBox from "../../../components/Input";

const options = [
  { value: "Saving", label: "Saving" },
  { value: "Current", label: "Current" },
];
export const EditProfileBank = () => {
  return (
    <div className="mx-4 mt-8 space-y-4">
      <CustomInputBox label="Account holder name" />
      <CustomInputBox label="Bank name" />
      <CustomInputBox label="Branch name" />
      <CustomInputBox label="IFSC code" />
      <CustomDropDown options={options} onChange={() => {}} value=""/>
      <CustomInputBox label="Account number" />
    </div>
  );
};
