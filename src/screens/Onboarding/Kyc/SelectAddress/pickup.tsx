import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../../components/Button/addButton";
import PlusIcon from "../../../../assets/plusIcon.svg";
import {
  COMPANY_NAME,
  GET_DEFAULT_ADDRESS,
  POST_UPDATE_DEFAULT_ADDRESS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
// import AddButton from "../../../../components/Button/addButton";
// import PlusIcon from "../../../../assets/plusIcon.svg";
import { v4 as uuidv4 } from "uuid";
import { ResponsiveState } from "../../../../utils/responsiveState";

interface ITypeProps {}

const PickUp = (props: ITypeProps) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [defaultAddress, setDefaultAddress] = useState<any>([]);
  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { isMdScreen } = ResponsiveState();

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const initialAddressCall = async () => {
    setLoading(true);
    const { data: response } = await POST(GET_DEFAULT_ADDRESS, {});
    if (response?.success) {
      setLoading(false);
      setDefaultAddress(response?.data);

      // toast.success(response?.message);
      //Navigate Url's go here
    } else {
      setLoading(false);
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    initialAddressCall();
  }, []);

  const onSubmit = async () => {
    try {
      if (defaultAddressSelect != undefined && defaultAddressSelect != "") {
        const payload = {
          addressId: defaultAddressSelect?.addressId,
          editAddress: defaultAddressSelect?.fullAddress,
          isDefault: true,
        };
        setLoading(true);
        const { data: responses } = await POST(
          POST_UPDATE_DEFAULT_ADDRESS,
          payload
        );
        if (responses?.success) {
          // toast.success(responses?.message);
          localStorage.setItem("setKycValue", "true");
          navigate("/onboarding/wallet-main");
          //Navigate Url's go here
          setLoading(false);
        } else {
          toast.error(responses?.message);
          setLoading(false);
        }
      } else {
        toast.error("Please Select Address");
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const addAddress = () => {
    for (let i = 0; i < defaultAddress.length; i++) {
      if (defaultAddress[i].fullAddress?.length === 1) {
        toast.error("Previous Address Field Is Empty...");
        return;
      }
    }
    let uuid = uuidv4();
    let textArea = {
      addressId: uuid,
      doctype: "OTHERS",
      fullAddress: " ",
      isActive: true,
      isBilling: false,
      isDefault: false,
      isDeleted: false,
    };
    setDefaultAddress([...defaultAddress, textArea]);
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const updatedAddress = (value: any, index: number) => {
    for (let i = 0; i < defaultAddress?.length; i++) {
      if (index === i) {
        defaultAddress[i].fullAddress = value;
      }
    }
    // setDefaultAddress([...defaultAddress, defaultAddress]);
  };

  const addressComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className="">
            <div className=" md:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
              <img src={CompanyLogo} alt="" />
            </div>
            <WelcomeHeader
              className="!mt-[44px] md:!mt-6"
              title={`Welcome to ${COMPANY_NAME || "Shipyaari"}`}
              content="Select your"
              whichAddress="Pickup"
              Address="Address"
            />

            <div className="!h-[calc(100%-300px)] customScroll">
              <div className="w-full pl-4">
                <div className="flex items-center justify-between  md:px-12 md:px-0 md:w-[320px]">
                  {/*commented as instructed */}
                  {/* <p className="font-Open font-semibold text-sm text-[#1C1C1C] leading-5  ">
                Default
              </p> */}

                  <AddButton
                    onClick={() => addAddress()}
                    text={"ADD ADDRESS"}
                    icon={PlusIcon}
                    showIcon={true}
                    className="!bg-transparent !border-0"
                    textClassName="!font-semibold !text-sm !leading-5 !font-Open"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center md:h-[390px] customScroll h-[540px] px-5 md:px-12 md:px-4 space-y-3 ">
                {/* <div className="  space-y-3 mb-6 "> */}
                {defaultAddress?.map((el: any, i: number) => {
                  return (
                    <div key={i} ref={bottomRef}>
                      {el?.fullAddress !== "" && (
                        <Card
                          // onClick={(e) => setDefaultAddressSelect(e.target.value)}
                          onClick={setDefaultAddressSelect}
                          name="address"
                          value={el}
                          title={el?.fullAddress}
                          updatedAddress={updatedAddress}
                          index={i}
                          checked={
                            defaultAddressSelect?.addressId === el?.addressId
                          }
                          doctype={el?.doctype}
                          titleClassName="!font-normal !text-[12px]"
                          cardClassName="!mt-1 !cursor-pointer"
                        />
                      )}
                    </div>
                  );
                })}
                {/* </div> */}
              </div>

              {isMdScreen ? (
                <div className="flex mt-6  md:justify-center md:items-center  pb-12 ">
                  <ServiceButton
                    text="SUBMIT"
                    className="bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 md:!w-[320px]"
                    onClick={() => onSubmit()}
                  />
                </div>
              ) : (
                <div
                  className={`shadow-lg border-[1px] h-[84px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed  bottom-0`}
                  style={{ width: "-webkit-fill-available" }}
                >
                  <ServiceButton
                    text="SUBMIT"
                    className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open "
                    onClick={() => {
                      // navigate("/account/kyc-photo");
                      onSubmit();
                    }}
                  />
                </div>
              )}

              {/* {isLgScreen && (
            <div className="flex mt-6  lg:justify-center lg:items-center  pb-12 ">
              <ServiceButton
                text="SUBMIT 3"
                className="bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 lg:!w-[320px]"
                onClick={() => {}}
              />
            </div>
          )} */}
              {/* </div> */}
              {/* {!isLgScreen && ( */}

              {/* )} */}
            </div>

            {/* {!isLgScreen && ( */}
            {/* <div
          className={`shadow-lg border-[1px] h-[84px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed  bottom-0`}
          style={{ width: "-webkit-fill-available" }}
        >
          <ServiceButton
            text="SUBMIT 2"
            className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open "
            onClick={() => {
              onSubmit();
            }}
          />
        </div> */}
            {/* )} */}
          </div>
        </div>
      </div>
    );
  };

  const renderAddresscomponent = () => {
    if (isMdScreen) {
      return (
        <div className="mx-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[100vh]">
              {addressComponent()}
            </div>
          )}
        </div>
      );
    } else {
      return loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        addressComponent()
      );
    }
  };
  return <div>{renderAddresscomponent()}</div>;
};

export default PickUp;
