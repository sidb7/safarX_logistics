import CustomInputBox from "../../../components/Input";

export const ChangePassword = () => {
  return (
    <div className="flex flex-col mx-4 mt-8 gap-y-4">
      <CustomInputBox label="Email" className=""/>
      <CustomInputBox label="New Password" />
      <CustomInputBox label="Re-enter New Password" />
    </div>
  );
};
