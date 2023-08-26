import { useState } from "react";
import CustomInputBox from "../../../components/Input";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../components/Layout/breadcrum";
import { UPDATE_PASSWORD } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";

export const ChangePassword = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const updatePassword = async () => {
    if (password?.newPassword !== password?.confirmNewPassword) {
      return toast.error(
        "Please enter New Password and Re-enter Password same !"
      );
    }
    const { data }: any = await POST(UPDATE_PASSWORD, {
      oldPassword: password?.oldPassword,
      newPassword: password?.newPassword,
    });

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="h-full">
      <Breadcum label="Change Password" />
      <div className="flex flex-col mx-4 mt-4 gap-y-4">
        <CustomInputBox
          label="Old Password"
          inputType="password"
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
        <CustomInputBox
          label="New Password"
          inputType="password"
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <CustomInputBox
          label="Re-enter New Password"
          inputType="password"
          onChange={(e) =>
            setPassword({ ...password, confirmNewPassword: e.target.value })
          }
        />
      </div>
      <BottomLayout callApi={updatePassword} />
    </div>
  );
};
