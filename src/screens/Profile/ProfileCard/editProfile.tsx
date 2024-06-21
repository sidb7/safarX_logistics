import React, { useState } from "react";
import CustomInputBox from "../../../components/Input";
import { textRegex } from "../../../utils/regexCheck";
import InfoCircle from "../../../assets/info-circle.svg";
import OneButton from "../../../components/Button/OneButton";
import { Spinner } from "../../../components/Spinner";
import { POST } from "../../../utils/webService";
import {
  UPDATE_SELLER_NAME,
  UPDATE_SINGLE_SELLER,
} from "../../../utils/ApiUrls";
import toast from "react-hot-toast";

function EditProfile({ onClose, getProfileData }: any) {
  const [sellerData, setsellerData] = useState({
    firstName: "",
    lastName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [signUpError, setSignUpError] = useState<any>({
    firstName: "",
    lastName: "",
  });

  const UpdateProfile = async () => {
    const payload = {
      firstName: sellerData.firstName,
      lastName: sellerData.lastName,
    };
    setIsLoading(true);
    try {
      const { data } = await POST(UPDATE_SELLER_NAME, payload);
      if (data?.success) {
        onClose(false);
        getProfileData();
      } else {
        toast.error(data?.message);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  //UPDATE_SINGLE_SELLER
  return (
    <div className="py-4">
      <div className="mt-2 mb-4 mx-4 text-[24px]">UPDATE PROFILE</div>
      <div className="flex flex-col mx-4 gap-y-6">
        <div>
          <CustomInputBox
            containerStyle=""
            // placeholder=""
            id="fName"
            //commented as by default placeholder text is getting top of the input box
            // tempLabel={true}
            label="First Name"
            maxLength={16}
            onChange={(e) => {
              setSignUpError({
                ...signUpError,
                firstName: "",
              });
              setsellerData({
                ...sellerData,
                firstName: e.target.value,
              });
            }}
            onBlur={(e) => {
              if (!sellerData?.firstName) {
                setSignUpError({
                  ...signUpError,
                  firstName: "Please Enter Your First Name",
                });
              } else if (!textRegex.test(e.target.value)) {
                setSignUpError({
                  ...signUpError,
                  firstName:
                    "Enter Valid name(numbers, special characters not allowed) ",
                });
              } else {
                setSignUpError({
                  ...signUpError,
                  firstName: "",
                });
              }
            }}
          />

          {signUpError.firstName !== "" && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {signUpError.firstName}
              </span>
            </div>
          )}
        </div>
        <div>
          <CustomInputBox
            containerStyle=""
            //commented as by default placeholder text is getting top of the input box
            // tempLabel={true}
            label="Last Name"
            id="lName"
            maxLength={16}
            // placeholder=""
            onChange={(e) => {
              setSignUpError({
                ...signUpError,
                lastName: "",
              });
              setsellerData({
                ...sellerData,
                lastName: e.target.value,
              });
            }}
            onBlur={(e) => {
              if (!sellerData?.lastName) {
                setSignUpError({
                  ...signUpError,
                  lastName: "Please Enter Your Last Name",
                });
              } else if (!textRegex.test(e.target.value)) {
                setSignUpError({
                  ...signUpError,
                  lastName:
                    "Enter Valid name(numbers, special characters not allowed) ",
                });
              } else {
                setSignUpError({
                  ...signUpError,
                  lastName: "",
                });
              }
            }}
          />
          {signUpError.lastName !== "" && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {signUpError.lastName}
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className="lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] px-6 py-4  rounded-tr-[32px] rounded-tl-[32px]  gap-x-5  fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center lg:!py-2 lg:!px-4">
            <Spinner />
          </div>
        ) : (
          <>
            <OneButton
              text="Update"
              onClick={UpdateProfile}
              className=" px-5  "
              variant="primary"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
