import DeleteGif from "../../assets/common/DeleteGif.gif";
import CloseIcon from "../../assets/CloseIcon.svg";
import CustomeBottomModal from "./customBottomModal";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { useState } from "react";

interface IDeleteProps {
  isOpen: boolean;
  setModal: any;
  deleteTextMessage?: string;
  deleteURL?: any;
  payloadBody?: any;
  DeletepincodeHandler?: any;
}

const DeleteModal = (props: IDeleteProps) => {
  const { isOpen, setModal, deleteTextMessage, deleteURL, payloadBody } = props;
  const [loading, setLoading] = useState(false);

  const deleteApi = async () => {
    setLoading(true);
    const { data } = await POST(deleteURL, payloadBody);
    if (data.success) {
      toast.success(data.message);
      setModal(false)

      
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <CustomeBottomModal
        isOpen={isOpen}
        onRequestClose={() => setModal(false)}
        overlayClassName="flex p-5 items-center outline-none"
        className="!w-[600px] !px-4 !py-6"
      >
        <div className="flex justify-end cursor-pointer">
          <img src={CloseIcon} alt="" onClick={() => setModal(false)} />
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
              onClick={() => setModal(false)}
              type="submit"
              className="bg-white border-2 border-[#A4A4A4] text-[#1C1C1C] px-4 py-2 text-sm font-semibold rounded shadow-md"
            >
              GO BACK
            </button>
            <button
              type="submit"
              className=" bg-[#1C1C1C] text-white px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg"
              onClick={() => deleteApi()}
            >
              {loading ? "LOADING" : "DELETE"}
            </button>
          </div>
        </div>
      </CustomeBottomModal>
    </div>
  );
};
export default DeleteModal;
