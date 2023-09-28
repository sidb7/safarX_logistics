import React, { useEffect, useState } from "react";
import ProductIcon from "../../../../assets/Product/Product.svg";
import { v4 as uuidv4 } from "uuid";
import "../../../../styles/productStyle.css";
import { POST } from "../../../../utils/webService";
import { FILE_UPLOAD, POST_UPDATE_PRODUCT } from "../../../../utils/ApiUrls";
import InputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import CustomInputBox from "../../../../components/Input";
import CustomRightModal from "../../../../components/CustomModal/customRightModal";
import ServiceButton from "../../../../components/Button/ServiceButton";

interface IProductFilledProps {
  editAddressModal: any;
  setEditAddressModal: any;
  editProductData: any;
}

const EditProduct: React.FunctionComponent<IProductFilledProps> = ({
  editAddressModal,
  setEditAddressModal,
  editProductData,
}) => {
  const tempProductData = editProductData;
  const [productData, setproductData]: any = useState(tempProductData);
  console.log("🚀 ~ file: editProduct.tsx:26 ~ productData:", productData);
  const divisor = 5000;

  const handleProductInputChange = (e: any) => {
    const { name, value } = e;
    setproductData((previousData: any) => ({ ...previousData, [name]: value }));
  };

  const updateProductDetails = async () => {
    const { data: updateProduct } = await POST(
      POST_UPDATE_PRODUCT,
      productData
    );

    if (updateProduct.success) {
      toast.success(updateProduct.message);
      setEditAddressModal(false);
    } else {
      toast.error(updateProduct.message);
    }
  };

  function calculateVolumeWeight(
    length: number,
    breadth: number,
    height: number
  ): number {
    const volume = length * breadth * height;
    return volume / divisor;
  }

  const uploadedInputFile = async (e: any, index: number) => {
    let uuid = uuidv4();
    let obj = {
      url: `${uuid}`,
      alt: "",
    };

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", obj.url);
    const { data: response } = await POST(FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.success) {
      toast.success(response?.message);
      setproductData((prev: any) => ({ ...prev, images: [obj] }));
    } else {
      toast.error("Failed To Upload!");
    }
  };

  useEffect(() => {
    const { length, height, breadth, deadWeight: weight } = productData;

    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    const volumetricWeight = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(6);

    setproductData((previousData: any) => ({
      ...previousData,
      volumetricWeight: volumetricWeight,
      appliedWeight: Math.max(volumetricWeight, weight),
    }));
  }, [productData.length, productData.height, productData.breadth]);

  return (
    <CustomRightModal
      isOpen={editAddressModal}
      onClose={() => setEditAddressModal(false)}
    >
      <>
        <div className="grid mt-6 gap-5">
          <div className="flex px-5 gap-x-2 pb-2">
            <img src={ProductIcon} alt="Package Icon" />
            <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
              Edit Product
            </h1>
          </div>
          <div className="grid grid-cols-2 px-5 gap-5">
            <CustomInputBox
              label="Product name"
              name="name"
              value={productData?.name}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Product category"
              name="category"
              value={productData?.category}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Product Price"
              name="unitPrice"
              inputMode="numeric"
              value={productData?.unitPrice || ""}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: +e.target.value,
                })
              }
            />
            <CustomInputBox
              label="Product tax"
              name="unitTax"
              inputMode="numeric"
              value={productData?.unitTax || ""}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: +e.target.value,
                })
              }
            />

            <div className="flex gap-x-3 w-full">
              <CustomInputBox
                label="Length (CM)"
                inputType="number"
                name="length"
                value={productData?.length || ""}
                onChange={(e: any) => {
                  handleProductInputChange({
                    name: e.target.name,
                    value: +e.target.value,
                  });
                }}
              />

              <CustomInputBox
                label="Breadth (CM)"
                name="breadth"
                inputType="number"
                value={productData?.breadth || ""}
                onChange={(e: any) => {
                  handleProductInputChange({
                    name: e.target.name,
                    value: +e.target.value,
                  });
                }}
              />
              <CustomInputBox
                label="Height (CM)"
                inputType="number"
                name="height"
                value={productData?.height || ""}
                onChange={(e: any) => {
                  handleProductInputChange({
                    name: e.target.name,
                    value: +e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex gap-x-5">
              <CustomInputBox
                placeholder="Volumetric Weight (Kg)"
                label="Volumetric Weight (Kg)"
                isDisabled={true}
                value={productData?.volumetricWeight || 0}
              />
              <CustomInputBox
                placeholder="Divisor"
                label="Divisor"
                inputMode="numeric"
                isDisabled={true}
                value={divisor}
              />
            </div>
            <CustomInputBox
              label="Weight (Kg)"
              inputType="number"
              name="deadWeight"
              value={productData?.deadWeight || ""}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: +e.target.value,
                })
              }
            />

            <CustomInputBox
              label="Sku"
              name="sku"
              value={productData?.sku || ""}
              onChange={(e: any) =>
                handleProductInputChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            />

            <div className="grid col-span-2">
              <InputWithFileUpload
                type="file"
                onChange={(e: any) => uploadedInputFile(e, 0)}
              />
            </div>
          </div>
          <div
            className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
            style={{ width: "-webkit-fill-available" }}
          >
            <ServiceButton
              text={"CANCEL"}
              onClick={() => {
                setEditAddressModal(false);
              }}
              className="bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4 "
            />
            <ServiceButton
              text={"UPDATE"}
              onClick={() => updateProductDetails()}
              className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none"
            />
          </div>
        </div>
      </>
    </CustomRightModal>
  );
};

export default EditProduct;
