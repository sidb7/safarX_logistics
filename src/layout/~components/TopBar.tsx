import { useEffect, useRef, useState } from "react";
import InputWithImage from "../../components/InputWithImage/InputWithImage";
import PowerBoosterlogo from "../../assets/powerbooster.svg";
import ProfileLogo from "../../assets/Navbar/essential.svg";
import NotificationLogo from "../../assets/Navbar/notification.svg";
import ShipyaariLogo from "../../assets/Navbar/shipyaariLogos.svg";
import HamMenu from "../../assets/Navbar/hamMenu.svg";
import { GetCurrentPath, clearLocalStorage } from "../../utils/utility";
import SearchIcon from "../../assets/Search.svg";
import CustomButton from "../../components/Button/index";
import locationImage from "../../assets/serv/location.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import ServicabilityPincode from "./ServicabilityPincode";
import { useNavigate } from "react-router-dom";
import WalletIcon from "../../assets/quickAction/wallet.svg";
import YaariIcon from "../../assets/quickAction/yaari.svg";
import TrackOrderIcon from "../../assets/quickAction/tracking.svg";
import WeightIcon from "../../assets/quickAction/weight.svg";
import CreateOrderIcon from "../../assets/quickAction/order.svg";
import SyncOrder from "../../assets/quickAction/syncorder.svg";
import AddBulkIcon from "../../assets/quickAction/addBulk.svg";
import PinCodeIcon from "../../assets/quickAction/pin.svg";
import CrossIcon from "../../assets/cross.svg";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { GET_PROFILE_URL, LOGOUT } from "../../utils/ApiUrls";
import "../../styles/skeleton.css";
import ServiceabilityIcon from "../../assets/Serviceability.svg";
import SyAppIcon from "../../assets/quickAction/shipyaarilogo.svg";
import Serviceability from "./Serviceability";
import { POST_SERVICEABILITY, GET_COMPANY_SERVICE } from "../../utils/ApiUrls";
import { useSelector } from "react-redux";

interface ITopBarProps {
  openMobileSideBar: any;
  setMobileSideBar: any;
}

