import { useCallback, useEffect, useState } from "react";
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

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [brandName, setBrandName] = useState<string>();
  const [defaultAddress, setDefaultAddress] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>();
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
    try {
      const payload = { data: defaultAddressSelect?.fullAddress };
      setLoading(true);
      const { data: responses } = await POST(MAGIC_ADDRESS, payload);
      setLoading(false);
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
      };
      setLoading(true);
      const { data: response } = await POST(
        POST_UPDATE_COMPANY_URL,
        companyObj
      );
      if (response?.success) {
        setLoading(false);
        navigate("/onboarding/wallet-recharge");
      } else {
        setLoading(false);
        toast.error(response.message);
        navigate("/onboarding/wallet-recharge");
      }
      // if (response?.success) {
      //   toast.success(response?.message);

      //   const payload = { addressId: defaultAddressSelect, isDefault: true };
      //   const { data: responses } = await POST(
      //     POST_UPDATE_DEFAULT_ADDRESS,
      //     payload
      //   );
      //   if (responses?.success) {
      //     toast.success(responses?.message);
      //     // setLoading(false);

      //     navigate("/onboarding/wallet-recharge");

      //     //Navigate Url's go here
      //   } else {
      //     navigate("/onboarding/wallet-recharge");
      //     // toast.error(responses?.message);
      //   }
      //   //Navigate Url's go here
      // } else {
      //   // setLoading(false);
      //   toast.error(response?.message);
      // }
    } catch (error) {
      return error;
    }
  };

  const onMagicForm = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const payload = { data: defaultAddressSelect?.fullAddress };
      const { data: responses } = await POST(MAGIC_ADDRESS, payload);
      setLoading(false);
      if (responses?.success) {
        let combineAdd = `${responses?.data?.message?.house_number} ${responses?.data?.message?.floor} ${responses?.data?.message?.building_name} ${responses?.data?.message?.locality_name} ${responses?.data?.message?.subcity_name}`;
        const magicpayload = {
          companyInfo: {
            address: combineAdd,
            pincode: responses?.data?.message?.pincode,
            city: responses?.data?.message?.city_name,
            state: responses?.data?.message?.state_name,
          },
          isDefault: true,
        };
        setLoading(true);
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
        toast.error(responses?.message);
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

  const addressComponent = () => {
    return (
      <div>
        <div className="lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          // className="!mt-[58px]"
          title="Welcome to Shipyaari"
          content="Tell us more about your company"
        />

        <div>
          <div className="flex flex-col justify-center items-center  lg:px-5 ">
            <div className="flex items-center justify-between w-full  mt-1   lg:!w-[320px] ">
              <p>Default</p>
              {/*commented as instructed by akshay */}
              {/* <div className="flex gap-x-2">
                <img src={PlusIcon} alt="" />
                <p className="font-Open px-[6px] lg:px-0 font-semibold text-sm text-[#004EFF]  ">
                  ADD ADDRESS
                </p>
              </div> */}

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
                        onClick={(e) => setDefaultAddressSelect(el)}
                        name="address"
                        value={el?.fullAddress}
                        title={el?.fullAddress}
                        doctype={el?.doctype}
                        titleClassName="!font-normal !text-[12px]"
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
                <div className="mb-4 h-[200px]  overflow-auto">
                  {defaultAddress?.map((el: any, i: number) => {
                    return (
                      <div key={i}>
                        {el?.fullAddress !== "" && (
                          <Card
                            onClick={(e) => setDefaultAddressSelect(el)}
                            name="address"
                            value={el?.fullAddress}
                            title={el?.fullAddress}
                            doctype={el?.doctype}
                            titleClassName="!font-normal !text-[12px]"
                            cardClassName="!mt-6"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className={` ${!isLgScreen && "w-full"}  mb-4   `}>
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

  return (
    <div>
      {!isLgScreen && addressComponent()}

      {isLgScreen && (
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
      )}
    </div>
  );
};

export default BusinessType;
