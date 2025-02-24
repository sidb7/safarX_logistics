import { useEffect, useState } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/Button";
import EyeIcon from "../../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../../assets/Login/crosseye.svg";
import { toast } from "react-hot-toast";
import { POST } from "../../../../utils/webService";
import CustomDropDown from "../../../../components/DropDown";
import {
  POST_GET_ALL_ROLES_DATA,
  POST_CREATE_NEW_USER,
} from "../../../../utils/ApiUrls";
import { findByRole } from "@testing-library/react";
import OneButton from "../../../../components/Button/OneButton";

const Buttons = (
  className?: string,
  addUserHandler?: any,
  disabled?: boolean
) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="grid col-span-2">
        {/* <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px] disabled:bg-[#E8E8E8] disabled:text-[#BBB]"
          text="ADD USER"
          onClick={addUserHandler}
          disabled={disabled}
        /> */}
        <OneButton
          className=""
          text="ADD USER"
          onClick={addUserHandler}
          variant="primary"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

function AddUser() {
  const navigate = useNavigate();
  const [addUserData, setAddUserData] = useState({
    roleId: "",
    roleName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    contactNumber: "",
  });
  const [viewPassWord, setViewPassWord] = useState(false);
  const [roleData, setRoleData] = useState([]);

  const onChangeAddUserCardHandler = (fieldName: any, value: string) => {
    setAddUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
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

  const addUserHandler = async () => {
    try {
      const { data: response }: any = await POST(
        POST_CREATE_NEW_USER,
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
      <Breadcrum label="ADD USER" component={Buttons("", addUserHandler)} />
      <div className="flex flex-col md:grid md:grid-cols-3 mx-5 mt-5 gap-6">
        <div>
          <CustomInputBox
            label="First Name"
            value={addUserData.firstName}
            onChange={(e) =>
              onChangeAddUserCardHandler("firstName", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Last Name"
            value={addUserData.lastName}
            onChange={(e) =>
              onChangeAddUserCardHandler("lastName", e.target.value)
            }
          />
        </div>
        <div>
          <CustomDropDown
            value={addUserData.roleId}
            options={roleData
              ?.filter((rate: any) => rate.roleName !== "SUPERUSER")
              .map((rate: any) => ({
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
        <div>
          <CustomInputBox
            label="Contact Number"
            value={addUserData.contactNumber}
            onChange={(e) =>
              onChangeAddUserCardHandler("contactNumber", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Email"
            value={addUserData.email}
            onChange={(e) =>
              onChangeAddUserCardHandler("email", e.target.value)
            }
          />
        </div>
        <div>
          <CustomInputBox
            label="Password"
            minLength={8}
            maxLength={16}
            value={addUserData?.password}
            inputType={viewPassWord ? "text" : "password"}
            setVisibility={setViewPassWord}
            isRightIcon={true}
            onClick={() => {}}
            visibility={viewPassWord}
            rightIcon={viewPassWord ? CrossEyeIcon : EyeIcon}
            onChange={(e) =>
              onChangeAddUserCardHandler("password", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
