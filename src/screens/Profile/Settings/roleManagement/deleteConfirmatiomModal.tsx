import CustomButton from "../../../../components/Button";
import DeleteGif from "../../../../assets/common/DeleteGif.gif";
import CloseIcon from "../../../../assets/closeIcon.svg";

const DeleteConfirmModale = (props: any) => {
  const { roleInfo, setIsModalOpen, deleteRoleApiCall, title, isUser } = props;

  return (
    <div>
      <div className="flex flex-col  ">
        <div className="flex justify-end">
        </div>
        <div className="flex justify-center mb-2">
          <img src={DeleteGif} alt="" />
        </div>

        <div className=" mb-6">
          <p className="  text-base   lg:text-lg font-semibold  text-center">
            {`Do you want to delete this  ${
              isUser ? roleInfo?.firstName : roleInfo?.roleName || "N/A"
            } ${title} ?`}
          </p>
          {isUser && (
            <p className="text-base   lg:text-lg font-semibold  text-center">{`User Id: ${roleInfo?.userId}`}</p>
          )}
        </div>

        <div className=" flex justify-center gap-x-6">
          <CustomButton
            text={"YES"}
            onClick={() => {
              isUser
                ? deleteRoleApiCall(roleInfo?.userId)
                : deleteRoleApiCall(roleInfo);
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
