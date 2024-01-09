import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import MoreIcon from "../../assets/more.svg";
import { CustomTable } from "../../../../components/Table";
import { POST } from "../../../../utils/webService";
import {
  GET_CHANNEL_INVENTORIES,
  UPDATE_ONE_CHANNEL_INVENTORY,
} from "../../../../utils/ApiUrls";
// import { Spinner } from "../../components/Spinner";
// import PaginationComponent from "../../components/Pagination";
import resolvedIcon from "../../../../assets/resolved.svg";
import infoCircleOutline from "../../../../assets/info-circle-outline.svg";
import AmazonIcon from "../../../../assets/AmazonIcon.png";
import Input from "../../../../components/Input";
import { Tooltip } from "react-tooltip";

interface IProps {}

const Channel = (props: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [partnerIdForMoreDropDown, setPartnerIdForMoreDropDown] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [channel, setChannel] = useState<any>([]);
  const [productDetails, setProductDetails]: any = useState({});

  let productObject: any = {};

  const handleProductDetails = (e: any, product: any) => {
    productObject = {
      ...productDetails,
      [product.productId]: {
        weight: product?.weight
          ? product.weight
          : productObject?.[product.productId]?.weight,
        length: product?.length
          ? product.length
          : productObject?.[product.productId]?.length,
        breadth: product?.breadth
          ? product.breadth
          : productObject?.[product.productId]?.breadth,
        height: product?.height
          ? product.height
          : productObject?.[product.productId]?.height,
      },
    };

    // setProductDetails(productObject);
    // }
  };

  const handleProductUpdate = async (e: any, productId: any) => {
    console.log("productObject: ", productId);
    console.log("oneProduct", productObject);
    Object.keys(productObject).forEach(async (outerKey) => {
      if (outerKey === productId) {
        const data = {
          productId: productId,
          deadWeight: productObject[productId].weight,
          length: productObject[productId].length,
          breadth: productObject[productId].breadth,
          height: productObject[productId].height,
        };

        const { data: response } = await POST(
          UPDATE_ONE_CHANNEL_INVENTORY,
          data
        );

        if (response.success) {
          console.log("updateProductDimensions.success", response?.success);
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      }
    });
  };

  const navigate = useNavigate();
  const columnsHelper = createColumnHelper<any>();
  const columns = [
    columnsHelper.accessor("Channel", {
      header: (props) => {
        return (
          <div className="flex justify-start items-center  p-0">
            <div>
              <h1 className="text-sm font-semibold leading-5 ">Channel</h1>
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;

        return (
          <div className="flex items-center whitespace-nowrap my-4;">
            <p>
              <img src={AmazonIcon} alt="" className="h-11 w-20" />
            </p>
          </div>
        );
      },
    }),
    // columnsHelper.accessor("ProductId", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between items-center max-w-[250px] ">
    //         <h1 className="text-sm font-semibold leading-5 ">Product Id</h1>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }: any) => {
    //     const rowData = row?.original;
    //     return (
    //       <div className="flex  whitespace-nowrap">
    //         <span>{rowData?.productId}</span>
    //       </div>
    //     );
    //   },
    // }),
    columnsHelper.accessor("SKU", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>SKU</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        return (
          <div className="flex whitespace-nowrap text-sm font-Open font-semibold">
            <span>{rowData?.sku}</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("ProductName", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[360px]">
            <h1 className="text-sm font-semibold leading-5 ">Product Name</h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        return (
          <>
            <div
              className=" whitespace-nowrap max-w-[360px] overflow-hidden overflow-ellipsis"
              data-tooltip-id="name-id"
              data-tooltip-content={rowData?.productName}
            >
              <span>{rowData?.productName}</span>
            </div>
            <Tooltip
              id="name-id"
              style={{
                color: "#FFFFFF",
                fontSize: "12px",
                lineHeight: "14px",
                maxWidth: "450px",
                textTransform: "capitalize",
                zIndex: "50",
              }}
            />
          </>
        );
      },
    }),
    columnsHelper.accessor("Weight", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>Weight (Kg)</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        return (
          <div className="flex justify-center">
            <span>
              {rowData?.deadWeight === 0 ? (
                <div className="flex gap-x-2">
                  <Input
                    inputType="number"
                    placeholder="Kg"
                    className="!text-sm !h-2 !w-12 !flex !items-center"
                    onChange={(e: any) =>
                      handleProductDetails(e, {
                        weight: e.target.value,
                        productId: rowData?.productId,
                      })
                    }
                  />
                  {/* <span className="flex items-center text-sm font-Open font-semibold">
                    Kg
                  </span> */}
                </div>
              ) : (
                rowData?.deadWeight
              )}
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("Length", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>Length (Cm)</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        return (
          <div className="flex justify-center">
            <span>
              {rowData?.length === 0 ? (
                <div className="flex gap-x-2">
                  <Input
                    inputType="number"
                    placeholder="Cm"
                    className="!text-sm !h-2 !w-12 !flex !items-center"
                    onChange={(e: any) =>
                      handleProductDetails(e, {
                        length: e.target.value,
                        productId: rowData?.productId,
                      })
                    }
                  />
                </div>
              ) : (
                rowData?.length
              )}
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("Breadth", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>Breadth (Cm)</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        return (
          <div className="flex justify-center">
            <span>
              {rowData?.breadth === 0 ? (
                <div className="flex gap-x-2">
                  <Input
                    inputType="number"
                    placeholder="Cm"
                    className="!text-sm !h-2 !w-12 !flex !items-center"
                    onChange={(e: any) =>
                      handleProductDetails(e, {
                        breadth: e.target.value,
                        productId: rowData?.productId,
                      })
                    }
                  />
                  {/* <span className="flex items-center text-sm font-Open font-semibold">
                    Kg
                  </span> */}
                </div>
              ) : (
                rowData?.breadth
              )}
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("Height", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>Height (Cm)</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        return (
          <div className="flex justify-center">
            <span>
              {rowData?.height === 0 ? (
                <div className="flex gap-x-2">
                  <Input
                    inputType="number"
                    placeholder="Cm"
                    className="!text-sm !h-2 !w-12 !flex !items-center"
                    onChange={(e: any) =>
                      handleProductDetails(e, {
                        height: e.target.value,
                        productId: rowData?.productId,
                      })
                    }
                  />
                  {/* <span className="flex items-center text-sm font-Open font-semibold">
                    Kg
                  </span> */}
                </div>
              ) : (
                rowData?.height
              )}
            </span>
          </div>
        );
      },
    }),
    // columnsHelper.accessor("Length", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-evenly gap-x- items-center max-w-[250px] ">
    //         <h1>
    //           Length
    //           {/* <sup>3</sup> */}
    //         </h1>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const rowData = row?.original;
    //     return (
    //       <div className="flex justify-around">
    //         {
    //           <div className="flex gap-x-2 ">
    //             {rowData?.length === 0 ? (
    //               <div className="flex  min-w-[100px]">
    //                 <Input
    //                   inputType="number"
    //                   placeholder="Length"
    //                   className="!text-sm !h-2 !w-12 !flex !ml-7 !items-center"
    //                   onChange={(e: any) =>
    //                     handleProductDetails(e, {
    //                       length: e.target.value,
    //                       productId: rowData?.productId,
    //                     })
    //                   }
    //                 />
    //                 {/* <span className="flex items-center text-sm font-Open font-semibold">
    //                   Length
    //                 </span> */}
    //               </div>
    //             ) : (
    //               <div className="min-w-[100px] flex justify-center items-center">
    //                 {rowData?.length}
    //               </div>
    //             )}

    //             {rowData?.breadth === 0 ? (
    //               <div className="flex gap-x-2 min-w-[100px]">
    //                 <Input
    //                   inputType="number"
    //                   placeholder="Breadth"
    //                   className="!text-sm !h-2 !w-12 !flex !ml-7 !items-center"
    //                   onChange={(e: any) =>
    //                     handleProductDetails(e, {
    //                       breadth: e.target.value,
    //                       productId: rowData?.productId,
    //                     })
    //                   }
    //                 />
    //                 {/* <span className="flex items-center text-sm font-Open font-semibold">
    //                   Breadth
    //                 </span> */}
    //               </div>
    //             ) : (
    //               <div className="min-w-[100px] flex justify-center items-center">
    //                 {rowData?.breadth}
    //               </div>
    //             )}
    //             {rowData?.height === 0 ? (
    //               <div className="flex gap-x-2 min-w-[100px]">
    //                 <Input
    //                   inputType="number"
    //                   placeholder="Height"
    //                   className="!text-sm !h-2 !w-12 !flex !ml-7 !items-center"
    //                   onChange={(e: any) =>
    //                     handleProductDetails(e, {
    //                       height: e.target.value,
    //                       productId: rowData?.productId,
    //                     })
    //                   }
    //                 />
    //                 {/* <span className="flex items-center text-sm font-Open font-semibold">
    //                   Height
    //                 </span> */}
    //               </div>
    //             ) : (
    //               <div className="min-w-[100px] flex justify-center items-center">
    //                 {rowData?.height}
    //               </div>
    //             )}
    //           </div>
    //         }
    //       </div>
    //     );
    //   },
    // }),

    //   header: () => {
    //     return (
    //       <div className="flex justify-between items-center max-w-[250px] ">
    //         <h1>Status</h1>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const rowData = row?.original;
    //     return (
    //       <div className="flex">
    //         <span>
    //           {rowData?.isActive ? (
    //             <div className="flex justify-center items-center rounded-sm gap-x-1 px-4 py-2 bg-[#F2FAEF] border border-[#7CCA62]">
    //               <img src={resolvedIcon} alt="icon" />
    //               <p className="text-[#7CCA62] text-xs font-Open font-semibold">
    //                 Active
    //               </p>
    //             </div>
    //           ) : (
    //             <div className="flex justify-center items-center rounded-sm gap-x-1 px-4 py-2 bg-[#FEEEEB] border border-[#F35838]">
    //               <img src={infoCircleOutline} className="h-3 w-3" alt="icon" />
    //               <p className="text-[#F35838] text-xs font-Open font-semibold">
    //                 Inactive
    //               </p>
    //             </div>
    //           )}
    //         </span>
    //       </div>
    //     );
    //   },
    // }),
    columnsHelper.accessor("Action", {
      header: () => {
        return (
          <div className="flex justify-center items-center max-w-[250px] ">
            <h1>Action</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;
        console.log("rowid", rowData);
        return (
          <div
            className="flex justify-center  items-center"
            onClick={(e: any) => handleProductUpdate(e, rowData?.productId)}
          >
            <span className="text-xs text-[#6695FF] font-Open font-semibold border border-[#6695FF] px-4 py-2 rounded-sm">
              Update
            </span>
          </div>
        );
      },
    }),
  ];

  // on page index change
  const onPageIndexChange = (data: any) => {
    const payload: any = {
      skip: 0,
      limit: 0,
      pageNo: 0,
    };

    if (data?.currentPage === 1) {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = 1;
    } else {
      payload.skip = (data?.currentPage - 1) * data?.itemsPerPage;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = data?.currentPage || 0;
    }
  };

  // on per page item change
  const onPerPageItemChange = (data: any) => {
    const payload: any = {
      skip: 0,
      limit: 0,
      pageNo: 0,
    };

    if (data?.currentPage === 1) {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = 1;
    } else {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = data?.currentPage || 0;
    }
  };

  useEffect(() => {
    (async () => {
      const { data: response }: any = await POST(GET_CHANNEL_INVENTORIES);
      console.log("response", response);

      response?.data?.map((item: any) => {
        productObject = {
          ...productObject,
          [item.productId]: {
            weight: item.deadWeight,
            length: item.length,
            breadth: item.breadth,
            height: item.height,
          },
        };
      });

      setProductDetails(productObject);

      setChannel(response?.data);
    })();
  }, []);

  return (
    <>
      {/* {accessControl === true ? ( */}
      <div className="">
        {/* <ToastContainer /> */}

        <div className="flex justify-between items-start mb-6 mr-6">
          <div className="flex items-center gap-x-2 w-full">
            <div className="flex justify-start items-center w-full pl-5"></div>
          </div>
        </div>

        <div>
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[450px]">
                {/* <Spinner /> */}
              </div>
            ) : (
              <div className="mx-5">
                <CustomTable data={channel || []} columns={columns} />
              </div>
            )}

            {/* {totalItemCount > 0 && (
              <PaginationComponent
                totalItems={totalItemCount}
                itemsPerPageOptions={[10, 20, 30, 50]}
                onPageChange={onPageIndexChange}
                onItemsPerPageChange={onPerPageItemChange}
              />
            )} */}
          </div>

          {/*  */}
        </div>
      </div>
      {/* ) : (
        <AccessDenied />
      )} */}
    </>
  );
};

export default Channel;
