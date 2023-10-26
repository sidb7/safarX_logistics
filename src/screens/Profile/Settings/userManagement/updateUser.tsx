import { useEffect, useState } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../../../../components/Button";
import EyeIcon from "../../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../../assets/Login/crosseye.svg";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import CustomDropDown from "../../../../components/DropDown";
import {
  POST_GET_ALL_ROLES_DATA,
  POST_UPDATE_USER_DATA,
} from "../../../../utils/ApiUrls";

const Buttons = (
  className?: string,
  updateUserHandler?: any,
  disabled?: boolean
) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="grid col-span-2">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px] disabled:bg-[#E8E8E8] disabled:text-[#BBB]"
          text="UPDATE USER"
          onClick={updateUserHandler}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = location.state;
  const [addUserData, setAddUserData] = useState(data);
  const [viewPassWord, setViewPassWord] = useState(false);
  const [roleData, setRoleData] = useState([]);

  const onChangeAddUserCardHandler = (fieldName: any, value: string) => {
    setAddUserData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const copyDataFromHandler = (e: any) => {
    roleData?.forEach((role: any) => {
      if (e.target.value === role.roleId) {
        setAddUserData((prevData: any) => ({
          ...prevData,
          roleId: role.roleId,
          roleName: role.roleName,
        }));
      }
    });
  };

  const getRolesData = async () => {
    try {
      const { data: response }: any = await POST(POST_GET_ALL_ROLES_DATA, {});
      if (response?.success) {
        setRoleData(response.data);
      } else {
        toast.error(response?.message || "N/A");
      }
    } catch (error) {
      toast.error("");
    }
  };

  const updateUserHandler = async () => {
    try {
      const { data: response }: any = await POST(
        POST_UPDATE_USER_DATA,
        addUserData
      );
      if (response?.success) {
        navigate("/settings/user-management");
        toast.success(response?.message || "N/A");
      } else {
        toast.error(response?.message || "N/A");
      }
    } catch (error) {
      toast.error("");
    }
  };

  useEffect(() => {
    getRolesData();
  }, []);

  return (
    <div>
      <Breadcrum
        label="UPDATE USER"
        component={Buttons("", updateUserHandler)}
      />
      <div className="grid grid-cols-3 mx-5 mt-5 gap-6">
        <div>
          <CustomInputBox
            label="First Name"
            value={addUserData?.firstName}
            onChange={(e) =>
              onChangeAddUserCardHandler("firstName", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Last Name"
            value={addUserData?.lastName}
            onChange={(e) =>
              onChangeAddUserCardHandler("lastName", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Password"
            // isDisabled={true}
            value={addUserData?.password}
            inputType={viewPassWord ? "text" : "password"}
            setVisibility={setViewPassWord}
            isRightIcon={false}
            isDisabled={true}
            onClick={() => {}}
            visibility={viewPassWord}
            rightIcon={viewPassWord ? CrossEyeIcon : EyeIcon}
            onChange={(e) =>
              onChangeAddUserCardHandler("password", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Contact Number"
            value={addUserData?.contactNumber}
            onChange={(e) =>
              onChangeAddUserCardHandler("contactNumber", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Email"
            value={addUserData?.email}
            onChange={(e) =>
              onChangeAddUserCardHandler("email", e.target.value)
            }
          />
        </div>
        <div>
          <CustomDropDown
            value={addUserData?.roleId}
            options={roleData?.map((rate: any) => ({
              label: rate.roleName,
              value: rate.roleId,
            }))}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              copyDataFromHandler(e);
            }}
            selectClassName="rounded-md bg-[#FEFEFE]"
            heading="Select Role"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
