import axios from "axios";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import CustomButton from "../Button";
import DeleteGif from "../../assets/common/DeleteGif.gif";
import { useState } from "react";
interface IDeleteModal {
  url: string;
  postData: any;
  isOpen: boolean;
  closeModal: any;
  title: any;
}

export const DeleteModal: React.FunctionComponent<IDeleteModal> = ({
  url,
  postData,
  isOpen,
  closeModal,
  title,
}) => {
  const [loading, setLoading] = useState(false);
  const callApi = async () => {
    setLoading(true);
    try {
      const config = {
        url: url,
        method: "POST",
        data: postData,
      };
      const { data: deleteData } = await axios(config);
      if (deleteData) {
      } else {
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <div>
      <CustomBottomModal
        overlayClassName="items-center"
        className="mx-4 !rounded-md"
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
                onClick={() => callApi()}
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
