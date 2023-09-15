import React, { useEffect, useState } from "react";
import CenterModal from "../CustomModal/customCenterModal";
import CrossIcon from "../../assets/CloseIcon.svg";
import ProductBox from "../../screens/NewOrder/Product/ProductBox";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/Catalogue/add.svg";
import CustomInputBox from "../Input";
import InputWithFileUpload from "../InputBox/InputWithFileUpload";


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
    Value?: any;
    onClick?: () => void;
    setIsModalOpen?: any;
    isSelected?: any;
    data?: any;
    index?: number;
}
const ComboProductBox: React.FunctionComponent<IPackageBoxProps> = ({
    image = "",
    productName = "",
    weight = "",
    height = "",
    breadth = "",
    length = "",
    dimension = "",
    Value = "",
    className = "",
    dimensionClassName = "",
    label = "",
    onClick,
    data,
    index,
    isSelected = false,
}) => {
    const [isModalOpen, setIsModalOpen] = useState<any>(false);
    const navigate = useNavigate()

    return (
        <>
            <div
                className={` ${className} product-box flex items-center border-2 rounded-md h-20 relative ${isSelected && "border-[#004EFF]"
                    }`}
                onClick={() => setIsModalOpen(true)}
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
                    <span className="line-clamp-1">{productName}</span>
                    <span className="flex ">{`${weight} | ₹${Value}`}</span>
                </div>
            </div>

            <CenterModal
                className="h-[750px] w-[700px]"
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <div className="h-[100%] w-[100%] p-6 border">
                    <div className="flex justify-between right-4 top-4">
                        <div className="text-[25px] font-bold">
                            {data.name}
                        </div>
                        <img
                            src={CrossIcon}
                            alt="Cross Icon"
                            className="cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>
                    <div className="mt-6">
                        <div className="my-4 max-h-[480px] overflow-auto">
                            {data.products?.map((singleProduct: any, index: any) => {
                                return (
                                    <div className="flex items-center my-3">
                                        <div className="font-normal text-[25px] mr-8">{index + 1}</div>
                                        <ProductBox
                                            image={
                                                (singleProduct?.images?.length > 0 &&
                                                    singleProduct?.images[0].url) ||
                                                ""
                                            }
                                            productName={singleProduct?.name}
                                            weight={`${singleProduct?.appliedWeight} ${singleProduct?.weightUnit}`}
                                            height={singleProduct?.height}
                                            breadth={singleProduct?.breadth}
                                            length={singleProduct?.length}
                                            className="w-[100%]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        <div className="grid grid-cols-2 gap-5 my-4">
                            <div className="flex-1">
                                <CustomInputBox
                                    label="Total Volumetric Weight (Kg)"
                                    value={data.totalVolumetricWeight}
                                    isDisabled={true}
                                />
                            </div>
                            <div className="flex-1">
                                <CustomInputBox
                                    label="Total Dead Weight"
                                    value={data?.totalDeadWeight}
                                    isDisabled={true}
                                />
                            </div>
                            <div className="flex-1">
                                <CustomInputBox
                                    label="Total Applied Weight"
                                    value={data?.totalAppliedWeight}
                                    isDisabled={true}
                                />
                            </div>
                        </div>




                    </div>
                </div>
            </CenterModal>
        </>
    );
};

export default ComboProductBox;
