import axios from "axios";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import CustomButton from "../Button";
import DeleteGif from "../../assets/common/DeleteGif.gif";
import { useState } from "react";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
interface IDeleteModal {
  url: string;
  postData: any;
  isOpen: boolean;
  closeModal: any;
  title: any;
  reloadData?: any;
}

export const DeleteModal: React.FunctionComponent<IDeleteModal> = ({
  url,
  postData,
  isOpen,
  closeModal,
  title,
  reloadData,
}) => {
  const [loading, setLoading] = useState(false);
  const deleteApi = async () => {
    setLoading(true);
    try {
      const { data: deleteData } = await POST(url, postData);
      if (deleteData?.success) {
        toast.success(deleteData?.message);
        reloadData();
      } else {
        toast.error(deleteData?.message);
      }
    } catch (error) {}
    setLoading(false);
    closeModal();
  };

  return (
    <div>
      <CustomBottomModal
        overlayClassName="flex p-5 items-center outline-none z-10"
        className="!w-[600px] !px-4 !py-6"
        isOpen={isOpen}
        onRequestClose={closeModal}
        children={
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <img src={DeleteGif} alt="DeleteGif" className="w-[124px]" />
            </div>
            <div className="flex justify-center text-center">{title}</div>
            <div className="flex justify-center space-x-6">
              <CustomButton
                className="bg-white px-2 !w-min !text-black !border-[1px] !border-[#A4A4A4]"
                text="Yes"
                onClick={() => deleteApi()}
                loading={loading}
              />
              <CustomButton
                className="px-2 !w-min"
                text="Cancel"
                onClick={() => closeModal()}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};
