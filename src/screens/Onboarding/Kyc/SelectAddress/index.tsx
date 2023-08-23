import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../../assets/plusIcon.svg";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { POST } from "../../../../utils/webService";
import { POST_UPDATE_COMPANY_URL } from "../../../../utils/ApiUrls";
import AddButton from "../../../../components/Button/addButton";
interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const onSubmitForm = (e: any) => {
    try {
      e.preventDefault();
    } catch (error) {
      return error;
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

        <form onSubmit={onSubmitForm}>
          <div className="flex flex-col justify-center items-center px-5 ">
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
            <div className="mb-4">
              <Card
                name="address"
                value="haryana"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />
            </div>

            <div className={` ${!isLgScreen && "w-full"}  mb-4   `}>
              <CustomInputBox
                label="Brand Name"
                className="font-Open !w-full lg:!w-[320px]"
                labelClassName="font-Open"
              />
            </div>

            <div className={` ${!isLgScreen && "w-full"}  mb-6 w-full`}>
              <CustomInputWithFileUpload
                label="Upload logo"
                className="font-Open  "
                inputClassName="  lg:!w-[320px]"
              />
            </div>

            <div className={`${!isLgScreen && "w-full"}`}>
              <ServiceButton
                text="SUBMIT"
                btnType="submit"
                className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open lg:!w-[320px] "
              />
            </div>
          </div>
        </form>
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
