import React, { useEffect, useState } from "react";
import UpwardArrow from "../../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../../assets/downwardArrow.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import CustomDropDown from "../../../../components/DropDown";
import { GET_SELLER_BOX } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import CustomInputBox from "../../../../components/Input";
import OneButton from "../../../../components/Button/OneButton";
import { UPDATE_TEMP_ORDER_INFO } from "../../../../utils/ApiUrls";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { error } from "console";

const Box = ({
  completeData,
  index,
  onChildClick,
  updatedData,
  setUpdatedData,
  setPlaceOrderButton,
  enabled,
}: any) => {
  const boxData = completeData?.boxInfo?.[index];
  const packageIndex = index;
  const boxDataArray = completeData?.boxInfo;

  const [boxAccordian, setBoxAccordian] = useState<any>(false);
  const [sellerList, setSellerList] = useState<any>([]);
  const [selectDropDownValue, setDropDownValue] = useState<any>("");
  const [boxDetails, setBoxDetails] = useState<any>({
    name: "",
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
  });
  const [borderError, setBorderError] = useState<any>(false);

  const [customBox, setCustomBox] = useState<any>({
    name: "",
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
  });
  const [errors, setErrors] = useState<any>({});

  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const options = [
    { label: "Customize a Box", value: "custom" },
    ...sellerList?.map((option: any) => ({
      label: option?.name,
      value: option?.boxId,
    })),
  ];

  const handleAddBox = async () => {
    try {
      const { data: response } = await POST(
        UPDATE_TEMP_ORDER_INFO,
        updatedData
      );
      if (response.status) {
        toast.success("Box Added Successfully");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDropDown = (e: any) => {
    setPlaceOrderButton(false);
    const selectedValue = e.target.value;
    setDropDownValue(selectedValue);

    if (selectedValue === "custom") {
      setBoxDetails(customBox);
    } else {
      const filterBox = sellerList.filter(
        (box: any) => box?.boxId === selectedValue
      );

      if (filterBox.length > 0) {
        const selectedBox = filterBox[0];

        setUpdatedData((prevState: any) => ({
          ...prevState,
          boxInfo: prevState.boxInfo.map((item: any, index: number) =>
            index === packageIndex
              ? {
                  ...item,
                  name: selectedBox?.name,
                  boxId: selectedBox?.boxId,
                  length: selectedBox?.length,
                  breadth: selectedBox?.breadth,
                  height: selectedBox?.height,
                  appliedWeight: selectedBox?.appliedWeight,
                  deadWeight: selectedBox?.deadWeight,
                  volumetricWeight: selectedBox?.volumetricWeight,
                }
              : item
          ),
        }));
        setBoxDetails({
          name: selectedBox?.name,
          deadWeight: selectedBox?.deadWeight,
          length: selectedBox?.length,
          breadth: selectedBox?.breadth,
          height: selectedBox?.height,
        });
      } else {
        setBoxDetails({});
      }
    }
  };

  const handleInputChange = (field: any, value: any) => {
    //onchange state update for object
    setBoxDetails((prevBoxDetails: any) => ({
      ...prevBoxDetails,
      [field]: value,
    }));

    // if (selectDropDownValue === "custom") {
    //   setCustomBox((prevCustomBox: any) => ({
    //     ...prevCustomBox,
    //     [field]: value,
    //   }));
    //   setUpdatedData((prevState: any) => ({
    //     ...prevState,
    //     boxInfo: prevState.boxInfo.map((item: any, index: number) =>
    //       index === packageIndex
    //         ? {
    //             ...item,
    //             name: customBox?.name,
    //             boxId: customBox?.boxId,
    //             length: customBox?.length,
    //             breadth: customBox?.breadth,
    //             height: customBox?.height,
    //             appliedWeight: customBox?.appliedWeight,
    //             deadWeight: customBox?.deadWeight,
    //             volumetricWeight: customBox?.volumetricWeight,
    //           }
    //         : item
    //     ),
    //   }));
    // }

    if (selectDropDownValue === "custom") {
      // Update the customBox state
      const newCustomBox = {
        ...customBox,
        [field]: value,
      };

      setCustomBox(newCustomBox);

      // Update the updatedData state
      setUpdatedData((prevState: any) => ({
        ...prevState,
        boxInfo: prevState.boxInfo.map((item: any, index: number) =>
          index === packageIndex
            ? {
                ...item,
                name: newCustomBox.name,
                boxId: uuidv4(),
                length: newCustomBox.length,
                breadth: newCustomBox.breadth,
                height: newCustomBox.height,
                appliedWeight: newCustomBox.appliedWeight,
                deadWeight: newCustomBox.deadWeight,
                volumetricWeight: newCustomBox.volumetricWeight,
              }
            : item
        ),
      }));
    }

    //validations
    let newErrors = { ...errors };

    if (field === "name" && !value) {
      newErrors[field] = "Name is required.";
    } else if (field === "deadWeight" && (value <= 0 || !value)) {
      newErrors[field] = "Dead weight must be greater than 0.";
    } else if (field === "length" && (value <= 0 || !value)) {
      newErrors[field] = "Length must be greater than 0.";
    } else if (field === "breadth" && (value <= 0 || !value)) {
      newErrors[field] = "Breadth must be greater than 0.";
    } else if (field === "height" && (value <= 0 || !value)) {
      newErrors[field] = "Height must be greater than 0.";
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    onChildClick(index, hasErrors);
  };

  //for getting the list of seller box list
  useEffect(() => {
    (async () => {
      boxDataArray?.map((box: any, index: any) => {
        if (
          !box?.name ||
          !box?.deadWeight ||
          box?.deadWeight == 0 ||
          !box?.breadth ||
          box?.breadth == 0 ||
          !box?.length ||
          box?.length == 0 ||
          !box?.height ||
          box?.height == 0
        ) {
          setBorderError(true);
        }
      });
      try {
        const { data: response } = await POST(GET_SELLER_BOX);
        setSellerList(response?.data);

        setBoxDetails({
          ...boxDetails,
          name: boxData?.name,
          deadWeight: boxData?.deadWeight,
          length: boxData?.length,
          breadth: boxData?.breadth,
          height: boxData?.height,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <div
        className={`border ${
          borderError || Object.values(errors).some((error) => error)
            ? "border-[red]"
            : "border-[#E8E8E8]"
        }  rounded-lg bg-gray-50`}
      >
        <div
          className="px-4 py-2 flex justify-between"
          onClick={() => setBoxAccordian(!boxAccordian)}
        >
          <div className="flex items-center">
            <img src={ItemIcon} alt="" />
            <p className="ml-4">Box</p>
          </div>

          <img src={boxAccordian ? UpwardArrow : DownwardArrow} alt="" />
        </div>
      </div>
      {boxAccordian && (
        <div className="p-4 border-b border-l border-r border-[#E8E8E8]">
          {enabled && (
            <CustomDropDown
              heading="Select A Box"
              options={options}
              onChange={(e: any) => handleDropDown(e)}
            />
          )}

          <div className="flex flex-col gap-y-2 border border-[#E8E8E8] py-4 rounded-md mt-4">
            <div className="px-4">
              <CustomInputBox
                label="Box Name"
                value={boxDetails?.name}
                onChange={(e: any) => handleInputChange("name", e.target.value)}
                isDisabled={selectDropDownValue !== "custom"}
              />
              <p className="text-red-500 text-sm">{errors?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-3 px-4">
              <div>
                <CustomInputBox
                  label="Dead weight"
                  value={boxDetails?.deadWeight}
                  inputType={"number"}
                  onChange={(e: any) =>
                    handleInputChange("deadWeight", e.target.value)
                  }
                  isDisabled={selectDropDownValue !== "custom"}
                />
                <p className="text-red-500 text-sm">{errors?.deadWeight}</p>
              </div>

              <div>
                <CustomInputBox
                  label="Volumetric weight"
                  value={(
                    (boxDetails?.length *
                      boxDetails?.breadth *
                      boxDetails?.height) /
                    5000
                  ).toFixed(2)}
                  isDisabled={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 px-4">
              <div>
                <CustomDropDown
                  options={measureUnits}
                  onChange={function (
                    event: React.ChangeEvent<HTMLSelectElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <CustomInputBox
                    label="l"
                    value={boxDetails?.length}
                    inputType={"number"}
                    onChange={(e) =>
                      handleInputChange("length", e.target.value)
                    }
                    isDisabled={selectDropDownValue !== "custom"}
                  />
                  <p className="text-red-500 text-sm">{errors?.length}</p>
                </div>
                <div>
                  <CustomInputBox
                    label="b"
                    value={boxDetails?.breadth}
                    inputType={"number"}
                    onChange={(e) =>
                      handleInputChange("breadth", e.target.value)
                    }
                    isDisabled={selectDropDownValue !== "custom"}
                  />
                  <p className="text-red-500 text-sm">{errors?.breadth}</p>
                </div>
                <div>
                  <CustomInputBox
                    label="h"
                    value={boxDetails?.height}
                    inputType={"number"}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    isDisabled={selectDropDownValue !== "custom"}
                  />
                  <p className="text-red-500 text-sm">{errors?.height}</p>
                </div>
              </div>
            </div>
            <div className="py-4 flex justify-end mr-4">
              {selectDropDownValue === "custom" && (
                <OneButton
                  text={"Add Box"}
                  variant="primary"
                  onClick={() => handleAddBox()}
                  className="!w-[160px]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
