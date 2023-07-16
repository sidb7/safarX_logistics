interface IPackageBoxProps {
  image: any;
  productName: string;
  weight: string;
  dimension: string;
  className?: string;
  dimensionClassName?: string;
}

const productBox: React.FunctionComponent<IPackageBoxProps> = ({
  image = "",
  productName = "",
  weight = "",
  dimension = "",
  className = "",
  dimensionClassName = "",
}) => {
  return (
    <div
      className={` ${className} product-box flex items-center border-2 rounded-md h-[70px] mt-3`}
    >
      <div className="flex flex-col ml-4">
        <span>{productName}</span>
        <span>
          {`${weight} Kg `}
          <span className={`${dimensionClassName}`}>| {`${dimension} cm`}</span>
        </span>
        <span className="font-normal text-[14px] text-[#A4A4A4]">
          Brown box
        </span>
      </div>
    </div>
  );
};

export default productBox;
