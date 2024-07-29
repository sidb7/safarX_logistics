import React, { useEffect, useState } from "react";
import BoxInfo from "../components/boxInfo";
import packegeIcon from "../../../assets/Delivery Icon.svg";
import addIcon from "../../../assets/addBlackIcon.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import BoxModal from "./components/boxModal";
import ProductDetails from "../components/productDetails";
import ProductModal from "./components/productModal";
import EditBoxModal from "./components/editBoxModal";
import EditProductModal from "./components/editProductModal";
import OrderIdModal from "./components/orderIdModal";

function PackageDetails({
  packageDetails,
  order,
  setOrder,
  setSortServiciblity,
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
      <div className="border  h-full rounded-md">
        <div className="p-2 border-b  flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div>
                <img src={packegeIcon} />
              </div>
              <span className="text-[19px]  mx-2 font-bold font-Open">
                Packages
              </span>
            </div>
            <div className="max-w-[200px] flex items-center">
              {packageDetails?.map((data: any, i: any) => {
                return (
                  <a className="border rounded px-1 mx-2" href={`#${i + 1}`}>
                    {i + 1}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex gap-x-4">
            {/* {packageDetails.length > 0 && (
              <div className="border text-[15px] py-1 px-2 rounded">
                Total Applied Weight : 33.6 Kg
              </div>
            )} */}
            <button
              className="flex justify-center items-center cursor-pointer"
              onClick={() => {
                setBoxModal(true);
                setSortServiciblity("");
              }}
            >
              <img src={addIcon} alt="" />
            </button>
          </div>
        </div>
        <div className=" max-h-[300px] pb-[20px] customScroll">
          {boxInfoData.length > 0 ? (
            boxInfoData?.map((boxData: any, i: number) => {
              return (
                <div id={`${i + 1}`} className="px-2  ">
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
                  />
                </div>
              );
            })
          ) : (
            <div className="py-8"> </div>
          )}
        </div>
      </div>

      <RightSideModal
        className=" w-full lg:w-[400px]"
        wrapperClassName="rounded-l-xl"
        isOpen={boxModal}
        onClose={() => setBoxModal(false)}
      >
        <BoxModal onClose={setBoxModal} setOrder={setOrder} order={order} />
      </RightSideModal>

      <RightSideModal
        className=" w-full lg:w-[400px]"
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
        className=" w-full lg:w-[400px]"
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
        className=" w-full lg:w-[400px]"
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
        className=" w-full lg:w-[400px]"
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
        className=" w-full lg:w-[400px]"
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
