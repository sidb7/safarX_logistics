import { useEffect, useState } from "react";
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
  POST_UPDATE_DEFAULT_ADDRESS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
// import AddButton from "../../../../components/Button/addButton";
// import PlusIcon from "../../../../assets/plusIcon.svg";

interface ITypeProps {}

const PickUp = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [defaultAddress, setDefaultAddress] = useState<any>();
  const [defaultAddressSelect, setDefaultAddressSelect] = useState<any>();
  const [loading, setLoading] = useState(false);

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
          isDefault: true,
        };
        const { data: responses } = await POST(
          POST_UPDATE_DEFAULT_ADDRESS,
          payload
        );
        if (responses?.success) {
          toast.success(responses?.message);
          navigate("/onboarding/wallet-recharge");
          //Navigate Url's go here
        } else {
          toast.error(responses?.message);
        }
      } else {
        toast.error("Please Select Address");
      }
    } catch (error) {
      return error;
    }
  };

  const addressComponent = () => {
    return (
      <div>
        <div className=" lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          className="!mt-[44px] lg:!mt-6"
          title="Welcome to Shipyaari"
          content="Select your Pickup Address"
        />

        <div className="!h-[calc(100%-300px)] overflow-y-auto">
          <div className="w-full lg:flex lg:justify-center ">
            <div className="flex items-center justify-between px-4 md:px-12 lg:px-0 lg:w-[320px] ">
              {/*commented as instructed */}
              {/* <p className="font-Open font-semibold text-sm text-[#1C1C1C] leading-5  ">
                Default
              </p> */}

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

          <div className="flex flex-col items-center lg:h-[390px] overflow-y-scroll h-[540px] px-5 md:px-12 lg:px-4 space-y-3 ">
            {/* <div className="  space-y-3 mb-6 "> */}
            {defaultAddress?.map((el: any, i: number) => {
              return (
                <div key={i}>
                  {el?.fullAddress !== "" && (
                    <Card
                      // onClick={(e) => setDefaultAddressSelect(e.target.value)}
                      onClick={setDefaultAddressSelect}
                      name="address"
                      value={el}
                      title={el?.fullAddress}
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

          {/* {isLgScreen && ( */}
          {/* <div className="flex mt-6  lg:justify-center lg:items-center  pb-12 ">
            <ServiceButton
              text="SUBMIT"
              className="bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 lg:!w-[320px]"
              onClick={() => onSubmit()}
            />
          </div> */}
          {/* )} */}

          {isLgScreen && (
            <div className="flex mt-6  lg:justify-center lg:items-center  pb-12 ">
              <ServiceButton
                text="SUBMIT"
                className="bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 lg:!w-[320px]"
                onClick={() => {}}
              />
            </div>
          )}
          {/* </div> */}
          {!isLgScreen && (
            <div
              className={`shadow-lg border-[1px] h-[84px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed  bottom-0`}
              style={{ width: "-webkit-fill-available" }}
            >
              <ServiceButton
                text="SUBMIT"
                className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open "
                onClick={() => {
                  navigate("/account/kyc-photo");
                }}
              />
            </div>
          )}
        </div>

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

export default PickUp;
