import { useEffect, useState } from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomInputBox from "../../../../components/Input";
import ProductIcon from "../../../../assets/Product/Product.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";

import { POST } from "../../../../utils/webService";
import {
  CREATE_SELLER_BOX,
  UPDATE_SELLER_BOX,
} from "../../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import {
  checkNonNegative,
  greaterThenZero,
  isRequired,
} from "../../../../utils/validationRules";
import BoxDetails from "../../Product/BoxDetails";
import OneButton from "../../../../components/Button/OneButton";

interface ISellerBoxDetailsProps {
  editMode?: boolean;
  setSellerBoxDetailsModal?: any;
  tempSellerBoxDetails?: any;
  updateBoxApi?: any;
  isMobileView?: any;
}

const SellerBoxDetails = (props: ISellerBoxDetailsProps) => {
  const {
    tempSellerBoxDetails,
    setSellerBoxDetailsModal,
    updateBoxApi,
    isMobileView,
  } = props;
  const [sellerBoxDetails, setSellerBoxDetails] = useState<any>({
    name: "",
    length: 0,
    breadth: 0,
    height: 0,
    color: "brown",
    price: 0,
    deadWeight: 0,
  });
  console.log(
    "🚀 ~ file: SellerBoxDetails.tsx:44 ~ SellerBoxDetails ~ sellerBoxDetails:",
    sellerBoxDetails
  );
  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [validationErrors, setValidationErrors]: any = useState<any>(null);

  const validate = (value: any, validationRule: any) => {
    let errors = [];
    for (let index = 0; index < validationRule.length; index++) {
      const element = validationRule[index];
      const res = element(value);
      if (res !== true) {
        errors.push(res);
      }
    }
    return errors;
  };

  const validation: any = {
    name: [isRequired],
    length: [isRequired, greaterThenZero],
    breadth: [isRequired, greaterThenZero],
    height: [isRequired, greaterThenZero],
    color: [isRequired],
    price: [checkNonNegative],
    deadWeight: [isRequired, checkNonNegative],
  };
  const validateOnSubmit = () => {
    let hasErrors = false;
    for (const inputName in validation) {
      console.log("sellerBoxDetails[inputName]", sellerBoxDetails);
      const errors = validate(
        sellerBoxDetails[inputName],
        validation[inputName]
      );
      setValidationErrors((prevErrors: any) => ({
        ...prevErrors,
        [inputName]: errors[0] || false,
      }));
      if (errors.length > 0) {
        hasErrors = true;
      }
    }
    return !hasErrors;
  };
  const createAndUpdateSellerBoxDetails = async () => {
    const valid = validateOnSubmit();

    if (!valid) return;

    let payload: any = sellerBoxDetails;
    if (!isEditMode) {
      let { deadWeight, name } = payload;
      payload.name = `${Math.max(deadWeight, volumetricWeight)}kg - ${name}`;
    }

    const { data } = await POST(
      isEditMode ? UPDATE_SELLER_BOX : CREATE_SELLER_BOX,
      payload
    );
    if (data?.success) {
      updateBoxApi();
      toast.success(data?.message);
      setSellerBoxDetailsModal(false);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    const volumetricWeight = handleVolumCalc(sellerBoxDetails);
    setVolumetricWeight(volumetricWeight);
  }, [sellerBoxDetails]);

  useEffect(() => {
    const { length, height, breadth } = sellerBoxDetails;
    if (isEditMode) return;
    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    setSellerBoxDetails({
      ...sellerBoxDetails,
      name: `${length}x${breadth}x${height}`,
    });
  }, [
    sellerBoxDetails.length,
    sellerBoxDetails.height,
    sellerBoxDetails.length,
  ]);

  useEffect(() => {
    if (Object.keys(tempSellerBoxDetails).length > 0) {
      setIsEditMode(true);
      setSellerBoxDetails({
        ...tempSellerBoxDetails,
      });
    } else {
      setIsEditMode(false);
    }
  }, [tempSellerBoxDetails]);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const handleValidation = (event: any) => {
    const { name, value } = event.target;
    const validationRules = validation[name];
    const errors = validate(value, validationRules) || true;
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: errors.length > 0 ? errors[0] : true,
    }));
  };

  const handleVolumCalc = (obj: any) => {
    const { length, height, breadth } = obj;
    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    const volumetricWeight = calculateVolumeWeight(+length, +breadth, +height);
    return volumetricWeight;
  };

  return (
    <>
      <div className="grid px-5 mt-6 gap-5 ">
        <div className="flex justify-between items-center gap-x-2 pb-2">
          <div className="flex gap-x-2">
            <img src={ProductIcon} alt="Package Icon" data-cy="box-icon" />
            <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
              {`${isEditMode ? "Edit Box" : "Create Box"}`}
            </h1>
          </div>
          <img
            className="cursor-pointer"
            src={CloseIcon}
            width="25px"
            onClick={() => setSellerBoxDetailsModal(false)}
            alt="close icon"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <CustomInputBox
            label="Length (cm)"
            inputType="text"
            name="length"
            errorMessage={validationErrors?.length}
            value={sellerBoxDetails?.length}
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  length: e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
                });
              }
            }}
          />
          <CustomInputBox
            inputType="text"
            name="breadth"
            label="Breadth (cm)"
            errorMessage={validationErrors?.breadth}
            value={sellerBoxDetails?.breadth}
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  breadth: e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
                });
              }
            }}
          />
          <CustomInputBox
            name="height"
            label="Height (cm)"
            inputType="text"
            errorMessage={validationErrors?.height}
            value={sellerBoxDetails?.height}
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  height: e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
                });
              }
            }}
          />
          <CustomInputBox
            name="volumetricWeight"
            label="Volumetric Weight (Kg)"
            value={volumetricWeight}
            inputType="number"
            isDisabled={true}
            tempLabel={true}
          />
        </div>
        <hr />

        <div className="grid grid-cols-2 gap-5">
          <CustomInputBox
            label="Box Name"
            name="name"
            value={sellerBoxDetails?.name}
            errorMessage={validationErrors?.name}
            onChange={(e) => {
              handleValidation(e);
              setSellerBoxDetails({
                ...sellerBoxDetails,
                name: e.target.value,
              });
            }}
          />
          <CustomInputBox
            label="Box Color"
            name="color"
            value={sellerBoxDetails?.color}
            errorMessage={validationErrors?.color}
            onChange={(e) => {
              handleValidation(e);
              setSellerBoxDetails({
                ...sellerBoxDetails,
                color: e.target.value,
              });
            }}
          />
          <CustomInputBox
            label="Box Price"
            name="price"
            errorMessage={validationErrors?.price}
            value={sellerBoxDetails?.price}
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  price: e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
                });
              }
            }}
          />
          <CustomInputBox
            label="Dead Weight"
            name="deadWeight"
            errorMessage={validationErrors?.deadWeight}
            value={sellerBoxDetails?.deadWeight}
            onChange={(e: any) => {
              if (!isNaN(e.target.value)) {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  deadWeight: e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
                });
              }
            }}
          />
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <OneButton
          text={"CANCEL"}
          onClick={() => {
            setSellerBoxDetailsModal(false);
          }}
          className=" !py-2 !px-4"
          data-cy="cancel-button"
          variant="secondary"
        />
        {/* <ServiceButton
          text={"CANCEL"}
          onClick={() => {
            setSellerBoxDetailsModal(false);
          }}
          className="bg-white text-[#1C1C1C] h-[36px] !py-2 !px-4"
          data-cy="cancel-button"
        /> */}

        <OneButton
          text={`${isEditMode ? "UPDATE" : "SAVE"}`}
          onClick={() => createAndUpdateSellerBoxDetails()}
          className=" !py-2 !px-4"
          data-cy={`${isEditMode ? "update-button" : "save-button"}`}
          variant="primary"
        />
        {/* <ServiceButton
          text={`${isEditMode ? "UPDATE" : "SAVE"}`}
          onClick={() => createAndUpdateSellerBoxDetails()}
          className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] !py-2  !px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none"
          data-cy={`${isEditMode ? "update-button" : "save-button"}`}
        /> */}
      </div>
    </>
  );
};

export default SellerBoxDetails;
