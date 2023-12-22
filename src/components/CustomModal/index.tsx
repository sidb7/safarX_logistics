import { MdCancel } from "react-icons/md";

interface ModalProps {
  setShowModal: (value: boolean) => void;
  modalBodyData: any;
  wrapperClassName?: string;
  modalTitle?: any;
  modalWidth?: string;
  modalHeight?: string;
}

const Modal = (props: ModalProps) => {
  const {
    setShowModal,
    modalBodyData,
    wrapperClassName,
    modalTitle,
    modalWidth,
    modalHeight,
  } = props;
  return (
    <>
      <>
        <div
          className={`${wrapperClassName} flex justify-center items-center overflow-x-hidden customScroll fixed inset-0 z-50 outline-none focus:outline-none`}
        >
          <div className={`relative   mx-auto ${modalWidth} `}>
            <div
              className={`${modalHeight} border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
            >
              <div className="flex items-center justify-between  border-b border-solid border-gray-300 rounded-t px-12 ">
                <p className="text-2xl font=semibold">{modalTitle}</p>

                <div>
                  <MdCancel onClick={() => setShowModal(false)} size="2rem" />
                </div>
              </div>
              <div className="flex justify-center py-12">{modalBodyData}</div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Modal;
