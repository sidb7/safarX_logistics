import * as React from "react";
interface IProductCategoryBoxProps {
  image: any;
  productName: string;
  className?: string;
  textClassName?: string;
  onClick?: () => void;
}
const ProductCategoryBox: React.FunctionComponent<IProductCategoryBoxProps> = ({
  image = "",
  productName = "",
  className,
  textClassName,
  onClick,
}) => {
  return (
    <div
      className={`inline-flex p-2 border-[0.5px] rounded-[4px] bg-[#FEFEFE] h-[39px] items-center gap-[4.5px]${className}`}
      onClick={onClick}
    >
      <div className=" w-5">
        <img src={image} alt="ProductLogo" />
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
