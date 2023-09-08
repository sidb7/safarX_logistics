import CustomButton from "../../../../components/Button";
import DeleteGif from "../../../../assets/common/DeleteGif.gif";
import CloseIcon from "../../../../assets/closeIcon.svg";
// import CloseIcon from "../../assets/CloseIcon.svg";

const DeleteConfirmModale = (props: any) => {
  const { userInfo, setIsModalOpen, deleteRoleApiCall, title, isUser } = props;
  return (
    <div>
      <div className="flex flex-col  ">
        <div className="flex justify-end">
        </div>
        <div className="flex justify-center mb-2">
          <img src={DeleteGif} alt="" />
        </div>

        <div className=" mb-6 max-w-[400px]">
          <p className="  text-base   lg:text-lg font-semibold  text-center">
            {`Do you want to delete this  ${userInfo?.firstName} ${userInfo?.lastName} ${title} ?`}
          </p>

          <p className="text-base   lg:text-lg font-semibold  text-center">{`Seller Id: ${userInfo?.sellerId}`}</p>

        </div>

        <div className=" flex justify-center gap-x-6">
          <CustomButton
            text={"YES"}
            onClick={() => {
              isUser
                ? deleteRoleApiCall(userInfo?.userId)
                : deleteRoleApiCall(userInfo);
            }}
          />
          <CustomButton
            text={"CANCEL"}
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmModale;
