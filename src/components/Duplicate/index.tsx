import axios from "axios";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import CustomButton from "../Button";
import RightGif from "../../assets/greenTick.svg";
import { useState } from "react";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";
import { Spinner } from "../Spinner";
interface IDeleteModal {
  url: string;
  postData: any;
  isOpen: boolean;
  closeModal: any;
  title: any;
  reloadData?: any;
}

export const DuplicateModel: React.FunctionComponent<IDeleteModal> = ({
  url,
  postData,
  isOpen,
  closeModal,
  title,
  reloadData,
}) => {
  const [loading, setLoading] = useState(false);
  const duplicateApi = async () => {
    setLoading(true);
    let currentTimestamp = new Date().getTime();
    currentTimestamp = currentTimestamp % 1000;
    postData.tempOrderId = `${postData.tempOrderId}-duplicate-${currentTimestamp}`;
    postData.orderId = postData.orderId
      ? `${postData.orderId}-duplicate-${currentTimestamp}`
      : "";
    delete postData?._id;
    try {
      const { data: duplicateData } = await POST(url, postData);
      if (duplicateData?.success) {
        toast.success(duplicateData?.message);
        reloadData(0);
      } else {
        toast.error(duplicateData?.message);
      }
    } catch (error) {}
    setLoading(false);
    closeModal();
  };

  return (
    <div>
      <CustomBottomModal
        overlayClassName="flex p-5 items-center outline-none z-[99]"
        className="!w-[600px] !px-4 !py-6"
        isOpen={isOpen}
        onRequestClose={closeModal}
        children={
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <img src={RightGif} alt="RightGif" className="w-[124px]" />
            </div>
            <div className="flex justify-center text-center">{title}</div>
            <div className="flex justify-center space-x-6">
              <CustomButton
                className="bg-white px-2 !w-min !text-black !border-[1px] !border-[#A4A4A4]"
                text="Cancel"
                onClick={() => closeModal()}
              />
              {loading ? (
                <div className=" px-4 !w-min !border-[1px] !border-[#A4A4A4] rounded shadow-md hover:shadow-lg">
                  <Spinner />
                </div>
              ) : (
                <CustomButton
                  className="bg-[#000000] px-4 !w-min !text-[#FFFFFF] !border-[1px] !border-[#A4A4A4]"
                  text="Yes"
                  onClick={() => duplicateApi()}
                  loading={loading}
                />
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};