const TopBar: React.FunctionComponent<ITopBarProps> = (props) => {
  const navigate = useNavigate();
  const walletBalance = useSelector((state: any) => state?.user?.walletBalance);

  const { openMobileSideBar, setMobileSideBar } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickData, setQuickData] = useState<any>();

  const [isOpen, setIsOpen] = useState(false);
  const [isQuick, setIsQuick] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showServiceability, setShowServiceability] = useState(false);
  const [companyServices, setCompanyServices] = useState([]);
  const [servicesData, setServicesData] = useState<any>([]);

  const [showTable, setShowTable] = useState(false);
  const [serviceabilityTableData, setServiceabilityTableData] = useState([]);

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

  const dropdownRef = useRef<any>();
  const dropdownQuickRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleQuickOutsideClick = (event: any) => {
    if (
      dropdownQuickRef.current &&
      !dropdownQuickRef.current.contains(event.target)
    ) {
      setIsQuick(false);
    }
  };

  //Creating Dropdown data for service in serviceability
  const setDropDownData = (data: any) => {
    data.map((eachData: any, index: number) => {
      let temp = servicesData;
      let newData = {
        label: eachData.serviceName + " - " + eachData.serviceMode,
        value: eachData.serviceId,
      };
      temp.push(newData);
      setServicesData(temp);
    });
  };

  const onSubmitServiceability = async (payload: any) => {
    try {
      // Serviceability API

      const { data: response }: any = await POST(POST_SERVICEABILITY, payload);

      if (response?.success) {
        // toast.success(response?.message);

        setShowTable(true);
        setServiceabilityTableData(response?.data[0]);
      } else {
        toast.error(response?.message);

        setShowTable(true);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleQuickOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleQuickOutsideClick);
    };
  }, []);

  const onClickServiceability = async () => {
    try {
      //Get Company Services API - Serviceability
      const { data: response }: any = await POST(GET_COMPANY_SERVICE, {
        skip: 0,
        limit: 500,
      });

      if (response?.success) {
        setCompanyServices(response?.data);
        setDropDownData(response?.data);
      }
    } catch (error) {
      console.error("GET SERVICES API ERROR", error);
      return error;
    }
  };

  const openQuickAction = async () => {
    setIsQuick(!isQuick);
    // try {
    //   const { data } = await POST(GET_PROFILE_URL);
    //   if (data?.success) {
    //     setQuickData(data?.data[0]);

    //   } else {
    //     toast.error(data?.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const logoutHandler = async () => {
    try {
      const { data } = await POST(LOGOUT);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
    clearLocalStorage();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav
        className="px-6 h-[60px] py-2 lg:p-3 grid justify-items-stretch items-center w-full box_shadow"
        style={{
          boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="justify-between lg:justify-self-end flex items-center gap-3">
          <div className="flex items-center gap-x-3 lg:hidden">
            <img src={HamMenu} alt="" onClick={() => setMobileSideBar(true)} />

            <div className="mt-1 p-1">
              <img src={ShipyaariLogo} alt="" />
            </div>
          </div>

          {/* <InputWithImage
            imgSrc={SearchIcon}
            inputClassName="hidden lg:!w-80 lg:flex !p-0"
            placeholder="Search"
          /> */}

          {/* <CustomButton
            icon={PowerBoosterlogo}
            showIcon={true}
            onlyIcon={true}
            className="bg-white hidden lg:!w-12"
            text={""}
            onClick={() => {}}
          /> */}
          <div className="flex items-center justify-self-end gap-x-3 ">
            {isLoading ? (
              <div className="flex animated !rounded-md w-20 h-[36px]    ">
                <img
                  src={WalletIcon}
                  width={35}
                  className="z-10  mx-2"
                  alt=""
                />
              </div>
            ) : (
              <div className="hidden lg:block">
                <div
                  className="flex items-center cursor-pointer max-w-[180px] h-[36px]  rounded-lg py-4 px-2 bg-[#E5EDFF]"
                  onClick={() => navigate("/wallet/view-wallet")}
                >
                  <img src={WalletIcon} width={35} alt="" />
                  <div className="flex gap-x-1 items-center text-[#004EFF] text-sm font-Open font-semibold">
                    <div>₹</div>
                    <div>{walletBalance}</div>
                  </div>
                </div>
              </div>
            )}

            <img
              src={SearchIcon}
              width={"22px"}
              className="lg:hidden"
              height={"22px"}
              alt=""
            />
            <div
              className="relative cursor-pointer col-span-1 flex gap-x-4"
              ref={dropdownRef}
            >
              {/* <img
                src={locationImage}
                width={"22px"}
                height={"22px"}
                alt=""
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              /> */}

              <div ref={dropdownQuickRef}>
                <img
                  src={PowerBoosterlogo}
                  width={"22px"}
                  height={"22px"}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => openQuickAction()}
                />
              </div>

              <CustomButton
                icon={NotificationLogo}
                showIcon={true}
                onlyIcon={true}
                className="bg-white !w-6 !h-6 !p-0 lg:w-fit "
                text={""}
                onClick={() => navigate("/notifications")}
              />
              <CustomButton
                icon={ProfileLogo}
                onClick={() => setIsOpen(!isOpen)}
                showIcon={true}
                onlyIcon={true}
                className="bg-white !w-6 !h-6 !p-0 lg:w-fit"
                text={""}
              />

              {isModalOpen && (
                <CenterModal
                  isOpen={isModalOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  className="w-3/4 h-3/4 max-h-screen overflow-auto"
                >
                  <ServicabilityPincode
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </CenterModal>
              )}

              {/* <img src={ProfileLogo} alt="" /> */}
              {isOpen && (
                <div
                  className="origin-top-right z-10 absolute right-2 mt-8 w-56 rounded-md shadow-lg bg-white  ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-0.5" role="none">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => navigate("/profile")}
                    >
                      Your Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => navigate("/settings")}
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 cursor-pointer  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => logoutHandler()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
              {isQuick && (
                <div
                  className="origin-top-right z-10 absolute -right-4 md:right-2 mt-8 w-[21rem] md:w-[27rem] rounded-md shadow-lg bg-white  ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="p-4" role="none">
                    <div className="flex justify-between mt-4">
                      <span className="text-[#1C1C1C] text-[1rem] font-Open font-semibold">
                        Quick action
                      </span>
                      <span onClick={() => setIsQuick(false)}>
                        <img
                          src={CrossIcon}
                          alt=""
                          className="self-center"
                          width={"20px"}
                          height={"20px"}
                        />
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-6 overflow-hidden mt-4">
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => {
                          setShowTable(false);
                          setShowServiceability(true);
                          onClickServiceability();
                        }}
                      >
                        <img
                          src={ServiceabilityIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Serviceability
                        </span>
                        {/* <span className="text-[#004EFF] text-[0.700rem] md:text-[0.875rem] font-Open font-semibold">
                          ₹ {quickData?.walletBalance}
                        </span> */}
                      </div>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => navigate("/wallet/view-wallet")}
                      >
                        <img
                          src={YaariIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Yaari Points
                        </span>
                        <span className="text-[#004EFF] text-[0.700rem] md:text-[0.875rem] font-Open font-semibold">
                          {0}
                        </span>
                      </div>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => navigate("/tracking")}
                      >
                        <img
                          src={TrackOrderIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Track Order
                        </span>
                      </div>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => navigate("/weight-freeze")}
                      >
                        <img
                          src={WeightIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Weight Freeze
                        </span>
                      </div>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => navigate("/orders/add-order/pickup")}
                      >
                        <img
                          src={CreateOrderIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Create an order
                        </span>
                      </div>
                      <a
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        href="https://play.google.com/store/apps/details?id=com.sts.shipyaari"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={SyAppIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Shipyaari App
                        </span>
                      </a>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => navigate("/orders/add-bulk")}
                      >
                        <img
                          src={AddBulkIcon}
                          alt=""
                          className="self-center"
                          width={"30px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Add Bulk
                        </span>
                      </div>
                      <div
                        className="flex flex-col text-center  hover:bg-gray-100 hover:rounded-2xl"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <img
                          src={PinCodeIcon}
                          alt=""
                          className="self-center"
                          width={"40px"}
                          height={"40px"}
                        />
                        <span className="text-[0.700rem] md:text-[0.875rem] font-Open font-normal">
                          Pincode Check
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Open Modal on Clicking Serviceability */}

        <CenterModal
          isOpen={showServiceability}
          className=" !flex !justify-center !items-center !w-[320px]  md:!w-[50%] !h-[60%]"
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
          />
        </CenterModal>
      </nav>
    </>
  );
};

export default TopBar;
