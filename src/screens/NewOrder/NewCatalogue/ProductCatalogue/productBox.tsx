import React from "react";
interface IPackageBoxProps {
    image?: any;
    productName: string;
    weight?: string;
    dimension?: string;
    className?: string;
    dimensionClassName?: string;
    label?: any;
    length?: any;
    height?: any;
    breadth?: any;
    onClick?: () => void;
    isSelected?: any;
}

const productBox: React.FunctionComponent<IPackageBoxProps> = ({
    image = "",
    productName = "",
    weight = "",
    height = "",
    breadth = "",
    length = "",
    dimension = "",
    className = "",
    dimensionClassName = "",
    label = "",
    onClick,
    isSelected = false,
}) => {
    return (
        <div
            className={` ${className} product-box flex items-center border-2 rounded-md h-20 relative ${isSelected && "border-[#004EFF]"
                }`}
            onClick={onClick}
            style={{
                boxShadow:
                    "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
        >
            <span
                className={`${label !== "" ? "" : "hidden"
                    } bg-[#6695FF] text-white absolute -top-4 ml-2 rounded-md w-[91px] flex justify-center `}
            >
                {label}
            </span>
            <div className="px-4">
                <img src={image} alt="" />
            </div>
            <div className="flex flex-col  pr-4">
                <span>{productName}</span>
                <span className="flex ">
                    {`${weight} | ${length} x ${breadth} x ${height} cm`}
                </span>
            </div>
        </div>
    );
};

export default productBox;

