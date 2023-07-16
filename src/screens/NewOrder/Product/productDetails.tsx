import plusIcon from "../../../assets/Product/plusIcon.svg";
import upwardArrow from "../../../assets/Product/arrow-up.png";
import ProductBox from "./productBox";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/Product/subtract-circle.svg";
import addIcon from "../../../assets/Product/addCircle.svg";

const ProductDetails = () => {
  return (
    <div className="w-full p-3  bg-[#FEFEFE] border-2 border-solid border-[#E8E8E8] rounded-lg my-4">
      <div className="flex justify-between items-center">
        <div>
          <p>Product details</p>
        </div>
        <div className="flex gap-2">
          <img src={plusIcon} alt="" />
          <img src={upwardArrow} alt="" />
        </div>
      </div>
      <div className="flex justify-between">
        <ProductBox
          image={ItemIcon}
          productName="Mac book air"
          weight="5"
          dimension="12 x 12 x 12"
          dimensionClassName="!font-light"
          className="!border-none !shadow-none"
        />
        <div className="flex items-center p-2 mt-7 h-[40px] gap-2  border-2 border-solid border-[#E8E8E8] rounded-lg">
          <div>
            <img src={subtractIcon} alt="" />
          </div>
          <div>
            <p>1</p>
          </div>
          <div>
            <img src={addIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <ProductBox
          image={ItemIcon}
          productName="Mac book air"
          weight="5"
          dimension="12 x 12 x 12"
          dimensionClassName="!font-light"
          className="!border-none !shadow-none"
        />
        <div className="flex items-center p-2 mt-7 h-[40px] gap-2  border-2 border-solid border-[#E8E8E8] rounded-lg">
          <div>
            <img src={subtractIcon} alt="" />
          </div>
          <div>
            <p>1</p>
          </div>
          <div>
            <img src={addIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[126px] mt-4">
        <div className="flex justify-between">
          <span className="font-semibold mt-4 pl-4">Triple wall 7 ply</span>
          <img src={plusIcon} alt="Add product" />
        </div>
        <span className="text-xs text-slate-600 mt-2 pl-4">
          Product dead weight 4.5kg
        </span>
        <div className="relative">
          <div className="h-[6px] bg-[#CBEAC0] mt-2 ml-4 mr-12">
            <div className="h-[6px] w-[100px] bg-[#7CCA62] p-0 m-0"></div>
            <div className="absolute top-1 right-0">
              <p className="text-xs font-semibold leading-4 text-[#494949]">
                7 kg
              </p>
            </div>
          </div>
        </div>

        <span className="text-xs text-slate-600 font-semibold mt-4 pl-4">
          You can add product upto 2.5kg
        </span>
      </div>
      
    </div>
    
  );
};
export default ProductDetails;
