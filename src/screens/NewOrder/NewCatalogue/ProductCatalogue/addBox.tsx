import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import ProductIcon from "../../../../assets/Product/Product.svg";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import { CREATE_SELLER_BOX } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-toastify";
import {
  checkNonNegative,
  greaterThenZero,
  isRequired,
} from "../../../../utils/validationRules";

interface IBoxFilledProps {}

const AddBox: React.FunctionComponent<IBoxFilledProps> = (props) => {
  const navigate = useNavigate();
  const [sellerBoxDetails, setSellerBoxDetails] = useState<any>({
    name: "",
    length: 0,
    breadth: 0,
    height: 0,
    color: "",
    price: "",
    deadWeight: null,
  });
  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);
  const [validationErrors, setValidationErrors]: any = useState<any>(null);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const handleVolumCalc = (obj: any) => {
    const { length, height, breadth } = obj;
    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    const volumetricWeight = calculateVolumeWeight(+length, +breadth, +height);
    return volumetricWeight;
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

  useEffect(() => {
    const volumetricWeight = handleVolumCalc(sellerBoxDetails);
    setVolumetricWeight(volumetricWeight);
  }, [sellerBoxDetails]);

  const createAndUpdateSellerBoxDetails = async () => {
    const valid = validateOnSubmit();

    if (!valid) return;
    const { data } = await POST(CREATE_SELLER_BOX, sellerBoxDetails);
    if (data?.success) {
      navigate(-1);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  };

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

  return (
    <>
      <Breadcrum label="Add New Box" />
      {/* <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div> */}
      <div className="px-5 mb-20">
        <div className="grid gap-5">
          <div className="flex  gap-x-2 pb-2">
            <img src={ProductIcon} alt="Package Icon" />
            <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
              Create Box
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <CustomInputBox
              label="Box Name"
              name="name"
              value={sellerBoxDetails?.name}
              errorMessage={validationErrors?.name}
              onChange={(e) => {
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  name: e.target.value,
                });
                handleValidation(e);
              }}
            />
            <CustomInputBox
              label="Box Color"
              name="color"
              value={sellerBoxDetails?.color}
              errorMessage={validationErrors?.color}
              onChange={(e) => {
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  color: e.target.value,
                });
                handleValidation(e);
              }}
            />
            <CustomInputBox
              label="Box Price"
              name="price"
              errorMessage={validationErrors?.price}
              value={sellerBoxDetails?.price}
              onChange={(e) => {
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  price: e.target.value,
                });
                handleValidation(e);
              }}
            />
            <CustomInputBox
              label="Dead Weight"
              name="deadWeight"
              inputType="number"
              errorMessage={validationErrors?.deadWeight}
              value={sellerBoxDetails?.deadWeight}
              onChange={(e) => {
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  deadWeight: e.target.value,
                });
                handleValidation(e);
              }}
            />
            <CustomInputBox
              label="Length (cm)"
              inputType="text"
              inputMode="numeric"
              name="length"
              maxLength={5}
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
      </div>
      <div>
        <BottomLayout callApi={() => createAndUpdateSellerBoxDetails()} />
      </div>
    </>
  );
};

export default AddBox;
