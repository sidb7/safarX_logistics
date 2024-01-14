import { useEffect, useState } from "react";
import PopUpModal from "../../../../components/CustomModal/customBottomModal";
// import TickIcon from "../../../../assets/Payment/Done.gif";
import TickGif from "../../../../assets/tick.gif";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../../utils/responsiveState";

interface ITypesProps {}

const Modal = (props: ITypesProps) => {
  const [showModal, setShowModal] = useState(true);
  const [businessType, setBusinessType] = useState<any>();
  const { isMdScreen } = ResponsiveState();

  useEffect(() => {
    let localbtype = sessionStorage.getItem("businessType");
    setBusinessType(localbtype);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className={`${isMdScreen? "": "flex justify-center h-screen items-center"}`}>
        <div 
      className={`${
        isMdScreen ? " m-auto  !w-[500px] h-screen " : "w-[320px]  !h-full"
      }flex flex-col justify-center relative md:px-0 md:gap-y-0`}>
        <div className={`${isMdScreen ? "custom_shadow" : "custom_shadow"}`}>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center mb-6">
                <img src={TickGif} alt="" width={124} height={124} />
                <p className="font-bold text-[16px] text-[#1C1C1C] font-Open leading-[22px]">
                  Congratulations!
                </p>

                <p className="font-bold text-[16px] text-[#1C1C1C] text-center font-Open leading-[22px] px-6 md:px-0">
                  {/* {`Your ${text} details have been successfully verified!`} */}
                  {businessType === "individual"
                    ? "Your Adhaar and PAN Details are verified successfully"
                    : "Your GST and PAN Details Verified successfully"}
                </p>
              </div>

              <ServiceButton
                text="NEXT"
                onClick={() => {
                  if (businessType === "individual") {
                    navigate("/onboarding/select-address");
                  } else if (businessType === "company") {
                    navigate("/onboarding/select-address-billing", {
                      state: { path: "company-form" },
                    });
                  } else {
                    navigate("/onboarding/select-address-billing");
                  }
                }}
                className="bg-[#1C1C1C] text-white py-2 px-4 mb-6 font-Open  "
              />
            </div>
          </div>
          </div>
        
      </div>
      </div>
    </div>
  );
};

export default Modal;
