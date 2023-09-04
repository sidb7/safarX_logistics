import { useEffect, useState } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import CodIcon from "../../../assets/codIcon.svg";
import ProductBox from "./ProductBox";
import SampleProduct from "../../../assets/SampleProduct.svg";
import toggle from "../../../assets/toggle-off-circle.svg";
import toggleBlack from "../../../assets/toggleBlack.svg";
import "../../../styles/productStyle.css";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import AddButton from "../../../components/Button/addButton";
import AddComboModal from "./AddComboModal";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import BottomLayout from "../../../components/Layout/bottomLayout";
import shieldTick from "../../../assets/shield-tick.svg";
import shieldcross from "../../../assets/shieldcross.svg";
import Checkbox from "../../../components/CheckBox";
import { POST } from "../../../utils/webService";
import {
  ADD_BOX_INFO,
  GET_LATEST_ORDER,
  GET_SELLER_BOX,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import PackageBox from "./PackageBox";
import BoxDetails from "./BoxDetails";
import { toast } from "react-toastify";
import { Breadcum } from "../../../components/Layout/breadcrum";
import CustomInputBox from "../../../components/Input";
import GroupRadioButtons from "../../../components/GroupRadioButtons/GroupRadioButtons";

interface IPackageProps {}
const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Summary",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
];

