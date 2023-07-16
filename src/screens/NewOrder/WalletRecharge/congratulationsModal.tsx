import CustomButton from "../../../components/Button"
import Done from "../../../assets/Done .svg";

const CongratulationsModal = () => {
    return(
        <div>
            <div>
                <div className="flex justify-center">
                    <img src={Done} alt="" />
                </div>
                <p className="text-center text-[16px] font-medium">Congratulation!</p>
                <p className="text-center text-[16px] font-medium">We have processed payment for ₹2000</p>
                <div className="mx-20 flex justify-center">
                    <CustomButton className="my-4" text={"GO TO HOME"} onClick={function (): void {
                        throw new Error("Function not implemented.")
                    } } />
                
                </div>
            </div>
        </div>
    )
}
export default CongratulationsModal