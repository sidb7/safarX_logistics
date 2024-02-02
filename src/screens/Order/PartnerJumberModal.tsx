import SampleProduct from "../../assets/SampleProduct.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import InputBox from "../../components/Input/index";
import ItemIcon from "../../assets/Product/Item.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import BoxIcon from "../../assets/layer.svg";
import VanIcon from "../../assets/vanWithoutBG.svg";
import { capitalizeFirstLetter } from "../../utils/utility";
import { useEffect, useState } from "react";
import CustomDropDown from "../../components/DropDown";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import {
  GET_SELLER_ORDER_COMPLETE_DATA,
  POST_PLACE_ALL_ORDERS,
  SET_PARTNER_SERVICE_INFO,
  SET_WEIGHT_INFO_ORDER,
} from "../../utils/ApiUrls";

interface ErrorModalProps {
  errorModalData?: any;
  partnerModalData?: any;
  closeModal?: any;
}

const ErrorModal = (props: ErrorModalProps) => {
  let productDimesions: any = {};
  const { errorModalData, partnerModalData, closeModal } = props;
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [productDetails, setProductDetails]: any = useState([]);
  const [boxInfo, setBoxInfo]: any = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [orderDetail, setOrderDetail]: any = useState([]);
  const [services, setServices]: any = useState([]);
  const [serviceIndex, setServiceIndex]: any = useState(0);
  const handleProductsDetails = (index?: any) => {
    setGlobalIndex(index === globalIndex ? null : index);
  };

  const [boxDetails, setBoxDetails] = useState({
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
    volumetricWeight: 0,
  });

  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const dimesionBoxJsx = (index?: any) => {
    return (
      <div className="flex min-w-[90%] border-2 rounded-br rounded-bl border-t-0 ">
        <div
          className="items-center flex flex-col gap-y-[1rem] justify-between my-5 w-[100%]"
          style={{
            boxShadow:
              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
          }}
          // onClick={() => handleProductsDetails(index)}
        >
          <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
            <InputBox
              inputType="number"
              label="Dead Weight (Kg)"
              value={
                index + 1
                  ? productDetails?.[boxInfo?.[0]?.products?.[index]?.productId]
                      ?.deadWeight
                  : boxDetails?.deadWeight
              }
              onChange={(e: any) =>
                index + 1
                  ? handleProductDimesions(
                      boxInfo?.[0]?.products?.[index]?.productId,
                      { deadWeight: e.target.value }
                    )
                  : handleBoxDimensions({ deadWeight: e.target.value })
              }
            />
            <InputBox
              inputType="number"
              label="Volumetric Weight"
              value={
                index + 1
                  ? productDetails?.[boxInfo?.[0]?.products?.[index]?.productId]
                      ?.volumetricWeight
                  : boxDetails?.volumetricWeight
              }
              isDisabled={true}
            />
          </div>
          <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
            <div className="w-[50%]">
              <CustomDropDown onChange={() => {}} options={measureUnits} />
            </div>
            <div className="flex w-[50%] gap-x-4">
              <InputBox
                inputType="number"
                label="L"
                value={
                  index + 1
                    ? productDetails?.[
                        boxInfo?.[0]?.products?.[index]?.productId
                      ]?.length
                    : boxDetails?.length
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        boxInfo?.[0]?.products?.[index]?.productId,
                        { length: e.target.value }
                      )
                    : handleBoxDimensions({
                        length: e.target.value,
                      })
                }
              />
              <InputBox
                label="B"
                inputType="number"
                value={
                  index + 1
                    ? productDetails?.[
                        boxInfo?.[0]?.products?.[index]?.productId
                      ]?.breadth
                    : boxDetails?.breadth
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        boxInfo?.[0]?.products?.[index]?.productId,
                        { breadth: e.target.value }
                      )
                    : handleBoxDimensions({ breadth: e.target.value })
                }
              />
              <InputBox
                label="H"
                inputType="number"
                value={
                  index + 1
                    ? productDetails?.[
                        boxInfo?.[0]?.products?.[index]?.productId
                      ]?.height
                    : boxDetails?.height
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        boxInfo?.[0]?.products?.[index]?.productId,
                        { height: e.target.value }
                      )
                    : handleBoxDimensions({ height: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePartnerAccordion = () => {
    setGlobalIndex(globalIndex === -1 ? null : -1);
  };

  const handleProductDimesions = (productId?: any, data?: any) => {
    productDimesions = productDetails;
    productDimesions = {
      ...productDimesions,
      [productId]: {
        ...productDimesions?.[productId],
        deadWeight: data?.deadWeight
          ? data?.deadWeight
          : productDimesions?.[productId]?.deadWeight,
        length: data?.length
          ? data?.length
          : productDimesions?.[productId]?.length,
        breadth: data?.breadth
          ? data?.breadth
          : productDimesions?.[productId]?.breadth,
        height: data?.height
          ? data?.height
          : productDimesions?.[productId]?.height,
      },
    };

    setProductDetails(productDimesions);
  };

  const updateVolumetricData = (productId: any) => {
    if (trigger) {
      setProductDetails((prevProductDetails: any) => {
        // Use the functional update form to ensure you have the latest state
        return {
          ...prevProductDetails,
          [productId]: {
            ...prevProductDetails?.[productId],
            // Compute volumetric weight and convert to fixed decimal
            volumetricWeight: (
              (prevProductDetails?.[productId]?.length *
                prevProductDetails?.[productId]?.breadth *
                prevProductDetails?.[productId]?.height) /
              5000
            ).toFixed(2),
          },
        };
      });
      setBoxDetails((prevBoxDetails: any) => {
        return {
          ...prevBoxDetails,
          volumetricWeight: (
            (prevBoxDetails?.length *
              prevBoxDetails?.breadth *
              prevBoxDetails.height) /
            5000
          ).toFixed(2),
        };
      });
      setTrigger(false);
    }
  };

  const handleBoxDimensions = (data: any) => {
    setBoxDetails((prevBoxDetails: any) => {
      return {
        ...prevBoxDetails,
        length: data?.length ? data?.length : boxDetails?.length,
        breadth: data?.breadth ? data?.breadth : boxDetails?.breadth,
        height: data?.height ? data?.height : boxDetails?.height,
        deadWeight: data?.deadWeight
          ? data?.deadWeight
          : boxDetails?.deadWeight,
      };
    });
  };

  const updateProducts = async () => {
    const source = orderDetail.source;
    const codInfo = orderDetail.codInfo;
    const tempOrderId = orderDetail.tempOrderId;
    let tempBoxInfo = boxInfo;
    if (Object.entries(productDetails).length === 0) return;
    tempBoxInfo[0].products.map((item: any) => {
      item.deadWeight = Number(productDetails[item.productId].deadWeight);
      item.length = Number(productDetails[item.productId].length);
      item.height = Number(productDetails[item.productId].height);
      item.breadth = Number(productDetails[item.productId].breadth);
      item.volumetricWeight = Number(productDetails[item.productId].deadWeight);
    });
    let payload = {
      boxInfo: tempBoxInfo,
      codInfo,
      tempOrderId,
      source,
    };
    const { data: serviceObj } = await POST(SET_WEIGHT_INFO_ORDER, payload);
    setServices(serviceObj.data);
  };

  const handleService = (index: any) => {
    setServiceIndex(index);
  };

  const updateOrderDetails = async () => {
    try {
      const payload = {
        partnerServiceId: services[serviceIndex].partnerServiceId,
        partnerServiceName: services[serviceIndex].partnerServiceName,
        companyServiceId: services[serviceIndex].companyServiceId,
        companyServiceName: services[serviceIndex].companyServiceName,
        tempOrderId: orderDetail.tempOrderId,
        source: orderDetail.source,
      };
      const { data: responseData } = await POST(
        SET_PARTNER_SERVICE_INFO,
        payload
      );
      if (responseData?.success) {
        toast.success(responseData?.message);
      } else {
        toast.error(responseData?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
    closeModal();
  };

  const processOrder = async () => {
    try {
      updateOrderDetails();
      const orderDetails = {
        orders: [
          {
            tempOrderId: orderDetail?.tempOrderId,
            source: orderDetail?.source,
            orderId: orderDetail?.orderId,
          },
        ],
      };

      const { data } = await POST(POST_PLACE_ALL_ORDERS, orderDetails);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.success);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
    closeModal();
  };

  useEffect(() => {
    (async () => {
      const { data: completeOrderDetails } = await POST(
        GET_SELLER_ORDER_COMPLETE_DATA,
        partnerModalData.data
      );
      setBoxInfo(completeOrderDetails?.data?.[0]?.data?.[0]?.boxInfo);
      setOrderDetail(completeOrderDetails?.data?.[0]?.data?.[0]);

      boxInfo?.[0]?.products?.map((item: any) => {
        productDimesions = {
          ...productDimesions,
          [item.productId]: {
            deadWeight: item?.deadWeight || 0,
            length: item?.length || 0,
            breadth: item?.breadth || 0,
            height: item?.height || 0,
            volumetricWeight:
              (
                (Number(item?.length) *
                  Number(item?.breadth) *
                  Number(item?.height)) /
                5000
              ).toFixed(2) || 0,
          },
        };
      });
      setProductDetails(productDimesions);
    })();
  }, [globalIndex]);

  useEffect(() => {
    for (let item in productDetails) {
      if (
        productDetails[item]?.length &&
        productDetails[item]?.breadth &&
        productDetails[item].height
      ) {
        setTrigger(true);
        updateVolumetricData(item);
      }
    }
  }, [productDetails, boxDetails]);

  return (
    <div className="overflow-h-auto max-h-[80vh]">
      <div className="flex mt-[1rem] mb-[2rem] rounded-lg mx-[0.5rem] h-[3rem] items-center px-[1rem] text-[1.2rem]">
        <div className="flex w-[100%] justify-between">
          <div className="flex gap-x-2">
            <img src={SampleProduct} width="38px" />
            <p className="text-[25px]">
              {orderDetail?.source === "SHOPIFY"
                ? orderDetail?.otherDetails?.orderNumber
                  ? orderDetail?.otherDetails?.orderNumber
                  : orderDetail?.orderId
                : orderDetail?.orderId
                ? orderDetail?.orderId
                : orderDetail?.tempOrderId}
            </p>
          </div>
          <div
            className="flex justify-self-end cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <img src={CloseIcon} width="30px" className="" />
          </div>
        </div>
      </div>
      <div className="border-2 m-[1rem] bg-slate-50 overflow-auto max-h-[40vh]">
        {boxInfo?.[0]?.products?.map((data: any, index: any) => (
          <div key={index} className="m-[0.5rem] my-[1rem] bg-white">
            <div className="flex min-w-[90%]">
              <div
                className="items-center flex border-2 rounded-md w-[100%] justify-between"
                style={{
                  boxShadow:
                    "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                }}
                onClick={() => handleProductsDetails(index)}
              >
                <div className="flex items-center w-[90%]">
                  <div className="p-3.5 flex justify-center items-center">
                    <img src={ItemIcon} className="" alt="" />
                  </div>
                  <div className="max-w-[80%] line-clamp-1">
                    {" "}
                    <b>{capitalizeFirstLetter(data?.name)} </b>
                  </div>
                </div>
                <div className=" w-[10%]">
                  <img
                    className={`${index === globalIndex && "rotate-180"}`}
                    src={DownArrowIcon}
                  />
                </div>
              </div>
            </div>
            {index === globalIndex && dimesionBoxJsx(index)}
          </div>
        ))}
        <div
          style={{
            boxShadow:
              "0px -4px 6px -1px rgba(133, 133, 133, 0.1), 0px -2px 4px -1px rgba(133, 133, 133, 0.06), 0px 6px 13px 0px rgba(133, 133, 133, 0.1)",
          }}
          className="w-full flex items-center justify-center shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[10px]  "
        >
          <div
            className=" w-[90%] cursor-pointer flex items-center justify-center border-2 rounded-md  text-white bg-black py-2"
            onClick={updateProducts}
          >
            Save
          </div>
        </div>
      </div>

      <div className="border-2 m-[1rem] bg-slate-50 overflow-auto max-h-[40vh]">
        <div className="m-[0.5rem] my-[1rem] bg-white">
          <div className="flex min-w-[90%]">
            <div
              className="items-center flex border-2 rounded-md w-[100%] justify-between"
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              onClick={() => handlePartnerAccordion()}
            >
              <div className="flex items-center w-[90%]">
                <div className="p-3.5 flex justify-center items-center">
                  <img src={VanIcon} className="w-[40px]" alt="" />
                </div>
                <div className="max-w-[80%] line-clamp-1">
                  <b>Courier Partners</b>
                  {/* <b>{capitalizeFirstLetter(data?.name)} </b> */}
                </div>
              </div>
              <div className=" w-[10%]">
                <img
                  src={DownArrowIcon}
                  className={`${globalIndex === -1 ? "rotate-180" : "rotate"}`}
                />
              </div>
            </div>
          </div>
          {globalIndex === -1 && (
            <div>
              {services.map((service: any, index: any) => {
                return (
                  <div
                    className={`flex  cursor-pointer min-w-[90%] border-2 rounded-br rounded-bl border-t-0 `}
                    onClick={() => handleService(index)}
                  >
                    <div
                      className="flex flex-col items-center gap-y-[1rem] my-5 w-[100%]"
                      style={{
                        boxShadow:
                          "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                      }}
                      // onClick={() => handleProductsDetails(index)}
                    >
                      <div
                        className="flex items-center mx-[2rem] max-w-[90%] min-w-[90%]  "
                        style={{
                          justifyContent: "space-between",
                          marginRight: "1rem",
                        }}
                      >
                        <div
                          className={`flex gap-x-4 ${
                            index === serviceIndex && "font-semibold"
                          }`}
                        >
                          {index === serviceIndex && <img src={VanIcon} />}
                          {capitalizeFirstLetter(service.partnerName) +
                            " " +
                            capitalizeFirstLetter(service.serviceMode)}
                        </div>
                        <div>{service.total}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          boxShadow:
            "0px -4px 6px -1px rgba(133, 133, 133, 0.1), 0px -2px 4px -1px rgba(133, 133, 133, 0.06), 0px 6px 13px 0px rgba(133, 133, 133, 0.1)",
        }}
        className="w-full absolute bottom-0 flex items-center justify-center shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[10px]  "
      >
        <div
          className={`${
            services.length > 0
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-50"
          }  w-[50%] mx-[1rem] cursor-pointer flex items-center justify-center border-2 rounded-md  text-white bg-black py-2`}
          onClick={updateOrderDetails}
        >
          Update Order
        </div>
        <div
          className={`${
            services.length > 0
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-50"
          }  w-[50%] cursor-pointer flex items-center justify-center border-2 rounded-md  text-white bg-black py-2`}
          onClick={processOrder}
        >
          Process Order
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
