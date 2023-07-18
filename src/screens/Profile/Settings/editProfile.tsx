import CustomInputBox from "../../../components/Input";
import EditProfileIcon from "../../../assets/Profile/Setting/EditProfileIcon.svg";
export const EditProfile = () => {
  return (
    <div className="flex flex-col mx-4 mt-4 gap-y-4">
      <div className="flex flex-col justify-center items-center mb-4">
        <img src={EditProfileIcon} alt="Edit Profile" />
        <span className="text-[10px] font-normal text-[#494949]">
          Dimention: 68x68 Pixels | Image Size: 230 KB
        </span>
      </div>
      <CustomInputBox label="Seller ID" />
      <CustomInputBox label="Name" />
      <CustomInputBox label="Email ID" />
      <CustomInputBox label="Contact Number" />
      <CustomInputBox label="Brand Website" />
    </div>
  );
};
