import React, { useState, useRef } from "react";
// import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
import AddOrder from "../../../../assets/Catalogue/add_order.svg";
import ForwardArrowIcon from "../../../../assets/Delivery/forwardArrow.svg";
import MagicLocationIcon from "../../../../assets/Delivery/magicLocation.svg";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import UploadImg from "../../../../assets/Catalogue/upload.svg";
import CustomButton from "../../../../components/Button";
import InputBox from "../../../../components/InputBox/index";
// import CustomButton from "../../../../components/Button";
import CustomDropDown from "../../../../components/DropDown";
import FileUploadWithText from "../../../../components/FileUploadWithText/fileUploadWithText";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../../components/Layout/breadcum";
// import AddOrder from "../../../../assets/Catalogue/add_order.svg";

interface IAddProductProps {}

const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pastedData, setPastedData] = useState("");
  const handleClick = () => {
    // inputRef.current?.focus();
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <Breadcum label="Add Product" />

        {/* here the button will come from the component  */}

        {/* <div className="flex mt-6 mr-5">
          <div className="mr-4">
            <CustomButton
              icon={AddOrder}
              showIcon={true}
              text={"UPLOAD"}
              className="!p-4"
              onClick={() => {}}
            />
          </div>
          <div className="">
            <CustomButton
              icon={AddOrder}
              showIcon={true}
              text={"FROM CHANNEL"}
              className="!p-4"
              onClick={() => {}}
            />
          </div>
        </div> */}
      </div>

      <div className="mx-5">
        <div className="">
          <div className="mt-3 pb-[25px]">
            <h1 className="font-semibold font-Lato leading-7 capitalize text-[#004EFF] text-[22px]">
              Product
            </h1>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg relative w-[768px] h-[98px]">
            <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
              <img
                src={MagicLocationIcon}
                alt="Magic Location Icon"
                className=""
              />
              <div className="text-white leading-normal font-Open text-[12px] font-normal">
                Magic Address
              </div>
            </div>
            <div className="relative h-[75px] ">
              <div className="w-full max-w-xs mx-auto">
                <div
                  onClick={handleClick}
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent border-none cursor-text"
                >
                  {pastedData || "Click here to paste..."}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={pastedData}
                  onPaste={handlePaste}
                  onChange={() => {}}
                  style={{ position: "absolute", left: "-9999px" }}
                  title="inputWithImage"
                />
              </div>
            </div>
            <div className="absolute right-[5%] top-[70%] transform -translate-y-1/2">
              <img src={ForwardArrowIcon} alt="Arrow" />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-y-4 mt-6 lg:gap-x-6 lg:grid grid-cols-3">
            <InputBox
              label="Product name"
              value=""
              // onChange={(e) => setData({ ...data, productName: e.target.value })}
            />
            <InputBox
              label="Product category"
              value=""
              // onChange={(e) =>
              //   setData({ ...data, productCategory: e.target.value })
              // }
            />
            <InputBox
              label="Product price"
              value=""
              // onChange={(e) => setData({ ...data, productPrice: e.target.value })}
            />
            <InputBox
              label="Product tax"
              value=""
              // onChange={(e) => setData({ ...data, productTax: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                <CustomDropDown
                  value=""
                  onChange={() => {}}
                  options={[
                    {
                      label: "CM",
                      value: "CM",
                    },
                    {
                      label: "MM",
                      value: "MM",
                    },
                    {
                      label: "INCHS",
                      value: "INCHS",
                    },
                  ]}
                  selectClassName="rounded-md bg-[#FEFEFE]"
                />

                <InputBox
                  className=""
                  label="Length"
                  value=""
                  // onChange={(e) => setData({ ...data, length: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                <InputBox
                  className=""
                  label="Breadth"
                  value=""
                  // onChange={(e) => setData({ ...data, breadth: e.target.value })}
                />
                <InputBox
                  label="Height"
                  value=""
                  // onChange={(e) => setData({ ...data, height: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4">
              <FileUploadWithText
                icon={UploadImg}
                placeholder="Upload Product Image"
                text="UPLOAD"
                className=""
              />
            </div>
          </div>

          <div className="flex mt-6 p-[8px] bg-[#F2F6FF] w-[174px]">
            <img
              src={ButtonIcon}
              className="ml-[25px]"
              alt="Add Product"
              width="16px"
            />
            <span
              className="ml-2 text-[#004EFF] text-[14px] font-semibold leading-5 font-Open"
              // onClick={handleData}
            >
              Add Product
            </span>
          </div>
        </div>
        <div>
          <BottomLayout backButtonText="BACK" nextButtonText="SAVE" />
        </div>
      </div>
      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default AddProduct;
