import CustomDropDown from "../../../components/DropDown";
import CustomInputBox from "../../../components/Input";

const options = [
  { value: "Saving", label: "Saving" },
  { value: "Current", label: "Current" },
];
export const EditProfileBank = () => {
  return (
    <div className="mx-4 mt-4 space-y-4 lg:grid lg:grid-cols-3 gap-4">
      <CustomInputBox
        containerStyle={"self-end"}
        label="Account holder name"
        className="!font-normal"
      />
      <CustomInputBox label="Bank name" className="!font-normal" />
      <CustomInputBox label="Branch name" className="!font-normal" />
      <CustomInputBox label="IFSC code" className="!font-normal" />
      <CustomDropDown options={options} onChange={() => {}} value="" />
      <CustomInputBox label="Account number" className="!font-normal" />
    </div>
  );
};
