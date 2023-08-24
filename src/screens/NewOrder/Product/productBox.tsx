interface IPackageBoxProps {
  image: any;
  productName: string;
  weight: string;
  dimension: string;
  className?: string;
  dimensionClassName?: string;
  label?: any;
}

const productBox: React.FunctionComponent<IPackageBoxProps> = ({
  image = "",
  productName = "",
  weight = "",
  dimension = "",
  className = "",
  dimensionClassName = "",
  label = "",
}) => {
  return (
    <div
      className={` ${className} text-[#1C1C1C] product-box flex items-center border-2 rounded-md h-[70px] mt-3 relative`}
    >
      <span className="bg-[#6695FF] text-white absolute -top-4 ml-2 rounded-md w-[91px] flex justify-center ">
        {label}
      </span>
      <div className="ml-2">
        <img src={image} alt="Product" className="mr-2 rounded-md w-[40px] h-[40px]" />
      </div>
      <div className="flex flex-col ml-4">
        <span className="text-base font-bold">{productName}</span>
        <span>
          <span className={`${dimensionClassName} text-sm font-normal`}>
            {`${weight} | ${dimension}`}
          </span>
        </span>
      </div>
    </div>
  );
};

export default productBox;
