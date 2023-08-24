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
interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [brandName, setBrandName] = useState<string>();
  const [defaultAddress, setDefaultAddress] = useState<any>();
  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>();
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const initialAddressCall = async () => {
    const { data: response } = await POST(GET_DEFAULT_ADDRESS, {});
    if (response?.success) {
      // console.log("response", response);
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
    const payload = {
      companyInfo: {
        address: "",
        pincode: 0,
        city: "",
        state: "",
        name: brandName || "",
        logoUrl: "brandLogo",
      },
    };
    const { data: response } = await POST(POST_UPDATE_COMPANY_URL, payload);
    if (response?.success) {
      // toast.success(response?.message);
      // console.log("defaultAddressSelect", defaultAddressSelect);

      const payload = { addressId: defaultAddressSelect, isDefault: true };
      const { data: responses } = await POST(
        POST_UPDATE_DEFAULT_ADDRESS,
        payload
      );
      if (responses?.success) {
        // toast.success(responses?.message);
        //Navigate Url's go here
      } else {
        toast.error(responses?.message);
      }
      //Navigate Url's go here
    } else {
      toast.error(response?.message);
    }
  };

  const onMagicForm = async () => {
    const payload = { data: defaultAddressSelect };
    const { data: responses } = await POST(MAGIC_ADDRESS, payload);
    if (responses?.success) {
      console.log("responses", responses);
      let combineAdd = `${responses?.data?.response?.message?.house_number} ${responses?.data?.response?.message?.floor} ${responses?.data?.response?.message?.building_name} ${responses?.data?.response?.message?.locality_name} ${responses?.data?.response?.message?.subcity_name}`;
      const magicpayload = {
        companyInfo: {
          address: combineAdd,
          pincode: responses?.data?.response?.message?.pincode,
          city: responses?.data?.response?.message?.city_name,
          state: responses?.data?.response?.message?.state_name,
        },
      };

      const { data: response } = await POST(
        POST_UPDATE_COMPANY_URL,
        magicpayload
      );
      if (response?.success) {
        // toast.success(response?.message);
        navigate("/onboarding/select-address-billing");
      } else {
        toast.error(responses?.message);
      }
    } else {
      toast.error(responses?.message);
    }
  };

  const uploadFile = async (e: any) => {
    // const payload = { file: e.target.files[0].name, fileName: "brandLogo" };
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", "brandLogo");
    const { data: response } = await POST(FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.success) {
      // toast.success(response?.message);
      //Navigate Url's go here
    } else {
      toast.error("Failed To Upload!");
    }
  };

  const addressComponent = () => {
    return (
      <div className="">
        <div className="lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          className="!mt-[58px]"
          title="Welcome to Shipyaari"
          content="Tell us more about your company"
        />

        <div>
          <div className="flex flex-col justify-center items-center  lg:px-5 ">
            <div className="flex items-center justify-between w-full  mt-2 mb-4  lg:!w-[320px] ">
              <p className="font-Open px-[6px] lg:px-0 font-semibold text-sm text-[#1C1C1C]  ">
                Address
              </p>

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
                        onClick={(e) => setDefaultAddressSelect(e.target.value)}
                        name="address"
                        value={el?.fullAddress}
                        title={el?.fullAddress}
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
                <div className="mb-4 h-[200px] overflow-auto">
                  {defaultAddress?.map((el: any, i: number) => {
                    return (
                      <Card
                        onClick={(e) => setDefaultAddressSelect(e.target.value)}
                        name="address"
                        value={el?.addressId}
                        title={el?.fullAddress}
                        titleClassName="!font-normal !text-[12px]"
                      />
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
                    onChange={(e) => uploadFile(e)}
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
            {addressComponent()}
          </CustomBottomModal>
        </div>
      )}
    </div>
  );
};

export default BusinessType;
