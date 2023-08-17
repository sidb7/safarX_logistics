import CustomButton from "../../../components/Button";
import Done from "../../../assets/Done .svg";
import CloseIcon from "../../../assets/Transaction/add.svg";

const CongratulationsModal = (props: any) => {
  const { setCongratulations } = props;

  return (
    <div>
      <div>
        <div className="flex justify-end">
          <img
            src={CloseIcon}
            alt="cross"
            onClick={() => setCongratulations(false)}
          />
        </div>
        <div className="flex justify-center">
          <img src={Done} alt="" />
        </div>
        <p className="text-center text-[16px] font-medium lg:font-semibold lg:text-[18px] ">
          Congratulation!
        </p>
        <p className="text-center text-[16px] font-medium lg:font-semibold lg:text-[18px] mb-6">
          We have processed payment for ₹2000
        </p>
        <div className="mx-20 flex justify-center">
          <CustomButton
            className="my-4 !inline-block"
            text="GO TO ORDER"
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CongratulationsModal;
