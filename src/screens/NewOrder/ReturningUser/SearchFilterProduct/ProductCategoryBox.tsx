import * as React from "react";
interface IProductCategoryBoxProps {
  image: any;
  productName: string;
  className?: string;
  textClassName?: string;
  onClick?: () => void;
  imageClassName?: string;
  key?: any;
}
const ProductCategoryBox: React.FunctionComponent<IProductCategoryBoxProps> = ({
  image = "",
  productName = "",
  className,
  textClassName,
  onClick,
  imageClassName,
  key,
}) => {
  return (
    <div
      key={key}
      className={`inline-flex cursor-pointer p-2 border-[0.5px] rounded-[4px] bg-[#FEFEFE] h-[39px] items-center gap-[4.5px]${className}`}
      onClick={onClick}
    >
      <div className={`w-5 ${imageClassName}`}>
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
