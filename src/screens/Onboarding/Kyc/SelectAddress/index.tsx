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
} from "../../../../utils/ApiUrls";
import AddButton from "../../../../components/Button/addButton";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";
import { v4 as uuidv4 } from "uuid";

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

  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>({});

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

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
    console.log("brandName", defaultAddressSelect.hasOwnProperty("addressId"));

    try {
      if (brandName === "" || brandName === undefined) {
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
            name: brandName || "",
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
          sessionStorage.setItem("setKycValue", "true");
          setLoading(false);
          toast.success(responses?.message);

          navigate("/onboarding/wallet-main");
        } else {
          setLoading(false);
          toast.error(response.message);
        }
      } else {
        toast.error("Something Went Wrong!");
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
  //   console.log("data", data);
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
        toast.warning("Previous Address Field Is Empty...");
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
      <div>
        <div className="lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          className="!mt-[44px] lg:!mt-6"
          title="Welcome to Shipyaari"
          content="Tell us more about your company"
        />

        <div>
          <div className="flex flex-col justify-center items-center px-5 ">
            <div className="flex items-center justify-between w-full lg:!w-[320px] ">
              {/* <p>Default</p> */}
              <div className="flex gap-x-2" onClick={() => addAddress()}>
                <img src={PlusIcon} alt="" />
                <p className="font-Open px-[6px] lg:px-0 font-semibold text-sm cursor-pointer text-[#004EFF]  ">
                  ADD ADDRESS
                </p>
              </div>

              {/* <AddButton
                onClick={() => {}}
                text={"ADD ADDRESS"}
                icon={PlusIcon}
                showIcon={true}
                className="!bg-white !border-npne "
                textClassName="!font-semibold !text-sm !leading-5 !font-Open"
              /> */}
            </div>
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
                          defaultAddressSelect?.addressId === el?.addressId
                        }
                        titleClassName="!font-normal !text-[12px]"
                        cardClassName="!mt-4 !cursor-pointer"
                      />
                    );
                  })}
                </div>
                <div className={`${!isLgScreen && "w-full"}`}>
                  <ServiceButton
                    text="SUBMIT"
                    btnType="submit"
                    onClick={() => onMagicForm()}
                    className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open lg:!w-[320px] "
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 lg:h-[250px]  overflow-auto">
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
                              defaultAddressSelect?.addressId === el?.addressId
                            }
                            titleClassName="!font-normal !text-[12px]"
                            cardClassName="!mt-4 !cursor-pointer"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div
                  className={` ${!isLgScreen && "w-full"} mb-6 md:mt-5 lg:mt-4`}
                >
                  <CustomInputBox
                    label="Brand Name"
                    className="font-Open !w-full lg:!w-[320px]"
                    labelClassName="font-Open"
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>

                <div className={` ${!isLgScreen && "w-full"}  mb-6 w-full`}>
                  <CustomInputWithFileUpload
                    label="Upload logo"
                    className="font-Open  "
                    inputClassName="  lg:!w-[320px]"
                    type="file"
                    // onChange={(e) => uploadFile(e)}
                    isRequired={false}
                  />
                </div>
                <div className={`${!isLgScreen && "w-full"}`}>
                  <ServiceButton
                    text="SUBMIT"
                    btnType="submit"
                    onClick={() => onSubmitForm()}
                    className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open lg:!w-[320px] "
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAddresscomponent = () => {
    if (isLgScreen && openModal) {
      return (
        <div className="mx-4 hidden lg:block ">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              addressComponent()
            )}
          </CustomBottomModal>
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
