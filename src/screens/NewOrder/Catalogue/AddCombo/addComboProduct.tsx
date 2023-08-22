import NavBar from "../../../../layout/NavBar";
import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
import InputBox from "../../../../components/InputBox/index";
import CustomDropDown from "../../../../components/DropDown";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import { useNavigate } from "react-router-dom";
import ForwardArrowIcon from "../../../../assets/Delivery/forwardArrow.svg";
import MagicLocationIcon from "../../../../assets/Delivery/magicLocation.svg";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../../../components/Button";
import FileUploadWithText from "../../../../components/FileUploadWithText/fileUploadWithText";
import UploadImg from "../../../../assets/Catalogue/upload.svg";
import AddOrder from "../../../../assets/Catalogue/add_order.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import ItemIcon from "../../../../assets/Product/Item.svg";

const AddComboProduct = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pastedData, setPastedData] = useState("");
  const [products, setProducts] = useState(false);
  const [productsArray, setProductArray]: any = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [data, setData]: any = useState<any>({
    productName: "",
    productCategory: "",
    productPrice: "",
    productTax: "",
    length: "",
    breadth: "",
    height: "",
  });

  useEffect(() => {
    if (
      data.productName !== "" &&
      data.productCategory !== "" &&
      data.productPrice !== "" &&
      data.productTax !== "" &&
      data.length !== "" &&
      data.breadth !== "" &&
      data.height !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data]);

  const handleData = (e: any) => {
    e.preventDefault();
    let temp = [...productsArray];
    temp.push(data);
    setProductArray(temp);
    setProducts(true);
    setData({
      ...data,
      productName: "",
      productCategory: "",
      productPrice: "",
      productTax: "",
      length: "",
      breadth: "",
      height: "",
    });
  };

  const handleClick = () => {
    // inputRef.current?.focus();
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };
  const length = productsArray.length;

  return (
    <div className="relative">
      <NavBar />
      {/* <div className="mx-5"> */}
      <div className="hidden ml-[60px] mt-5 lg:block">
        <p className="font-normal text-[14px] text-[#777777] ">
          Home /
          <span className="font-semibold text-[14px] text-[#1C1C1C]">
            Catalogue
          </span>
        </p>
      </div>
      <div className="hidden lg:flex lg:justify-between flex-row gap-x-1 mb-5 items-center ml-5">
        <div className="flex">
          <img
            src={BackArrow}
            alt=""
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="font-bold text-[28px] text-[#1C1C1C]">Add Product</p>
        </div>
        <div className="flex">
          <div className="mr-5">
            <CustomButton
              icon={AddOrder}
              showIcon={true}
              text={"UPLOAD"}
              className="!p-3"
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="mr-5">
            <CustomButton
              icon={AddOrder}
              showIcon={true}
              text={"FROM CHANNEL"}
              className="!p-3"
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
      {products ? (
        <div className="mb-12">
          {productsArray.map((each: any, index: any) => {
            return (
              <div className="w-[272px] h-[76px] ml-5 mb-10">
                <h1 className="text-[22px] font-semibold mt-4 text-[#004EFF]">
                  Product {index + 1}
                </h1>
                <div className="flex gap-x-3 border-2 border-[#E8E8E8] p-3 rounded-lg mt-3">
                  <img src={ItemIcon} alt="" />
                  <div>
                    {
                      <p className="text-[14px] font-medium">
                        {each.productName}
                      </p>
                    }
                    <div className="flex">
                      <p>5 kg | </p>
                      {<p className="ml-1">{`${each.length} x`}</p>}
                      {<p className="ml-1">{`${each.breadth} x`}</p>}
                      {<p className="ml-1">{`${each.height} cm`}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div className="mx-5">
        <div className="w-[221px] h-[55px]">
          <h1 className="font-semibold text-[#004EFF] text-[22px]">
            Product {length + 1}
          </h1>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg relative w-[768px] h-[98px]">
          <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
            <img
              src={MagicLocationIcon}
              alt="Magic Location Icon"
              className=""
            />
            <div className="text-white text-[12px] font-normal">
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

        <div className="flex flex-col justify-between gap-y-4 mt-4 lg:gap-x-6 lg:grid grid-cols-3">
          <InputBox
            label="Product name"
            value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
          />
          <InputBox
            label="Product category"
            value={data.productCategory}
            onChange={(e) =>
              setData({ ...data, productCategory: e.target.value })
            }
          />
          <InputBox
            label="Product price"
            value={data.productPrice}
            onChange={(e) => setData({ ...data, productPrice: e.target.value })}
          />
          <InputBox
            label="Product tax"
            value={data.productTax}
            onChange={(e) => setData({ ...data, productTax: e.target.value })}
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
                ]}
                selectClassName="rounded-md bg-[#FEFEFE]"
              />

              <InputBox
                className=""
                label="Length"
                value={data.length}
                onChange={(e) => setData({ ...data, length: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
              <InputBox
                className=""
                label="Breadth"
                value={data.breadth}
                onChange={(e) => setData({ ...data, breadth: e.target.value })}
              />
              <InputBox
                label="Height"
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
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

        <div className="flex mt-6 p-[8px] bg-[#F2F6FF] w-[174px] cursor-pointer">
          <img
            src={ButtonIcon}
            className="ml-[25px]"
            alt="Add Product"
            width="16px"
          />
          <span
            className="ml-2 text-[#004EFF] text-[14px]"
            onClick={handleData}
          >
            Add Product
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:!flex lg:!justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] w-full  fixed bottom-0">
        <ServiceButton
          text="BACK"
          className="bg-[#FFFFFF] text-[#1C1C1C] lg:px-[37px]"
        />
        <ServiceButton
          text="SAVE COMBO"
          className={`${
            disabled === true
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-[#1C1C1C]"
          }  text-[#FFFFFF] lg:px-[37px]`}
        />
      </div>
    </div>
    // </div>
  );
};
export default AddComboProduct;
