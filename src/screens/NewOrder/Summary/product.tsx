import deliveryIcon from "../../../assets/serv/delivery.svg";
import editIcon from "../../../assets/serv/edit.svg";

const Product = () => {
    return(
        <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF]">
          <div className="flex flex-col gap-y-3 ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <img src={deliveryIcon} alt="Location Icon" />
                <p className="text-[14px] font-medium">Product Details</p>
              </div>
              <div>
                <img src={editIcon} alt="Edit Icon" />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              
              <p className="text-[12px] font-medium ml-[25px]">
                Mac book Air | iwatch 8
              </p>
              <p className="text-[12px] font-medium ml-[25px]">5 Quantity |  12 x 12 x 12 cm</p>
            </div>
          </div>
        </div>
    )
}
export default Product;