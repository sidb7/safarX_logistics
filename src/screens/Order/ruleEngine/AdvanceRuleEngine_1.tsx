import { useReducer, useState, useRef, useEffect } from "react";
import CustomInputBox from "../../../components/Input";
import CustomDropDown from "../../../components/DropDown";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import AddIcon from "../../../assets/Product/Button.svg";
import { POST } from "../../../utils/webService";
import {
  CREATE_UPDATE_ADVANCE_RULE_ENGINE,
  FETCH_ADVANCE_RULE_ENGINE,
  GET_PLANS_PREVIEW,
} from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { Spinner } from "../../../components/Spinner";

const triggerEvents = [
  { value: "B2C Order Creation", label: "B2C Order Creation" },
  // { value: "B2B Order Creation", label: "B2B Order Creation" },
  // { value: "Hyperlocal Order Creation", label: "Hyperlocal Order Creation" },
  // {
  //   value: "International Order Creation",
  //   label: "International Order Creation",
  // },
];

const gateFields = [
  { value: "OR", label: "OR" },
  { value: "AND", label: "AND" },
];

const conditionFields = [
  { value: "paymentMode", label: "Payment Mode" },
  { value: "appliedWeight", label: "Applied Weight" },
];

const conditionOperators = [
  // { value: "contains", label: "Contains" },
  // { value: "startsWith", label: "Starts With" },
  // { value: "endsWith", label: "Ends With" },
  { value: "=", label: "Is Equal To" },
  { value: "!=", label: "Is Not Equal To" },
  { value: ">", label: "Is Greater Than" },
  { value: "<", label: "Is Less Than" },
];

let actionOptions: any = [];

const paymentOptions = [
  { value: "COD", label: "COD" },
  { value: "PREPAID", label: "PREPAID" },
];

