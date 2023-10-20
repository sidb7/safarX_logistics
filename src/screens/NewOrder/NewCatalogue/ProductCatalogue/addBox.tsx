import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import ProductIcon from "../../../../assets/Product/Product.svg";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import { CREATE_SELLER_BOX } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-toastify";

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
    deadWeight: 0,
  });
  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);

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

  useEffect(() => {
    const volumetricWeight = handleVolumCalc(sellerBoxDetails);
    setVolumetricWeight(volumetricWeight);
  }, [sellerBoxDetails]);

  const createAndUpdateSellerBoxDetails = async () => {
    const { data } = await POST(CREATE_SELLER_BOX, sellerBoxDetails);
    if (data?.success) {
      navigate(-1);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
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
          <div className="grid grid-cols-4 gap-5">
            <CustomInputBox
              label="Box Name"
              name="name"
              value={sellerBoxDetails?.name}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  name: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Box Color"
              name="color"
              value={sellerBoxDetails?.color}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  color: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Box Price"
              name="price"
              value={sellerBoxDetails?.price}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  price: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Dead Weight"
              name="deadWeight"
              value={sellerBoxDetails?.deadWeight}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  deadWeight: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Length (cm)"
              inputType="number"
              name="length"
              value={sellerBoxDetails?.length}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  length: e.target.value,
                })
              }
            />
            <CustomInputBox
              inputType="number"
              name="breadth"
              label="Breadth (cm)"
              value={sellerBoxDetails?.breadth}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  breadth: e.target.value,
                })
              }
            />
            <CustomInputBox
              name="height"
              label="height (cm)"
              inputType="number"
              value={sellerBoxDetails?.height}
              onChange={(e) =>
                setSellerBoxDetails({
                  ...sellerBoxDetails,
                  height: e.target.value,
                })
              }
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
