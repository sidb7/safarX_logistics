import { useEffect, useState } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import Box from "./Box";
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
import CustomBreadcrumb from "../../../components/BreadCrumbs";
import backArrow from "../../../assets/backArrow.svg";
import { POST } from "../../../utils/webService";
import { ADD_BOX_INFO, GET_LATEST_ORDER } from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { GET_SELLER_COMPANY_BOX } from "../../../utils/ApiUrls";
import PackageBox from "./PackageBox";
import BoxDetails from "./BoxDetails";
import { UploadInput } from "../../../components/UploadInput";
import { toast } from "react-toastify";
import { Breadcum } from "../../../components/Layout/breadcrum";
// import { GET_PACKAGE_INSURANCE } from "../../../utils/ApiUrls";

interface IPackageProps {}

const Package: React.FunctionComponent<IPackageProps> = (props) => {
  const navigate = useNavigate();
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [combo, setCombo] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [products, setProducts] = useState([]);
  const [box, setBox] = useState([]);
  const [selectedBox, setSelectedBox]: any = useState({});
  const [productFinalPayload, setProductFinalPayload] = useState<any>();
  console.log("productFinalPayload", productFinalPayload);
  const [codData1, setCodData] = useState<any>({
    isCOD: false,
  });

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await POST(GET_LATEST_ORDER);
  //     const payload = {
  //       status: true,
  //       collectableAmount: 120,
  //       totalAmount: 220,
  //     };
  //     const { data: insruanceInfo } = await POST(
  //       GET_PACKAGE_INSURANCE,
  //       payload
  //     );

  //     if (data?.success) {
  //       if (data?.data?.codInfo) {
  //
  //         setCodData({
  //           ...codData1,
  //           codAmount: data?.data?.codAmount,
  //           invoiceValue: data?.data?.invoiceValue,
  //         });
  //       }
  //     }
  //   })();
  // }, []);

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
        invoiceValue: codInfo?.invoiceValue,
      });
    }

    if (boxData?.success) {
      setBox(boxData?.data);
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
    const { data } = await POST(ADD_BOX_INFO, productFinalPayload);
    if (data?.success) {
      toast.success(data?.message);
      navigate("/orders/add-order/service");
    } else {
      toast.error(data?.message);

      // throw new Error(data?.message);
    }
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
          <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-4">
            <div className="">
              <h2 className="text-[#004EFF] text-sm font-bold leading-18px">
                Package 1
              </h2>
            </div>
            <div className="flex items-center">
              <img
                src={EditIcon}
                alt="Edit Product"
                className="cursor-pointer mr-2"
              />
              <img
                src={BookmarkIcon}
                alt="Bookmark Product"
                className="mr-2 cursor-pointer"
                onClick={() => setCombo(true)}
              />
              <img
                src={isLgScreen ? DeleteIconForLg : DeleteIcon}
                alt="Delete Product"
                className="mr-2 w-4 h-4"
              />
            </div>
          </div>

          <div className="flex  gap-x-3">
            {products.length > 0 &&
              products.map((e: any, index: number) => {
                return (
                  <ProductBox
                    image={SampleProduct}
                    weight={e?.weight?.deadWeight || 0}
                    productName={e?.productName || 0}
                    breadth={e?.dimensions?.breadth || 0}
                    length={e?.dimensions?.length || 0}
                    height={e?.dimensions?.height || 0}
                    className="p-3 lg:max-w-[272px]"
                  />
                );
              })}
          </div>

          <div className="mt-6">
            <AddButton
              text="ADD PRODUCT"
              onClick={() => {
                navigate("/newOrder/addnewproduct");
              }}
              showIcon={true}
              icon={ButtonIcon}
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
            <div className="flex pb-5 pr-5 gap-2">
              <img src={ProductIcon} alt="Package Icon" className="" />
              <h1 className="font-bold text-lg leading-6">Box Type</h1>
            </div>
            <div className="flex gap-3">
              {box.map((newpackage: any, index) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedBox(newpackage);
                    }}
                  >
                    <PackageBox
                      packageType={newpackage?.productName}
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
            <UploadInput />

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
            insuranceModal={insuranceFun}
          />
        </RightSideModal>
        <RightSideModal
          isOpen={insurance}
          onClose={() => setInsurance(false)}
          className="!w-[600px]"
        >
          <AddInsuranceModal
            insurance={insurance}
            setInsurance={(codInfo: any) => {
              handleCallbackFromInsurance(codInfo);
            }}
            codData1={codData1}
          />
        </RightSideModal>
      </div>

      <div>
        <BottomLayout backButtonText="BACK" nextButtonText="NEXT" />
        <BottomLayout callApi={() => addBoxInfo()} />
      </div>
    </div>
  );
};

export default Package;
