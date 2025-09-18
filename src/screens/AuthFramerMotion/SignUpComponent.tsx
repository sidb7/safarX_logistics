// Login.jsx
import { useEffect, useState } from "react";
import CustomInputBox from "../../components/Input";
import { GoogleLogin } from "@react-oauth/google";
import TrackCardComponent from "../TrackCard/TrackCardComponent";
import EyeIcon from "../../assets/Login/eye.svg";
import CrossEyeIcon from "../../assets/Login/crosseye.svg";
import InfoCircle from "../../assets/info-circle.svg";
import {
  AMAZON_REDIRECT_URL,
  LARGE_LOGO,
  POST_SIGN_IN_URL,
  POST_SIGN_IN_WITH_GOOGLE_URL,
  POST_SIGN_UP_URL,
  POST_SIGN_UP_WITH_GOOGLE_URL,
  POST_VERIFY_COUPON,
  REACT_APP_GTM_ID,
  VALIDATE_USER_TOKEN,
} from "../../utils/ApiUrls";
import { useErrorBoundary } from "react-error-boundary";
import { POST } from "../../utils/webService";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { ResponsiveState } from "../../utils/responsiveState";
import { constructNavigationObject, getQueryJson } from "../../utils/utility";
import { signInUser } from "../../redux/reducers/signInReducer";
import sessionManager from "../../utils/sessionManager";
import { socketCallbacks } from "../../Socket";
import toast from "react-hot-toast";
import axios from "axios";
import { signUpUser } from "../../redux/reducers/signUpReducer";
import { strongpasswordRegex, textRegex } from "../../utils/regexCheck";
import OneButton from "../../components/Button/OneButton";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpComponent() {
  const navigate = useNavigate();

  const { genReferralCode } = useParams();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [viewPassWord, setViewPassWord] = useState(false);
  const [loadingForCoupon, setLoadingForCoupon] = useState(false);
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  const [sellerData, setsellerData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    referalCode: genReferralCode || "",
    couponCode: "",
  });

  const [signUpError, setSignUpError] = useState<any>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    referalCode: "",
    couponCode: "",
  });

  const signUpOnClick = async (value: any) => {
    try {
      let signupUtm = {
        utm_source: "",
        utm_campaign: "",
        utm_medium: "",
      };

      let payload = {
        sellerData: {
          ...value,
          otherDetails: {
            signupUtm: {
              ...signupUtm,
              ...getQueryJson(),
            },
          },
        },
      };

      // Sentry.setUser({
      //   email: sellerData?.email,
      // });

      setLoading(true);
      const { data: response } = await POST(`${POST_SIGN_UP_URL}`, payload);

      // localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

      //setting the local storage  with site signing up to show in dataslayer
      localStorage.setItem("key", "Site");
      dispatch(signUpUser(sellerData));
      if (response?.success === true) {
        const { sessionId, sellerInfo } = sessionManager({
          ...response?.data[0],
          ...sellerData,
        });
        const { sellerId, email, isReturningUser, name, nextStep } =
          response?.data[0];
        window?.dataLayer?.push({
          event: "reg1_ClickedOnSignup",
          seller_email: value?.email,
          sellerId: value?.sellerId,
          seller_name: value.name,
          seller_kyc: nextStep?.kyc,
          seller_bank_verification_done: nextStep?.bank,
          isReturningUser: isReturningUser,
        });

        // localStorage.setItem("userInfo", JSON.stringify(sellerData));

        setLoading(false);
        const navigationObject = constructNavigationObject(
          "/onboarding/sendotp",
          window.location.search
        );
        navigate(navigationObject);
        // navigate("/onboarding/sendotp");
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const signUpWithGoogle = async (googleData: any) => {
    try {
      let signupUtm = {
        utm_source: "",
        utm_campaign: "",
        utm_medium: "",
      };

      const payload = {
        clientId: googleData?.clientId,
        credential: googleData?.credential,
        otherDetails: {
          signupUtm: {
            ...signupUtm,
            ...getQueryJson(),
          },
        },
      };
      setLoading(true);
      const { data: response } = await POST(
        POST_SIGN_UP_WITH_GOOGLE_URL,
        payload
      );
      if (response?.success === true) {
        // localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
        sessionManager(response.data[0]);
        dispatch(signUpUser(response.data[0]));
        setLoading(false);
        const navigationObject = constructNavigationObject(
          "/onboarding/sendotp",
          window.location.search
        );
        navigate(navigationObject);
        // navigate("/onboarding/sendotp");
        //setting the local storage  with google signing up to show in dataslayer
        localStorage.setItem("key", "Google");
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const handleVerifyCoupon = async () => {
    try {
      setLoadingForCoupon(true);
      let payload = {
        couponCode: sellerData.couponCode,
      };
      const { data: response } = await POST(POST_VERIFY_COUPON, payload);
      if (response?.success === true) {
        toast.success(response?.message);
        setLoadingForCoupon(false);
        setIsCouponVerified(true);
      } else {
        toast.error(response?.message);
        setLoadingForCoupon(false);
      }
    } catch (error) {
      return error;
    }
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

  // const validatePassword = (value: any) => {
  //   if (!value) return "Please enter your password";
  //   if (value.length < 6) return "Password must be at least 6 characters";
  //   return "";
  // };

  return (
    <div className="px-6 py-5 w-full border shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-1 font-Open">SIGN UP</h2>
      <div className="w-full">
        {/* First + Last Name */}
        <div className="w-full flex gap-2">
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="First Name"
              id="firstName"
              name="firstName"
              inputType="text"
              fixedLabel
              value={sellerData?.firstName}
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
                    firstName: "Enter a valid name. ",
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
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="Last Name"
              id="lastName"
              name="lastName"
              inputType="text"
              fixedLabel
              value={sellerData?.lastName}
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
                    lastName: "Enter a valid name",
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

        {/* Email */}
        <CustomInputBox
          containerStyle="mt-4"
          className="!h-[35px]"
          label="Email"
          id="email"
          name="email"
          inputType="email"
          fixedLabel
          value={sellerData?.email}
          onChange={(e) => {
            setSignUpError({
              ...signUpError,
              email: "",
            });
            setsellerData({
              ...sellerData,
              email: e.target.value,
            });
          }}
          onBlur={(e) => {
            if (!sellerData?.email) {
              setSignUpError({
                ...signUpError,
                email: "Please Enter Your Email ID",
              });
            } else if (!emailRegex.test(e.target.value)) {
              setSignUpError({
                ...signUpError,
                email: "Enter a valid Email id",
              });
            } else {
              setSignUpError({
                ...signUpError,
                email: "",
              });
            }
          }}
        />
        {signUpError.email !== "" && (
          <div className="flex items-center gap-x-1 mt-1">
            <img src={InfoCircle} alt="" width={10} height={10} />
            <span className="font-normal text-[#F35838] text-xs leading-3">
              {signUpError.email}
            </span>
          </div>
        )}
        {/* Password */}
        <CustomInputBox
          containerStyle="mt-4"
          className="!h-[35px]"
          label="Password"
          id="password"
          name="password"
          inputType={viewPassWord ? "text" : "password"}
          minLength={8}
          maxLength={16}
          fixedLabel={true}
          tooltipContent="Password should be 8 to 16 Character with combination of Alpha Numeric and Special Character, One Upper and Lowercase"
          isRightIcon={true}
          isInfoIcon={true}
          visibility={viewPassWord}
          onClick={() => {}}
          rightIcon={viewPassWord ? CrossEyeIcon : EyeIcon}
          setVisibility={setViewPassWord}
          onChange={(e) => {
            setSignUpError({
              ...signUpError,
              password: "",
            });
            setsellerData({
              ...sellerData,
              password: e.target.value,
            });
          }}
          onBlur={(e) => {
            if (
              !strongpasswordRegex.test(e.target.value) ||
              sellerData.password.length < 8 ||
              sellerData.password.length > 16
            ) {
              const passwordError = validatePassword(e.target.value);

              setSignUpError({
                ...signUpError,
                password: passwordError,
              });
            } else {
              setSignUpError({
                ...signUpError,
                password: "",
              });
            }
          }}
        />

        {/* Referral + Coupon Code (side by side) */}
        <CustomInputBox
          containerStyle="mt-4 flex-1"
          className="!h-[35px]"
          label="Referral code"
          id="referralCode"
          name="referralCode"
          inputType="text"
          fixedLabel
          maxLength={20}
          value={sellerData.referalCode}
          onChange={(e) => {
            setsellerData({
              ...sellerData,
              referalCode: e.target.value,
            });
          }}
          isDisabled={false}
        />
        <div className="w-full flex gap-2">
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="Coupon code"
              id="couponCode"
              name="couponCode"
              inputType="text"
              fixedLabel
              value={sellerData.couponCode}
              onChange={(e) => {
                const upperCaseValue = e.target.value.toUpperCase();
                setSignUpError({
                  ...signUpError,
                  couponCode: "",
                });
                setsellerData({
                  ...sellerData,
                  couponCode: upperCaseValue,
                });
              }}
              isDisabled={false}
            />
          </div>
          <div className="w-1/2">
            <OneButton
              className="w-full h-[35px] items-center flex justify-center  hover:bg-[#160783] border border-[#160783] !text-[#160783] rounded-lg hover:shadow-md transition duration-200 hover:!text-white py-2 mt-4"
              onClick={handleVerifyCoupon}
              text={`${loadingForCoupon ? "Verifying..." : "Verify"}`}
              variant="primary"
              disabled={loadingForCoupon}
              backgroundColour=""
            />
          </div>
        </div>
      </div>

      {/* Login Button */}

      <div>
        <OneButton
          className="rounded-lg font-Open w-full hover:shadow-md transition duration-200 text-white py-2  mt-2"
          onClick={(e: any) => signUpOnClick(sellerData)}
          text="    Sign Up"
          disabled={
            sellerData.email == "" ||
            sellerData.password == "" ||
            sellerData.firstName == "" ||
            sellerData.lastName == "" ||
            signUpError.email != "" ||
            signUpError.password != "" ||
            signUpError.firstName != "" ||
            signUpError.lastName != ""
          }
          backgroundColour="bg-[#160783]"
        />
      </div>

      {/* Terms */}
      <p className="text-[9px] my-2 text-gray-500">
        By clicking on Login, I accept the{" "}
        <span className="text-[#160783]">Terms & Conditions</span> and{" "}
        <span className="text-[#160783]">Privacy Policy.</span>
      </p>

      {/* OR Divider */}
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-xs">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login */}
      <div className="flex justify-center">
        <GoogleLogin
          text="continue_with"
          onSuccess={(googleData) => signUpWithGoogle(googleData)}
          onError={() => {}}
        />
      </div>

      {/* Track Card */}
      <div className="mt-5">
        <TrackCardComponent />
      </div>
    </div>
  );
}
