import { useEffect, useState } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import Box from "./Box";
import ProductBox from "../Product/productBox";
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
import { POST, GET } from "../../../utils/webService";
import { GET_LATEST_ORDER } from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { GET_SELLER_COMPANY_BOX } from "../../../utils/ApiUrls";
import PackageBox from "./PackageBox";

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

  console.log("boxState", box);

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
  ];

  useEffect(() => {
    (async () => {
      const res: any = await getOrderProductDetails();
      if (res) {
        console.log("ok", res);
      }
    })();
  }, []);

  const insuranceFun = (e: any) => {
    console.log("setCombo inside fun:", combo);

    setCombo(false);
    setInsurance(true);
  };
  console.log("setCombo:", combo);

  const getOrderProductDetails = async () => {
    try {
      const { data } = await POST(GET_LATEST_ORDER);
      const { data: boxData } = await POST(GET_SELLER_COMPANY_BOX);
      if (data?.success) {
        setProducts(data?.data?.products);
      } else {
        throw new Error(data?.message);
      }

      if (boxData?.success) {
        setBox(boxData?.data);
      } else {
        throw new Error(boxData?.message);
      }
    } catch (error) {
      console.log("getOrderProductDetails", error);
    }
  };

  return (
    <div>
      <div className="mx-4 mb-28">
        <div className="mx-5">
          <CustomBreadcrumb />
        </div>
        <div className="flex gap-x-2 items-center">
          <img src={backArrow} alt="" className="w-6 h-6" />
          <p className="text-2xl font-Lato font-semibold">Add New Order</p>
        </div>
        <div>
          <Stepper steps={steps} />
        </div>
        <div className="flex justify-between ">
          <div className="flex items-center gap-2">
            <img src={ProductIcon} alt="Product Icon" className="" />
            <h1 className="font-bold leading-6 text-lg ">Product</h1>
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
              onClick={() => setCombo(true)}
            />
            <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
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
                  productName={e.name}
                  weight={e.weight}
                  dimension={e.dimension}
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
          <div className="flex">
            {box.map((newpackage: any, index) => {
              return (
                <PackageBox
                  packageType={newpackage?.name}
                  weight={newpackage?.weight}
                  height={newpackage.height}
                  breadth={newpackage.breadth}
                  length={newpackage.length}
                  boxType={newpackage?.color}
                  recommended={true}
                />
              );
            })}
          </div>

          <Box />
        </div>
        {combo && (
          <RightSideModal isOpen={combo} onClose={() => setCombo(false)}>
            <AddComboModal
              combo={combo}
              setCombo={setCombo}
              insuranceModal={insuranceFun}
            />
          </RightSideModal>
        )}
        {insurance && (
          <RightSideModal
            isOpen={insurance}
            onClose={() => setInsurance(false)}
            className="!w-[600px]"
          >
            <AddInsuranceModal
              insurance={insurance}
              setInsurance={setInsurance}
            />
          </RightSideModal>
        )}
      </div>

      <div>
        <BottomLayout backButtonText="BACK" nextButtonText="NEXT" />
      </div>
    </div>
  );
};

export default Package;
