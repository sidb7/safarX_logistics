import React, { useEffect, useRef, useState } from "react";
import ClockErrorIcon from "../../assets/clock.svg";
import ProcessingIcon from "../../assets/processing.svg";
import ResolvedIcon from "../../assets/resolved.svg";
import actionIcon from "../../assets/WeightManagement/actioniconweightfreeze.svg";
import LockIcon from "../../assets/WeightManagement/lockicon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import RightSideModal from "../../components/CustomModal/customRightModal";
import { CustomTable } from "../../components/Table";
import weightClockIcon from "../../assets/weightLock.svg";
import reloadIcon from "../../assets/Reload.svg";
import UploadImg from "./common/UploadImg";
import cameraIcon from "../../assets/cameraIconBlue.svg";
import SideDrawerForImgs from "./sideDrawerForImgs";
import { GET_MULTIPLE_FILE } from "../../utils/ApiUrls";
import toast from "react-hot-toast";
import { POST } from "../../utils/webService";
import { Spinner } from "../../components/Spinner";

const PendingDispute = ({
  data,
  getWeightDispute,
  isLoading,
  setRowSelectedData,
}: any) => {
  const columnsHelper = createColumnHelper<any>();
  const [imagesList, setImagesList] = useState<any>([]);
  const [getImageLoading, setGetImageLoading] = useState(false);
  const [sideDrawer, setSideDrawer] = useState({
    isOpen: false,
    data: {},
  });

  const [uploadImgModal, setUploadImgModal]: any = useState({
    isOpen: false,
    data: {
      awb: "",
      privateCompanyId: "",
    },
  });

  const PendingDisputeData = [
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Approved",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Processing",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Reject and Debit",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
  ];

  const getPartnerImages = async (dataItem: any) => {
    try {
      setGetImageLoading(true);
      let urlFromApi: any = [];
      for (let i = 0; i < dataItem?.length; i++) {
        if (dataItem[i]?.isActive === true) {
          const payload = {
            fileNameArr: [dataItem[i]?.url],
            ttl: 3600,
          };

          const { data } = await POST(GET_MULTIPLE_FILE, payload);
          if (data?.status) {
            dataItem[i].openUrl = data?.data?.[0];
            urlFromApi.push(dataItem[i]);
          } else {
            toast.error(data?.message);
          }
        }
      }
      setImagesList(urlFromApi);
      setGetImageLoading(false);
    } catch (error) {
      setGetImageLoading(false);
      return error;
    }
  };

  const PartialChecked = ({ checked, onChange, intermediate }: any) => {
    const ref: any = useRef(null);
    useEffect(() => {
      if (typeof intermediate === "boolean") {
        ref.current.indeterminate = intermediate;
      }
    }, [ref, intermediate]);
    return (
      <input
        type="checkbox"
        className="mr-3 !w-[16px] cursor-pointer"
        ref={ref}
        checked={checked}
        onChange={onChange}
      />
    );
  };

  const PendingDisputeHeading = [
    columnsHelper.accessor("packageDetails", {
      header: (props) => {
        return (
          <div className="flex">
            {/* <PartialChecked
              checked={props.table?.getIsAllRowsSelected()}
              onChange={props?.table?.getToggleAllRowsSelectedHandler()}
              intermediate={props?.table?.getIsSomeRowsSelected()}
            /> */}
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Package Details
            </p>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        const ProductList = rowData?.orderPlaceInfo?.products;
        return (
          <div className="flex">
            {/* <div className="flex justify-center mr-3 !my-[-13px] cursor-pointer">
              <input
                type="checkbox"
                checked={row?.getIsSelected()}
                onChange={row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div> */}
            <div className=" flex flex-col text-[#1C1C1C] font-Odiven text-sm leading-5 ">
              <div className="text-[15px]">
                {ProductList.map((data: any, i: any) => {
                  return <span>Product {i + 1} + Product 2</span>;
                })}
              </div>
              <div className="my-2">
                <div className="text-[14px]">Category :</div>
                <div>
                  {ProductList.map((data: any, i: any) => {
                    return (
                      <span className="font-semibold">{data?.category}</span>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-[14px]">SKU :</div>
                <div className="text-[14px]">
                  {ProductList.map((data: any, i: any) => {
                    return <span className="font-semibold">{data?.sku}</span>;
                  })}
                </div>
              </div>

              {row.original.packageDetails}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("orderDetails", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Order Details
            </p>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        return (
          <div className=" flex flex-col  text-[#1C1C1C] font-Odiven text-sm  leading-5 ">
            <div className="mb-4">
              <div>Delivery Partner</div>
              <div className="font-semibold">{rowData?.courierPartnerName}</div>
            </div>
            <div className="mt-3">
              <div>Tracking ID</div>
              <div className="font-semibold">{rowData?.awb}</div>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("appliedWeightAndPrice", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] self-center whitespace-nowrap">
              Applied Weight And Price
            </p>
          </div>
        );
      },

      cell: ({ row }: any) => {
        const rowData = row?.original;
        const orderPlaceInfo = rowData?.orderPlaceInfo;
        return (
          <div className=" flex flex-col  text-[#1C1C1C] font-Odiven text-sm  leading-5 ">
            <div className="mb-4">
              <div>Volumetric Weight</div>
              <div className="font-semibold ">
                <div>
                  {`${orderPlaceInfo?.length} X ${orderPlaceInfo?.breadth} X ${orderPlaceInfo?.height}`}
                </div>
                <div>{`${orderPlaceInfo?.appliedWeight} Kg`}</div>
              </div>
            </div>
            <div className="mt-3">
              <div>Price</div>
              <div className="font-semibold">{`₹ ${orderPlaceInfo?.price}`}</div>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("chargedWeightAndPrice", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Charged Weight And Price
            </p>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        const disputeInfo = rowData?.disputeInfo;
        return (
          <div className=" flex flex-col  text-[#1C1C1C] font-Odiven text-sm  leading-5 ">
            <div className="mb-4">
              <div>Volumetric Weight</div>
              <div className="font-semibold ">
                <div>
                  {`${disputeInfo?.length} X ${
                    disputeInfo?.breadth
                      ? disputeInfo?.breadth
                      : disputeInfo?.width
                  } X ${disputeInfo?.height}`}
                </div>
                <div>{`${disputeInfo?.appliedWeight} Kg`}</div>
              </div>
            </div>
            <div className="mt-3">
              <div>Price</div>
              {disputeInfo?.price && (
                <div className="font-semibold">{`₹ ${disputeInfo?.price}`}</div>
              )}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("dispute", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Dispute
            </p>
          </div>
        );
      },

      cell: ({ row }: any) => {
        const rowData = row?.original;
        return (
          <div className=" flex flex-col text-[#1C1C1C] font-Odiven text-sm  leading-5 ">
            <div className="mb-4">
              <div>Weight Difference</div>
              <div className="font-semibold">
                {`${rowData?.differenceInWeightKG.toFixed(2)} Kg`}
              </div>
            </div>
            <div className="mt-3">
              <div>Price Difference</div>
              <div className="font-semibold">
                {`₹ ${rowData?.differenceInCharge.toFixed(2)}`}
              </div>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Status
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const status = info.row.original.status.replace(/_/g, " ").trim();
        return (
          <p
            className={`flex items-center ${
              info.row.original.status === "DISPUTE_OPEN"
                ? "text-[#F35838] bg-[#FEEEEB]  border-[#FEEEEB]"
                : info.row.original.status === "Approved"
                ? "text-[#7CCA62] bg-[#F2FAEF] border-[#7CCA62]"
                : "text-[#F0A22E] bg-[#FDF6EA] border-[#FDF6EA]"
            } font-Open text-sm font-semibold leading-5 px-4 py-2 rounded-lg`}
          >
            {/* <img
              src={
                info.row.original.status === "Reject and Debit"
                  ? ""
                  : info.row.original.status === "Approved"
                  ? ""
                  : ""
              }
              alt=""
            />
            &nbsp; */}
            {capitalizeFirstLetter(status)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("sellerPhoto", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Seller Photo
            </p>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;

        let partnerWeightImages = rowData.partnerPhoto || [];
        let sellerWeightImages = rowData.sellerPhoto || [];
        let SellerPhotoLength = rowData?.sellerPhoto.filter(
          (item: any, i: any) => item?.isActive
        );
        let awb = rowData.awb || 0;

        let id = rowData.privateCompanyId || 0;
        return (
          <>
            {SellerPhotoLength?.length !== 5 ? (
              <div>
                <div className="flex justify-start gap-x-2 whitespace-nowrap flex-wrap cursor-pointer">
                  <p className="font-Open text-sm font-normal leading-5 mt-1 ">
                    <div
                      onClick={() => {
                        if (SellerPhotoLength.length > 0) {
                          getPartnerImages(SellerPhotoLength);
                          setSideDrawer({
                            isOpen: true,
                            data: {
                              awb: awb,
                              privateCompanyId: id,
                              name: "seller",
                            },
                          });
                        } else {
                          toast.error("No Image Found");
                        }
                      }}
                    >
                      Seller Images
                      <button className="text-[#004EFF] text-[14px] mx-1">
                        ({SellerPhotoLength.length})
                      </button>
                    </div>
                    <button
                      className="flex mt-1 gap-x-2"
                      onClick={() =>
                        setUploadImgModal({
                          isOpen: true,
                          data: {
                            awb: awb,
                            privateCompanyId: id,
                            previousLength: SellerPhotoLength.length,
                          },
                        })
                      }
                    >
                      <img src={cameraIcon} alt="" />
                      <p className="font-Open text-[13px] font-semibold leading-5 text-[#004EFF]">
                        UPLOAD
                      </p>
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className=" flex items-center text-[#1C1C1C] font-Open text-[14px] leading-5 cursor-pointer"
                  onClick={() => {
                    if (SellerPhotoLength.length > 0) {
                      getPartnerImages(SellerPhotoLength);
                      setSideDrawer({
                        isOpen: true,
                        data: {
                          awb: awb,
                          privateCompanyId: id,
                          name: "seller",
                        },
                      });
                    } else {
                      toast.error("No Image Found");
                    }
                  }}
                >
                  Uploaded Images
                  <span className="text-[#004EFF] mx-1">
                    ({SellerPhotoLength?.length})
                  </span>
                </p>
              </div>
            )}
          </>
        );
      },
    }),
    columnsHelper.accessor("courierPhotos", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Courier Photos
            </p>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        let partnerWeightImages = rowData?.partnerPhoto || [];

        let partnerPhotoLength = partnerWeightImages?.filter(
          (item: any, i: any) => item?.isActive
        );

        let awb = rowData?.awb || 0;
        let id = rowData?.privateCompanyId || 0;

        return (
          <p
            className=" flex items-center text-[#1C1C1C] font-Open text-[14px] leading-5 cursor-pointer"
            onClick={() => {
              if (partnerPhotoLength?.length > 0) {
                getPartnerImages(partnerPhotoLength);
                setSideDrawer({
                  isOpen: true,
                  data: {
                    awb: awb,
                    privateCompanyId: id,
                    name: "partner",
                  },
                });
              } else {
                toast.error("No Image Found");
              }
            }}
          >
            Uploaded Images
            <span className="text-[#004EFF] mx-1">
              ({partnerPhotoLength?.length})
            </span>
          </p>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex p-2">
            <div className="">
              <img src={weightClockIcon} alt="" />
            </div>
            <div className=" ml-4">
              <img src={reloadIcon} alt="" />
            </div>

            {/* <img src={LockIcon} alt="lockIcon" /> */}
          </div>
        );
      },
    }),
  ];

  return (
    <>
      {isLoading ? (
        <div className="w-[100%] h-[400px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <CustomTable
          columns={PendingDisputeHeading}
          data={data || []}
          // setRowSelectedData={setRowSelectedData}
        />
      )}
      <RightSideModal
        isOpen={uploadImgModal?.isOpen}
        onClose={() =>
          setUploadImgModal({
            isOpen: false,
            data: {
              awb: "",
              privateCompanyId: "",
            },
          })
        }
        className="!w-[450px]"
      >
        <UploadImg
          setUploadImgModal={setUploadImgModal}
          uploadImgModal={uploadImgModal}
          reloadMethod={getWeightDispute}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={sideDrawer?.isOpen}
        onClose={() => setSideDrawer({ isOpen: false, data: [] })}
        className="!w-[570px]"
      >
        <SideDrawerForImgs
          data={sideDrawer?.data}
          setSideDrawer={setSideDrawer}
          imagesList={imagesList}
          getWeightDispute={getWeightDispute}
          getImageLoading={getImageLoading}
        />
      </RightSideModal>
    </>
  );
};

export default PendingDispute;