const Package: React.FunctionComponent<IPackageProps> = (props) => {
  const navigate = useNavigate();
  const [combo, setCombo] = useState(false);
  const [products, setProducts] = useState([]);
  const [box, setBox] = useState([]);
  const [codData, setCodData] = useState<any>({
    isCod: true,
    collectableAmount: 0,
    invoiceValue: 0,
  });
  const [selectedBox, setSelectedBox]: any = useState({});
  const [productFinalPayload, setProductFinalPayload] = useState<any>({
    boxInfo: [],
  });
  const [paymentMode, setPaymentMode] = useState<any>("cod");
  const [selectInsurance, setSelectInsrance] = useState({
    isInsurance: true,
    iwillTakeRisk: false,
  });

  useEffect(() => {
    (async () => {
      const res: any = await getOrderProductDetails();
      if (res) {
      }
    })();
  }, []);

  const setPayloadForProduct = (productsInfo: any) => {
    setCodData({
      ...codData,
      invoiceValue: getInvoiceValue(productsInfo),
    });
    const payload = {
      boxInfo: [{ ...selectedBox, products: productsInfo }],
    };
    setProductFinalPayload(payload);
  };

  const getOrderProductDetails = async () => {
    try {
      const { data } = await POST(GET_LATEST_ORDER);
      const { data: boxData } = await POST(GET_SELLER_BOX);
      if (data?.success) {
        const { products = [] } = data?.data[0];
        setProducts(products);
      }
      if (boxData?.success) {
        const { data = [] } = boxData;
        setBox(data);
        setSelectedBox(data[0]);
      }
    } catch (error) {
      console.log("getOrderProductDetails", error);
    }
  };

  const setBoxAndCODInfo = async () => {
    let codDataInfo = {
      ...codData,
      isCod: paymentMode === "cod" ? true : false,
    };
    let payload = {
      ...productFinalPayload,
      codInfo: { ...codDataInfo },
      insurance: {
        status: selectInsurance.isInsurance ? true : false,
        amount: 0,
      },
    };

    const { data } = await POST(ADD_BOX_INFO, payload);
    if (data?.success) {
      toast.success(data?.message);
      navigate("/orders/add-order/service");
    } else {
      toast.error(data?.message);
    }
  };

  const getInvoiceValue = (arr: any = []) => {
    return (
      arr.reduce((accumulator: any, product: any) => {
        const totalProductPrice = product.unitPrice * +product.qty;
        return accumulator + totalProductPrice;
      }, 0) || 0
    );
  };

  return (
    <div>
      <div className="">
        <Breadcum label="Add New Order" />
        <div className="lg:mb-8">
          <Stepper steps={steps} />
        </div>
        <div className="px-5 py-2">
          <div className="flex justify-between ">
            <div className="flex items-center gap-2">
              <img src={ProductIcon} alt="Product Icon" className="" />
              <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
                Product
              </h1>
            </div>
            <div className="hidden  lg:flex whitespace-nowrap gap-x-32 bg-[#FFFFFF] shadow-sm p-2  ">
              <p>Handle with care</p>
              <div className="border-2 border-[#F35838] bg-[#F35838] flex  items-center rounded-md gap-x-3 px-2">
                <img src={toggle} alt="toggle" />
                <p className="text-[14px] text-white">DEACTIVATE</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4 lg:justify-start lg:gap-x-4">
            <div className="text-[#004EFF] text-lg font-semibold font-Lato ">
              Package 1
            </div>
            <div className="flex items-center">
              <img
                src={BookmarkIcon}
                alt="Bookmark Product"
                className="mr-2 cursor-pointer"
                onClick={() => setCombo(true)}
              />
            </div>
          </div>

          <div className="flex  gap-x-3">
            {products.length > 0 &&
              products.map((e: any, index: number) => {
                return (
                  <ProductBox
                    key={index}
                    image={SampleProduct}
                    weight={`${e?.deadWeight} Kg`}
                    productName={e?.name || 0}
                    breadth={e?.breadth || 0}
                    length={e?.length || 0}
                    height={e?.height || 0}
                    className=""
                  />
                );
              })}
          </div>

          <div className="mt-6">
            <AddButton
              text="ADD PRODUCT"
              onClick={() => {
                navigate("/orders/add-order/add-product");
              }}
              showIcon={true}
              icon={ButtonIcon}
              className="rounded"
              alt="Add Product"
            />
          </div>
          <div className="flex justify-between mt-5 whitespace-nowrap  bg-[#FFFFFF] shadow-sm p-2  lg:hidden ">
            <div>
              <p>Handle with care</p>
            </div>

            <div className="bg-[white] flex  items-center rounded-md gap-x-3 px-2">
              <img src={toggleBlack} alt="toggle" />

              <p className="text-[14px] text-[#F35838]">DEACTIVATE</p>
            </div>
          </div>
          <div className="mt-7">
            <div className="flex py-5 gap-2">
              <img src={ProductIcon} alt="Package Icon" className="" />
              <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                Box Type
              </h1>
            </div>
            <div className="flex gap-3">
              {box?.map((newpackage: any, index) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedBox(newpackage);
                    }}
                  >
                    <PackageBox
                      packageType={newpackage?.name}
                      weight={newpackage?.weight}
                      height={newpackage.height}
                      breadth={newpackage.breadth}
                      length={newpackage.length}
                      selected={
                        selectedBox.boxId === newpackage.boxId ? true : false
                      }
                      boxType={newpackage?.color}
                      recommended={index === 1 ? true : false}
                    />
                  </div>
                );
              })}
            </div>

            {/* <Box /> */}
            <BoxDetails
              products={products}
              selectedBox={selectedBox}
              setProductFinalPayload={setPayloadForProduct}
            />
            {/* <UploadInput /> */}
            <div>
              <div className="w-full flex justify-between py-6 ">
                <div className="flex gap-x-2 items-center ">
                  <img src={shieldTick} alt="" />
                  <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                    Add Insurance
                  </h1>
                </div>
              </div>
              <div className="flex gap-x-3  ">
                <div
                  className={`relative border-[1px] p-16 rounded ${
                    selectInsurance.isInsurance === true
                      ? "border-[#1C1C1C]"
                      : "border-[#EAEAEA]"
                  } bg-[#FEFEFE]  cursor-pointer`}
                  onClick={() => {
                    setSelectInsrance({
                      isInsurance: true,
                      iwillTakeRisk: false,
                    });
                  }}
                >
                  <img src={shieldTick} alt="" className="w-16 h-12" />
                  <div className="flex flex-row  items-center  absolute z-2 -top-3 px-2 left-0 bg-[#FEFEFE] ">
                    {selectInsurance.isInsurance && (
                      <Checkbox
                        onChange={() => {}}
                        checked={
                          selectInsurance?.isInsurance === true ? true : false
                        }
                      />
                    )}
                    <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
                      I want insurance
                    </p>
                  </div>
                </div>
                <div
                  className={`relative z-1  p-16   border-[1px] rounded ${
                    selectInsurance.iwillTakeRisk === true
                      ? "border-[#1C1C1C]"
                      : "border-[#EAEAEA]"
                  } bg-[#FEFEFE] cursor-pointer`}
                  onClick={() => {
                    setSelectInsrance({
                      iwillTakeRisk: true,
                      isInsurance: false,
                    });
                  }}
                >
                  <img src={shieldcross} alt="" className="w-16 h-12" />
                  <div className="flex flex-row  items-center  absolute z-2 -top-3 px-2 left-0 bg-[#FEFEFE] ">
                    {selectInsurance.iwillTakeRisk && (
                      <Checkbox
                        onChange={() => {}}
                        checked={
                          selectInsurance.iwillTakeRisk === true ? true : false
                        }
                      />
                    )}
                    <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
                      I'll take risk
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full flex justify-between pt-6 ">
                <div className="flex gap-x-2 items-center">
                  <img src={CodIcon} alt="" />
                  <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                    Payment Mode
                  </h1>
                </div>
              </div>

              <div className="">
                <div className="flex py-5 ">
                  <GroupRadioButtons
                    options={[
                      { text: "Prepaid", value: "prepaid" },
                      { text: "COD", value: "cod" },
                    ]}
                    value={paymentMode}
                    selectedValue={setPaymentMode}
                  />
                </div>

                <div className="flex w-fit gap-x-8 py-2 pb-8">
                  {paymentMode === "cod" && (
                    <CustomInputBox
                      label={"COD Amount to Collect From Buyer"}
                      value={codData?.collectableAmount}
                      inputType="text"
                      className="!w-60"
                      onChange={(e) => {
                        setCodData({
                          ...codData,
                          collectableAmount:
                            e.target.value > codData.invoiceValue
                              ? codData.invoiceValue
                              : e.target.value,
                        });
                      }}
                    />
                  )}
                  <CustomInputBox
                    inputType="text"
                    label={"Total invoice value"}
                    isDisabled={true}
                    className="!w-56 text-base font-bold"
                    value={codData?.invoiceValue || 0}
                    onChange={(e) =>
                      setCodData({ ...codData, invoiceValue: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <AddButton
                text="ADD PACKAGE"
                onClick={() => {}}
                showIcon={true}
                icon={ButtonIcon}
                alt="Add Product"
              />
            </div>
          </div>
        </div>
        <RightSideModal isOpen={combo} onClose={() => setCombo(false)}>
          <AddComboModal
            combo={combo}
            setCombo={setCombo}
            insuranceModal={() => {}}
          />
        </RightSideModal>
      </div>

      <div>
        <BottomLayout callApi={() => setBoxAndCODInfo()} />
      </div>
    </div>
  );
};

export default Package;
