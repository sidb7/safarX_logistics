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

interface ISellerBoxDetailsProps {
  editMode?: boolean;
  setSellerBoxDetailsModal?: any;
  tempSellerBoxDetails?: any;
  updateBoxApi?: any;
}

const SellerBoxDetails = (props: ISellerBoxDetailsProps) => {
  const { tempSellerBoxDetails, setSellerBoxDetailsModal, updateBoxApi } =
    props;
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
  
  
  const createAndUpdateSellerBoxDetails = async () => {
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
            onChange={(e) =>
              setSellerBoxDetails({ ...sellerBoxDetails, name: e.target.value })
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
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-5">
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
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"CANCEL"}
          onClick={() => {
            setSellerBoxDetailsModal(false);
          }}
          className="bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4 "
        />
        <ServiceButton
          text={`${isEditMode ? "UPDATE" : "SAVE"}`}
          onClick={() => createAndUpdateSellerBoxDetails()}
          className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none"
        />
      </div>
    </>
  );
};

export default SellerBoxDetails;
