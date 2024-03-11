import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import CustomCenterModal from "../../components/CustomModal/customCenterModal";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomInputWithImage from "../../components/InputWithImage/InputWithImage";
import CustomButton from "../../components/Button";
import { POST } from "../../utils/webService";
import BottomLayout from "../../components/Layout/bottomLayout";
import addIcon from "../../assets/Catalogue/add.svg";
import CrossIcon from "../../assets/PickUp/ModalCrossWeb.svg";
import CustomDropDown from "../../components/DropDown";
import CustomInputBox from "../../components/Input";

const Rules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [ruleTitleValue, setRuleTitleValue] = useState("");
  const [applicableOrderValue, setApplicableOrderValue] = useState("");
  const [ruleName, setRuleName] = useState(["applicable_orders"]);

  let initialRuleEngine = [
    {
      ruleId: "12345678",
      ruleName: "invoice_value",
      from: 1,
      to: 5,
      type: "greater",
      sortBy: "cheapest",
      priority: [
        {
          partnerName: "DTDC",
          serviceName: "Air",
        },
        {
          partnerName: "Bludart",
          serviceName: "Air",
        },
        {
          partnerName: "ExpressBess",
          serviceName: "Air",
        },
        {
          partnerName: "Ecom",
          serviceName: "Air",
        },
      ],
    },
    {
      ruleId: "12345678",
      ruleName: "pincode",
      sortBy: "cheapest",
      pincode: ["401105", "40001", "40002"],
      priority: [
        {
          partnerName: "DTDC",
          serviceName: "Air",
        },
        {
          partnerName: "Bludart",
          serviceName: "Air",
        },
        {
          partnerName: "ExpressBess",
          serviceName: "Air",
        },
        {
          partnerName: "Ecom",
          serviceName: "Air",
        },
      ],
    },
    {
      ruleId: "12345678",
      ruleName: "product_category",
      sortBy: "cheapest",
      category: ["fashion", "gift", "electronics"],
      priority: [
        {
          partnerName: "DTDC",
          serviceName: "Air",
        },
        {
          partnerName: "Bludart",
          serviceName: "Air",
        },
        {
          partnerName: "ExpressBess",
          serviceName: "Air",
        },
        {
          partnerName: "Ecom",
          serviceName: "Air",
        },
      ],
    },
    {
      ruleId: "12345678",
      ruleName: "payment_mode",
      sortBy: "cheapest",
      mode: "COD",
      priority: [
        {
          partnerName: "DTDC",
          serviceName: "Air",
        },
        {
          partnerName: "Bludart",
          serviceName: "Air",
        },
        {
          partnerName: "ExpressBess",
          serviceName: "Air",
        },
        {
          partnerName: "Ecom",
          serviceName: "Air",
        },
      ],
    },
    {
      ruleId: "12345678",
      ruleName: "weight_range",
      sortBy: "cheapest",
      from: 1,
      to: 5,
      type: "greater",
      priority: [
        {
          partnerName: "DTDC",
          serviceName: "Air",
        },
        {
          partnerName: "Bludart",
          serviceName: "Air",
        },
        {
          partnerName: "ExpressBess",
          serviceName: "Air",
        },
        {
          partnerName: "Ecom",
          serviceName: "Air",
        },
      ],
    },
    {
      ruleId: "12345678",
      ruleName: "applicable_orders",
      sortBy: "cheapest",
    },
  ];

  const ruleTitle = [
    {
      value: "invoice_value",
      label: "Invoice Value",
    },
    {
      value: "pin_code",
      label: "Pin Code",
    },
    {
      value: "shipment_type",
      label: "Shipment Type",
    },
    {
      value: "product_category",
      label: "Product Category",
    },
    {
      value: "payment_mode",
      label: "Payment Mode",
    },
    {
      value: "weight_range",
      label: "Weight Range",
    },
    // {
    //   value: "applicable_order",
    //   label: "Applicable To All Order",
    // },
  ];

  const sortBy = [
    {
      label: "Cheapest",
      value: "Cheapest",
    },
    {
      label: "Highest",
      value: "Highest",
    },
  ];

  const condition = [
    {
      label: "Greater Than",
      value: "greater",
    },
    {
      label: "Less Than",
      value: "less",
    },
    {
      label: "Between",
      value: "between",
    },
  ];

  const partnerName = [
    {
      label: "DTDC",
      value: "DTDC",
    },
    {
      label: "Bluedart",
      value: "Bluedart",
    },
    {
      label: "Ecom",
      value: "Ecom",
    },
  ];

  const serviceName = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Air",
      value: "Air",
    },
    {
      label: "Surface",
      value: "Surface",
    },
  ];

  const renderHeaderComponent = () => {
    return (
      <CustomButton
        icon={addIcon}
        showIcon={true}
        text={"ADD RULE"}
        className="!p-3 "
        onClick={() => setModalOpen(true)}
      />
    );
  };

  const confirmHandler = (value: any) => {
    setModalOpen(false);
    setRuleTitleValue("");
    let newRuleName = value;
    setRuleName((prevArray: any) => [...prevArray, newRuleName]);
  };

  const priorityLoop = () => {
    return (
      <div className="mt-5 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div>
              <h1 className="text-[16px] font-Open font-semibold">
                Priority {i}
              </h1>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                {partnerName?.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                {serviceName?.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    );
  };

  console.log("ruleName", ruleName);

  const changeHandler = (
    ruleName: any,
    fieldName: any,
    actualValue: any,
    index: number
  ) => {
    console.log(
      "initState",
      initialRuleEngine,
      ruleName,
      fieldName,
      actualValue,
      index
    );
    for (let i = 0; i < initialRuleEngine?.length; i++) {
      if (initialRuleEngine[i]?.ruleName === ruleName) {
        if (fieldName === "from") {
          initialRuleEngine[i].from = Number(actualValue);
        } else if (fieldName === "to") {
          initialRuleEngine[i].to = Number(actualValue);
        } else if (fieldName === "sort") {
          initialRuleEngine[i].sortBy = actualValue;
        } else if (fieldName === "condition") {
          initialRuleEngine[i].type = actualValue;
        }
      }
    }
    console.log("final Output", initialRuleEngine);
  };

  return (
    <>
      <div>
        <Breadcrum label="Rules" component={renderHeaderComponent()} />

        {ruleName?.length > 0 &&
          ruleName?.map((el: any, i: number) => {
            if (el === "applicable_orders") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. Applicable To All Orders
                  </h1>
                  <div className="mt-5">
                    <CustomDropDown
                      value={applicableOrderValue}
                      options={sortBy?.map((order: any) => ({
                        label: order.label,
                        value: order.value,
                      }))}
                      onChange={(e: any) =>
                        setApplicableOrderValue(e.target.value)
                      }
                      selectClassName="rounded-md bg-[#FEFEFE] !w-[372px]"
                      //   heading="Select Role"
                    />
                  </div>
                </div>
              );
            } else if (el === "invoice_value") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. Invoice Value
                  </h1>
                  <div className="mt-5">
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-[18px] font-Open text-[#323232]">
                          Invoice Value
                        </h1>
                      </div>
                      <div className="!w-[115px] !h-[48px]">
                        <CustomInputBox
                          label="From"
                          className="text-[12px] font-Open font-semibold"
                          defaultValue=""
                          onChange={(e: any) =>
                            changeHandler(
                              "invoice_value",
                              "from",
                              e.target.value,
                              i
                            )
                          }
                        />
                      </div>
                      <div className="!w-[140px] !h-[48px]">
                        <select
                          onChange={(e: any) =>
                            changeHandler(
                              "invoice_value",
                              "condition",
                              e.target.value,
                              i
                            )
                          }
                          className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                        >
                          {condition?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="!w-[115px] !h-[48px]">
                        <CustomInputBox
                          className="text-[12px] font-Open font-semibold"
                          label="To"
                          defaultValue={""}
                          onChange={(e: any) =>
                            changeHandler(
                              "invoice_value",
                              "to",
                              e.target.value,
                              i
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <div>Sort By</div>
                      <div className="!w-[115px] flex !h-[48px]">
                        <select
                          onChange={(e: any) =>
                            changeHandler(
                              "invoice_value",
                              "sort",
                              e.target.value,
                              i
                            )
                          }
                          className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                        >
                          {sortBy?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {priorityLoop()}
                  </div>
                </div>
              );
            } else if (el === "pin_code") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. PIN Code
                  </h1>
                  <div className="mt-5">
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-[18px] font-Open text-[#323232]">
                          PIN Code
                        </h1>
                      </div>

                      <div className="!w-[140px] !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {condition?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <div>Sort By</div>
                      <div className="!w-[115px] flex !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {sortBy?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {priorityLoop()}
                  </div>
                </div>
              );
            } else if (el === "product_category") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. Product Category
                  </h1>
                  <div className="mt-5">
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-[18px] font-Open text-[#323232]">
                          Product Category
                        </h1>
                      </div>

                      <div className="!w-[140px] !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {condition?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <div>Sort By</div>
                      <div className="!w-[115px] flex !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {sortBy?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {priorityLoop()}
                  </div>
                </div>
              );
            } else if (el === "payment_mode") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. Payment Mode
                  </h1>
                  <div className="mt-5">
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-[18px] font-Open text-[#323232]">
                          Payment Mode
                        </h1>
                      </div>

                      <div className="!w-[140px] !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {condition?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <div>Sort By</div>
                      <div className="!w-[115px] flex !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {sortBy?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {priorityLoop()}
                  </div>
                </div>
              );
            } else if (el === "weight_range") {
              return (
                <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
                  <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
                    {i + 1}. Weight Range
                  </h1>
                  <div className="mt-5">
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-[18px] font-Open text-[#323232]">
                          Weight Range
                        </h1>
                      </div>

                      <div className="!w-[140px] !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {condition?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <div>Sort By</div>
                      <div className="!w-[115px] flex !h-[48px]">
                        <select className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]">
                          {sortBy?.map((option: any, i: number) => (
                            <option value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {priorityLoop()}
                  </div>
                </div>
              );
            }
          })}
      </div>

      <CustomCenterModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="!h-[228px] !w-[544.19px] !justify-between !items-stretch"
      >
        <div>
          <div className="flex items-center justify-between  mb-5 mt-5 mx-5 ">
            <div className="flex items-center space-x-2">
              <h4 className="text-[18px] font-Lato font-semibold">
                Choose Rule
              </h4>
            </div>
            <img
              src={CrossIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />
          </div>
          <div className="mb-5 mt-5 mx-5 flex gap-2">
            <p className="text-[14px] w-[156px] font-Open font-semibold">
              Choose the Variable to associate the rule to
            </p>
            <div className="w-[60%]">
              <CustomDropDown
                value={ruleTitleValue}
                options={ruleTitle?.map((rule: any) => ({
                  label: rule.label,
                  value: rule.value,
                }))}
                onChange={(e: any) => setRuleTitleValue(e.target.value)}
                selectClassName="rounded-md bg-[#FEFEFE]"
                heading="Select Role"
              />
            </div>
          </div>
          <div className="flex mx-5 mt-[40px] gap-2">
            <div>
              <CustomButton
                text={"CONFIRM"}
                className="!p-3 !w-[97px] !h-[36px] bg-transparent border-2 border-[#A4A4A4] font-Open text-[14px] font-semibold !text-[#1C1C1C]"
                onClick={() => confirmHandler(ruleTitleValue)}
              />
            </div>
            <div>
              <CustomButton
                text={"CANCEL"}
                className="!p-3 !w-[97px] !h-[36px] font-Open text-[14px] font-semibold"
                onClick={() => setModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </CustomCenterModal>

      <footer className="w-full fixed bottom-0">
        <div className="flex items-center justify-end shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
          <div className="flex">
            <button className="mx-4 flex items-center  font-Open justify-center leading-5 border-[1px] border-[#A4A4A4] rounded py-[8px] text-sm font-semibold text-center bg-[#1C1C1C] text-[#FFFFFF] w-[110px]">
              {" "}
              CONTINUE
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Rules;
