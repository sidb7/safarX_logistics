import * as React from "react";
interface IProductCategoryBoxProps {
  image: any;
  productName: string;
}
const ProductCategoryBox: React.FunctionComponent<IProductCategoryBoxProps> = ({
  image = "",
  productName = "",
}) => {
  return (
    <div className="inline-flex p-2 border-2 rounded-[4px] bg-[#FEFEFE] h-[39px] items-center gap-[4.5px]">
      <div className=" w-5">
        <img src={image} alt="ProductLogo" className="" />
      </div>
      <div>
        <span className="text-base font-normal leading[22px]">
          {productName}
        </span>
      </div>
    </div>
  );
};
export default ProductCategoryBox;