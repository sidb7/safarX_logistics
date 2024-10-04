import React, { useEffect, useState } from "react";
import OneButton from "../../../components/Button/OneButton";
import HomeGif from "../../../assets/girl doing research on app.gif";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
// import KycSection from "./kycSection";
// import BankSection from "./bankSection";
// import WalletSection from "./walletSection";
import successStatus from "../../../assets/success.svg";
import { retrieveLocalStorageData } from "../../../utils/utility";
import toast from "react-hot-toast";

interface IHomeProps {}

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  completed?: boolean;
  section?: any;
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>();
  // console.log("🚀 ~ userData:", userData);
  const [mandatoryCheck, setMandatoryCheck] = useState<any>();
  // console.log("🚀 ~ mandatoryCheck:", mandatoryCheck);
  const [completedStatus, setCompletedStatus] = useState<{
    [key: string]: boolean;
  }>({
    verifyAccount: true,
    qna: false,
    kyc: false,
    bankDetails: false,
    walletRecharge: false,
    planDetails: false,
    customizeLabels: false,
    returningUser: false,
    channelIntegrated: false,
  });
  // console.log("🚀 ~ completedStatus:", completedStatus);

  const items = [
    {
      title: "Verify Your Account",
      content:
        "Verify your account to unlock all features of Shipyaari. Complete this step of verification process and start managing your shipments seamlessly.",
      section: "verifyAccount",
      completed: false,
    },
    {
      title: "Complete Your KYC",
      content:
        "Complete your KYC to access Shipyaari's full range of services. Complete this step for a quick and easy KYC process to ensure seamless shipping.",
      section: "kyc",
      completed: false,
    },
    {
      title: "Become a COD Seller",
      content:
        "Get access to seamless COD payouts by verifying your bank Details.",
      section: "bankDetails",
      completed: false,
    },
    // {
    //   title: "Top up your Wallet for the first time",
    //   content:
    //     "Easily view your plan details to manage your shipping services. This guide will help you access and understand your plan information with Shipyaari.",
    //   section: "walletRecharge",
    //   completed: false,
    // },
    {
      title: "View your Plan Details",
      content:
        "Easily view your plan details to manage your shipping services. This guide will help you access and understand your plan information with Shipyaari.",
      section: "planDetails",
      completed: false,
    },
    {
      title: "Customize your Labels",
      content:
        "Personalize your shipping labels by adding your brand's logo and details. This guide will help you create professional, customized labels for a seamless shipping experience.",
      section: "customizeLabels",
      completed: false,
    },
  ];
  const [accordianItems, setAccordianItems]: any = useState(items);

  const sectionRoutes: any = {
    verifyAccount: "/onboarding/get-started",
    kyc: "/onboarding/kyc-welcome",
    bankDetails: "/onboarding/cash-on-delivery",
    planDetails: "/subscription/plans",
    customizeLabels: "/settings/label-settings",
  };

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    content,
    isOpen,
    onClick,
    completed,
    section,
  }) => {
    const boxShadowStyle = completed
      ? "0px 0px 0px 0px #7CCA62, 2.83px 0px 0px 0px #acf295 inset"
      : "0px 0px 0px 0px #A9D4FF, 2.83px 0px 0px 0px #A9D4FF inset";
    const handleClick = () => {
      // Check if KYC is required and not completed
      if (selectedSection === "bankDetails") {
        if (!mandatoryCheck?.kyc) {
          toast.error("KYC is not completed. Please complete KYC to proceed."); // Show error message
          return; // Stop further execution
        }
      }

      const sectionRoute = sectionRoutes[section];

      if (sectionRoute) {
        navigate(sectionRoute);
      } else {
        console.error(`No route found for section: ${section}`);
        // Optionally, handle the case where the route is not defined
      }
    };
    return (
      <div
        className={`border-b  rounded-[3.475px]  my-5 p-6 ${
          completed ? "border-[#7CCA62]" : "border-[#A9D4FF]"
        }`}
        style={{
          boxShadow: boxShadowStyle,
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-Open text-[14px] lg:text-[18px] font-semibold leading-4 lg:!leading-8">
            {title}
          </h2>
          {completed ? (
            <div className="flex gap-x-2 items-center text-center">
              <img src={successStatus} alt="successStatus" />
              <span className="text-[14px] font-normal font-Open leading-5 text-[#7CCA62]">
                COMPLETED
              </span>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={!completed ? onClick : undefined}
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
        {!completed && isOpen && (
          <div className="pt-3 flex justify-between">
            <div>
              <p className="font-Open text-[13px] lg:text-[15px] font-normal leading-8 lg:!leading-[26px]">
                {content}
              </p>
            </div>
            <div className=" items-end text-end">
              {/* Conditionally render the corresponding section */}
              {/* {selectedSection === "kyc" && <KycSection />} */}
              {/* {selectedSection === "bankDetails" && <BankSection />} */}
              {/* {selectedSection === "walletRecharge" && <WalletSection />} */}

              <OneButton
                text={"CLICK HERE"}
                onClick={handleClick}
                variant="tertiary"
                className="!bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleDownload = () => {
    const pdfUrl =
      "https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/blaze/assets/SY_Packaging%20Guide.pdf?response[…]f36adf0c0fca4435752efe347aa334866cd1e6c0669edb";
    window.open(pdfUrl, "_blank");
  };

  // useEffect(() => {
  //   let data = localStorage.getItem("userInfo") as any;
  //   data = JSON.parse(data);

  //   if (data !== "" && data !== null) {
  //     setUserData(data);
  //     if (data && data?.kycDetails && data?.kycDetails?.isKYCDone) {
  //       const index = accordianItems.findIndex((e: any) => e.section === "kyc");
  //       if (index > -1) {
  //         accordianItems[index].completed = true;
  //         setAccordianItems([...accordianItems]);
  //         console.log("🚀 ~ useEffect ~ accordianItems:", accordianItems);
  //       }
  //     }

  //     // setItemChaState(())
  //   }
  // }, []);

  // useEffect(() => {
  //   let data = localStorage.getItem("userInfo") as any;
  //   data = JSON.parse(data);
  //   // console.log("🚀 ~ useEffect ~ data:", data?.nextStep?.bank);
  //   console.log("data", data);

  //   if (data && data !== null) {
  //     setUserData(data);

  //     const updatedStatus = { ...completedStatus };

  //     // if (data?.kycDetails?.isKYCDone) {
  //     //   updatedStatus.kyc = true;
  //     // }
  //     // if (data?.nextStep?.bank) {
  //     //   updatedStatus.bankDetails = true;
  //     // }
  //     if (data?.isWalletRechage) {
  //       updatedStatus.walletRecharge = true;
  //     }
  //     // Update the status for other sections if needed

  //     setCompletedStatus(updatedStatus);
  //   }
  // }, []);

  // useEffect(() => {
  //   let kycCheck = localStorage.getItem("kycValue") as any;
  //   kycCheck = JSON.parse(kycCheck);
  //   kycCheck = kycCheck?.nextStep?.kyc;

  //   let bankCheck = localStorage.getItem("kycValue") as any;
  //   bankCheck = JSON.parse(bankCheck);
  //   bankCheck = bankCheck?.nextStep?.bank;

  //   let majorityCheck = localStorage.getItem("kycValue") as any;
  //   majorityCheck = JSON.parse(majorityCheck);
  //   majorityCheck = majorityCheck?.nextStep;

  //   if (majorityCheck && majorityCheck !== null) {
  //     //  setUserData(data);
  //     setMandatoryCheck(majorityCheck);

  //     const updatedStatus = { ...completedStatus };

  //     if (majorityCheck?.kyc) {
  //       updatedStatus.kyc = true;
  //     }
  //     if (majorityCheck?.bank) {
  //       updatedStatus.bankDetails = true;
  //     }
  //     // if (majorityCheck?.isWalletRechage) {
  //     //   updatedStatus.walletRecharge = true;
  //     // }
  //     // Update the status for other sections if needed

  //     setCompletedStatus(updatedStatus);
  //   }

  //   console.log("🚀 ~ kycCheck inside effect:", kycCheck);
  //   console.log("🚀 ~ bankCheck inside effect:", bankCheck);
  // }, []);

  // useEffect(() => {
  //   const data = retrieveLocalStorageData("userInfo");
  //   if (data) {
  //     setUserData(data);
  //   }
  // }, []);

  useEffect(() => {
    const kycValue = retrieveLocalStorageData("kycValue");

    if (kycValue?.nextStep) {
      setMandatoryCheck(kycValue.nextStep);

      const { kyc, bank, isChannelIntegrated, qna } = kycValue.nextStep;

      const updatedStatus = {
        ...completedStatus,

        kyc: !!kyc,
        bankDetails: !!bank,
        qna: !!qna,
        channelIntegrated: !!isChannelIntegrated,
        walletRecharge: !!kycValue?.isWalletRechage,
        returningUser: !!kycValue?.isReturningUser,
      };

      setCompletedStatus(updatedStatus);
    }
  }, []);

  return (
    <>
      {/* top reroute section  */}
      <div className=" my-7 lg:mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 ">
        {/* first card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #FD88B3 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] leading-6 font-semibold xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.qna
                  ? "You're all set!"
                  : "Let's get you started!"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus.qna
                  ? "Your setup is complete. You can now enjoy a personalized Shipyaari experience."
                  : "Set up your account for a personalized Shipyaari experience and seamless logistics."}
              </p>
            </div>
            {!completedStatus?.qna ? (
              <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
                <OneButton
                  text={"CLICK HERE"}
                  onClick={() => navigate("/onboarding/get-started")}
                  variant="tertiary"
                  className="!bg-transparent"
                />
              </div>
            ) : (
              <div className="flex gap-x-1 items-center text-center  justify-end pr-[10px] pb-[20px] absolute bottom-0 right-0 ">
                {/* <img src={successStatus} alt="successStatus" /> */}
                <span className="text-[15px] font-bold font-Open leading-5 text-[#43be43] underline underline-offset-4">
                  Your setup is complete!
                </span>
              </div>
            )}
          </div>
        </div>
        {/* second card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88E7FD 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6  xl:leading-8 text-[#1C1C1C]">
                Sync your Channel
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.channelIntegrated
                  ? "Your channel has been successfully synced with Shipyaari."
                  : "Integrate your channel for a seamless Shipping Experience."}
              </p>
            </div>
            {!completedStatus?.channelIntegrated ? (
              <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                <OneButton
                  text={"SYNC MY STORE"}
                  onClick={() => {
                    navigate("/catalogues/channel-integration");
                  }}
                  variant="tertiary"
                  className="!bg-transparent"
                />
              </div>
            ) : (
              <div className="flex gap-x-2 items-center text-center  justify-end pr-[10px] pb-[20px] absolute bottom-0 right-0 ">
                <img src={successStatus} alt="successStatus" />
                <span className="text-[15px] font-bold font-Open leading-5 text-[#43be43]">
                  Channel Synced!
                </span>
              </div>
            )}
          </div>
        </div>
        {/* third card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88FDDA 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6 xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.walletRecharge
                  ? "Top up your Wallet"
                  : "Time to Fill the Wallet Tank"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.walletRecharge
                  ? "Enjoy hassle-free payments and quick access to your favorite services!"
                  : "Fill up your wallet and speed up your business. Quick top-ups for smooth, unstoppable growth."}
              </p>
            </div>
            <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
              <OneButton
                text={"WALLET RECHARGE"}
                onClick={() => navigate("/wallet/view-wallet")}
                variant="tertiary"
                className=" !bg-transparent"
              />
            </div>
          </div>
        </div>
        {/* fourth card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88A9FD 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6 xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.returningUser
                  ? "Place a quick order!"
                  : "Add Your First Order Manually"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.returningUser
                  ? "Your first order is just the beginning! Let's make shipping stress-free for you!"
                  : "Lets take a plunge and start our yaari. Add your first order Manually."}
              </p>
            </div>
            <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
              <OneButton
                text={"CREATE ORDER"}
                onClick={() => navigate("/orders/quick-order-place")}
                variant="tertiary"
                className=" !bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* the center accordian part  */}
      <div className="bg-[#F0F4FE] py-7 px-6 lg:py-[50px] lg:px-12">
        <div className="flex flex-col items-start gap-y-4">
          <h1 className="text-lg lg:text-2xl text-[#1C1C1C] font-Open font-semibold leading-5 lg:leading-8">
            Your Quick Start Guide to Shipyaari
          </h1>
          <p className="font-Open text-sm lg:text-base font-normal leading-6 text-[#697586]">
            Quickly learn how to set up and use Shipyaari with this
            easy-to-follow guide. It covers everything you need to start
            managing your shipments efficiently and effectively.
          </p>
        </div>
        <div className="py-5 lg:py-10 px-4 lg:px-6 flex bg-white rounded-[20px] shadow-[4px_4px_15px_0px_rgba(0, 0, 0, 0.10)] my-4 lg:my-[28px]">
          {isLgScreen ? (
            <div className="flex justify-center items-center">
              <img
                src={HomeGif}
                alt="home-screen"
                width={isXlScreen ? 450 : 300}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex-1">
            <div className=" ">
              {items?.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item?.title}
                  content={item?.content}
                  isOpen={openIndex === index}
                  onClick={() => {
                    toggleItem(index);
                    handleSectionSelect(item?.section);
                  }}
                  completed={completedStatus[item.section] || false}
                  section={item.section} // Pass the section key here
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* packaging guidelines container  */}
      <div className="mx-6 lg:mx-12 mt-10 lg:mt-[81px] mb-6">
        <div className="flex flex-col gap-y-4">
          <p className="font-Open text-lg lg:text-2xl font-semibold leading-8 text-[#1C1C1C]">
            Packaging Guidelines for Easy, Hassle-Free Shipping
          </p>
          <p className="font-Open text-base lg:text-xl font-normal leading-8 lg:leading-6 text-[#697586]">
            Follow these guidelines to securely pack and label your shipments,
            ensuring a smooth delivery process and item protection. For expert
            tips and details,{" "}
            <span
              className="font-Open text-[15px] lg:text-base font-normal leading-6 text-[#004EFF] cursor-pointer"
              onClick={handleDownload}
            >
              [Get the Full Guide]
            </span>
          </p>
        </div>
        {/* guidlines summary in cards  */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 lg:mt-10 gap-x-11 gap-y-10 ">
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  1. Ensure packaging of Proper Size
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Use a sturdy, corrugated box that can support the weight of
                  your contents. Ensure the box is the correct size to prevent
                  movement inside.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  2. Choose Appropriate Packing Materials
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Select sturdy boxes, bubble wrap, and packing paper to protect
                  your items. Proper materials ensure your package arrives
                  safely without damage.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  3. Wrap Items Individually
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Wrap each item separately with bubble wrap or packing paper to
                  avoid damage during shipping. This ensures each item stays
                  secure and protected throughout transit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  4. Cushion and Fill
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Fill empty spaces with cushioning materials but avoid
                  overstuffing
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  5. Label Accurately
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Print or write the shipping label clearly. Avoid placing the
                  label over seams or tape for better visibility.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  6. Mark Fragile Items
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Mark packages with "FRAGILE" stickers if necessary. For liquid
                  or perishable items, use leak-proof containers and appropriate
                  insulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
