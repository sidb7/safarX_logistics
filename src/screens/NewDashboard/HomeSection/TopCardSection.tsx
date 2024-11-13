import React, { useEffect, useState } from "react";
import OneButton from "../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import successStatus from "../../../assets/success.svg";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import Serviceability from "../../../layout/~components/Serviceability";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { POST } from "../../../utils/webService";
import {
  GET_COMPANY_SERVICE,
  POST_SERVICEABILITY,
} from "../../../utils/ApiUrls";
import Checkbox from "../../../components/CheckBox";
import CircularProgress from "../../../components/CircularProgressBar/CircularProgress";
import { ResponsiveState } from "../../../utils/responsiveState";

interface ITopCardSectionProps {
  completedStatus: any;
}

const TopCardSection: React.FunctionComponent<ITopCardSectionProps> = ({
  completedStatus,
}) => {
  const isMasked = useSelector((state: any) => state?.user?.isMasked);
  const navigate = useNavigate();
  const [showServiceability, setShowServiceability] = useState(false);
  const [servicesData, setServicesData] = useState<any>([]);
  const [companyServices, setCompanyServices] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [serviceabilityTableData, setServiceabilityTableData] = useState([]);
  const [serviceabilityTableLoader, setServiceabilityTableLoader] =
    useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0); // Index for carousel

  const [serviceabilityData, setServiceabilityData] = useState<any>({
    pickupPincode: "",
    deliveryPincode: "",
    invoiceValue: "",
    paymentMode: "",
    serviceId: "",
    weight: "",
    orderType: "B2B",
    dimension: {
      length: "",
      width: "",
      height: "",
    },
  });

  const clearServiceabilityState = () => {
    setServiceabilityData({
      pickupPincode: "",
      deliveryPincode: "",
      invoiceValue: "",
      paymentMode: "",
      serviceId: "",
      weight: "",
      orderType: "B2B",
      dimension: {
        length: "",
        width: "",
        height: "",
      },
    });
  };

  // Define each task with a title and a percentage weight
  let tasks = [
    {
      id: 1,
      title: "Customize your Labels",
      percentage: 5,
      completed: completedStatus.customizeLabels,
    },
    {
      id: 2,
      title: "Your Plan Details",
      percentage: 5,
      completed: completedStatus.planDetails,
    },
    {
      id: 3,
      title: "Brand Profile Management",
      percentage: 20,
      completed: completedStatus.brandDetails,
    },
    {
      id: 4,
      title: "Become a COD Seller",
      percentage: 10,
      completed: completedStatus.bankDetails,
    },
    {
      id: 5,
      title: "Complete your KYC",
      percentage: 40,
      completed: completedStatus.kyc,
    },
    {
      id: 6,
      title: "Setup Your Account",
      percentage: 10,
      completed: completedStatus.qna,
    },
    {
      id: 7,
      title: "Verify Your Account",
      percentage: 10,
      completed: completedStatus.verifyAccount,
    },
  ];

  // Sort tasks so completed tasks are at the bottom
  tasks = tasks.sort((a, b) => a.completed - b.completed);

  const handleDotClick = (index: any) => {
    setCarouselIndex(index);
  };

  // Calculate total completion percentage based on completed tasks
  const totalCompletionPercentage = tasks
    .filter((task) => task.completed)
    .reduce((acc, task) => acc + task.percentage, 0);

  // Carousel items
  const carouselItems = [
    <div className="flex flex-col items-center justify-center">
      <CircularProgress
        percentage={totalCompletionPercentage}
        label="Completed"
      />
    </div>,
    <div className="flex flex-col gap-y-4 gap-x-2 w-full">
      <p className="font-Open text-base xl:text-[18px] leading-6 font-semibold xl:leading-8 text-[#1C1C1C]">
        Progress
      </p>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between ${
            task.completed ? "opacity-50 bg-gray-100" : ""
          }`}
        >
          <div className="flex items-center">
            <Checkbox
              checked={task.completed}
              style={{ accentColor: "#C4C4C4" }}
              checkboxClassName="gap-4 w-4 h-4 !cursor-not-allowed"
              disabled={true}
              className="!cursor-not-allowed"
            />
            <p
              className={`ml-2 font-Open text-[15px] ${
                task.completed ? "text-gray-400 line-through" : "text-[#413F3F]"
              }`}
            >
              {task.title}
            </p>
          </div>
          <p
            className={`ml-2 font-Open text-[15px] font-bold ${
              task.completed ? "text-gray-400" : "text-[#413F3F]"
            }`}
          >
            {task.percentage}%
          </p>
        </div>
      ))}
    </div>,
  ];

  const onSubmitServiceability = async (payload: any) => {
    try {
      // Serviceability API

      setServiceabilityTableLoader(true);

      const { data: response }: any = await POST(POST_SERVICEABILITY, payload);

      if (response?.success) {
        const filterData: any = response?.data.filter(
          (item: any, index: any) => {
            if (item?.companyServiceId === payload?.serviceId) {
              return item;
            }
          }
        );
        setShowTable(true);
        if (isMasked) {
          let slice = filterData?.slice(0, 2);
          slice.forEach((element: any, i: number) => {
            element.partnerName = "Shipyaari";
            if (i === 0) {
              element.companyServiceName = "Air";
            } else {
              element.companyServiceName = "Surface";
            }
          });
          setServiceabilityTableData(slice);
        } else {
          setServiceabilityTableData(filterData);
        }
        setServiceabilityTableLoader(false);
      } else {
        toast.error(response?.message);
        setServiceabilityTableLoader(false);
        setShowTable(true);
      }
    } catch (error) {
      return error;
    }
  };
  const onClickServiceability = async () => {
    try {
      //Get Company Services API - Serviceability
      const { data: response }: any = await POST(GET_COMPANY_SERVICE, {
        skip: 0,
        limit: 500,
      });

      if (response?.success) {
        setCompanyServices(response?.data);
        setServicesData(response?.data);
      }
    } catch (error) {
      console.error("GET SERVICES API ERROR", error);
      return error;
    }
  };

  // // Auto-scroll logic
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  //   }, 3000); // Switch every 3 seconds

  //   return () => clearInterval(interval);
  // }, [carouselItems.length]);

  return (
    <>
      <div className="flex flex-col sm:flex-col-reverse xl:flex-row xl:mt-[50px] mb-[25px] gap-x-8">
        <div className="flex-1">
          <div className=" grid grid-cols-1 sm:grid-cols-2  gap-6 lg:gap-8 ">
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
                    {completedStatus?.qna && completedStatus?.returningUser
                      ? "Track your Order"
                      : completedStatus?.qna && !completedStatus?.returningUser
                      ? "You're all set!"
                      : "Let's get you started!"}
                  </p>

                  <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                    {completedStatus?.qna && completedStatus?.returningUser
                      ? "Stay updated on your order's progress and estimated delivery time with real-time tracking."
                      : completedStatus?.qna && !completedStatus?.returningUser
                      ? "Your setup is complete. You can now enjoy a personalized Shipyaari experience."
                      : "Set up your account for a personalized Shipyaari experience and seamless logistics."}
                  </p>
                </div>
                {!completedStatus?.qna ? (
                  // Condition 1: If qna is not true, show "CLICK HERE" button for onboarding
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                    <OneButton
                      text={"CLICK HERE"}
                      onClick={() => navigate("/onboarding/get-started")}
                      variant="tertiary"
                      className="!bg-transparent !text-sm "
                    />
                  </div>
                ) : completedStatus?.returningUser ? (
                  // Condition 2: If qna is true and returning user is true, show "CLICK HERE" button for tracking
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                    <OneButton
                      text={"CLICK HERE"}
                      onClick={() => navigate("/tracking")}
                      className=" !bg-[#3371FF] !rounded-3xl text-white px-4 py-2 !font-Open !font-semibold !text-sm !leading-5"
                    />
                  </div>
                ) : (
                  // If qna is true but returningUser is false, show "Completed" text without a button
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
                    {completedStatus?.returningUser
                      ? "Upgrade your Plan"
                      : "Sync your Channel"}
                  </p>
                  <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                    {completedStatus?.returningUser
                      ? "Enhance your experience by upgrading your plan. Click here to learn more."
                      : "Integrate your channel for a seamless Shipping Experience."}
                  </p>
                </div>
                {!completedStatus?.returningUser ? (
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                    <OneButton
                      text={"SYNC MY STORE"}
                      onClick={() => {
                        navigate("/catalogues/channel-integration");
                      }}
                      variant="tertiary"
                      className="!bg-transparent !text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
                    <OneButton
                      text={"CLICK HERE"}
                      onClick={() => navigate("/subscription/plans")}
                      className=" !bg-[#3371FF] !rounded-3xl text-white px-4 py-2 !font-Open !font-semibold !text-sm !leading-5"
                    />
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
                    {completedStatus?.returningUser
                      ? "Check Service Coverage"
                      : "Time to Fill the Wallet Tank"}
                  </p>
                  <p className="font-Open text-[13px] 2xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                    {completedStatus?.returningUser
                      ? "Instantly check if we can deliver to your location for a hassle-free shipping experience!"
                      : "Fill up your wallet and speed up your business. Quick top-ups for smooth, unstoppable growth."}
                  </p>
                </div>
                {!completedStatus?.returningUser ? (
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
                    <OneButton
                      text={"WALLET RECHARGE"}
                      onClick={() => navigate("/wallet/view-wallet")}
                      variant="tertiary"
                      className=" !bg-transparent !text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
                    <OneButton
                      text={"Serviceability"}
                      onClick={() => {
                        setShowTable(false);
                        setShowServiceability(true);
                        onClickServiceability();
                      }}
                      className=" !bg-[#3371FF] !rounded-3xl text-white px-4 py-2 !font-Open !font-semibold !text-sm !leading-5"
                    />
                  </div>
                )}
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
                      ? "Place order!"
                      : "Add Your First Order Manually"}
                  </p>
                  <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                    {completedStatus?.returningUser
                      ? "Create orders quickly. Select 'Single' for one shipment or 'Bulk' for multiple."
                      : "Lets take a plunge and start our yaari. Add your first order Manually."}
                  </p>
                </div>
                {!completedStatus?.returningUser ? (
                  <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                    <OneButton
                      text={"CREATE ORDER"}
                      onClick={() => navigate("/orders/quick-order-place")}
                      variant="tertiary"
                      className=" !bg-transparent !text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex gap-x-[10px] justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                    <div className="">
                      <OneButton
                        text={"Single"}
                        onClick={() => navigate("/orders/quick-order-place")}
                        className=" !bg-[#3371FF] !rounded-3xl text-white px-4 py-2 !font-Open !font-semibold !text-sm !leading-5"
                      />
                    </div>
                    <div className="">
                      <OneButton
                        text={"Bulk"}
                        onClick={() => navigate("/orders/add-bulk")}
                        className=" !bg-[#3371FF] !rounded-3xl text-white px-4 py-2 !font-Open !font-semibold !text-sm !leading-5"
                      />
                    </div>
                  </div>
                )}
                {/* Open Modal on Clicking Serviceability */}

                <CenterModal
                  isOpen={showServiceability}
                  className=" !flex !justify-center !items-center !w-[60%] !h-3/4"
                  onRequestClose={() => {
                    setShowServiceability(false);
                    clearServiceabilityState();
                    setServiceabilityTableData([]);
                  }}
                >
                  <Serviceability
                    onClick={() => {
                      setShowServiceability(false);
                      clearServiceabilityState();
                      setServiceabilityTableData([]);
                    }}
                    servicesData={servicesData}
                    serviceabilityData={serviceabilityData}
                    setServiceabilityData={setServiceabilityData}
                    onSubmitServiceability={onSubmitServiceability}
                    clearServiceabilityState={clearServiceabilityState}
                    showTable={showTable}
                    setShowTable={setShowTable}
                    serviceabilityTableData={serviceabilityTableData}
                    setServiceabilityTableData={setServiceabilityTableData}
                    loader={serviceabilityTableLoader}
                  />
                </CenterModal>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-[25px] xl:mb-[0px]">
          <div className="flex-2 rounded-2xl border border-[#E8E8E8] bg-white shadow-md px-5 py-[26px] xl:min-w-[394px] mt-[50px]  xl:mt-[0px]">
            {carouselIndex === 0 && (
              <>
                <p className="flex justify-start font-Open text-base xl:text-[18px] leading-6 font-bold xl:leading-8 text-[#1C1C1C]">
                  Your Profile
                </p>
              </>
            )}

            {/* Display carousel item based on carouselIndex */}
            {carouselItems[carouselIndex]}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-4 h-2 rounded-full ${
                  carouselIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCardSection;
