import React, { useState } from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import InformativeIcon from "../../../assets/I icon.svg";
import CustomInputBox from "../../../components/Input";
import RightSideModal from "../.././../components/CustomModal/customRightModal";
import ServiceButton from "../../../components/Button/ServiceButton";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import { strongpasswordRegex } from "../../../utils/regexCheck";
import InfoCircle from "../../../assets/info-circle.svg";

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

  const [passwordError, setPasswordError] = useState({
    newPassword: "",
    confirmNewPassword: "",
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

  function validatePassword(password: string) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=;':"|,.<>/?])([A-Za-z\d!@#$%^&*()_+\-=;':"|,.<>/?]+)$/;
    if (password.length < 8) {
      return "Enter at least 8 characters.";
    }
    if (!passwordRegex.test(password)) {
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      }
      if (!/[!@#$%^&*()_+\-=;':"|,.<>/?]+/.test(password)) {
        return "Password must contain at least one special character.";
      }
      if (!/[0-9]+/.test(password)) {
        return "Password must contain at least one number.";
      }
      if (/\s/.test(password)) {
        return "Password must not contain spaces.";
      }
    }

    if (password.length < 8) {
      return "Enter at least 8 characters.";
    }

    if (password.length > 16) {
      return "Password should be less than 16 characters.";
    }

    return "";
  }

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
            maxLength={16}
            inputType={viewPassword.oldPassword ? "text" : "password"}
            isRightIcon={true}
            visibility={viewPassword.oldPassword}
            rightIcon={viewPassword.oldPassword ? EyeIcon : CrossEyeIcon}
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
            isInfoIcon={true}
            informativeIcon={InformativeIcon}
            tooltipContent="Password should be 8 to 16 Character with combination of Alpha Numeric and Special Character, One Upper and Lowercase"
            maxLength={16}
            visibility={viewPassword.newPassword}
            rightIcon={viewPassword.newPassword ? EyeIcon : CrossEyeIcon}
            setVisibility={() => togglePasswordVisibility("newPassword")}
            onClick={() => {}}
            onChange={(e) => {
              setPassword({ ...password, newPassword: e.target.value });
              if (
                !strongpasswordRegex.test(e.target.value) ||
                password.newPassword.length < 8 ||
                password.newPassword.length > 16
              ) {
                const isPasswordError = validatePassword(e.target.value);

                setPasswordError({
                  ...passwordError,
                  newPassword: isPasswordError,
                });
              } else {
                setPasswordError({
                  ...passwordError,
                  newPassword: "",
                });
              }
            }}
          />
          {passwordError.newPassword !== "" && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {passwordError.newPassword}
              </span>
            </div>
          )}
          <CustomInputBox
            label="Re-enter New Password"
            inputType={viewPassword.confirmNewPassword ? "text" : "password"}
            isRightIcon={true}
            maxLength={16}
            visibility={viewPassword.confirmNewPassword}
            rightIcon={viewPassword.confirmNewPassword ? EyeIcon : CrossEyeIcon}
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
                setIsPassModalOpen(false);
              }}
            />
          </div>
        </footer>
      </div>
    </RightSideModal>
  );
}

export default PassModal;