const initialState = {
  ruleEngines: [
    {
      ruleName: "",
      triggerEvent: null,
      conditions: [{ field: null, operator: null, value: "" }],
      actions: [{ courierService: null, priority: "" }],
    },
  ],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return {
        ...state,
        ruleEngines: action.ruleEngines,
      };
    case "MOVE_RULE_ENGINE":
      return {
        ...state,
        ruleEngines: action.ruleEngines,
      };
    case "ADD_RULE_ENGINE":
      return {
        ...state,
        ruleEngines: [
          ...state.ruleEngines,
          {
            ruleName: "",
            triggerEvent: null,
            conditions: [{ field: null, operator: null, value: "" }],
            actions: [{ courierService: null, priority: "" }],
          },
        ],
      };
    case "REMOVE_RULE_ENGINE":
      return {
        ...state,
        ruleEngines: state.ruleEngines.filter(
          (_: any, idx: any) => idx !== action.index
        ),
      };
    // case "SET_RULE_ENGINE_FIELD":
    //   const updatedRuleEngines = [...state.ruleEngines];
    //   updatedRuleEngines[action.engineIndex] = {
    //     ...updatedRuleEngines[action.engineIndex],
    //     [action.field]: action.value,
    //   };
    // return { ...state, ruleEngines: updatedRuleEngines };

    case "SET_RULE_ENGINE_FIELD":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? { ...engine, [action.field]: action.value }
            : engine
        ),
      };
    // case "ADD_CONDITION":
    //   const updatedConditions = [...state.ruleEngines];
    //   updatedConditions[action.engineIndex].conditions.push({
    //     field: null,
    //     operator: null,
    //     value: "",
    //   });
    //   return { ...state, ruleEngines: updatedConditions };

    case "ADD_CONDITION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? {
                ...engine,
                conditions: [
                  ...engine.conditions,
                  { field: "", operator: "", value: "" },
                ],
              }
            : engine
        ),
      };

    // case "REMOVE_CONDITION":
    //   const updatedConditionsRemoved = [...state.ruleEngines];
    //   updatedConditionsRemoved[action.engineIndex].conditions =
    //     updatedConditionsRemoved[action.engineIndex].conditions.filter(
    //       (_: any, idx: any) => idx !== action.index
    //     );
    //   return { ...state, ruleEngines: updatedConditionsRemoved };

    case "REMOVE_CONDITION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? {
                ...engine,
                conditions: engine.conditions.filter(
                  (condition: any, condIndex: number) =>
                    condIndex !== action.index
                ),
              }
            : engine
        ),
      };

    // case "SET_CONDITION":
    //   const updatedConditionsSet = [...state.ruleEngines];
    //   updatedConditionsSet[action.engineIndex].conditions[action.index] =
    //     action.condition;
    //   return { ...state, ruleEngines: updatedConditionsSet };

    case "SET_CONDITION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? action?.key === "field"
              ? {
                  ...engine,
                  conditions: engine?.conditions?.map(
                    (condition: any, condIndex: number) =>
                      condIndex === action.index
                        ? { ...condition, ...action.condition, value: null }
                        : condition
                  ),
                }
              : {
                  ...engine,
                  conditions: engine?.conditions?.map(
                    (condition: any, condIndex: number) =>
                      condIndex === action.index
                        ? { ...condition, ...action.condition }
                        : condition
                  ),
                }
            : engine
        ),
      };

    // case "ADD_ACTION":
    //   const updatedActions = [...state.ruleEngines];
    //   updatedActions[action.engineIndex].actions.push({
    //     courierService: null,
    //     priority: "",
    //   });
    //   return { ...state, ruleEngines: updatedActions };

    case "ADD_ACTION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? {
                ...engine,
                actions: [
                  ...engine.actions,
                  { courierService: "", priority: "" },
                ],
              }
            : engine
        ),
      };

    // case "REMOVE_ACTION":
    //   const updatedActionsRemoved = [...state.ruleEngines];
    //   updatedActionsRemoved[action.engineIndex].actions = updatedActionsRemoved[
    //     action.engineIndex
    //   ].actions.filter((_: any, idx: any) => idx !== action.index);
    //   return { ...state, ruleEngines: updatedActionsRemoved };

    case "REMOVE_ACTION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? {
                ...engine,
                actions: engine.actions.filter(
                  (actionItem: any, actionIndex: number) =>
                    actionIndex !== action.index
                ),
              }
            : engine
        ),
      };

    // case "SET_ACTION":
    //   const updatedActionsSet = [...state.ruleEngines];
    //   updatedActionsSet[action.engineIndex].actions[action.index] =
    //     action.action;
    //   return { ...state, ruleEngines: updatedActionsSet };

    case "SET_ACTION":
      return {
        ...state,
        ruleEngines: state?.ruleEngines?.map((engine: any, index: number) =>
          index === action.engineIndex
            ? {
                ...engine,
                actions: engine?.actions?.map(
                  (actionItem: any, actionIndex: number) =>
                    actionIndex === action.index
                      ? { ...actionItem, ...action.action }
                      : actionItem
                ),
              }
            : engine
        ),
      };

    default:
      return state;
  }
};

