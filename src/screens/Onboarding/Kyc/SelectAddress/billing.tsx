import React, { useEffect, useState } from "react";
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
  GET_DEFAULT_ADDRESS,
  POST_UPDATE_COMPANY_URL,
  POST_UPDATE_DEFAULT_ADDRESS,
} from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-toastify";
// import AddButton from "../../../../components/Button/addButton";
// import PlusIcon from "../../../../assets/plusIcon.svg";

interface ITypeProps {}

const Billing = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
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

  const onSubmit = async () => {
    const payload = { addressId: defaultAddressSelect, isBilling: true };
    const { data: responses } = await POST(POST_UPDATE_COMPANY_URL, payload);
    if (responses?.success) {
      // toast.success(responses?.message);
      navigate("/onboarding/select-address-pickup");
      //Navigate Url's go here
    } else {
      toast.error(responses?.message);
    }
  };

  const addressComponent = () => {
    return (
      <div className="relative">
        <div className="">
          <div className=" lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
            <img src={CompanyLogo} alt="" />
          </div>
          <WelcomeHeader
            className="!mt-[58px]"
            title="Welcome to Shipyaari"
            content="Select your Billing Address"
          />

          <div className="w-full lg:flex lg:justify-center">
            <div className="flex items-center justify-between px-4 md:px-8 lg:px-0 mt-1 mb-6  lg:w-[320px] ">
              <p className="font-Open  font-semibold text-sm text-[#1C1C1C] leading-5  ">
                Default
              </p>

              {/* <AddButton
                onClick={() => {}}
                text={"ADD ADDRESS"}
                icon={PlusIcon}
                showIcon={true}
                className="!bg-transparent !border-0"
                textClassName="!font-semibold !text-sm !leading-5 !font-Open"
              /> */}
            </div>
          </div>

          <div className="flex flex-col items-center lg:px-5 lg:h-[300px] lg:overflow-y-scroll ">
            <div className="  space-y-3 mb-6 ">
              <div className="flex flex-col items-center px-4 md:px-12 lg:px-4">
                {defaultAddress?.map((el: any, i: number) => {
                  return (
                    <Card
                      onClick={(e) => setDefaultAddressSelect(e.target.value)}
                      name="address"
                      cardClassName="!mt-6"
                      value={el?.addressId}
                      title={el?.fullAddress}
                      doctype={el?.doctype}
                      titleClassName="!font-normal !text-[12px]"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {isLgScreen && (
            <div className="flex mt-6  lg:justify-center lg:items-center  pb-12 ">
              <ServiceButton
                text="SUBMIT"
                className="bg-[#1C1C1C] text-white w-full mb-5 lg:!w-[320px]"
                onClick={() => {
                  onSubmit();
                }}
              />
            </div>
          )}

          {!isLgScreen && (
            <div
              className={`shadow-lg border-[1px] h-[84px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed  bottom-0`}
              style={{ width: "-webkit-fill-available" }}
            >
              <ServiceButton
                text="SUBMIT"
                className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open "
                onClick={() => {
                  onSubmit();
                }}
              />
            </div>
          )}
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
            className="!p-0 !w-[500px] !h-[700px] overflow-y-auto"
            overlayClassName="flex  items-center"
          >
            {addressComponent()}
          </CustomBottomModal>
        </div>
      )}
    </div>
  );
};

export default Billing;
