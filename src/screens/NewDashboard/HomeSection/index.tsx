import React, { useEffect, useState } from "react";
// import OneButton from "../../../components/Button/OneButton";
import HomeGif from "../../../assets/girl doing research on app.gif";
// import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { retrieveLocalStorageData } from "../../../utils/utility";
// import toast from "react-hot-toast";
import AccordionItem from "./accordianItem";
import WelcomeHeader from "./welcomeHeader";
import TopCardSection from "./topCardSection";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { isLgScreen, isXlScreen } = ResponsiveState();
  // const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userName, setUserName] = useState<any>("");
  const [mandatoryCheck, setMandatoryCheck] = useState<any>();
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

  const handleDownload = () => {
    const pdfUrl =
      "https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/blaze/assets/SY_Packaging%20Guide.pdf?response[…]f36adf0c0fca4435752efe347aa334866cd1e6c0669edb";
    window.open(pdfUrl, "_blank");
  };

  useEffect(() => {
    const kycValue = retrieveLocalStorageData("kycValue");
    const userName = localStorage.getItem("userName");
    if (userName !== null && userName !== undefined) {
      setUserName(userName);
    }

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
      {/* welcome message */}
      <WelcomeHeader userName={userName} />
      {/* top reroute section  */}
      <TopCardSection completedStatus={completedStatus} />
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
                loading="lazy"
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
                  selectedSection={selectedSection}
                  mandatoryCheck={mandatoryCheck}
                  sectionRoutes={sectionRoutes}
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
