import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../Button";
import { useEffect } from "react";

Modal.setAppElement("#root");

interface ModalTypes {
  children: any;
  closeModal: () => {} | void;
  isModalOpen: boolean;
  title?: string;
  modalClass?: string;
  headerClass?: string;
  bodyClass?: string;
  titleStyle?: string;
  modalPositionStyle?: string;
  onClick?: () => {} | void;
  showBtn?: boolean;
  setShowDeleteModal?: any;
}
export default function CustomReactModal({
  children,
  closeModal,
  isModalOpen,
  title = "Modal",
  titleStyle,
  modalClass,
  headerClass,
  bodyClass,
  modalPositionStyle,
  setShowDeleteModal,
  onClick = () => {},
  showBtn = true,
}: ModalTypes) {
  useEffect(() => {
    if (isModalOpen) {
      const root = document.getElementById("root") as HTMLDivElement;
      root.style.filter = "blur(2px)";
    } else {
      const root = document.getElementById("root") as HTMLDivElement;
      root.style.filter = "none";
    }
  }, [isModalOpen]);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top:
              modalPositionStyle === "top"
                ? "6%"
                : modalPositionStyle === "mid-center"
                ? "30%"
                : "40%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, 0%)",
          },
        }}
        className={` p-0 absolute rounded-xl outline-none shadow-xl w-4/12  bg-slate-100 ${modalClass} customScroll`}
        overlayClassName="bg-darkBlue fixed top-0 right-0 left-0 bottom-0 bg-opacity-50 z-20"
      >
        <div
          id="modal-header"
          className={`border-b  border-black p-2 relative ${headerClass}`}
        >
          <div
            className={`text-darkBlue py-2 font-medium text-xl ${titleStyle}`}
          >
            {title}
          </div>
          <IoMdClose
            className="absolute right-10 top-4 text-red cursor-pointer"
            size={20}
            onClick={closeModal}
          />
        </div>
        <div className={`p-4 ${bodyClass}`}>{children}</div>
        {showBtn && (
          <div className="flex justify-end gap-x-2 border-t  border-black p-2 ">
            <CustomButton
              text="No"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            />
            <CustomButton
              text="Yes"
              onClick={onClick}
              className="bg-red-600 hover:bg-red-400"
            />
          </div>
        )}
      </Modal>
    </>
  );
}
