import React, { useEffect, useState } from "react";
import successStatus from "../../assets/success.svg";
import failureIcon from "../../assets/failure.svg";
import NavigationIcon from "../../assets/navigatorIcon.svg";
import CustomButton from "../Button";
import "../../styles/progressBar.css";
import { useNavigate } from "react-router-dom";
// import SucessCenterModal from "./sucessCenterModal";
// import CenterModal from "../CustomModal/customCenterModal";
// import KycVerify from "./kycVerify";
// import BankVerify from "./bankVerify";
// import { POST } from "../../utils/webService";
// import { GET_PROFILE_URL } from "../../utils/ApiUrls";
// import { Spinner } from "../../components/Spinner";
// import { toast } from "react-hot-toast";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const navigate = useNavigate();

  let kycCheck = sessionStorage.getItem("kycValue") as any;
  kycCheck = JSON.parse(kycCheck);
  const onboardingStatus = kycCheck?.nextStep;

  let dataset: any = {
    onboardingStatus,
  };
  dataset = { ...dataset.onboardingStatus, registration: true };

  const [progress, setProgress] = useState(0);
  console.log("🚀 ~ progress:", progress);
  const [dataValue, setDataValue]: any = useState(dataset);
  const [showCenterSuccessModal, setShowCenterSucessModal] = useState(false);
  console.log("🚀 ~ showCenterSuccessModal:", showCenterSuccessModal);

  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const handleButtonClick = () => {
    // Toggle the boolean value for showComponent
    setShowCenterSucessModal(!showCenterSuccessModal);
  };

  // const [rightSideModal, setRightSideModal] = useState<any>({
  //   kyc: false,
  //   bank: false,
  // });

  // const [sellerData, setSellerData]: any = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const openModalForKyc = () => {
  //   setRightSideModal((rightSideModal: any) => ({
  //     ...rightSideModal,
  //     kyc: !rightSideModal.kyc,
  //   }));
  // };

  // const openModalForBank = () => {
  //   setRightSideModal((rightSideModal: any) => ({
  //     ...rightSideModal,
  //     bank: !rightSideModal.bank,
  //   }));
  // };

  const calculateProgress = () => {
    const totalSteps = Object.keys(dataset).length;
    const completedSteps = Object.values(dataset).filter(
      (value) => value === true
    ).length;

    // Calculate progress as a percentage
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(+newProgress.toFixed(2));
  };
  useEffect(() => {
    setTimeout(() => {
      calculateProgress();
      setDataValue(dataset);
    }, 400);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await POST(GET_PROFILE_URL, {});
  //     if (data?.success) {
  //       setSellerData(data?.data?.[0]);
  //     } else {
  //       toast.error(data?.message);
  //     }
  //     setIsLoading(false);
  //   })();
  // }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[440px] border-[1px] border-[#EEEEEE] rounded-[20px] p-5 shadow-lg">
        <div className="flex-col py-[10px] justify-center items-center">
          <h1 className="font-Lato text-[22px] text-[#1C1C1C] font-semibold leading-[30px]">
            Complete KYC & Bank Verification to get{" "}
            <span className="font-Lato text-[22px] text-[#004EFF] font-semibold leading-[30px]">
              {" "}
              ₹500
            </span>{" "}
            in your wallet.
          </h1>
          <p className="text-sm font-Open text-[#828282] font-semibold leading-6 uppercase tracking-[0.28px] mt-[10px]">
            Limited Period offer
          </p>
          <div className="my-[30px]">
            {/* the progress bar to go here */}
            <div className={`progress-bar`}>
              <div
                className={` h-full bg-[#06981d] transition-all duration-700 ease-in-out rounded-sm`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-x-[10px] my-8">
              <img src={successStatus} alt="" />
              <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] uppercase">
                Registration
              </span>
            </div>
            <div className="flex justify-between mb-8">
              <div className="flex gap-x-[10px]">
                <img
                  src={!dataValue?.kyc ? failureIcon : successStatus}
                  alt=""
                />
                <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] uppercase">
                  KYC
                </span>
              </div>
              <div className={`${dataValue?.kyc ? "hidden" : "block"}`}>
                <img
                  src={NavigationIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => navigate("/onboarding/kyc-type")}
                />
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <div className="flex gap-x-[10px]">
                <img
                  src={!dataValue?.bank ? failureIcon : successStatus}
                  alt=""
                />
                <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] whitespace-nowrap uppercase">
                  Bank Verification
                </span>
              </div>
              <div className={`${dataValue?.bank ? "hidden" : "block"}`}>
                <img
                  src={NavigationIcon}
                  alt=""
                  className="cursor-pointer delay-500"
                  // onClick={openModalForBank}
                  onClick={() => navigate("/onboarding/wallet-details")}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            <CustomButton
              text="Redeem"
              onClick={handleButtonClick}
              className={`!w-[88px] !rounded-[4px] delay-300 ${
                progress === 100 ? "" : "!bg-[#E8E8E8] !text-[#BBBBBB]"
              }`}
              disabled={progress !== 100 ? true : false}
            />
          </div>
          {/* {showCenterSuccessModal && <CenterModal isOpen={isModalOpen}   />} */}

          {/* <KycVerify
            modalStatus={rightSideModal?.kyc}
            setModalStatus={setRightSideModal}
          />

          <BankVerify
            modalStatus={rightSideModal?.bank}
            setModalStatus={setRightSideModal}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
