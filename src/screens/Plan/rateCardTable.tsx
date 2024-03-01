import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../components/Table";
import UpArrowIcon from "../../assets/upArrorwBlue.svg";
import { capitalizeFirstLetter } from "../../utils/utility";

const RateCardTable = (props: any) => {
  const { serviceData } = props;

  let activeServiceInfo: any = serviceData.filter(
    (serviceObj: any) => serviceObj?.isActive === true
  );

  const formatString = (inputString: any) => {
    // Split the string by underscore
    const words = inputString.split("_");

    // Capitalize the first letter of each word
    const formattedWords = words.map(
      (word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // Join the words with space
    const formattedString = formattedWords.join(" ");

    return formattedString;
  };

  const columnsHelper = createColumnHelper<any>();
  const columns = [
    columnsHelper.accessor("serviceName", {
      header: (props) => {
        return (
          <div className="flex items-center">
            {/* <PartialChecked
              checked={props.table?.getIsAllRowsSelected()}
              onChange={props?.table?.getToggleAllRowsSelectedHandler()}
              intermediate={props?.table?.getIsSomeRowsSelected()}
            /> */}
            <div>
              <h1 className="text-base font-Open font-semibold leading-5 text-[#1C1C1C] flex justify-center items-center">
                Service Name
              </h1>
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        // console.log("🚀 ~ RateCardTable ~ row:", row);
        let serviceName = row?.original?.partnerServiceName;
        return (
          <div className="flex items-center whitespace-nowrap my-4">
            {/* <div className="flex justify-center items-center  w-[20px] h-[20px] mr-3 cursor-pointer">
              <input
                type="checkbox"
                checked={row?.getIsSelected()}
                onChange={row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div> */}
            <p className="font-Open text-sm font-normal leading-5">
              {formatString(serviceName)}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("transit", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit">
            <h1 className="text-base font-Open font-semibold leading-5 ">
              Transit
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];
        return (
          <div className="-mt-[60px] flex flex-col  items-center">
            {tempTransit?.map((data: any, index: number) => {
              if (
                !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
              ) {
                uniqueValue?.push({
                  transit: data?.transit,
                  inputHtml: data?.inputHtml,
                });
              }
            })}
            {uniqueValue?.map((el: any, i: number) => {
              if (el?.transit === "FORWARD") {
                return (
                  <>
                    <div className="font-Open font-normal text-sm mt-14 text-center">
                      {capitalizeFirstLetter(el?.transit)}
                      <hr className="mt-2 w-[150px]" />
                    </div>
                    <div>{el?.inputHtml}</div>
                  </>
                );
              }
            })}
            {/* {uniqueValue?.length > 1 && <hr className={`h-[3px]`} />} */}
            {uniqueValue?.map((el: any, i: number) => {
              if (el?.transit === "RETURN") {
                return (
                  <>
                    <div className="font-Open font-normal text-sm  mt-2">
                      {capitalizeFirstLetter(el?.transit)}
                    </div>
                    {/* <div>{el?.inputHtml}</div> */}
                  </>
                );
              }
            })}
            {/* {uniqueValue?.length > 2 && <hr className={`h-[3px]`} />} */}
            {uniqueValue?.map((el: any, i: number) => {
              if (el?.transit === "REVERSE") {
                return (
                  <>
                    <div>{el?.transit}</div>
                    {/* <div>{el?.inputHtml}</div> */}
                  </>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("weightSlab", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit">
            <h1 className="text-base font-Open font-semibold leading-5 ">
              Weight Range Slab (Kgs)
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD"
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.from}
                          defaultValue={data?.from || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      To{" "}
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.to}
                          defaultValue={data?.to || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN"
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.from}
                          defaultValue={data?.from || ""}
                          style={{ background: "#F3F3F3" }}
                        />
                      </div>
                      To{" "}
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.to}
                          defaultValue={data?.to || ""}
                          style={{ background: "#F3F3F3" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE"
              ) {
                return (
                  <div className="leading-10 ">
                    <div className="flex gap-2">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.from}
                          defaultValue={data?.from || ""}
                          style={{ background: "#F3F3F3" }}
                        />
                      </div>
                      To{" "}
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data?.to}
                          defaultValue={data?.to || ""}
                          style={{ background: "#F3F3F3" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("incrementalWeight", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit">
            <h1 className="text-base font-Open font-semibold leading-5 ">
              Incremental Chargeable Weight (Kgs)
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD"
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5 justify-center text-center itmes-center">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          id={`incremental${index}`}
                          // value={data?.weight}
                          defaultValue={data?.weight || ""}
                          style={{
                            color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN"
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5 justify-center text-center itmes-center">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          id={`incremental${index}`}
                          // value={data?.weight}
                          defaultValue={data?.weight || ""}
                          style={{
                            color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE"
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5 justify-center items-center itmes-center">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          id={`incremental${index}`}
                          // value={data?.weight}
                          defaultValue={data?.weight || ""}
                          style={{
                            color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone1", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit">
            <h1 className="font-semibold font-Open text-base leading-5">
              Zone 1
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD" &&
                data["ZONE 1"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.base}
                          defaultValue={data["ZONE 1"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.add}
                          defaultValue={data["ZONE 1"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN" &&
                data["ZONE 1"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.base}
                          defaultValue={data["ZONE 1"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.add}
                          defaultValue={data["ZONE 1"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE" &&
                data["ZONE 1"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.base}
                          defaultValue={data["ZONE 1"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 1"]?.add}
                          defaultValue={data["ZONE 1"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone2", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit ">
            <h1 className="font-semibold font-Open text-base leading-5">
              Zone 2
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD" &&
                data["ZONE 2"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C]  ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.base}
                          defaultValue={data["ZONE 2"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.add}
                          defaultValue={data["ZONE 2"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN" &&
                data["ZONE 2"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.base}
                          defaultValue={data["ZONE 2"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.add}
                          defaultValue={data["ZONE 2"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE" &&
                data["ZONE 2"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.base}
                          defaultValue={data["ZONE 2"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 2"]?.add}
                          defaultValue={data["ZONE 2"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone3", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit ">
            <h1 className="text-base font-semibold font-Open leading-5">
              Zone 3
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD" &&
                data["ZONE 3"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C]  ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.base}
                          defaultValue={data["ZONE 3"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.add}
                          defaultValue={data["ZONE 3"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN" &&
                data["ZONE 3"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.base}
                          defaultValue={data["ZONE 3"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.add}
                          defaultValue={data["ZONE 3"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE" &&
                data["ZONE 3"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.base}
                          defaultValue={data["ZONE 3"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 3"]?.add}
                          defaultValue={data["ZONE 3"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone4", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit ">
            <h1 className="text-base font-semibold font-Open leading-5">
              Zone 4
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD" &&
                data["ZONE 4"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.base}
                          defaultValue={data["ZONE 4"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.add}
                          defaultValue={data["ZONE 4"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN" &&
                data["ZONE 4"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.base}
                          defaultValue={data["ZONE 4"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.add}
                          defaultValue={data["ZONE 4"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE" &&
                data["ZONE 4"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.base}
                          defaultValue={data["ZONE 4"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 4"]?.add}
                          defaultValue={data["ZONE 4"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone5", {
      header: () => {
        return (
          <div className="flex justify-center items-center text-center min-w-fit ">
            <h1 className="text-base font-semibold font-Open leading-5">
              Zone 5
            </h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let tempOriginal = row?.original;
        let tempTransit = row?.original?.weightSlab;
        let uniqueValue: any = [];

        tempTransit?.map((data: any, index: number) => {
          if (
            !uniqueValue?.some((obj: any) => obj?.transit === data?.transit)
          ) {
            uniqueValue?.push({
              transit: data?.transit,
              inputHtml: data?.inputHtml,
            });
          }
        });

        return (
          <div>
            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "FORWARD" &&
                data["ZONE 5"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.base}
                          defaultValue={data["ZONE 5"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.add}
                          defaultValue={data["ZONE 5"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length > 1 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "RETURN" &&
                data["ZONE 5"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.base}
                          defaultValue={data["ZONE 5"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.add}
                          defaultValue={data["ZONE 5"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
            {uniqueValue?.length >= 3 && <hr className="h-[12px] mt-2" />}

            {tempOriginal?.weightSlab?.map((data: any, index: number) => {
              if (
                data?.hasOwnProperty("transit") &&
                data?.transit === "REVERSE" &&
                data["ZONE 5"]
              ) {
                return (
                  <div className="leading-10">
                    <div className="flex gap-2 pr-5">
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.base}
                          defaultValue={data["ZONE 5"]?.base || ""}
                          style={{ background: "#F3F3F3" }}
                          readOnly
                        />
                      </div>
                      <div>
                        <span className="border-[1px] border-[#000000]"></span>
                      </div>
                      <div>
                        <input
                          className={`h-[30px] w-[50px] p-[11px] cursor-not-allowed border-none font-Open text-sm font-normal leading-5 text-[#1C1C1C] ${tempOriginal?.partnerServiceId}_editSingleRow`}
                          type="text"
                          // value={data["ZONE 5"]?.add}
                          defaultValue={data["ZONE 5"]?.add || ""}
                          style={{
                            // color: "#004EFF",
                            background: "#F3F3F3",
                          }}
                          readOnly
                        />
                      </div>
                      <img src={UpArrowIcon} alt="" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    }),
  ];

  return <CustomTable data={activeServiceInfo || []} columns={columns} />;
};

export default RateCardTable;
