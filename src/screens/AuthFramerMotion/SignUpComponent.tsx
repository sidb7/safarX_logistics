// Login.jsx
import { useEffect, useState } from "react";
import CustomInputBox from "../../components/Input";
import { GoogleLogin } from "@react-oauth/google";
import TrackCardComponent from "../TrackCard/TrackCardComponent";
import {
  AMAZON_REDIRECT_URL,
  LARGE_LOGO,
  POST_SIGN_IN_URL,
  POST_SIGN_IN_WITH_GOOGLE_URL,
  REACT_APP_GTM_ID,
  VALIDATE_USER_TOKEN,
} from "../../utils/ApiUrls";
import { useErrorBoundary } from "react-error-boundary";
import { POST } from "../../utils/webService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ResponsiveState } from "../../utils/responsiveState";
import { constructNavigationObject, getQueryJson } from "../../utils/utility";
import { signInUser } from "../../redux/reducers/signInReducer";
import sessionManager from "../../utils/sessionManager";
import { socketCallbacks } from "../../Socket";
import toast from "react-hot-toast";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLgScreen, isMdScreen, isMobileScreen } = ResponsiveState();
  const dispatch = useDispatch();
  const { resetPassword, source, sellerEmail } = getQueryJson();
  let companyName = source?.toUpperCase();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [viewPassWord, setViewPassWord] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState<any>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const { showBoundary } = useErrorBoundary() || {};

  const logInOnClick = async (value: any) => {
    try {
      const { data: response } = await POST(POST_SIGN_IN_URL, value);

      // if (sellerInfo?.nextStep) {
      //   sellerInfo.nextStep.kyc = response?.data[0]?.nextStep?.kyc;
      // } else {
      //   sellerInfo.nextStep = { kyc: response?.data[0]?.nextStep?.kyc };
      // }
      // localStorage.setItem(
      //   `sellerSession_${sessionId}`,
      //   JSON.stringify(sellerInfo)
      // );
      // localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

      let signInUserReducerDetails = {
        email: loginCredentials.email,
        name: response?.data[0]?.name,
      };

      dispatch(signInUser(signInUserReducerDetails));

      if (response?.success) {
        const { sessionId, sellerInfo } = sessionManager(response?.data[0]);
        //for hubspot sso
        const params = getQueryJson();

        const supportedUrl =
          "https://support.shipyaari.com/_hcms/mem/jwt/verify";

        if (params?.hasOwnProperty("redirect_url")) {
          if (params?.redirect_url === supportedUrl) {
            window.location.replace(
              `${params?.redirect_url}?jwt=${response?.data[0]?.token}`
            );
          }
          return;
        }

        window?.dataLayer?.push({
          event: "login",
          seller_email: response?.data[0]?.email,
          sellerId: response?.data[0]?.sellerId,
          seller_name: response?.data[0]?.name,
          seller_kyc: response?.data[0]?.nextStep.kyc,
          seller_bank_verification_done: response?.data[0]?.nextStep.bank,
          isReturningUser: response?.data[0]?.isReturningUser,
        });

        window.gtag("config", REACT_APP_GTM_ID, {
          user_id: response?.data[0]?.sellerId,
        });
        let sellerId = sellerInfo?.sellerId;
        const token =
          // localStorage.getItem("sellerId")
          sellerId ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d` : "";

        if (token !== "") {
          console.log("socketConnectedAfterlogin");
          socketCallbacks.connectSocket(dispatch);
          socketCallbacks.connectNotificationSocket();
        }

        const [
          selling_partner_id,
          amazon_callback_uri,
          amazon_state,
          spapi_oauth_code,
        ] = [
          "selling_partner_id",
          "amazon_callback_uri",
          "amazon_state",
          "spapi_oauth_code",
        ].map((key) => localStorage.getItem(key));
        const state = response?.data[0]?.sellerId;

        if (
          selling_partner_id &&
          amazon_callback_uri &&
          amazon_state &&
          state
        ) {
          ["selling_partner_id", "amazon_callback_uri", "amazon_state"].forEach(
            (key) => localStorage.removeItem(key)
          );
          // const redirectUrl = 'http://localhost:8010/amazonCheckParams';
          const redirectUrl = AMAZON_REDIRECT_URL;
          window.location.href =
            amazon_callback_uri +
            "?redirect_uri=" +
            redirectUrl +
            "&amazon_state=" +
            amazon_state +
            "&state=" +
            state;
        }

        // redirect based on qna and kyc done or not
        if (response?.data?.[0]?.nextStep?.qna === false) {
          const navigationObject = constructNavigationObject(
            "/onboarding/get-started",
            window.location.search
          );
          navigate(navigationObject);
        } else if (response?.data?.[0]?.nextStep?.kyc === false) {
          const navigationObject = constructNavigationObject(
            "/dashboard/overview",
            window.location.search
          );
          navigate(navigationObject);
        } else {
          const navigationObject = constructNavigationObject(
            "/dashboard/overview",
            window.location.search
          );
          navigate(navigationObject);
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      showBoundary("Something Wrong");
    }
  };

  const signUpOnClick = () => {
    const navigationObject = constructNavigationObject(
      "/onboarding/signup",
      window.location.search
    );
    navigate(navigationObject);
  };

  const signInWithGoogle = async (googleData: any) => {
    const payload = {
      clientId: googleData?.clientId,
      credential: googleData?.credential,
    };
    setLoading(true);
    const { data: response } = await POST(
      POST_SIGN_IN_WITH_GOOGLE_URL,
      payload
    );

    dispatch(signInUser(loginCredentials));
    if (response?.success) {
      const { sessionId, sellerInfo } = sessionManager(response?.data[0]);

      window?.dataLayer?.push({
        event: "login",
        seller_email: response?.data[0]?.email,
        sellerId: response?.data[0]?.sellerId,
        seller_name: response?.data[0]?.name,
        seller_kyc: response?.data[0]?.nextStep.kyc,
        seller_bank_verification_done: response?.data[0]?.nextStep.bank,
        isReturningUser: response?.data[0]?.isReturningUser,
      });

      window.gtag("config", REACT_APP_GTM_ID, {
        user_id: response?.data[0]?.sellerId,
      });

      // setLocalStorage(
      //   `${response?.data[0]?.sellerId}_${tokenKey}`,
      //   response?.data[0]?.token
      // );

      let sellerId = sellerInfo?.sellerId;
      const token =
        // localStorage.getItem("sellerId")
        sellerId ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d` : "";

      if (token !== "") {
        console.log("socketConnectedAfterlogin");
        socketCallbacks.connectSocket(dispatch);
        socketCallbacks.connectNotificationSocket(dispatch);
      }

      const [
        selling_partner_id,
        amazon_callback_uri,
        amazon_state,
        spapi_oauth_code,
      ] = [
        "selling_partner_id",
        "amazon_callback_uri",
        "amazon_state",
        "spapi_oauth_code",
      ].map((key) => localStorage.getItem(key));
      const state = response?.data[0]?.sellerId;
      // const redirectUrl = 'http://localhost:8010/amazonCheckParams';
      const redirectUrl = AMAZON_REDIRECT_URL;

      if (selling_partner_id && amazon_callback_uri && amazon_state && state) {
        ["selling_partner_id", "amazon_callback_uri", "amazon_state"].forEach(
          (key) => localStorage.removeItem(key)
        );

        window.location.href =
          amazon_callback_uri +
          "?redirect_uri=" +
          redirectUrl +
          "&amazon_state=" +
          amazon_state +
          "&state=" +
          state;
      }

      setLoading(false);
      // redirect based on qna and kyc done or not
      if (response?.data?.[0]?.nextStep?.qna === false) {
        const navigationObject = constructNavigationObject(
          "/onboarding/questionnaire/question1",
          window.location.search
        );
        navigate(navigationObject);
      } else if (response?.data?.[0]?.nextStep?.kyc === false) {
        const navigationObject = constructNavigationObject(
          "/onboarding/kyc-type",
          window.location.search
        );
        navigate(navigationObject);
      } else {
        const navigationObject = constructNavigationObject(
          "/dashboard/overview",
          window.location.search
        );
        navigate(navigationObject);
      }
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { sessionId, sellerInfo } = sessionManager({});
    let sellerIdInfo = sellerInfo?.sellerId;
    const token =
      // localStorage.getItem("sellerId")
      sellerIdInfo
        ? `${sellerIdInfo}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
        : "";

    const params = getQueryJson();

    const keys = [
      "selling_partner_id",
      "amazon_callback_uri",
      "amazon_state",
      "spapi_oauth_code",
    ];

    let urlToken = "";
    if (params?.token) {
      urlToken = params?.token;
    } else {
      urlToken = sellerInfo?.token;
    }

    const sellerId = params.sellerId;

    const header = {
      Accept: "/",
      // Authorization: `Bearer ${localStorage.getItem(
      //   `${sellerId}_${tokenKey}`
      // )}`,
      Authorization: `Bearer ${sellerInfo?.token}`,
    };

    keys.forEach((key) => {
      if (params?.hasOwnProperty(key)) {
        localStorage.setItem(key, params[key]);
      }
    });

    const [
      selling_partner_id,
      amazon_callback_uri,
      amazon_state,
      spapi_oauth_code,
    ] = [
      "selling_partner_id",
      "amazon_callback_uri",
      "amazon_state",
      "spapi_oauth_code",
    ].map((key) => localStorage.getItem(key));

    setTimeout(() => {
      setShowBootScreen(false);
    }, 2000);
    (async () => {
      if (urlToken) {
        try {
          const response = await axios.post(
            VALIDATE_USER_TOKEN,
            {},
            { headers: { ...header, Authorization: `Bearer ${urlToken}` } }
          );

          if (response?.data?.success) {
            let sellerData = {};
            if (params?.token) {
              sellerData = {
                ...response?.data?.data[0],
                token: urlToken,
                name: (response?.data?.data[0]?.kycDetails?.fullName)
                  .toString()
                  .split(" ")[0],
              };
            } else {
              sellerData = {
                ...response?.data?.data[0],
                token: urlToken,
              };
            }
            const { sessionId, sellerInfo } = sessionManager(sellerData);

            // Navigate to the dashboard directly if the token is valid
            navigate("/dashboard/overview");
            return; // Skip the rest of the logic
          } else {
            console.error("Invalid token from URL");
          }
        } catch (error) {
          console.error("Error validating token from URL", error);
        }
      }

      if (token) {
        // Validate the token from localStorage (existing logic)
        try {
          const response = await POST(VALIDATE_USER_TOKEN);

          const amazonsellerId = sellerInfo?.sellerId;
          const state = amazonsellerId;
          const redirectUrl = AMAZON_REDIRECT_URL;

          if (response?.data?.success) {
            if (
              selling_partner_id &&
              amazon_callback_uri &&
              amazon_state &&
              state
            ) {
              [
                "selling_partner_id",
                "amazon_callback_uri",
                "amazon_state",
              ].forEach((key) => localStorage.removeItem(key));

              window.location.href =
                amazon_callback_uri +
                "?redirect_uri=" +
                redirectUrl +
                "&amazon_state=" +
                amazon_state +
                "&state=" +
                state;
            } else {
              navigate("/dashboard/overview");
            }
          }
        } catch (error) {
          console.error("Error validating token from localStorage", error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (sellerEmail !== undefined && companyName !== undefined) {
      setForgotPasswordModal(true);
    }
  }, [sellerEmail]);

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginCredentials((prev: any) => ({ ...prev, [name]: value }));

    // Clear error on change
    setLoginError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (value: any) => {
    if (!value) return "Please enter your email ID";
    if (!emailRegex.test(value)) return "Incorrect Email ID";
    return "";
  };

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
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
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
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
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
          value={loginCredentials.email}
          onChange={handleChange}
          onBlur={(e) => {
            const errorMsg = validateEmail(e.target.value);
            setLoginError((prev) => ({ ...prev, email: errorMsg }));
          }}
          errorCondition={{
            message: loginError.email,
          }}
        />

        {/* Password */}
        <CustomInputBox
          containerStyle="mt-4"
          className="!h-[35px]"
          label="Password"
          id="password"
          name="password"
          inputType="password"
          fixedLabel
          value={loginCredentials.password}
          onChange={handleChange}
          onBlur={(e) => {
            const errorMsg = validatePassword(e.target.value);
            setLoginError((prev) => ({ ...prev, password: errorMsg }));
          }}
          errorCondition={{
            message: loginError.password,
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
          value={""}
          onChange={() => {}}
          onBlur={(e) => {}}
          errorCondition={{}}
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
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
          </div>
          <div className="w-1/2">
            <button className="w-full h-[35px] items-center flex justify-center hover:bg-[#160783] border border-[#160783] text-[#160783] rounded-lg hover:shadow-md transition duration-200 hover:text-white py-2 mt-4">
              Verify
            </button>
          </div>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={signUpOnClick}
        className="w-full bg-[#160783] rounded-lg hover:shadow-md transition duration-200 text-white py-2 mt-4"
      >
        Sign Up
      </button>

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
          onSuccess={(googleData) => signInWithGoogle(googleData)}
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
