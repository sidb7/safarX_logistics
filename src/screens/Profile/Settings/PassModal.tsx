import React, { useState } from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import RightSideModal from "../.././../components/CustomModal/customRightModal";
import ServiceButton from "../../../components/Button/ServiceButton";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";

interface PassModalProps {
  isPassModalOpen: boolean;
  setIsPassModalOpen: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
}
interface PasswordVisibility {
  oldPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
}

function PassModal(props: PassModalProps) {
  const { isPassModalOpen, setIsPassModalOpen } = props;
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [viewPassword, setViewPassword] = useState<PasswordVisibility>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const updatePassword = async () => {
    if (password?.newPassword !== password?.confirmNewPassword) {
      return toast.error(
        "Please enter a new password and re-enter the same password!"
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

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setViewPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <RightSideModal
      isOpen={isPassModalOpen}
      onClose={() => {
        setIsPassModalOpen(false);
      }}
      className={` top-[50%] w-full fixed outline-none md:inset-y-0 md:right-0 md:bg-white md:w-1/3 `}
      // wrapperClassName="!justify-start outline-none"
    >
      <div className="flex flex-col w-full p-4 mt-5 ">
        <div className="flex justify-between w-full ">
          <div className="text-[24px] font-normal">Change Password</div>
          <div className="cursor-pointer">
            <img
              src={CrossIcon}
              onClick={() => {
                setIsPassModalOpen(false);
                setViewPassword({
                  oldPassword: false,
                  newPassword: false,
                  confirmNewPassword: false,
                });
              }}
              alt="close Icon"
              width="25px"
            />{" "}
          </div>
        </div>
        <div className="flex flex-col mx-4 mt-4 gap-y-4">
          <CustomInputBox
            label="Old Password"
            inputType={viewPassword.oldPassword ? "text" : "password"}
            isRightIcon={true}
            visibility={viewPassword.oldPassword}
            rightIcon={viewPassword.oldPassword ? CrossEyeIcon : EyeIcon}
            setVisibility={() => togglePasswordVisibility("oldPassword")}
            onClick={() => {}}
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
          />
          <CustomInputBox
            label="New Password"
            inputType={viewPassword.newPassword ? "text" : "password"}
            isRightIcon={true}
            visibility={viewPassword.newPassword}
            rightIcon={viewPassword.newPassword ? CrossEyeIcon : EyeIcon}
            setVisibility={() => togglePasswordVisibility("newPassword")}
            onClick={() => {}}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
          />
          <CustomInputBox
            label="Re-enter New Password"
            inputType={viewPassword.confirmNewPassword ? "text" : "password"}
            isRightIcon={true}
            visibility={viewPassword.confirmNewPassword}
            rightIcon={viewPassword.confirmNewPassword ? CrossEyeIcon : EyeIcon}
            setVisibility={() => togglePasswordVisibility("confirmNewPassword")}
            onClick={() => {}}
            onChange={(e) =>
              setPassword({ ...password, confirmNewPassword: e.target.value })
            }
          />
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }}>
        <footer
          style={{ width: "-webkit-fill-available" }}
          className=" fixed  bottom-0	"
        >
          <div
            style={{
              width: "-webkit-fill-available",
              boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
            }}
            className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
          >
            <ServiceButton
              className="w-[80px]"
              text="BACK"
              onClick={() => setIsPassModalOpen(false)}
            />

            <ServiceButton
              text="SAVE"
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[80px]"
              onClick={() => {
                updatePassword();
              }}
            />
          </div>
        </footer>
      </div>
    </RightSideModal>
  );
}

export default PassModal;
