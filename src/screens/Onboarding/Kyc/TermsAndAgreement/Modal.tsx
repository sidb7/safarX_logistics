import { useEffect, useState } from "react";
import PopUpModal from "../../../../components/CustomModal/customBottomModal";
// import TickIcon from "../../../../assets/Payment/Done.gif";
import TickGif from "../../../../assets/tick.gif";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";

interface ITypesProps {}

const Modal = (props: ITypesProps) => {
  const [showModal, setShowModal] = useState(true);
  const [businessType, setBusinessType] = useState<any>();

  useEffect(() => {
    let localbtype = sessionStorage.getItem("businessType");
    setBusinessType(localbtype);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <PopUpModal
          isOpen={showModal}
          contentLabel="hello"
          // onRequestClose={() => {
          //   setShowModal(false);
          // }}
          overlayClassName=" px-4 flex items-center "
          className="!rounded !border-none w-[320px] h-[298px] lg:w-[500px]"
        >
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center mb-6">
              <img src={TickGif} alt="" width={124} height={124} />
              <p className="font-bold text-[16px] text-[#1C1C1C] font-Open leading-[22px]">
                Congratulations!
              </p>

              <p className="font-bold text-[16px] text-[#1C1C1C] text-center font-Open leading-[22px] ">
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
        </PopUpModal>
      </div>
    </div>
  );
};

export default Modal;
