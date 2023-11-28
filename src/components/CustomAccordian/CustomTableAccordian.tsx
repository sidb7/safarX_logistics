import { useEffect, useState } from "react";

interface ICustomTableAccordion {
  data?: any;
}

const Accordion = (props: ICustomTableAccordion) => {
  const { data } = props;
  const [openIndex, setOpenIndex] = useState(null);

  const entries: any = document?.getElementsByClassName("entries");

  const entriesHeight = entries?.[0]?.offsetHeight;

  const handleItemClick = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="overflow-auto h-[100%] pb-[2rem]">
      <div className="w-[100%] p-[1rem] items-start overflow-auto">
        {data?.map((item: any, index: any) => {
          return (
            item?.title && (
              <div className="flex flex-col mb-3 cursor-pointer" key={index}>
                <div
                  className={`flex flex-col select-none gap-y-[1rem] justify-between p-3 h-[52px] border-[1px] border-[#E8E8E8] ${
                    openIndex === index
                      ? "bg-[black] text-[white] rounded-tr-lg rounded-tl-lg rounded-b-none "
                      : "bg-[white] text-[black] rounded-lg "
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  {item?.title}
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
                              <div className="grid grid-cols-12" key={key}>
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
                                  <div className="col-span-8 px-[1rem] ">
                                    {value}
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
    </div>
  );
};

export default Accordion;
