import * as React from "react";
interface IProductCategoryBoxProps {
  image: any;
  productName: string;
  className?: string;
  textClassName?: string;
}
const ProductCategoryBox: React.FunctionComponent<IProductCategoryBoxProps> = ({
  image = "",
  productName = "",
  className,
  textClassName,
}) => {
  return (
    <div
      className={`inline-flex p-2 border-[0.5px] rounded-[4px] bg-[#FEFEFE] h-[39px] items-center gap-[4.5px]${className}`}
    >
      <div className=" w-5">
        <img src={image} alt="ProductLogo" className="" />
      </div>
      <div>
        <span
          className={`text-base font-normal leading-[22px]${textClassName}`}
        >
          {productName}
        </span>
      </div>
    </div>
  );
};
export default ProductCategoryBox;
