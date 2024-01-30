import { useEffect, useState } from "react";
import { GET_SELLER_ORDER_COMPLETE_DATA } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { capitalizeFirstLetter } from "../../utils/utility";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import { Spinner } from "../../components/Spinner/index";
import editIcon from "../../assets/editIconWhite.svg";
interface ICustomTableAccordion {
  data?: any;
}

const Accordion = (props: ICustomTableAccordion) => {
  const { data } = props;
  const [openIndex, setOpenIndex] = useState(null);
  const [orderDetails, setOrderDetails]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(false);
  const [isEdit, setIsEdit]: any = useState(false);
  const entries: any = document?.getElementsByClassName("entries");

  useEffect(() => {
    const { data: dataFromState, isOpen } = data;

    if (data !== undefined && isOpen === true) {
      setOrderDetails([]);
      getSellerOrderCompleteData(dataFromState);
    }
  }, [data]);

  const entriesHeight = entries?.[0]?.offsetHeight;

  const handleItemClick = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getSellerOrderCompleteData = async (orderData: any) => {
    // GET_SELLER_ORDER_COMPLETE_DATA
    try {
      setIsLoading(true);
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: orderData?.orderId?.split("T")[1],
        awb: orderData?.awb ? orderData?.awb : "0",
      });

      if (data.status) {
        const rowsData = data?.data[0]?.data[0];

        let rows: any = [
          {
            title: "Pickup Address",
            FlatNo: rowsData?.pickupAddress?.flatNo,
            LandkMark: capitalizeFirstLetter(rowsData?.pickupAddress?.landmark),
            Locality: capitalizeFirstLetter(rowsData?.pickupAddress?.locality),
            City: capitalizeFirstLetter(rowsData?.pickupAddress?.city),
            State: capitalizeFirstLetter(rowsData?.pickupAddress?.state),
            Pincode: rowsData?.pickupAddress?.pincode,
            Country: capitalizeFirstLetter(rowsData?.pickupAddress?.country),
            "Address Type": capitalizeFirstLetter(
              rowsData?.pickupAddress?.addressType
            ),
            Name: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.name),
            MobileNo: rowsData?.pickupAddress?.contact?.mobileNo,

            "Email Id": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.emailId
            ),
            Type: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.type),
          },
          {
            title: rowsData?.deliveryAddress?.flatNo && "Delivery Address",
            FlatNo: rowsData?.deliveryAddress?.flatNo,
            Landmark: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.landmark
            ),
            Locality: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.locality
            ),
            City: capitalizeFirstLetter(rowsData?.deliveryAddress?.city),
            State: capitalizeFirstLetter(rowsData?.deliveryAddress?.state),
            Pincode: rowsData?.deliveryAddress?.pincode,
            Country: capitalizeFirstLetter(rowsData?.deliveryAddress?.country),
            "Address Type": rowsData?.deliveryAddress?.addressType,
            Name: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.name
            ),
            MobileNo: rowsData?.deliveryAddress?.contact?.mobileNo,

            "Email Id": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.emailId
            ),
            Type: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.type
            ),
          },
          {
            title:
              rowsData?.boxInfo?.[0]?.service?.companyServiceId && "Services",
            "Partner Name": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.partnerName
            ),
            "AVN Service": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.companyServiceName
            ),
            "Service Mode": capitalizeFirstLetter(
              rowsData?.boxInfo?.[0]?.service?.serviceMode
            ),
            "Applied Weight": `${rowsData?.boxInfo?.[0]?.service?.appliedWeight} Kg`,
            "Freight Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.add +
                rowsData?.boxInfo?.[0]?.service?.base
            )?.toLocaleString("en-IN")}`,
            "COD Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.cod
            )?.toLocaleString("en-IN")}`,
            Insurance: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.insurance
            )?.toLocaleString("en-IN")}`,
            "Other Charges": `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.variables
            )?.toLocaleString("en-IN")}`,
            Tax: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.tax
            )?.toLocaleString("en-IN")}`,
            Total: `₹ ${Math.round(
              rowsData?.boxInfo?.[0]?.service?.total
            )?.toLocaleString("en-IN")}`,
          },
        ];
        let boxObj: any = { title: "" };
        rowsData?.boxInfo?.map((item: any, index: any) => {
          let title = `Box Info ${
            rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
          }`;
          let qty = 0;
          item?.products?.map((elem: any, num: any) => {
            boxObj = {
              ...boxObj,
              [`Name ${num + 1}`]: elem?.name,
              [`QTY ${num + 1}`]: elem?.qty,
              [`Dead Weight ${num + 1}`]: `${elem?.deadWeight} Kg`,
              [`Applied Weight ${num + 1}`]: `${elem?.appliedWeight} Kg`,
              [`Dimensions ${
                num + 1
              }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
              [`Price ${num + 1}`]: `₹ ${Math.round(
                elem?.unitPrice
              )?.toLocaleString("en-IN")}`,
              [`Tax ${num + 1}`]: `₹ ${Math.round(
                elem?.unitTax
              )?.toLocaleString("en-IN")}`,

              [`SKU ${num + 1}`]: elem?.sku,
            };
            qty += elem?.qty;
          });
          title += ` Product(s) x ${qty}`;
          boxObj.title = title;
          rows.push(boxObj);
        });

        let statusObj: any = { title: "" };
        rowsData?.status?.map((elem: any, index: any) => {
          // console.log("descriptionBookedOrder", elem?.description);
          statusObj = {
            ...statusObj,
            [`AWB No ${index + 1}`]: orderData?.awb,
            [`Current Status ${index + 1}`]: capitalizeFirstLetter(
              elem?.currentStatus
            ),
            // [`Description ${index + 1}`]: capitalizeFirstLetter(
            //   elem?.description
            // ),
            [`Description ${index + 1}`]: elem?.description,
            [`LogId ${index + 1}`]: elem.logId,
            [`Notes ${index + 1}`]: elem.notes,
            [`Time ${index + 1}`]: date_DD_MMM_YYYY_HH_MM_SS(elem.timeStamp),
          };
          statusObj.title = "Status";
        });
        rows.push(statusObj);

        rows.push({
          title: "Other Details",
          "Shipyaari ID": rowsData?.tempOrderId,
          "Order Id": rowsData?.orderId,
          "Tracking Id": orderData?.awb,
          Source: capitalizeFirstLetter(rowsData?.source),
          "Order Type": rowsData?.orderType,
          Zone: capitalizeFirstLetter(rowsData?.zone),
        });

        setOrderDetails(rows);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        "🚀 ~ file: index.tsx:289 ~ getSellerOrderCompleteData ~ error:",
        error
      );
      setIsLoading(false);
      return [];
    }
  };

  const editToggleButton = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="overflow-auto h-[100%] pb-[2rem]">
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-[80%]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-[100%] p-[1rem] items-start overflow-auto">
            {orderDetails.length > 0 &&
              orderDetails?.map((item: any, index: any) => {
                return (
                  item?.title && (
                    <div
                      className="flex flex-col mb-3 cursor-pointer"
                      key={index}
                    >
                      <div
                        className={`flex  select-none gap-y-[1rem] justify-between p-3 h-[52px] border-[1px] border-[#E8E8E8] ${
                          openIndex === index
                            ? "bg-[black] text-[white] rounded-tr-lg rounded-tl-lg rounded-b-none "
                            : "bg-[white] text-[black] rounded-lg "
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <div> {item?.title}</div>
                        {openIndex === index && (
                          <div
                            className="w-[21px] flex justify-center items-center"
                            onClick={editToggleButton}
                          >
                            <img src={editIcon} alt="" />
                          </div>
                        )}
                      </div>
                      {openIndex === index && (
                        <div>
                          <div>
                            <div
                              className={`entries ${
                                entriesHeight && entriesHeight < 500
                                  ? `h-[${entriesHeight}]px`
                                  : `h-[${500}]px`
                              } flex flex-col overflow-auto border p-[0.5rem]`}
                            >
                              {Object.entries(item)?.map(
                                ([key, value]: any, index: any) => {
                                  // Need To Implement this dynamically, It is applied for time being
                                  return index === 0 ? (
                                    ""
                                  ) : item?.title?.includes("Box") ? (
                                    <div
                                      className="grid grid-cols-12"
                                      key={key}
                                    >
                                      <div
                                        id="boxInfo"
                                        className={`col-span-3 mt-1  ${
                                          index === 1 ||
                                          index === 9 ||
                                          index === 17 ||
                                          index === 25
                                            ? "border-2 border-b-0"
                                            : (index > 1 && index < 9) ||
                                              (index > 9 && index < 17) ||
                                              (index > 17 && index < 25) ||
                                              (index > 25 && index < 33)
                                            ? "border-x-2"
                                            : index === 9 ||
                                              index === 17 ||
                                              index === 25 ||
                                              index === 33
                                            ? "border-b-2"
                                            : ""
                                        }  py-[0.5rem]`}
                                      >
                                        {(index === 5 ||
                                          index === 13 ||
                                          index === 21 ||
                                          index === 28) && (
                                          <div className="col-span-3 px-[1rem]">
                                            {`Product ${key[key.length - 1]} `}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-span-9">
                                        <div
                                          className={`grid grid-cols-12 mt-1 border-2 py-[0.5rem] ${
                                            index % 2 === 0
                                              ? "bg-[#F9FBFC]"
                                              : "bg-white"
                                          }`}
                                          key={key}
                                        >
                                          <div className="col-span-5 px-[1rem] border-r-2">
                                            <strong>
                                              {key.slice(0, key.length - 1)}:
                                            </strong>
                                          </div>
                                          <div className="col-span-7 px-[1rem] ">
                                            {value}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    // <div className="flex">
                                    //   {index < 2 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-2 border-b-0"></div>
                                    //   )}
                                    //   {index === 5 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-2 border-b-0 border-t-0">
                                    //       Products 1
                                    //     </div>
                                    //   )}
                                    //   {index < 9 && index > 1 && index != 5 && (
                                    //     <div className=" mt-1 w-[30%] py-[0.5rem] px-[1rem] border-r-2 border-l-2"></div>
                                    //   )}
                                    //   <div
                                    //     className={`flex w-[100%] mt-1 border-2 py-[0.5rem] ${
                                    //       index % 2 === 0 ? "bg-[#F9FBFC]" : "bg-white"
                                    //     }`}
                                    //     key={key}
                                    //   >
                                    //     <div className=" w-[35%] px-[1rem] border-r-2">
                                    //       <strong>{key}:</strong>
                                    //     </div>
                                    //     <div className="px-[1rem] ">{value}</div>
                                    //   </div>
                                    // </div>
                                    <div>
                                      {item?.title === "Status" &&
                                        (index === 7 ||
                                          index === 13 ||
                                          index === 19) && <br />}
                                      <div
                                        className={`grid grid-cols-12 mt-1 border-2 py-[0.5rem] ${
                                          index % 2 === 0
                                            ? "bg-[#F9FBFC]"
                                            : "bg-white"
                                        }`}
                                        key={key}
                                      >
                                        <div className="col-span-4 px-[1rem] border-r-2">
                                          <strong>
                                            {item?.title === "Status"
                                              ? key.slice(0, key.length - 1)
                                              : key}
                                            :
                                          </strong>
                                        </div>
                                        <div className="col-span-8 px-[1rem]">
                                          {isEdit ? (
                                            value
                                          ) : (
                                            <input value={value} />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Accordion;
