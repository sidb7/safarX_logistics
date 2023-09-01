import { useEffect, useState } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import CodIcon from "../../../assets/codIcon.svg";
import ProductBox from "./ProductBox";
import SampleProduct from "../../../assets/SampleProduct.svg";
import toggle from "../../../assets/toggle-off-circle.svg";
import toggleBlack from "../../../assets/toggleBlack.svg";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import { useMediaQuery } from "react-responsive";
import "../../../styles/productStyle.css";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import AddButton from "../../../components/Button/addButton";
import AddComboModal from "./AddComboModal";
import AddInsuranceModal from "./AddInsuranceModal";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import BottomLayout from "../../../components/Layout/bottomLayout";
import Cross from "../../../assets/cross.svg";
import shieldTick from "../../../assets/shield-tick.svg";
import shieldcross from "../../../assets/shieldcross.svg";
import Checkbox from "../../../components/CheckBox";
// import CodIcon from "../../../assets/codIcon.svg";
import { POST } from "../../../utils/webService";
import {
  ADD_BOX_INFO,
  ADD_COD_INFO,
  GET_LATEST_ORDER,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { GET_SELLER_COMPANY_BOX } from "../../../utils/ApiUrls";
import PackageBox from "./PackageBox";
import BoxDetails from "./BoxDetails";
import { toast } from "react-toastify";
import { Breadcum } from "../../../components/Layout/breadcrum";
import CustomInputBox from "../../../components/Input";
import GroupRadioButtons from "../../../components/GroupRadioButtons/GroupRadioButtons";
// import { GET_PACKAGE_INSURANCE } from "../../../utils/ApiUrls";

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
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [combo, setCombo] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [products, setProducts] = useState([]);
  const [box, setBox] = useState([]);
  const [codData, setCodData] = useState<any>({});
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedBox, setSelectedBox]: any = useState({});
  const [productFinalPayload, setProductFinalPayload] = useState<any>();
  const [paymentMode, setPaymentMode] = useState<any>("cod");
  const [selectRecipient, setSelectRecipient] = useState({
    isInsurance: true,
    iwillTakeRisk: false,
  });

  const postCodDetails = async () => {
    const payload = {
      paymentType: paymentMode === "cod" ? "COD" : "PREPAID",
      codCollectAmount: paymentMode === "cod" ? +codData.codAmount : 0,
      invoiceValue: codData.invoiceValue,
    };

    const { data } = await POST(ADD_COD_INFO, payload);

    if (data?.success) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const res: any = await getOrderProductDetails();
      if (res) {
      }
    })();
  }, []);

  const insuranceFun = (e: any) => {
    setCombo(false);
    setInsurance(true);
  };

  const setPayloadForProduct = (productsInfo: any) => {
    setCodData({ ...codData, invoiceValue: getInvoiceValue(productsInfo) });
    const payload = {
      ...productFinalPayload,
      boxInfo: [
        {
          ...selectedBox,
          productsInfo: productsInfo,
        },
      ],
    };
    setProductFinalPayload({ ...payload });
  };

  const getOrderProductDetails = async () => {
    const { data } = await POST(GET_LATEST_ORDER);

    const { data: boxData } = await POST(GET_SELLER_COMPANY_BOX);
    if (data?.success) {
      const codInfo = data?.data?.codInfo;

      setProducts(data?.data?.products);

      setProductFinalPayload({
        ...productFinalPayload,
        tempOrderId: data.data.tempOrderId,
      });

      setCodData({
        isCOD: codInfo?.isCOD ? true : false,
        codAmount: codInfo?.codAmount,
        invoiceValue: getInvoiceValue(data?.data?.products),
      });

      setToggleStatus(codInfo?.isCOD ? true : false);
    }

    if (boxData?.success) {
      setBox(boxData?.data);
      setSelectedBox(boxData?.data[0]);
    }
  };

  const handleCallbackFromInsurance = (codInfo: any) => {
    setInsurance(false);
    // setCombo(false);
    setPayloadForProduct({
      ...productFinalPayload,
      codInfo: codInfo,
    });
  };

  const addBoxInfo = async () => {
    let res = postCodDetails();
    if (!res) return;
    const { data } = await POST(ADD_BOX_INFO, productFinalPayload);
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
        const totalProductPrice = product.price * product.stock;
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
              {/* <img
                src={EditIcon}
                alt="Edit Product"
                className="cursor-pointer mr-2"
              /> */}
              <img
                src={BookmarkIcon}
                alt="Bookmark Product"
                className="mr-2 cursor-pointer"
                onClick={() => setCombo(true)}
              />
              {/* <img
                src={isLgScreen ? DeleteIconForLg : DeleteIcon}
                alt="Delete Product"
                className="mr-2 w-4 h-4"
              /> */}
            </div>
          </div>

          <div className="flex  gap-x-3">
            {products.length > 0 &&
              products.map((e: any, index: number) => {
                return (
                  <ProductBox
                    key={index}
                    image={SampleProduct}
                    weight={`${e?.weight?.deadWeight} Kg`}
                    productName={e?.productName || 0}
                    breadth={e?.dimensions?.breadth || 0}
                    length={e?.dimensions?.length || 0}
                    height={e?.dimensions?.height || 0}
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
                    selectRecipient.isInsurance === true
                      ? "border-[#1C1C1C]"
                      : "border-[#EAEAEA]"
                  } bg-[#FEFEFE]  cursor-pointer`}
                  onClick={() => {
                    setSelectRecipient({
                      isInsurance: true,
                      iwillTakeRisk: false,
                    });
                  }}
                >
                  <img src={shieldTick} alt="" className="w-16 h-12" />
                  <div className="flex flex-row  items-center  absolute z-2 -top-3 px-2 left-0 bg-[#FEFEFE] ">
                    {selectRecipient.isInsurance && (
                      <Checkbox
                        onChange={() => {}}
                        checked={
                          selectRecipient?.isInsurance === true ? true : false
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
                    selectRecipient.iwillTakeRisk === true
                      ? "border-[#1C1C1C]"
                      : "border-[#EAEAEA]"
                  } bg-[#FEFEFE] cursor-pointer`}
                  onClick={() => {
                    setSelectRecipient({
                      iwillTakeRisk: true,
                      isInsurance: false,
                    });
                  }}
                >
                  <img src={shieldcross} alt="" className="w-16 h-12" />
                  <div className="flex flex-row  items-center  absolute z-2 -top-3 px-2 left-0 bg-[#FEFEFE] ">
                    {selectRecipient.iwillTakeRisk && (
                      <Checkbox
                        onChange={() => {}}
                        checked={
                          selectRecipient.iwillTakeRisk === true ? true : false
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
                      value={codData?.codAmount}
                      inputType="text"
                      className="!w-60"
                      onChange={(e) => {
                        setCodData({
                          ...codData,
                          codAmount:
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
                    value={codData?.invoiceValue}
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
        <BottomLayout callApi={() => addBoxInfo()} />
      </div>
    </div>
  );
};

export default Package;
