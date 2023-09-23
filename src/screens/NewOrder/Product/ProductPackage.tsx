import { useEffect, useState } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import EditImageWithBlack from "../../../../assets/Catalogue/edit.svg";
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
import { Spinner } from "../../../components/Spinner";
import Switch from "react-switch";
import {
  ADD_BOX_INFO,
  GET_SELLER_COMPANY_BOX,
  GET_LATEST_ORDER,
  GET_SELLER_BOX,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import PackageBox from "./PackageBox";
import BoxDetails from "./BoxDetails";
import { toast } from "react-toastify";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomInputBox from "../../../components/Input";
import GroupRadioButtons from "../../../components/GroupRadioButtons/GroupRadioButtons";
import { useSelector } from "react-redux";
import AddPackageDetails from "./AddPackageDetails";
import SearchIcon from "../../../assets/Product/search.svg";
import ServiceButton from "../../../components/Button/ServiceButton";

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
  useEffect(() => {
    const preventUnload = (event: BeforeUnloadEvent) => {
      // NOTE: This message isn't used in modern browsers, but is required
      const message = "Data will be lost if you leave the page, are you sure?";
      event.preventDefault();
      event.returnValue = message;
    };

    window.addEventListener("beforeunload", preventUnload);

    return () => {
      window.removeEventListener("beforeunload", preventUnload);
    };
  }, []);
  const navigate = useNavigate();
  const [combo, setCombo] = useState<any>(false);
  const [products, setProducts] = useState<any>([]);
  const [sellerBox, setSellerBox] = useState<any>([]);
  const [companyBox, setCompanyBox] = useState<any>([]);
  const [boxIndex, setBoxIndex] = useState<any>(0);
  const [selectedBox, setSelectedBox] = useState<any>({});
  const [boxTypeModal, setBoxTypeModal] = useState<any>(false);
  const [selectedProductsOfPackage, setSelectedProductsOfPackage] =
    useState<any>([]);
  const [packages, setPackages] = useState<any>([]);
  const [tempPackage, setTempPackage] = useState<any>({});
  const [boxTypeEditMode, setBoxTypeEditMode] = useState<any>(false);
  const [paymentMode, setPaymentMode] = useState<any>("cod");
  const [selectInsurance, setSelectInsrance] = useState<any>({
    isInsurance: true,
    iwillTakeRisk: false,
  });
  const [showAddBox, setShowAddBox] = useState<any>(true);
  const [isFragile, setIsFragile] = useState<any>(false);
  const [orderType, setOrderType] = useState<any>({});
  const [codData, setCodData] = useState<any>({
    isCod: orderType === "B2C",
    collectableAmount: 0,
    invoiceValue: 0,
  });
  const [isSearchProductRightModalOpen, setIsSearchProductRightModalOpen] =
    useState<boolean>(false);
  const isReturningUser = useSelector(
    (state: any) => state?.user.isReturningUser
  );
  const isOrderTypeB2B = orderType === "B2B";
  useEffect(() => {
    let totalInvoiceValue = 0;
    let tempArr = packages;

    if (packages.length === 1 && orderType === "B2C") {
      setShowAddBox(false);
    } else {
      setShowAddBox(true);
    }

    tempArr?.forEach((packages: any) => {
      totalInvoiceValue =
        totalInvoiceValue + +getInvoiceValue(packages?.products);
    });

    setCodData({ ...codData, invoiceValue: totalInvoiceValue });
  }, [packages]);

  useEffect(() => {
    getOrderProductDetails();
  }, []);

  const handleRemovePackage = (boxIndex: any) => {
    let tempArr = packages;
    tempArr.splice(boxIndex, 1);
    setPackages([...tempArr]);
  };

  const handlePackageDetailsForProduct = (productsData: any) => {
    if (!productsData.length) {
      toast.error("Please Select Atleast One Product");
      return;
    }

    setTempPackage({ products: productsData });

    if (!packages[boxIndex] && !packages[boxIndex]?.hasOwnProperty("boxId")) {
      setIsSearchProductRightModalOpen(false);
      setBoxTypeModal(true);
      return;
    }
    setProductsToPackage(productsData, boxIndex);
    setIsSearchProductRightModalOpen(false);
  };

  const handlePackageDetailsForCombo = (comboData: any) => {
    console.log("handlePackageDetailsForCombo", combo);
  };

  const handleOpenPackageDetails = (boxIndex: any) => {
    const { products } = packages[boxIndex];
    setSelectedProductsOfPackage([...products]);
    setBoxIndex(boxIndex);
    setIsSearchProductRightModalOpen(true);
  };

  const handleEditBoxType = (boxType: any, boxIndex: any, editBoxType: any) => {
    let selectedBox = { ...boxType };
    delete selectedBox.products;
    setBoxIndex(boxIndex);
    setBoxTypeEditMode(true);
    setSelectedBox(selectedBox);
    setBoxTypeModal(true);
  };

  const setProductsToPackage = (products: any, boxIndex: number) => {
    let tempArr = packages;
    tempArr[boxIndex] = {
      ...tempArr[boxIndex],
      products: [...products],
    };
    setPackages([...tempArr]);
  };

  const setBoxTypeToPackage = (boxType: any) => {
    let tempArr = packages;
    tempArr[boxIndex] = { ...boxType, ...tempArr[boxIndex] };
    setPackages([...tempArr]);
  };

  const handleBoxType = () => {
    if (!Object.keys(selectedBox).length) {
      toast.error("Please Select Atleast One Box Type");
      return;
    }

    if (!boxTypeEditMode) {
      const { products } = tempPackage;
      setProductsToPackage(products, boxIndex);
      setBoxTypeToPackage(selectedBox);
      setBoxTypeModal(false);
    }

    let tempArr = packages;
    let selectedBoxTemp = selectedBox;
    delete selectedBoxTemp.products;
    tempArr[boxIndex] = { ...tempArr[boxIndex], ...selectedBoxTemp };
    setPackages([...tempArr]);
    setBoxTypeModal(false);
  };

  const setPayloadForProduct = (productsInfo: any, boxIndex: any) => {
    setProductsToPackage(productsInfo, boxIndex);
  };

  const getOrderProductDetails = async () => {
    try {
      const { data } = await POST(GET_LATEST_ORDER);
      const { data: boxData } = await POST(GET_SELLER_BOX);
      const { data: companyBoxData } = await POST(GET_SELLER_COMPANY_BOX);
      if (data?.success) {
        const { products: resProduct = [], orderType } = data?.data[0];
        setOrderType(orderType);
        setProducts(resProduct);
      } else {
        toast.error(data?.message);
        navigate("/orders/add-order/pickup");
        return;
      }
      if (boxData?.success) {
        const { data = [] } = boxData;
        setSellerBox(data);
      }
      if (companyBoxData?.success) {
        const { data = [] } = companyBoxData;
        setCompanyBox(data);
      }
    } catch (error) {
      console.error("getOrderProductDetails", error);
    }
  };

  const setBoxAndCODInfo = async () => {
    let codDataInfo = {
      ...codData,
      isCod: orderType === "B2B" ? false : true,
    };
    let payload = {
      boxInfo: packages,
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

  const isOrderTypeB2C = () => {};

  return (
    <div>
      <div>
        <Breadcrum label="Add New Order" />
        <div className="lg:mb-8">
          <Stepper steps={steps} />
        </div>
        <div className="px-5 py-2 mb-12">
          <div className="flex justify-between ">
            <div className="flex items-center gap-2">
              <img src={ProductIcon} alt="Product Icon" />
              {isReturningUser ? (
                // <SearchProduct />
                <div className="flex items-center gap-x-2">
                  <p className="font-Lato font-normal text-2xl leading-8 text-[#323232]">
                    Select a Product
                  </p>
                  <img
                    src={SearchIcon}
                    alt="Search Icon"
                    className="cursor-pointer"
                    // onClick={() => setIsSearchProductRightModalOpen(true)}
                  />
                </div>
              ) : (
                <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
                  Product
                </h1>
              )}
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

          <div className="flex  gap-x-3 ">
            {products.length > 0 ? (
              products?.map((e: any, index: number) => {
                return (
                  <ProductBox
                    key={index}
                    image={SampleProduct}
                    weight={`${e?.deadWeight} Kg`}
                    productName={e?.name || 0}
                    breadth={e?.breadth || 0}
                    length={e?.length || 0}
                    height={e?.height || 0}
                  />
                );
              })
            ) : (
              <div>
                <Spinner />
              </div>
            )}
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
          {/* <Box /> */}
          <div className="flex flex-wrap gap-6">
            {packages?.map((packageDetails: any, index: number) => {
              return (
                <BoxDetails
                  key={index}
                  products={packageDetails?.products || []}
                  selectedBox={packageDetails || {}}
                  setProductFinalPayload={setPayloadForProduct}
                  handleEditBoxType={handleEditBoxType}
                  boxIndex={index}
                  removePackage={handleRemovePackage}
                  setBoxIndex={setBoxIndex}
                  openPackageDetailModal={handleOpenPackageDetails}
                />
              );
            })}
            {showAddBox ? (
              <div className="w-[500px] ">
                <div className="hidden lg:flex justify-between ">
                  <div className="flex py-5 gap-x-2">
                    <img src={ProductIcon} alt="Package Icon" />
                    <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                      Box {packages.length + 1}
                    </h1>
                  </div>
                </div>
                <div
                  className="flex justify-center items-center w-full p-12 border-[5px] border-spacing-8 rounded-md border-dotted"
                  style={{
                    boxShadow:
                      "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
                  }}
                >
                  <AddButton
                    text={`ADD PRODUCTS TO BOX ${packages.length + 1}`}
                    onClick={() => {
                      setBoxIndex(packages.length);
                      setSelectedProductsOfPackage([]);
                      setBoxTypeEditMode(false);
                      setIsSearchProductRightModalOpen(true);
                    }}
                    showIcon={true}
                    icon={ButtonIcon}
                    className="rounded bg-white !shadow-none text-lg"
                    alt={`ADD PRODUCTS BOX ${packages.length + 1}`}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
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
          <div>
            <div className="w-full flex justify-between pt-6 ">
              <div className="flex gap-x-2 items-center">
                <img src={CodIcon} alt="" />
                <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                  Payment Mode
                </h1>
              </div>
            </div>

            <div>
              <div className="flex py-5 ">
                {!isOrderTypeB2B && (
                  <GroupRadioButtons
                    options={[
                      { text: "Prepaid", value: "prepaid" },
                      { text: "COD", value: "cod" },
                    ]}
                    value={paymentMode}
                    selectedValue={setPaymentMode}
                  />
                )}
              </div>

              <div className="flex w-fit gap-x-8 py-2 pb-8">
                {paymentMode === "cod" && !isOrderTypeB2B && (
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

              <div className="w-full flex justify-between pt-6 ">
                <div className="flex gap-x-2 items-center">
                  <img src={CodIcon} alt="" />
                  <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                    Fragile?
                  </h1>
                </div>
              </div>

              <div
                className={`flex gap-x-[5rem] mt-[1rem] mb-[2rem] p-2 bg-[#E8E8E8] rounded w-[372px] h-[44px]  border-[1px]`}
              >
                <h1 className="self-center justify-start text-[14px] font-semibold font-Open text-[#1C1C1C] lg:text-base ">
                  Handle With Care
                </h1>

                <div
                  className={`flex ${
                    isFragile ? "justify-start" : "justify-end"
                  } items-center gap-x-1`}
                >
                  <button
                    className={`${
                      isFragile ? "bg-[#7CCA62]" : "bg-[#F35838]"
                    } flex justify-end items-center gap-x-1 rounded w-[123px] h-[30px] px-[12px] py-[8px]`}
                    onClick={() => {
                      setIsFragile(!isFragile);
                    }}
                  >
                    <Switch
                      onChange={() => {
                        setIsFragile(!isFragile);
                      }}
                      checked={isFragile}
                      onColor="#FFFFF"
                      onHandleColor="#7CCA62"
                      offColor="#FFFFF"
                      offHandleColor="#F35838"
                      handleDiameter={4}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={8}
                      width={14}
                    />
                    <p className="text-[#FFFFFF] font-semibold font-Open text-[14px] px-[8px] pb-[2px] ">
                      {isFragile ? "ACTIVE" : "DEACTIVE"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSideModal
          className="w-[400px]"
          wrapperClassName="rounded-l-xl"
          isOpen={boxTypeModal}
          onClose={() => setBoxTypeModal(false)}
        >
          <div className="p-4 w-full flex-col items-center justify-center h-full">
            <div className="">
              <div className="flex py-5 gap-2">
                <img src={ProductIcon} alt="Package Icon" />
                <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                  Seller Box Types
                </h1>
              </div>
              <div className="flex w-full items-center flex-col gap-3 justify-center">
                {sellerBox.length > 0 ? (
                  sellerBox?.map((newpackage: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer w-full"
                        onClick={() => {
                          setSelectedBox(newpackage);
                        }}
                      >
                        <PackageBox
                          packageType={newpackage?.name}
                          volumetricWeight={newpackage?.volumetricWeight}
                          height={newpackage.height}
                          breadth={newpackage.breadth}
                          length={newpackage.length}
                          selected={
                            selectedBox.boxId === newpackage.boxId
                              ? true
                              : false
                          }
                          boxType={newpackage?.color}
                          recommended={index === 1 ? true : false}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="text-[grey] py-6">Not Available</div>
                  </>
                )}
              </div>
              <div
                className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
                style={{ width: "-webkit-fill-available" }}
              >
                <ServiceButton
                  text={"CANCEL"}
                  onClick={() => {
                    setBoxTypeModal(false);
                  }}
                  className="bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4 "
                />
                <ServiceButton
                  text={"SAVE"}
                  onClick={() => {
                    handleBoxType();
                  }}
                  className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 "
                />
              </div>
            </div>

            <div>
              <div className="flex py-5 gap-2">
                <img src={ProductIcon} alt="Package Icon" />
                <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
                  Company Box Types
                </h1>
              </div>
              <div className="flex w-full items-center flex-col gap-3 justify-center">
                {companyBox?.map((newpackage: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer w-full"
                      onClick={() => {
                        setSelectedBox(newpackage);
                      }}
                    >
                      <PackageBox
                        packageType={newpackage?.name}
                        volumetricWeight={newpackage?.volumetricWeight}
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
              <div
                className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
                style={{ width: "-webkit-fill-available" }}
              >
                <ServiceButton
                  text={"CANCEL"}
                  onClick={() => {
                    setBoxTypeModal(false);
                  }}
                  className="bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4 "
                />
                <ServiceButton
                  text={"SAVE"}
                  onClick={() => {
                    handleBoxType();
                  }}
                  className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 "
                />
              </div>
            </div>
          </div>
        </RightSideModal>
        <RightSideModal isOpen={combo} onClose={() => setCombo(false)}>
          <AddComboModal
            combo={combo}
            setCombo={setCombo}
            insuranceModal={() => {}}
          />
        </RightSideModal>
      </div>
      <div>
        <BottomLayout
          finalButtonText="NEXT"
          callApi={() => setBoxAndCODInfo()}
        />
      </div>
      {products.length > 0 && (
        <AddPackageDetails
          productsFromLatestOrder={products}
          selectedProducts={selectedProductsOfPackage}
          isSearchProductRightModalOpen={isSearchProductRightModalOpen}
          setIsSearchProductRightModalOpen={setIsSearchProductRightModalOpen}
          handlePackageDetails={handlePackageDetailsForProduct}
          handleComboToPackageDetails={handlePackageDetailsForCombo}
        />
      )}
      ;
    </div>
  );
};

export default Package;
