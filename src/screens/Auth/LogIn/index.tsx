import { GoogleLogin } from "@react-oauth/google";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import "../../../styles/signupPages.css";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import CustomButton from "../../../components/Button/index";
import CustomInputBox from "../../../components/Input";
import { redirect, useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CloseIcon from "../../../assets/CloseIcon.svg";
import InputBox from "../../../components/InputBox/index";
import { useEffect, useState } from "react";
import {
    POST_SIGN_IN_URL,
    POST_SIGN_IN_WITH_GOOGLE_URL,
    VALIDATE_USER_TOKEN,
    REACT_APP_GTM_ID,
    SMALL_LOGO,
    LARGE_LOGO,
    COMPANY_NAME,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/reducers/signInReducer";
import InfoCircle from "../../../assets/info-circle.svg";
import InformativeIcon from "../../../assets/I icon.svg";
import {
    constructNavigationObject,
    getLocalStorage,
    setLocalStorage,
    tokenKey,
} from "../../../utils/utility";
import { emailRegex, strongpasswordRegex } from "../../../utils/regexCheck";
import ForgotPassword from "./ForgotPassword";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import { Spinner } from "../../../components/Spinner";
import { socketCallbacks } from "../../../Socket";
import { useErrorBoundary } from "react-error-boundary";
import { getQueryJson } from "../../../utils/utility";
import OneButton from "../../../components/Button/OneButton";

const Index = () => {
    const navigate = useNavigate();
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

            localStorage.setItem(
                "setKycValue",
                response?.data[0]?.nextStep?.kyc
            );

            let signInUserReducerDetails = {
                email: loginCredentials.email,
                name: response?.data[0]?.name,
            };
            //commented as passing the name at signin time
            // dispatch(signInUser(loginCredentials));
            dispatch(signInUser(signInUserReducerDetails));

            if (response?.success) {
                localStorage.setItem("sellerId", response?.data[0]?.sellerId);
                localStorage.setItem("userName", response?.data[0]?.name);
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.data[0])
                );
                setLocalStorage(
                    `${response?.data[0]?.sellerId}_${tokenKey}`,
                    response?.data[0]?.token
                );

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
                    seller_bank_verification_done:
                        response?.data[0]?.nextStep.bank,
                    isReturningUser: response?.data[0]?.isReturningUser,
                });

                window.gtag("config", REACT_APP_GTM_ID, {
                    user_id: response?.data[0]?.sellerId,
                });

                const token = localStorage.getItem("sellerId")
                    ? `${localStorage.getItem(
                          "sellerId"
                      )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
                    : "";

                if (token !== "") {
                    console.log("socketConnectedAfterlogin");
                    socketCallbacks.connectSocket(dispatch);
                }

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

        localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

        dispatch(signInUser(loginCredentials));
        if (response?.success) {
            // setLocalStorage(tokenKey, response?.data[0]?.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
            localStorage.setItem("sellerId", response?.data[0]?.sellerId);
            localStorage.setItem("userName", response?.data[0]?.name);

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

            setLocalStorage(
                `${response?.data[0]?.sellerId}_${tokenKey}`,
                response?.data[0]?.token
            );

            const token = localStorage.getItem("sellerId")
                ? `${localStorage.getItem(
                      "sellerId"
                  )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
                : "";

            if (token !== "") {
                console.log("socketConnectedAfterlogin");
                socketCallbacks.connectSocket(dispatch);
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
        //adding token for preventing validateTokenApi to hit while logout and refreshing login screen
        const token = localStorage.getItem("sellerId")
            ? `${localStorage.getItem(
                  "sellerId"
              )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
            : "";

        setTimeout(() => {
            setShowBootScreen(false);
        }, 2000);
        token &&
            (async () => {
                const response = await POST(VALIDATE_USER_TOKEN);
                if (response?.data?.success) {
                    navigate("/dashboard/overview");
                }
            })();
    }, []);

    useEffect(() => {
        if (sellerEmail !== undefined && companyName !== undefined) {
            setForgotPasswordModal(true);
        }
    }, [sellerEmail]);

    const modalTitle = () => {
        return (
            <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
                <img
                    className="my-auto ml-6  h-[25px] object-contain"
                    src={LARGE_LOGO}
                    alt="Company Logo"
                />
                <img
                    className="my-auto mr-6 cursor-pointer"
                    src={CloseIcon}
                    alt="Close"
                    onClick={() => setIsModalOpen(false)}
                />
            </div>
        );
    };

    const handleEnterLogin = (e: any) => {
        if (e.key === "Enter") logInOnClick(loginCredentials);
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

    const loginComponent = () => {
        return (
            <>
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={` ${
                            isMdScreen ? "m-auto  !w-[500px]" : ""
                        } flex flex-col relative lg:px-0 lg:gap-y-0`}
                    >
                        <div
                            className={`rounded-lg ${
                                isMdScreen ? "custom_shadow" : ""
                            }`}
                        >
                            <div className="flex flex-col gap-y-8 w-full">
                                <div className="product-box flex items-center">
                                    <img
                                        className="m-4 h-[25px] object-contain"
                                        src={LARGE_LOGO}
                                        alt="Company Logo"
                                    />
                                    <div className=" ml-auto mr-1">
                                        <OneButton
                                            text="TRACK ORDER"
                                            onClick={() => {
                                                window.open(
                                                    "https://app.shipyaari.com/shipyaari-tracking",
                                                    "_blank"
                                                );
                                            }}
                                            variant="tertiary"
                                            className=" ml-auto !p-4 "
                                        />
                                    </div>
                                    {/* <a
                    href="https://app.shipyaari.com/shipyaari-tracking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-auto text-[#004EFF] underline p-4 font-Lato font-bold ${
                      isMobileScreen ? "text-xs" : "text-sm"
                    } leading-4 tracking-wide`}
                  >
                    TRACK ORDER
                  </a> */}
                                </div>

                                <div className="flex flex-col mt-4 mx-4 md:mx-[85px] gap-y-6">
                                    <p className="text-center	 leading-7 text-2xl font-bold font-Lato">
                                        Welcome to {COMPANY_NAME}
                                    </p>
                                    <p className="text-center text-[#494949] font-Open font-light text-sm leading-[22px]">
                                        Fast and Easy Shipping from your
                                        doorstep to your customer's.
                                    </p>
                                    <p className="text-center	 leading-7 text-[1rem] font-bold font-Open">
                                        Login to access your account
                                    </p>
                                </div>
                                <div className=" flex flex-col mx-4 md:mx-[90px] gap-y-6">
                                    <div className="flex justify-center">
                                        <GoogleLogin
                                            onSuccess={(googleData) =>
                                                signInWithGoogle(googleData)
                                            }
                                            onError={() => {}}
                                        />
                                    </div>
                                    <hr className="mb-[-30px] mt-2" />
                                    <div className="flex justify-center my-[-4px]">
                                        <button className="bg-[#FEFEFE]  px-2 font-normal text-xs font-Open leading-4">
                                            OR
                                        </button>
                                    </div>
                                    <div>
                                        <CustomInputBox
                                            containerStyle="mt-[17px]"
                                            label="Email"
                                            id="email"
                                            //commented as by default placeholder text is getting top of the input box
                                            // tempLabel={true}
                                            inputType="email"
                                            value={loginCredentials.email}
                                            onChange={(e) => {
                                                //
                                                setLoginError({
                                                    ...loginError,
                                                    email: "",
                                                });
                                                setLoginCredentials({
                                                    ...loginCredentials,
                                                    email: e.target.value,
                                                });
                                            }}
                                            onBlur={(e) => {
                                                if (!loginCredentials?.email) {
                                                    setLoginError({
                                                        ...loginError,
                                                        email: "Please Enter Your Email ID",
                                                    });
                                                } else if (
                                                    !emailRegex.test(
                                                        e.target.value
                                                    )
                                                ) {
                                                    setLoginError({
                                                        ...loginError,
                                                        email: "Incorrect Email ID",
                                                    });
                                                } else {
                                                    setLoginError({
                                                        ...loginError,
                                                        email: "",
                                                    });
                                                }
                                            }}
                                        />
                                        {loginError.email !== "" && (
                                            <div className="flex items-center gap-x-1 mt-1">
                                                <img
                                                    src={InfoCircle}
                                                    alt=""
                                                    width={10}
                                                    height={10}
                                                />
                                                <span className="font-normal text-[#F35838] text-xs leading-3">
                                                    {loginError.email}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <CustomInputBox
                                            inputType={
                                                viewPassWord
                                                    ? "text"
                                                    : "password"
                                            }
                                            onKeyDown={(e: any) =>
                                                handleEnterLogin(e)
                                            }
                                            label="Password"
                                            id="password"
                                            tooltipContent="Password should be 8 to 16 Character with combination of Alpha Numeric and Special Character, One Upper and Lowercase"
                                            minLength={8}
                                            maxLength={16}
                                            //commented as by default placeholder text is getting top of the input box
                                            // tempLabel={true}
                                            isRightIcon={true}
                                            isInfoIcon={true}
                                            informativeIcon={InformativeIcon}
                                            value={loginCredentials.password}
                                            visibility={viewPassWord}
                                            onClick={() => {}}
                                            rightIcon={
                                                viewPassWord
                                                    ? CrossEyeIcon
                                                    : EyeIcon
                                            }
                                            setVisibility={setViewPassWord}
                                            onChange={(e) => {
                                                setLoginError({
                                                    ...loginError,
                                                    password: "",
                                                });
                                                setLoginCredentials({
                                                    ...loginCredentials,
                                                    password: e.target.value,
                                                });
                                            }}
                                            onBlur={(e) => {
                                                if (
                                                    !strongpasswordRegex.test(
                                                        e.target.value
                                                    ) ||
                                                    loginCredentials.password
                                                        .length < 8 ||
                                                    loginCredentials.password
                                                        .length > 16
                                                ) {
                                                    const passwordError =
                                                        validatePassword(
                                                            e.target.value
                                                        );
                                                    setLoginError({
                                                        ...loginError,
                                                        password: passwordError,
                                                    });
                                                } else {
                                                    setLoginError({
                                                        ...loginError,
                                                        password: "",
                                                    });
                                                }
                                            }}
                                        />
                                        {loginError.password !== "" && (
                                            <div className="flex items-center gap-x-1 mt-1">
                                                <img
                                                    src={InfoCircle}
                                                    alt=""
                                                    width={10}
                                                    height={10}
                                                />
                                                <span className="font-normal text-[#F35838] text-xs leading-3">
                                                    {loginError.password}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-[-15px]">
                                        {" "}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setForgotPasswordModal(true)
                                            }
                                            className="text-[#004EFF]  font-normal text-xs leading-4 font-Open "
                                        >
                                            Forgot Password
                                        </button>
                                    </div>
                                    <OneButton
                                        onClick={() =>
                                            logInOnClick(loginCredentials)
                                        }
                                        text="LOG IN"
                                        variant="primary"
                                    />
                                    {/* <CustomButton
                    onClick={(e: any) => logInOnClick(loginCredentials)}
                    text="LOG IN"
                  /> */}

                                    <div className="flex justify-center md:mb-[40px]">
                                        <p className="text-[#777777] font-normal text-xs lg:text-sm leading-4 font-Open">
                                            Don't have an account ?
                                        </p>
                                        <button
                                            type="button"
                                            onClick={signUpOnClick}
                                            className="text-[#004EFF] ml-1 font-bold text-xs leading-4 font-Open "
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {showBootScreen ? (
                <div className="flex items-center justify-center h-screen">
                    <img
                        className="animate-bounce object-contain w-48 h-48"
                        src={LARGE_LOGO}
                        alt=""
                    />
                </div>
            ) : (
                <>
                    {/* {isLgScreen && isModalOpen && (
            <CenterModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
            >
              {loginComponent()}
            </CenterModal>
          )} */}

                    {/* /////////////////////// */}

                    {isMdScreen && (
                        <div className="flex justify-center items-center h-screen">
                            {loginComponent()}
                        </div>
                    )}
                    {!isMdScreen && loginComponent()}
                </>
            )}

            {isLgScreen && forgotPasswordModal && (
                <CenterModal
                    isOpen={forgotPasswordModal}
                    onRequestClose={() => setForgotPasswordModal(false)}
                >
                    <ForgotPassword
                        onClick={() => setForgotPasswordModal(false)}
                        sellerEmail={sellerEmail}
                        companyName={companyName}
                    />
                </CenterModal>
            )}
            {!isLgScreen && (
                <RightSideModal
                    isOpen={forgotPasswordModal}
                    onClose={() => setForgotPasswordModal(false)}
                    className={`w-full "md:!w-[389px]"
          }`}
                >
                    <ForgotPassword
                        onClick={() => setForgotPasswordModal(false)}
                        sellerEmail={sellerEmail}
                        companyName={companyName}
                    />
                </RightSideModal>
            )}
        </>
    );
};

export default Index;
