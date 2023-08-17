import React from "react";
import PopupModal from "../../../components/CustomModal/popupModal";
import { Link } from "react-router-dom";
import DoneIcon from "../../../assets/Payment/Done.gif";
import { useMediaQuery } from "react-responsive";
import CustomCenterModal from "../../../components/CustomModal/customCenterModal";

const PostPayment = () => {
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const Content = () => {
    return (
      <div className="flex flex-col border-2 border-red-600  h-[339px]">
        <div className="flex flex-col h-[229px] mt-4">
          <div className="flex flex-col items-center mt-4 ">
            <p>Thank you!</p>
            <p>Your order has been placed.</p>
            <p>You can find your orders in order section</p>
          </div>
          <div className="flex justify-center items-center mt-7   ">
            <img src={DoneIcon} alt="Done Gif" width={124} height={125} />
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <Link className="text-blue-600 underline underline-offset-4" to="/">
            GO TO ORDER
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isItLgScreen && (
        <PopupModal
          showTitle={false}
          showBtn={false}
          isModalOpen={true}
          closeModal={() => {}}
        >
          {Content}
        </PopupModal>
      )}

      {isItLgScreen && (
        <CustomCenterModal
          isOpen={true}
          onClose={() => false}
          className="!h-[320px] !w-[500px]"
        >
          {Content}
        </CustomCenterModal>
      )}
    </>
  );
};

export default PostPayment;
