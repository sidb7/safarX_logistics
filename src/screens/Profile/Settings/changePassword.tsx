import { useState } from "react";
import CustomInputBox from "../../../components/Input";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { UPDATE_PASSWORD } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";

export const ChangePassword = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [viewPassWord, setViewPassWord] = useState(false);

  const updatePassword = async () => {
    if (password?.newPassword !== password?.confirmNewPassword) {
      return toast.error(
        "Please enter a new password and re-enter the same password !"
      );
    }
    const { data }: any = await POST(UPDATE_PASSWORD, {
      oldPassword: password?.oldPassword,
      newPassword: password?.newPassword,
    });

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  };
  console.log("password", password);
  return (
    <div className="h-full">
      <Breadcrum label="Change Password" />
      <div className="flex flex-col mx-4 mt-4 gap-y-4">
        <CustomInputBox
          inputType={viewPassWord ? "text" : "password"}
          isRightIcon={true}
          label="Old Password"
          maxLength={12}
          visibility={viewPassWord}
          rightIcon={viewPassWord ? EyeIcon : CrossEyeIcon}
          setVisibility={setViewPassWord}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
        <CustomInputBox
          label="New Password"
          inputType="password"
          maxLength={12}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <CustomInputBox
          label="Re-enter New Password"
          inputType="password"
          maxLength={12}
          onChange={(e) =>
            setPassword({ ...password, confirmNewPassword: e.target.value })
          }
        />
      </div>
      <BottomLayout callApi={updatePassword} />
    </div>
  );
};
