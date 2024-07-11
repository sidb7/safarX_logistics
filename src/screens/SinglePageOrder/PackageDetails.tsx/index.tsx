import React, { useState } from "react";
import BoxInfo from "../components/boxInfo";
import packegeIcon from "../../../assets/Delivery Icon.svg";
import addIcon from "../../../assets/addBlackIcon.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import BoxModal from "./components/boxModal";
import ProductDetails from "../components/productDetails";
import ProductModal from "./components/productModal";

function PackageDetails({ packageDetails, setOrder }: any) {
  const [boxModal, setBoxModal]: any = useState(false);
  const [productModal, setProductModal]: any = useState({
    isOpen: false,
    index: 0,
  });

  return (
    <>
      <div className="border">
        <div className="p-2 border-b  flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div>
                <img src={packegeIcon} />
              </div>
              <span className="text-[18px]  mx-2 font-bold font-Open">
                Packages
              </span>
            </div>
            <div className="max-w-[200px] flex items-center">
              {packageDetails?.map((data: any, i: any) => {
                return (
                  <button className="border rounded px-1 mx-2">{i + 1}</button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="border text-[15px] py-1 px-2 rounded">
              Total Applied Weight : 33.6 Kg
            </div>
            <button
              className="flex justify-center items-center cursor-pointer"
              onClick={() => setBoxModal(true)}
            >
              <img src={addIcon} alt="" />
            </button>
          </div>
        </div>
        <div className=" p-4 max-h-[400px] customScroll gap-y-4">
          {packageDetails?.map((boxData: any, i: number) => {
            return (
              <BoxInfo
                key={`{${i}_${boxData?.name}`}
                index={i}
                data={boxData}
                setProductModal={setProductModal}
              />
            );
          })}
        </div>
      </div>

      <RightSideModal
        className=" w-full lg:w-[400px]"
        wrapperClassName="rounded-l-xl"
        isOpen={boxModal}
        onClose={() => setBoxModal(false)}
      >
        <BoxModal onClose={setBoxModal} setOrder={setOrder} />
      </RightSideModal>

      <RightSideModal
        className=" w-full lg:w-[400px]"
        wrapperClassName="rounded-l-xl"
        isOpen={productModal?.isOpen}
        onClose={() => setProductModal({ isOpen: false, index: 0 })}
      >
        <ProductModal
          onClose={setProductModal}
          setOrder={setOrder}
          index={productModal?.index}
        />
      </RightSideModal>
    </>
  );
}

export default PackageDetails;
