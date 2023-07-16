import CustomButton from "../../../../components/Button";
import Done from "../../../../assets/Done .svg";
import Cross from "../../../../assets/cross.svg";

const OrderModal = (props:any) => {
    
    return(
        <div>
            <div>
                <div className="flex justify-end">
                    <img src={Cross} alt="" onClick={(e)=>props.onRequestClose()}/>
                </div>
                
                <div className="flex justify-center">
                    <img src={Done} alt="" />
                </div>
                <p className="text-center text-[16px] font-medium">Thank you!</p>
                <p className="text-center text-[16px] font-medium">Your order has been placed</p>
                <p className="text-center text-[16px] font-medium">You can find your orders in order section</p>
                <div className="mx-20 flex justify-center">
                    <CustomButton className="my-4" text={"GO TO ORDERS"} onClick={function (): void {
                        throw new Error("Function not implemented.")
                    } } />
                
                </div>
            </div>
        </div>
    )
}
export default OrderModal;