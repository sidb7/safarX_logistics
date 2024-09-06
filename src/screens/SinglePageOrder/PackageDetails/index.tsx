import React, { useEffect, useState } from "react";
import BoxInfo from "../components/boxInfo";
import packegeIcon from "../../../assets/Delivery Icon.svg";
import addIcon from "../../../assets/addBlackIcon.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import BoxModal from "./components/boxModal";
import ProductDetails from "../components/productDetails";
import ProductModal from "./components/productModal";
import { useMediaQuery } from "react-responsive";
import EditBoxModal from "./components/editBoxModal";
import EditProductModal from "./components/editProductModal";
import OrderIdModal from "./components/orderIdModal";
import downArrow from "../../../assets/downwardArrow.svg";
import Accordian from "../components/accordian";

function PackageDetails({
  packageDetails,
  order,
  setOrder,
  setSortServiciblity,
  showDownloadLebal,
  setHighLightField,
}: any) {
  const [boxModal, setBoxModal]: any = useState(false);
  const [boxInfoData, setBoxInfoData] = useState([]);
  const [productModal, setProductModal]: any = useState({
    isOpen: false,
    id: 0,
  });
  const [OpenOrderIdModal, setopenOrderIdModal] = useState({
    state: {},
    isOpen: false,
  });
  const [editBoxModal, setEditBoxModal]: any = useState({
    isOpen: false,
    state: {},
  });
  const [editProductModal, setEditProductModal]: any = useState({
    isOpen: false,
    state: {},
  });
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  function removeBox(boxIndex: any) {
    let tempOrder = { ...order };
    tempOrder?.boxInfo.splice(boxIndex, 1);
    setOrder(tempOrder);
    setSortServiciblity("");
  }

  function removeProduct(boxIndex: any, productIndex: any) {
    let tempOrder = { ...order };
    let productList = tempOrder.boxInfo[boxIndex].products;

    const productUnitPrice =
      tempOrder.boxInfo[boxIndex].products[productIndex].unitPrice;

    tempOrder.boxInfo[boxIndex].products.splice(productIndex, 1);

    tempOrder.boxInfo[boxIndex].codInfo.invoiceValue -= productUnitPrice;
    tempOrder.boxInfo[boxIndex].codInfo.collectableAmount -= productUnitPrice;

    const boxAppliedWeight = Math.max(
      tempOrder.boxInfo[boxIndex]?.volumetricWeight,
      tempOrder.boxInfo[boxIndex]?.deadWeight
    );

    const TotalAppliedWeightOfAllProduct = productList.reduce(
      (acc: any, product: any) => acc + +product.appliedWeight,
      0
    );
    const updateBoxAppliedWeight = Math.max(
      TotalAppliedWeightOfAllProduct,
      boxAppliedWeight
    );

    tempOrder.boxInfo[boxIndex].appliedWeight = updateBoxAppliedWeight;

    setOrder(tempOrder);
    setSortServiciblity("");
  }

  useEffect(() => {
    setBoxInfoData(packageDetails);
  }, [packageDetails]);

  return (
    <>
      <div className="w-full h-full rounded-md overflow-auto scroll-smooth !max-h-[350px] lg:!max-h-[300px]">
        <Accordian
          headerChild={
            <div className="w-[100%] bg-white" style={{ position: "sticky" }}>
              <div
                className={`flex items-center justify-between ${
                  !isLgScreen && "bg-[#F6F6F6] "
                }`}
              >
                <div className="flex items-center">
                  <div className="flex items-center">
                    {isLgScreen && (
                      <div>
                        <img src={packegeIcon} />
                      </div>
                    )}
                    <span
                      className={`${
                        !isLgScreen ? " text-[17px]" : " text-[19px]"
                      } mx-2 font-bold font-Open`}
                    >
                      Packages
                    </span>
                  </div>
                  <div className="max-w-[200px] flex items-center">
                    {packageDetails?.map((data: any, i: any) => {
                      return (
                        <a
                          className="border rounded px-1 mx-2"
                          href={`#${i + 1}`}
                        >
                          {i + 1}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-x-4">
                  {!showDownloadLebal && (
                    <button
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        setBoxModal(true);
                        setSortServiciblity("");
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
                    >
                      <img src={addIcon} alt="" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          }
          showHeaderForDesktop={true}
        >
          <div className=" my-2 scroll-smooth">
            {boxInfoData.length > 0 ? (
              boxInfoData?.map((boxData: any, i: number) => {
                return (
                  <div className={`${isLgScreen ? "px-3" : "px-2"} relative`}>
                    <div id={`${i + 1}`} className="absolute top-[-60px]"></div>
                    <BoxInfo
                      key={`{${i}_${boxData?.name}`}
                      index={i}
                      data={boxData}
                      setProductModal={setProductModal}
                      order={order}
                      setOrder={setOrder}
                      removeProduct={removeProduct}
                      removeBox={removeBox}
                      setEditBoxModal={setEditBoxModal}
                      setEditProductModal={setEditProductModal}
                      setIsOpen={setopenOrderIdModal}
                      setSortServiciblity={setSortServiciblity}
                      showDownloadLebal={showDownloadLebal}
                      setHighLightField={setHighLightField}
                    />
                  </div>
                );
              })
            ) : (
              <div className="py-8"> </div>
            )}
          </div>
        </Accordian>
      </div>

      <RightSideModal
        className={`w-full md:!w-[450px]`}
        wrapperClassName="rounded-l-xl"
        isOpen={boxModal}
        onClose={() => setBoxModal(false)}
      >
        <BoxModal onClose={setBoxModal} setOrder={setOrder} order={order} />
      </RightSideModal>

      <RightSideModal
        className={`w-full md:!w-[450px]`}
        wrapperClassName="rounded-l-xl"
        isOpen={productModal?.isOpen}
        onClose={() => setProductModal({ isOpen: false, id: 0 })}
      >
        <ProductModal
          onClose={setProductModal}
          setOrder={setOrder}
          index={productModal?.id}
        />
      </RightSideModal>

      <RightSideModal
        className={`w-full md:!w-[450px]`}
        wrapperClassName="rounded-l-xl"
        isOpen={editBoxModal?.isOpen}
        onClose={() =>
          setEditBoxModal({
            isOpen: false,
            state: {},
          })
        }
      >
        <EditBoxModal
          onClose={setEditBoxModal}
          data={editBoxModal?.state}
          setOrder={setOrder}
        />
      </RightSideModal>
      <RightSideModal
        className={`w-full md:!w-[450px]`}
        wrapperClassName="rounded-l-xl"
        isOpen={editProductModal?.isOpen}
        onClose={() =>
          setEditProductModal({
            isOpen: false,
            state: {},
          })
        }
      >
        <EditProductModal
          onClose={setEditProductModal}
          data={editProductModal?.state}
          setOrder={setOrder}
        />
      </RightSideModal>

      <RightSideModal
        className={`w-full md:!w-[450px]`}
        wrapperClassName="rounded-l-xl"
        isOpen={editProductModal?.isOpen}
        onClose={() =>
          setEditProductModal({
            isOpen: false,
            state: {},
          })
        }
      >
        <EditProductModal
          onClose={setEditProductModal}
          data={editProductModal?.state}
          setOrder={setOrder}
        />
      </RightSideModal>

      <RightSideModal
        className={`w-full md:!w-[450px] `}
        wrapperClassName="rounded-l-xl"
        isOpen={OpenOrderIdModal?.isOpen}
        onClose={() => setopenOrderIdModal({ state: {}, isOpen: false })}
      >
        <OrderIdModal
          onClose={setopenOrderIdModal}
          state={OpenOrderIdModal?.state}
          setOrder={setOrder}
        />
      </RightSideModal>
    </>
  );
}

export default PackageDetails;
