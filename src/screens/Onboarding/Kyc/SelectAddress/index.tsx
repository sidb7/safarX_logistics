import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate, useLocation } from "react-router-dom";
import PlusIcon from "../../../../assets/plusIcon.svg";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { POST } from "../../../../utils/webService";
import {
  POST_UPDATE_COMPANY_URL,
  GET_DEFAULT_ADDRESS,
  FILE_UPLOAD,
  POST_UPDATE_DEFAULT_ADDRESS,
  MAGIC_ADDRESS,
  GET_PROFILE_URL,
  LOGO_AND_BRAND,
  LARGE_LOGO,
  COMPANY_NAME,
} from "../../../../utils/ApiUrls";
import AddButton from "../../../../components/Button/addButton";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import { ResponsiveState } from "../../../../utils/responsiveState";

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [brandName, setBrandName] = useState<string>();
  const [defaultAddress, setDefaultAddress] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [brandingDetails, setBrandingDetails] = useState<any>({
    image: "",
    imageUrl: "",
    brandName: "",
    file: null,
  });
  const { isMdScreen } = ResponsiveState();

  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>({});

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    console.log("Fillee", file);
    if (file) {
      const url: any = URL.createObjectURL(file) || null;
      setBrandingDetails({
        ...brandingDetails,
        image: event.target.files[0].name,
        imageUrl: url,
        file: file,
      });
    }
  };

  const initialAddressCall = async () => {
    const { data: response } = await POST(GET_DEFAULT_ADDRESS, {});
    if (response?.success) {
      setDefaultAddress(response?.data);

      // toast.success(response?.message);
      //Navigate Url's go here
    } else {
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    initialAddressCall();
  }, []);

  const onSubmitForm = async () => {
    try {
      if (
        brandingDetails?.brandName === "" ||
        brandingDetails?.brandName === undefined
      ) {
        toast.error("Enter Brand Name");
        return;
      } else if (defaultAddressSelect.hasOwnProperty("addressId") !== true) {
        toast.error("Please Select Address");
        return;
      }

      const payload = { data: defaultAddressSelect?.fullAddress };
      setLoading(true);
      const { data: responses } = await POST(MAGIC_ADDRESS, payload);
      setLoading(false);

      if (responses?.success) {
        let combineAdd = `${responses?.data?.message?.house_number} ${responses?.data?.message?.floor} ${responses?.data?.message?.building_name} ${responses?.data?.message?.locality_name} ${responses?.data?.message?.subcity_name}`;
        const companyObj = {
          companyInfo: {
            address: combineAdd,
            pincode: +responses?.data?.message?.pincode,
            city: responses?.data?.message?.city_name,
            state: responses?.data?.message?.state_name,
            name: brandingDetails?.brandName || "",
            logoUrl: "brandLogo",
          },
          addressId: defaultAddressSelect?.addressId,
          isDefault: true,
          magicObject: responses?.data?.message || {},
        };
        setLoading(true);

        const { data: response } = await POST(
          POST_UPDATE_COMPANY_URL,
          companyObj
        );
        if (response?.success) {
          localStorage.setItem("setKycValue", "true");
          setLoading(false);
          // toast.success(responses?.message);
        } else {
          setLoading(false);
          toast.error(response.message);
        }
      } else {
        toast.error("Something Went Wrong!");
      }

      let formData = new FormData();
      formData.append("brandName", brandingDetails.brandName);
      formData.append("file", brandingDetails?.file);

      let img: any = new Image();
      img.src = brandingDetails?.imageUrl;

      setLoading(true);
      const { data } = await POST(LOGO_AND_BRAND, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        setLoading(false);
        toast.success(data?.message);
        navigate("/onboarding/wallet-main");
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const onMagicForm = async () => {
    // setLoading(true);
    try {
      if (defaultAddressSelect != undefined && defaultAddressSelect != "") {
        setLoading(true);
        const payload = { data: defaultAddressSelect?.fullAddress };
        const { data: responses } = await POST(MAGIC_ADDRESS, payload);
        // setLoading(false);
        if (responses?.success) {
          let combineAdd = `${responses?.data?.message?.house_number} ${responses?.data?.message?.floor} ${responses?.data?.message?.building_name} ${responses?.data?.message?.locality_name} ${responses?.data?.message?.subcity_name}`;
          const magicpayload = {
            companyInfo: {
              address: combineAdd,
              pincode: responses?.data?.message?.pincode,
              city: responses?.data?.message?.city_name,
              state: responses?.data?.message?.state_name,
            },
            addressId: defaultAddressSelect?.addressId,
            isDefault: true,
          };
          // setLoading(false);
          const { data: response } = await POST(
            POST_UPDATE_COMPANY_URL,
            magicpayload
          );
          if (response?.success) {
            setLoading(false);
            toast.success(response?.message);
            navigate("/onboarding/select-address-billing");
          } else {
            setLoading(false);
            toast.error(responses?.message);
          }
        } else {
          setLoading(false);
          toast.error(responses?.message);
        }
      } else {
        toast.error("Please Select Address");
      }
    } catch (error) {
      return error;
    }
  };

  // const uploadFile = async (e: any) => {
  //   let formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  //   formData.append("fileName", "brandLogo");
  //   const data = await POST(FILE_UPLOAD, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   // if (response?.success) {
  //   //   toast.success(response?.message);
  //   //   //Navigate Url's go here
  //   // } else {
  //   //   toast.error(response?.message);
  //   // }
  // };

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
      <>
        <div
          className={`${
            isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
          }flex flex-col relative md:px-0 md:gap-y-0`}
        >
          <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
            <div>
              <div className="md:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
                <img
                  className="m-4 h-[25px] object-contain"
                  src={LARGE_LOGO}
                  alt=""
                />
              </div>
              <WelcomeHeader
                className="!mt-[44px] md:!mt-6"
                title={`Welcome to ${COMPANY_NAME}`}
                content="Select your"
                whichAddress="Pickup"
                Address="Address"
              />

              <div>
                <div className="md:mx-[65px] flex justify-end">
                  <div className="flex gap-x-2" onClick={() => addAddress()}>
                    <img src={PlusIcon} alt="" />
                    <p className="font-Open font-semibold text-sm cursor-pointer text-[#004EFF]  ">
                      ADD ADDRESS
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center px-5">
                  {/* <p>Default</p> */}

                  {/* <AddButton
                  onClick={() => {}}
                  text={"ADD ADDRESS"}
                  icon={PlusIcon}
                  showIcon={true}
                  className="!bg-white !border-npne "
                  textClassName="!font-semibold !text-sm !leading-5 !font-Open"
                /> */}

                  {location?.state?.path === "company-form" ? (
                    <>
                      <div className="mb-4 h-[300px] overflow-auto">
                        {defaultAddress?.map((el: any, i: number) => {
                          return (
                            <Card
                              key={i}
                              onClick={setDefaultAddressSelect}
                              name="address"
                              value={el}
                              title={el?.fullAddress}
                              updatedAddress={updatedAddress}
                              index={i}
                              doctype={el?.doctype}
                              checked={
                                defaultAddressSelect?.addressId ===
                                el?.addressId
                              }
                              titleClassName="!font-normal !text-[12px]"
                              cardClassName="!mt-4 !cursor-pointer"
                            />
                          );
                        })}
                      </div>
                      <div className={`${!isMdScreen && "w-full"}`}>
                        <ServiceButton
                          text="SUBMIT"
                          btnType="submit"
                          onClick={() => onMagicForm()}
                          className="bg-[#1C1C1C]  !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open md:!w-[320px] "
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" h-[250px]  overflow-auto">
                        {defaultAddress?.map((el: any, i: number) => {
                          return (
                            <div key={i} ref={bottomRef}>
                              {el?.fullAddress !== "" && (
                                <Card
                                  onClick={setDefaultAddressSelect}
                                  name="address"
                                  value={el}
                                  title={el?.fullAddress}
                                  updatedAddress={updatedAddress}
                                  index={i}
                                  doctype={el?.doctype}
                                  checked={
                                    defaultAddressSelect?.addressId ===
                                    el?.addressId
                                  }
                                  titleClassName="!font-normal !text-[12px]"
                                  cardClassName="!mt-4 !cursor-pointer"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* <div
                    className={` ${!isMdScreen && "w-full"} mb-6 md:mt-5 lg:mt-4`}
                  > */}
                      <div className="mb-6 mt-6  ">
                        <CustomInputBox
                          label="Brand Name"
                          className="font-Open   !w-[320px] md:!w-[370px]"
                          labelClassName="font-Open"
                          onChange={(e: any) =>
                            setBrandingDetails({
                              ...brandingDetails,
                              brandName: e.target.value,
                            })
                          }
                          value={brandingDetails.brandName}
                        />
                      </div>

                      <div className="mb-6">
                        <CustomInputWithFileUpload
                          label="Upload logo"
                          className="font-Open "
                          inputClassName="  lg:!w-[370px]"
                          type="file"
                          onChange={handleImageChange}
                          isRequired={false}
                        />
                      </div>
                      <div className={`${!isMdScreen && ""}`}>
                        <ServiceButton
                          text="SUBMIT"
                          btnType="submit"
                          onClick={() => onSubmitForm()}
                          className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-[100px] w-[320px]  font-Open md:w-[370px]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAddresscomponent = () => {
    if (isMdScreen) {
      return (
        <div className="mx-4">
          {/* <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          > */}
          {loading ? (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              {addressComponent()}
            </div>
          )}
          {/* </CustomBottomModal> */}
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

export default BusinessType;
