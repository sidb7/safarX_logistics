import NavBar from "../../../layout/Old_NavBar";
import BackArrow from "../../../assets/backArrow.svg";
import CustomButton from "../../../components/Button";
import { useState } from "react";
import {pickupAddress, deliveryAddress, productCardQuantity} from "../../../utils/dummyData";
import CustomPickUpAddress from './customPickUpAddress';
import CustomDeliveryAddress from "./customDeliveryAddress";
import ProductCardQuantity from "../../../screens/NewOrder/ReturningUser/Product/productCardQuantity";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../../assets/Label/download.svg";

const ProductCatalogueAddCambo = () => {
    
        const navigate = useNavigate()

    
    const [statusId, setStatusId] = useState(-1);
    
    const [statusData, setStatusData] = useState([
        {
          statusName: "Single Product",
          
        },
        {
          statusName: "Combo Product",
          
        },
        
      ]);
    console.log("statusId", statusId)
    
    return(
        <div>
            <header className="fixed top-0 z-10 w-full">
                <NavBar />
            </header>
            <div className="mt-20 flex justify-between mx-5">
                <div className="flex gap-x-2 items-center">
                    <img src={BackArrow} alt="" />
                    <p className="w-[180px] font-semibold text-[18px]">Product Catalogue</p>
                </div>
                <div className="flex items-center">
                    <CustomButton text={"ADD CAMBO"} className="!p-3" onClick={function (): void {
                        throw new Error("Function not implemented.");
                    } } />
                </div>
            </div>
            <div className="flex justify-center gap-x-2 overflow-x-scroll whitespace-nowrap mt-5 h-[34px]">
                {statusData.map(({ statusName }, index) => {
                return (
                    <div
                    className={`flex justify-center items-center border-b-2 border-[#777777] px-4 ${
                        statusId === index ? "!border-[#004EFF]" : ""
                    }`}
                    onClick={() => setStatusId(index)}
                    >
                    <span
                        className={`text-[#777777] text-[14px] ${
                        statusId === index ? "!text-[#004EFF]" : ""
                        }`}
                    >
                        {statusName}
                    </span>
                        
                    </div>
                );
                })}
            </div>
            
           <div className="flex justify-center mt-1">
            <div>
                <ProductCardQuantity props={productCardQuantity} className="w-[320px]"/>
                <ProductCardQuantity props={productCardQuantity} className="w-[320px]"/>
                <ProductCardQuantity props={productCardQuantity} className="w-[320px]"/>
                <ProductCardQuantity props={productCardQuantity} className="w-[320px]"/>
                <ProductCardQuantity props={productCardQuantity} className="w-[320px] mb-[100px]"/>
            </div>
            
           </div>
            
            
            <footer className="w-full fixed  bottom-0 	">
            <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
              {window.location.pathname !== "/neworder/label" ? (
                <>
                  <ServiceButton
                    text="BACK"
                    onClick={() => {
                      window.history.back();
                    }}
                  />
                </>
              ) : (
                <>
                  <ServiceButton
                    text="DOWNLOAD"
                    icon={DownloadIcon}
                    showIcon={true}
                    className="!bg-[#F2F6FF] text-[#0066FF] border-none text-[14px] font-semibold "
                  />
                </>
              )}

              <ServiceButton
                text="SAVE"
                className="bg-[#1C1C1C] text-[#FFFFFF]"
                onClick={() => {
                  console.log(window.location.pathname);

                  if (window.location.pathname === "/neworder/pickup") {
                    navigate("/neworder/delivery");
                  } else if (
                    window.location.pathname === "/neworder/delivery"
                  ) {
                    navigate("/neworder/package");
                  } else if (window.location.pathname === "/neworder/package") {
                    navigate("/neworder/service");
                  } else if (window.location.pathname === "/neworder/service") {
                    navigate("/neworder/summary");
                  } else if (window.location.pathname === "/neworder/summary") {
                    navigate("/neworder/payment");
                  }
                }}
              />
            </div>
          </footer>
        </div>
    )
}
export default ProductCatalogueAddCambo;