const AdvanceRuleEngine_1 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [draggedItemIndex, setDraggedItemIndex]: any = useState(null);
  const draggedItemRef = useRef<number | null>(null);
  const [allPartnersWithService, setAllPartnersWithService]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
    draggedItemRef.current = index;
  };

  const handleDragEnd = async () => {
    setDraggedItemIndex(null);
    draggedItemRef.current = null;
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const draggedIndex = draggedItemRef.current;
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...state.ruleEngines];
    [newItems[draggedIndex], newItems[index]] = [
      newItems[index],
      newItems[draggedIndex],
    ];
    dispatch({ type: "MOVE_RULE_ENGINE", ruleEngines: newItems });
    setDraggedItemIndex(index);
    draggedItemRef.current = index;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let readyToPush = true;
    // console.log("Form values:", JSON.stringify(state, null, 2));

    for (let i = 0; i < state?.ruleEngines?.length; i++) {
      if (
        !state?.ruleEngines?.[i]?.ruleName ||
        !state?.ruleEngines?.[i]?.triggerEvent
      ) {
        readyToPush = false;
        toast.error(`Please Fill All Fields In Rule ${i + 1}`);
        continue;
      }

      if (
        !state?.ruleEngines?.[i]?.gate ||
        !state?.ruleEngines?.[i]?.hasOwnProperty("gate")
      ) {
        readyToPush = false;
        toast.error(`Please Select Proper Gate In Rule ${i + 1}`);
        continue;
      }

      for (let elem of state?.ruleEngines?.[i]?.conditions) {
        if (!elem?.field || !elem?.operator || !elem?.value) {
          readyToPush = false;
          toast.error(`Please Fill All Fields In Rule ${i + 1}`);
          // continue;
          break;
        }
        if (
          elem?.field === "paymentMode" &&
          elem?.value != "COD" &&
          elem?.value != "PREPAID"
        ) {
          readyToPush = false;
          toast.error(`Please Select Correct Payment Mode In Rule ${i + 1}`);
          break; // continue;
        }
        if (
          elem?.field === "appliedWeight" &&
          (elem?.value == "COD" || elem?.value == "PREPAID")
        ) {
          readyToPush = false;
          toast.error(`Please Select Correct Payment Mode In Rule ${i + 1}`);
          break; // continue;
        }
      }

      for (let elem of state?.ruleEngines?.[i]?.actions) {
        if (!elem?.courierService) {
          readyToPush = false;
          toast.error(`Please Fill All Fields In Rule ${i + 1}`);
          // continue;
          break;
        }
      }
    }
    if (readyToPush) {
      setIsLoading(true);
      try {
        const createRuleEngine = await POST(CREATE_UPDATE_ADVANCE_RULE_ENGINE, {
          ruleEngine: state?.ruleEngines,
        });
        if (createRuleEngine?.data?.success) {
          toast.success("Rule Engine Created Successfully");
        } else {
          toast.error(
            createRuleEngine?.data?.message || "Failed to create Rule Engine"
          );
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to create Rule Engine");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const getAllPartnersWithService = await POST(GET_PLANS_PREVIEW, {});
      const advanceRuleEngine = await POST(FETCH_ADVANCE_RULE_ENGINE, {});

      if (advanceRuleEngine?.data?.success) {
        dispatch({
          type: "SET_INITIAL_STATE",
          ruleEngines: advanceRuleEngine?.data?.data?.[0]?.ruleEngine,
        });
      }

      const rateCard =
        getAllPartnersWithService?.data?.data?.[0]?.rateCards?.filter(
          (item: any) =>
            item.data.accountType === "B2C" &&
            item.data.isActive &&
            item.type === "LOGISTIC"
        )[0];

      let partnerService = rateCard?.data?.rates
        ?.map((item: any) =>
          item?.service
            ?.map((innerItem: any) =>
              innerItem.isActive
                ? {
                    label: `${item?.partnerName} ${innerItem?.partnerServiceName}`,
                    value: `${item?.partnerName} ${innerItem?.partnerServiceName}`,
                  }
                : undefined
            )
            .filter(Boolean)
        )
        .flat();
      actionOptions = [...partnerService];

      setAllPartnersWithService(partnerService);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center px-5 py-[10px] text-sm font-semibold h-[50vh] ">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-[1rem] border-2 rounded-md"
          // className="mt-4 flex p-[1rem] flex-wrap gap-x-8 border-2 rounded-md"
          style={{ width: "fit-content" }}
        >
          <div className="flex justify-end mb-4">
            <button
              type="submit"
              className="px-4 py-2 border-2 text-white bg-black rounded-md"
            >
              Create Rule Engine
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            {state?.ruleEngines?.map((ruleEngine: any, engineIndex: any) => (
              <div
                key={engineIndex}
                draggable
                onDragStart={() => handleDragStart(engineIndex)}
                onDragEnd={handleDragEnd}
                onDragOver={(event) => handleDragOver(event, engineIndex)}
                className={`draggable mb-8 border-2 p-[1rem] pt-1 rounded-md shadow-lg cursor-move ${
                  draggedItemIndex === engineIndex ? "dragging" : ""
                }`}
              >
                <div className="flex justify-between mb-2">
                  <div
                    // style={{ transform: "rotate(-30deg)" }}
                    className="text-[blue] text-[2rem] opacity-10  "
                  >
                    <p>#{engineIndex + 1}</p>
                  </div>
                  <div className="flex justify-end">
                    {engineIndex === 0 ? (
                      ""
                    ) : (
                      <img
                        src={DeleteIcon}
                        className="cursor-pointer"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_RULE_ENGINE",
                            index: engineIndex,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-x-3 w-[100%] mb-2">
                  <div className="w-[50%]">
                    <CustomInputBox
                      label="Rule Name"
                      name="ruleName"
                      value={ruleEngine.ruleName}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_RULE_ENGINE_FIELD",
                          field: "ruleName",
                          value: e.target.value,
                          engineIndex,
                        })
                      }
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-[30%]">
                    <CustomDropDown
                      onChange={(option) =>
                        dispatch({
                          type: "SET_RULE_ENGINE_FIELD",
                          field: "triggerEvent",
                          value: option?.target?.value,
                          engineIndex,
                        })
                      }
                      value={ruleEngine?.triggerEvent || ""}
                      options={triggerEvents}
                      heading="Trigger Event"
                    />
                  </div>
                  <div className="w-[10%]">
                    <CustomDropDown
                      onChange={(option) =>
                        dispatch({
                          type: "SET_RULE_ENGINE_FIELD",
                          field: "gate",
                          value: option?.target?.value,
                          engineIndex,
                        })
                      }
                      value={ruleEngine?.gate || ""}
                      options={gateFields}
                      heading="Gate"
                    />
                  </div>
                </div>
                <div className="mb-2 w-[100%]">
                  <h4 className="text-lg mb-2 font-medium">Conditions:</h4>
                  <div className="space-y-4">
                    {ruleEngine?.conditions?.map(
                      (condition: any, index: any) => (
                        <div
                          key={`${engineIndex}-${index}-01`}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4"
                        >
                          <div>
                            <CustomDropDown
                              onChange={(option) =>
                                dispatch({
                                  type: "SET_CONDITION",
                                  index,
                                  condition: {
                                    ...condition,
                                    field: option?.target?.value,
                                  },
                                  engineIndex,
                                  key: "field",
                                })
                              }
                              value={condition?.field || ""}
                              options={conditionFields}
                              heading="Select Field"
                            />
                          </div>
                          <div>
                            <CustomDropDown
                              onChange={(option) =>
                                dispatch({
                                  type: "SET_CONDITION",
                                  index,
                                  condition: {
                                    ...condition,
                                    operator: option?.target?.value,
                                  },
                                  engineIndex,
                                })
                              }
                              value={condition?.operator || ""}
                              options={
                                condition?.field === "paymentMode"
                                  ? [
                                      { value: "=", label: "Is Equal To" },
                                      { value: "!=", label: "Is Not Equal To" },
                                    ]
                                  : conditionOperators
                              }
                              heading="Select Operator"
                            />
                          </div>
                          <div>
                            {state?.ruleEngines?.[engineIndex]?.conditions?.[
                              index
                            ]?.field === "paymentMode" ? (
                              <CustomDropDown
                                onChange={(option) => {
                                  dispatch({
                                    type: "SET_CONDITION",
                                    index,
                                    condition: {
                                      ...condition,
                                      value: option?.target?.value,
                                    },
                                    engineIndex,
                                  });
                                }}
                                value={
                                  state?.ruleEngines?.[engineIndex]
                                    ?.conditions?.[index]?.value || ""
                                }
                                options={paymentOptions}
                                // heading={
                                //   state?.ruleEngines?.[engineIndex]?.conditions?.[
                                //     index
                                //   ]?.value
                                //     ? state?.ruleEngines?.[engineIndex]?.conditions?.[
                                //         index
                                //       ]?.value
                                //     : "Select Payment Mode"
                                // }
                                heading="Select Payment Mode"
                              />
                            ) : (
                              <CustomInputBox
                                label="Value"
                                name={`conditions.${index}.value`}
                                value={condition.value}
                                onChange={(e) => {
                                  // let regex = /[^0-9]+\\.?[0-9]*/;
                                  // const regex = /^-?\d+(\.\d+)?$/;
                                  const regex = /^\d*\.?\d*$/;

                                  if (
                                    regex.test(e?.target?.value) ||
                                    e?.target?.value === ""
                                  ) {
                                    dispatch({
                                      type: "SET_CONDITION",
                                      index,
                                      condition: {
                                        ...condition,
                                        value: e.target.value,
                                      },
                                      engineIndex,
                                    });
                                  }
                                }}
                                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            )}
                          </div>
                          <div className="flex items-center">
                            <img
                              src={DeleteIcon}
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_CONDITION",
                                  index,
                                  engineIndex,
                                })
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div
                      style={{ width: "fit-content" }}
                      className="flex cursor-pointer items-center border-2 px-[0.4rem] py-[0.3rem] border-gray-300 rounded-md gap-x-1"
                      onClick={() =>
                        dispatch({
                          type: "ADD_CONDITION",
                          engineIndex,
                        })
                      }
                    >
                      <img src={AddIcon} className="w-[14px]" />
                      <span className="text-[#004EFF] text-[14px]">
                        Add Condition
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 w-[100%]">
                  <h4 className="text-lg mb-2 font-medium">Actions:</h4>
                  <div className="space-y-4 ">
                    {ruleEngine?.actions?.map((action: any, index: any) => (
                      <div
                        key={`${engineIndex}-${index}-02`}
                        className="flex w-[100%] items-center gap-4"
                      >
                        <div className="w-[30%]">
                          <CustomDropDown
                            onChange={(option) =>
                              dispatch({
                                type: "SET_ACTION",
                                index,
                                action: {
                                  ...action,
                                  courierService: option?.target?.value,
                                },
                                engineIndex,
                              })
                            }
                            value={action?.courierService || ""}
                            options={actionOptions}
                            heading="Select Courier Service"
                          />
                        </div>
                        <div className="w-[10%]">
                          <CustomInputBox
                            isDisabled={true}
                            label="Priority"
                            name={`actions.${index}.priority`}
                            value={index + 1}
                            onChange={(e) =>
                              dispatch({
                                type: "SET_ACTION",
                                index,
                                action: { ...action, priority: e.target.value },
                                engineIndex,
                              })
                            }
                            className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <img
                            src={DeleteIcon}
                            className="cursor-pointer"
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_ACTION",
                                index,
                                engineIndex,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      style={{ width: "fit-content" }}
                      className="flex cursor-pointer items-center border-2 px-[0.4rem] py-[0.3rem] border-gray-300 rounded-md gap-x-1"
                      onClick={() =>
                        dispatch({
                          type: "ADD_ACTION",
                          engineIndex,
                        })
                      }
                    >
                      <img src={AddIcon} className="w-[14px]" />
                      <span className="text-[#004EFF] text-[14px]">
                        Add Action
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{ width: "fit-content" }}
              className="flex cursor-pointer h-[35px] self-center items-center border-2 px-[0.4rem] py-[0.3rem] border-gray-300 rounded-md gap-x-1 mb-4"
              onClick={() => dispatch({ type: "ADD_RULE_ENGINE" })}
            >
              <img src={AddIcon} className="w-[14px]" />
              <span className="text-[#004EFF] text-[14px]">
                Add Rule Engine
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdvanceRuleEngine_1;
