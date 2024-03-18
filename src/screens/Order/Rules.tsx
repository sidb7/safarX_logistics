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
import {
  CREATE_RULE_SERVICE,
  FETCH_ALL_CATEGOROIES,
  FETCH_ALL_PARTNER_WITH_SERVICE,
} from "../../utils/ApiUrls";
import InvoiceRule from "./ruleEngine/invoice";
import PinCode from "./ruleEngine/pinCode";
import ProductCategory from "./ruleEngine/productCategory";
import PaymentMode from "./ruleEngine/paymentMode";
import WeightRange from "./ruleEngine/weightRange";
import ApplicableOrders from "./ruleEngine/applicableOrders";
import { v4 as uuidv4 } from "uuid";

const Rules = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [ruleTitleValue, setRuleTitleValue] = useState("");
  const [ruleName, setRuleName] = useState(["applicable_orders"]);
  const [partnerList, setPartnerList] = useState<any>();
  const [categoriesList, setCategoriesList] = useState<any>();
  const [persistFilterData, setPersistFilterData]: any = useState([]);

  let initialRuleEngine = [
    {
      ruleId: uuidv4(),
      ruleName: "invoice_value",
      from: 0,
      to: 0,
      type: "",
      sortBy: "",
      priority: [
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
      ],
    },
    {
      ruleId: uuidv4(),
      ruleName: "pin_code",
      sortBy: "",
      pincode: [],
      priority: [
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
      ],
    },
    {
      ruleId: uuidv4(),
      ruleName: "product_category",
      sortBy: "",
      category: [],
      priority: [
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
      ],
    },
    {
      ruleId: uuidv4(),
      ruleName: "payment_mode",
      sortBy: "",
      mode: "",
      priority: [
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
      ],
    },
    {
      ruleId: uuidv4(),
      ruleName: "weight_range",
      sortBy: "",
      from: 0,
      to: 0,
      type: "",
      priority: [
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
        {
          partnerName: "",
          serviceName: "",
        },
      ],
    },
    {
      ruleId: uuidv4(),
      ruleName: "applicable_orders",
      sortBy: "",
    },
  ];

  const fetchAllPartner = async () => {
    try {
      const { data: response } = await POST(FETCH_ALL_PARTNER_WITH_SERVICE, {});
      if (response?.success) {
        setPartnerList(response?.data);
      } else {
        toast.error("Somethnig went wrong...");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const { data: response } = await POST(FETCH_ALL_CATEGOROIES, {});
      if (response?.success) {
        setCategoriesList(response?.data);
      } else {
        toast.error("Somethnig went wrong...");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllPartner();
    fetchAllCategory();
  }, []);

  const ruleTitle = [
    {
      value: "invoice_value",
      label: "Invoice Value",
    },
    {
      value: "pin_code",
      label: "Pin Code",
    },
    // {
    //   value: "shipment_type",
    //   label: "Shipment Type",
    // },
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
    setRuleName((prevArray: any) => [newRuleName, ...prevArray]);
  };

  const changeHandler = (
    ruleName: any,
    fieldName: any,
    actualValue: any,
    index: number,
    column?: any
  ) => {
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
        } else if (fieldName === "pin_code") {
          let tempArr: any = [];
          tempArr.push(actualValue);
          initialRuleEngine[i].pincode = tempArr;
        } else if (fieldName === "product_category") {
          let tempArr: any = [];
          tempArr.push(actualValue);
          initialRuleEngine[i].category = tempArr;
        } else if (fieldName === "priority") {
          initialRuleEngine[i].priority?.map((el: any, i: number) => {
            if (column === "partnerCol" && i === index) {
              el.partnerName = actualValue;
            } else if (column === "serviceCol" && i === index) {
              el.serviceName = actualValue;
            }
          });
        }
      }
    }
  };

  const submitHandler = async () => {
    let finalRuleEngine: any = [];
    initialRuleEngine?.map((el: any, i: number) => {
      if (el?.sortBy != "") {
        el.isActive = true;
        el?.priority?.map((priorities: any, i: number) => {
          if (
            priorities?.partnerName !== "" &&
            priorities?.serviceName !== ""
          ) {
            priorities.isActive = true;
          } else {
            priorities.isActive = false;
          }
        });
        finalRuleEngine.push(el);
      }
    });
    try {
      let payload = {
        ruleEngine: finalRuleEngine,
      };
      const { data: response } = await POST(CREATE_RULE_SERVICE, payload);
      if (response?.status) {
        toast.success(response?.message);
      } else {
        toast.error("Somethnig went wrong...");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div>
        <Breadcrum label="Rules" component={renderHeaderComponent()} />

        {ruleName?.length > 0 &&
          ruleName?.map((el: any, i: number) => {
            if (el === "invoice_value") {
              return (
                <InvoiceRule
                  index={i}
                  partnerList={partnerList}
                  changeHandler={changeHandler}
                />
              );
            } else if (el === "pin_code") {
              return (
                <PinCode
                  index={i}
                  partnerList={partnerList}
                  changeHandler={changeHandler}
                  setPersistFilterData={setPersistFilterData}
                  persistFilterData={persistFilterData}
                />
              );
            } else if (el === "product_category") {
              return (
                <ProductCategory
                  index={i}
                  partnerList={partnerList}
                  categoriesList={categoriesList}
                  changeHandler={changeHandler}
                />
              );
            } else if (el === "payment_mode") {
              return (
                <PaymentMode
                  index={i}
                  partnerList={partnerList}
                  changeHandler={changeHandler}
                />
              );
            } else if (el === "weight_range") {
              return (
                <WeightRange
                  index={i}
                  partnerList={partnerList}
                  changeHandler={changeHandler}
                />
              );
            } else if (el === "applicable_orders") {
              return (
                <ApplicableOrders
                  index={i}
                  partnerList={partnerList}
                  changeHandler={changeHandler}
                />
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
        <div
          className="flex items-center justify-end shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]"
          onClick={() => submitHandler()}
        >
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
