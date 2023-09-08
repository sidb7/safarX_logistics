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
import { Breadcum } from "../../../../components/Layout/breadcrum";
// import AddOrder from "../../../../assets/Catalogue/add_order.svg";
import { POST } from "../../../../utils/webService";
import { POST_ADD_PRODUCT } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IAddProductProps {}

const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any>({
    productId: uuidv4(),
    productName: "",
    description: "",
    category: [],
    tags: [],
    price: 0,
    currency: "INR",
    gst: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      unit: "",
    },
    weight: {
      deadWeight: 12,
      deadWeightUnit: "kg",
      volumetricWeight: 0,
      volumetricWeightUnit: "kg",
      catalogueWeight: {
        from: 0,
        to: 0,
        unit: "kg",
      },
    },
    available: true,
    attributes: {},
    features: [],
    images: [],
    ratings: {
      average: 0,
      count: 0,
    },
    reviews: [],
  });
  const addProduct = async () => {
    const { data } = await POST(POST_ADD_PRODUCT, products);
    if (data?.success) {
      toast.success(data?.message);
      navigate(-1);
    } else {
      toast.error(data?.message);
    }
  };
  return (
    <div className="h-full">
      <Breadcum
        label="Add Product"
        component={
          <div className="flex">
            <div className="mr-4">
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"UPLOAD"}
                className="!p-4"
                onClick={() => {}}
              />
            </div>
            <div>
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"FROM CHANNEL"}
                className="!p-4"
                onClick={() => {}}
              />
            </div>
          </div>
        }
      />

      <div className="mx-5">
        <div>
          <div className="mt-4 pb-[25px]">
            <h1 className="font-semibold font-Lato leading-7 capitalize text-[#004EFF] text-[22px]">
              Product
            </h1>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg relative w-[768px] h-[98px]">
            <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
              <img src={MagicLocationIcon} alt="Magic Location Icon" />
              <div className="text-white leading-normal font-Open text-[12px] font-normal">
                Magic Address
              </div>
            </div>
            <div className="relative h-[75px] ">
              <div className="w-full">
                <input
                  type="text"
                  className="h-[65px] border-black border-[2px] rounded-b-md overflow-hidden"
                  placeholder="Add description of the product"
                  onChange={(e) =>
                    setProducts({ ...products, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="absolute right-[2%] top-[72%] transform -translate-y-1/2">
              <img src={ForwardArrowIcon} alt="Arrow" />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-y-4 mt-6 lg:gap-x-6 lg:grid grid-cols-3">
            <InputBox
              label="Product name"
              value={products.productName}
              onChange={(e) =>
                setProducts({ ...products, productName: e.target.value })
              }
            />
            <InputBox
              label="Product category"
              value={products?.category[0] || ""}
              onChange={(e) => {
                setProducts({ ...products, category: [e.target.value] });
              }}
            />
            <InputBox
              label="Product price"
              value={products?.price || ""}
              inputMode="numeric"
              onChange={(e) =>
                setProducts({ ...products, price: +e.target.value })
              }
            />
            <InputBox
              label="Product tax"
              value={products?.gst || ""}
              inputMode="numeric"
              onChange={(e) =>
                setProducts({ ...products, gst: +e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                <CustomDropDown
                  value={products.dimensions.unit}
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      dimensions: {
                        ...products.dimensions,
                        unit: e.target.value,
                      },
                    })
                  }
                  options={[
                    {
                      label: "",
                      value: "",
                    },
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
                  label="Length"
                  value={products?.dimensions?.length || ""}
                  inputMode="numeric"
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      dimensions: {
                        ...products.dimensions,
                        length: +e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                <InputBox
                  label="Breadth"
                  value={products?.dimensions?.width || ""}
                  inputMode="numeric"
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      dimensions: {
                        ...products.dimensions,
                        width: +e.target.value,
                      },
                    })
                  }
                />
                <InputBox
                  label="Height"
                  value={products?.dimensions?.height || ""}
                  inputMode="numeric"
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      dimensions: {
                        ...products.dimensions,
                        height: +e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <FileUploadWithText
                icon={UploadImg}
                placeholder="Upload Product Image"
                text="UPLOAD"
              />
            </div>
          </div>

          {/* <div className="flex mt-6 rounded-md p-[8px] bg-[#F2F6FF] w-[174px]">
            <img
              src={ButtonIcon}
              className="ml-[25px]"
              alt="Add Product"
              width="16px"
            />
            <span
              className="ml-2 text-[#004EFF] text-[14px] font-semibold leading-5 font-Open"
              onClick={() => addProduct()}
            >
              Add Product
            </span>
          </div> */}
        </div>
        <div>
          <BottomLayout backButtonText="BACK" nextButtonText="SAVE" />
        </div>
      </div>
      <BottomLayout callApi={addProduct} />
    </div>
  );
};

export default AddProduct;
