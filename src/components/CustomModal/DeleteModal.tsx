import DeleteGif from "../../assets/common/DeleteGif.gif";
import CloseIcon from "../../assets/CloseIcon.svg";
import CustomeBottomModal from "./customBottomModal";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";

interface IDeleteProps {
  isOpen: boolean;
  setModalClose: any;
  deleteTextMessage?: any;
  deleteURL?: any;
  payloadBody?: any;
  DeletepincodeHandler?: any;
  setIsDeleted?: any;
  reloadData?: any;
}

const DeleteModal = (props: IDeleteProps) => {
  const {
    isOpen,
    setModalClose,
    deleteTextMessage,
    deleteURL,
    payloadBody,
    setIsDeleted,
    reloadData,
  } = props;

  const deleteApi = async () => {
    const { data } = await POST(deleteURL, { awbs: payloadBody });
    if (data?.success) {
      setIsDeleted(true);
      toast.success(data?.message);
      reloadData(8);
    } else {
      toast.error(data?.message);
    }
    setModalClose();
  };

  return (
    <div>
      <CustomeBottomModal
        isOpen={isOpen}
        onRequestClose={() => setModalClose()}
        overlayClassName="flex p-5 items-center outline-none"
        className="!w-[600px] !px-4 !py-6"
      >
        <div className="flex justify-end cursor-pointer">
          <img src={CloseIcon} alt="" onClick={() => setModalClose()} />
        </div>
        <div className="flex justify-center">
          <img src={DeleteGif} alt="" />
        </div>
        <div className="px-16 ">
          <p className=" text-base   lg:text-lg font-semibold  text-center">
            {deleteTextMessage}
          </p>
          <div className="flex justify-center gap-x-6 my-6">
            <button
              onClick={() => setModalClose()}
              type="submit"
              className="bg-white border-2 border-[#A4A4A4] text-[#1C1C1C] px-4 py-2 text-sm font-semibold rounded shadow-md"
            >
              No
            </button>
            <button
              type="submit"
              className=" bg-[#1C1C1C] text-white px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg"
              onClick={() => deleteApi()}
            >
              Yes
            </button>
          </div>
        </div>
      </CustomeBottomModal>
    </div>
  );
};
export default DeleteModal;
