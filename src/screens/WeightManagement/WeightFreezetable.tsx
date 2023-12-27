import React, { useState, useEffect } from "react";
import ClockErrorIcon from "../../assets/clock.svg";
import ProcessingIcon from "../../assets/processing.svg";
import ResolvedIcon from "../../assets/resolved.svg";
import actionIcon from "../../assets/WeightManagement/actioniconweightfreeze.svg";
import LockIcon from "../../assets/WeightManagement/lockicon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import { CustomTable } from "../../components/Table";
import blueDeleteIcon from "../../assets/WeightManagement/blueDeleteIcon.svg";
import blueEditIcon from "../../assets/WeightManagement/blueEditIcon.svg";
import CustomCheckbox from "../../components/CheckBox";

const WeightFreezeTable = () => {
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columnsHelper = createColumnHelper<any>();

  const WeightFreezeData = [
    {
      packageDetails: "Product1+Product2",
      ids: "SKU:ABCDEFS",
      packageImages: "Uploaded Photos",
      weight: "15x15x15 cm 120kg",
      idealWeight: "15x15x15 cm 120kg",
      weightAccuracyStatus: "20% discrepancy chance",
    },
    {
      packageDetails: "Product1+Product2",
      ids: "SKU:ABCDEDS",
      packageImages: "Upload Photos",
      weight: "15x15x15 cm 120kg",
      idealWeight: "15x15x15 cm 120kg",
      weightAccuracyStatus: "20% discrepancy chance",
    },
    {
      packageDetails: "Product1+Product2",
      ids: "SKU:ABCDEDA",
      packageImages: "Uploaded Photos",
      weight: "15x15x15 cm 120kg",
      idealWeight: "15x15x15 cm 120kg",
      weightAccuracyStatus: "20% discrepancy chance",
    },
  ];
  const WeightFreezeHeading = [
    columnsHelper.accessor("packageDetails", {
      header: () => {
        return (
          <div className="flex ">
            {/* <CustomCheckbox
              checked={isCheckedAll}
              onChange={handleCheckboxChangeAll}
            /> */}
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Package Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex">
            <CustomCheckbox
              checked={selectedRows.includes(info.row.index)}
              onChange={() => handleCheckboxChange(info.row.index)}
            />
            <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
              {info.row.original.packageDetails}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("ids", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              IDs
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.ids}
          </p>
        );
      },
    }),
    columnsHelper.accessor("packageImages", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Package Images
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center">
            <p className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 mr-2">
              {info.row.original.packageImages}
            </p>
            {info.row.original.packageImages === "Uploaded Photos" ? (
              <>
                <img src={blueEditIcon} alt="editIcon" className=" mr-2" />
                <img src={blueDeleteIcon} alt="deleteIcon" className="" />
              </>
            ) : (
              <img src={actionIcon} alt="actionIcon" className="mr-14" />
            )}
          </div>
        );
      },
    }),
    columnsHelper.accessor("weight", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Weight
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.weight)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("idealWeight", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Ideal Weight
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.idealWeight)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("weightAccuracyStatus", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Weight Accuracy Status
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.weightAccuracyStatus)}
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
          <div className="flex justify-evenly">
            <img src={actionIcon} alt="actionIcon" />

            <img src={LockIcon} alt="lockIcon" />
          </div>
        );
      },
    }),
  ];
  const handleCheckboxChangeAll = () => {
    if (isCheckedAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(WeightFreezeData?.map((_, index) => index));
    }
    setIsCheckedAll(!isCheckedAll);
  };

  const handleCheckboxChange = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };
  return <CustomTable columns={WeightFreezeHeading} data={[]} />;
};

export default WeightFreezeTable;
