import { useEffect, useState } from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomInputBox from "../../../../components/Input";
import ProductIcon from "../../../../assets/Product/Product.svg";
import { POST } from "../../../../utils/webService";
import {
  CREATE_SELLER_BOX,
  UPDATE_SELLER_BOX,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import {
  checkNonNegative,
  greaterThenZero,
  isRequired,
} from "../../../../utils/validationRules";

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
    color: "",
    price: "",
    deadWeight: 0,
  });
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
    price: [isRequired, checkNonNegative],
    deadWeight: [isRequired, checkNonNegative],
  };
  const validateOnSubmit = () => {
    let hasErrors = false;
    for (const inputName in validation) {
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

    const { data } = await POST(
      isEditMode ? UPDATE_SELLER_BOX : CREATE_SELLER_BOX,
      sellerBoxDetails
    );
    if (data?.success) {
      updateBoxApi();
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    const volumetricWeight = handleVolumCalc(sellerBoxDetails);
    setVolumetricWeight(volumetricWeight);
  }, [sellerBoxDetails]);

  useEffect(() => {
    if (Object.keys(tempSellerBoxDetails).length > 0) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
    setSellerBoxDetails({
      ...tempSellerBoxDetails,
    });
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
      <div className="grid px-5 mt-6 gap-5">
        <div className="flex  gap-x-2 pb-2">
          <img src={ProductIcon} alt="Package Icon" />
          <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
            {`${isEditMode ? "Edit Box" : "Create Box"}`}
          </h1>
        </div>
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
            onChange={(e) => {
              handleValidation(e);
              setSellerBoxDetails({
                ...sellerBoxDetails,
                price: e.target.value,
              });
            }}
          />
          <CustomInputBox
            label="Dead Weight"
            name="deadWeight"
            errorMessage={validationErrors?.deadWeight}
            value={sellerBoxDetails?.deadWeight}
            onChange={(e) => {
              handleValidation(e);
              setSellerBoxDetails({
                ...sellerBoxDetails,
                deadWeight: e.target.value,
              });
            }}
          />
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-5">
          <CustomInputBox
            label="Length (cm)"
            inputType="text"
            inputMode="numeric"
            name="length"
            errorMessage={validationErrors?.length}
            value={sellerBoxDetails?.length}
            onChange={(e: any) => {
              if (isNaN(e.target.value)) {
              } else {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  length: e.target.value,
                });
              }
            }}
          />
          <CustomInputBox
            inputType="text"
            inputMode="numeric"
            name="breadth"
            label="Breadth (cm)"
            errorMessage={validationErrors?.breadth}
            value={sellerBoxDetails?.breadth}
            onChange={(e: any) => {
              if (isNaN(e.target.value)) {
              } else {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  breadth: e.target.value,
                });
              }
            }}
          />
          <CustomInputBox
            name="height"
            label="height (cm)"
            inputType="text"
            inputMode="numeric"
            errorMessage={validationErrors?.height}
            value={sellerBoxDetails?.height}
            onChange={(e: any) => {
              if (isNaN(e.target.value)) {
              } else {
                handleValidation(e);
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  height: e.target.value,
                });
              }
            }}
          />
          <CustomInputBox
            name="volumetricWeight"
            label="Volumetric Weight (Kg)"
            value={volumetricWeight || ""}
            inputType="number"
            isDisabled={true}
            tempLabel={true}
          />
        </div>
      </div>
      <div
        className="flex justify-between lg:justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"CANCEL"}
          onClick={() => {
            setSellerBoxDetailsModal(false);
          }}
          className={`${
            isMobileView ? "w-[100%]" : ""
          } bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4  `}
        />
        <ServiceButton
          text={`${isEditMode ? "UPDATE" : "SAVE"}`}
          onClick={() => createAndUpdateSellerBoxDetails()}
          className={`${
            isMobileView ? "w-[100%]" : ""
          } bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2  lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default SellerBoxDetails;
