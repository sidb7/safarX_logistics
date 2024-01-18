import SampleProduct from "../../assets/SampleProduct.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import InputBox from "../../components/Input/index";
import ItemIcon from "../../assets/Product/Item.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import BoxIcon from "../../assets/layer.svg";
import { capitalizeFirstLetter } from "../../utils/utility";
import { useEffect, useState } from "react";
import CustomDropDown from "../../components/DropDown";

interface ErrorModalProps {
  errorModalData: any;
}

const ErrorModal = (props: ErrorModalProps) => {
  let productDimesions: any = {};
  const { errorModalData } = props;
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [productDetails, setProductDetails]: any = useState([]);
  const [trigger, setTrigger] = useState(false);
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
              label="Dead Weight (Kg)"
              value={
                index + 1
                  ? productDetails?.[
                      errorModalData?.entityDetails?.[index]?.productId
                    ]?.deadWeight
                  : boxDetails?.deadWeight
              }
              onChange={(e: any) =>
                index + 1
                  ? handleProductDimesions(
                      errorModalData?.entityDetails?.[index]?.productId,
                      { deadWeight: e.target.value }
                    )
                  : handleBoxDimensions({ deadWeight: e.target.value })
              }
            />
            <InputBox
              label="Volumetric Weight"
              value={
                index + 1
                  ? productDetails?.[
                      errorModalData?.entityDetails?.[index]?.productId
                    ]?.volumetricWeight
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
                label="L"
                value={
                  index + 1
                    ? productDetails?.[
                        errorModalData?.entityDetails?.[index]?.productId
                      ]?.length
                    : boxDetails?.length
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        errorModalData?.entityDetails?.[index]?.productId,
                        { length: e.target.value }
                      )
                    : handleBoxDimensions({
                        length: e.target.value,
                      })
                }
              />
              <InputBox
                label="B"
                value={
                  index + 1
                    ? productDetails?.[
                        errorModalData?.entityDetails?.[index]?.productId
                      ]?.breadth
                    : boxDetails?.breadth
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        errorModalData?.entityDetails?.[index]?.productId,
                        { breadth: e.target.value }
                      )
                    : handleBoxDimensions({ breadth: e.target.value })
                }
              />
              <InputBox
                label="H"
                value={
                  index + 1
                    ? productDetails?.[
                        errorModalData?.entityDetails?.[index]?.productId
                      ]?.height
                    : boxDetails?.height
                }
                onChange={(e: any) =>
                  index + 1
                    ? handleProductDimesions(
                        errorModalData?.entityDetails?.[index]?.productId,
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

  const handleBoxAccordion = () => {
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

  const updateProducts = () => {
    console.log("ProductDetails, BoxDetails: ", { productDetails, boxDetails });
  };

  useEffect(() => {
    errorModalData.entityDetails.map((item: any) => {
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
  }, []);

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
    <div className="overflow-h-auto max-h-[90vh]">
      <div className="flex mt-[1rem] mb-[2rem] rounded-lg mx-[0.5rem] h-[3rem] items-center px-[1rem] text-[1.2rem]">
        <div className="flex w-[100%] justify-between">
          <div className="flex gap-x-2">
            <img src={SampleProduct} width="38px" />
            <p className="text-[25px]">{errorModalData?.error}</p>
          </div>
          <div className="flex justify-self-end">
            <img src={CloseIcon} width="30px" className="" />
          </div>
        </div>
      </div>
      <div className="border-2 m-[1rem] bg-slate-50 overflow-auto max-h-[55vh]">
        {errorModalData?.entityDetails?.map((data: any, index: any) => (
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
      </div>

      <div className="m-[1rem] mt-[1rem]">
        <div className="flex min-w-[90%]">
          <div
            className="items-center flex border-2 rounded-md w-[100%] justify-between"
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
            onClick={handleBoxAccordion}
          >
            <div className="flex items-center ml-[0.5rem]">
              <div className="p-3.5 flex justify-center items-center">
                <img src={BoxIcon} className="w-[40px]" />
              </div>
              <div>
                {" "}
                <b>Box</b>{" "}
              </div>
            </div>
            <div className="mr-6">
              <img src={DownArrowIcon} />
            </div>
          </div>
        </div>
        {globalIndex === -1 && dimesionBoxJsx()}
      </div>
      <div
        style={{
          boxShadow:
            "0px -4px 6px -1px rgba(133, 133, 133, 0.1), 0px -2px 4px -1px rgba(133, 133, 133, 0.06), 0px 6px 13px 0px rgba(133, 133, 133, 0.1)",
        }}
        className="absolute bottom-0 w-full shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] "
      >
        <div
          className="cursor-pointer flex items-center justify-center border-2 rounded-md  text-white bg-black py-2"
          onClick={updateProducts}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
