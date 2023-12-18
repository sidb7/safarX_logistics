import React from "react";
import Checkbox from "../../../../components/CheckBox";

interface ILabelCardProps {
  labelData?: any;
  setLabelData?: any;
}

const LabelCard: React.FunctionComponent<ILabelCardProps> = ({
  labelData,
  setLabelData,
}) => {
  return (
    <>
      {/* 1 */}

      <div className="mx-5  my-5 md:my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-lg md:text-[22px] font-semibold leading-5 md:leading-7 capitalize text-[#1C1C1C]">
            Buyer Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-3 md:gap-y-6 md:gap-x-14 md:pt-6">
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Hide Customer's Mobile Number"
                labelClassName="!font-Open !text-[15px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      buyerDetails: {
                        ...labelData.inputs.buyerDetails,
                        mobile: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.buyerDetails?.mobile || false}
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: Hide the Customer's Mobile Number from your Shipping
                Label. We recommed hiding this sensitive information to prevent
                Data breach
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="mx-5  my-5 md:my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-lg md:text-[22px] font-semibold leading-5 md:leading-7 capitalize text-[#1C1C1C]">
            Seller Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-3 md:gap-y-6 md:gap-x-14 md:pt-6">
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Hide Seller's Address."
                labelClassName="!font-Open !text-[15px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      sellerDetails: {
                        ...labelData.inputs.sellerDetails,
                        address1: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.sellerDetails?.address1 || false}
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: For SmartR logistics, the Seller's Address would show even
                if this box is checked.
              </p>
            </div>
            {/* <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Show Seller's Names (In case of Multiple Shippers)."
                labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      sellerDetails: {
                        ...labelData.inputs.sellerDetails,
                        name: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.sellerDetails?.name || false}
              />
              <p className="font-Open text-base font-normal leading-[22px] text-[#777777] capitalize pt-2">
                Note: For users who ship items belonging to several sellers,
                check this box to hide the individual seller's name from the
                Shipped by Section.
              </p>
            </div> */}
            {/* <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Show Individual Shipper's Logos (In case of Multiple Shippers)."
                labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      sellerDetails: {
                        ...labelData.inputs.sellerDetails,
                        sellerLogo: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.sellerDetails?.sellerLogo || false}
              />
              <p className="font-Open text-base font-normal leading-[22px] text-[#777777] capitalize pt-2">
                Note: For users who ship items belonging to several sellers,
                check this box to hide the individual seller's Logo from the
                Shipped by Section.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="mx-5  my-5 md:my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-lg md:text-[22px] font-semibold leading-5 md:leading-7 capitalize text-[#1C1C1C]">
            Courier Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-3 md:gap-y-6 md:gap-x-14 md:pt-6">
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Hide the Package Weight."
                labelClassName="!font-Open !text-[15px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      courierDetails: {
                        ...labelData.inputs.courierDetails,
                        weight: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.courierDetails?.weight || false}
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: Hide the SKU related information. We will be required to
                retain carrier specific mandatory details even if this box is
                checked.
              </p>
            </div>
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Hide the Package Dimensions."
                labelClassName="!font-Open !text-[15px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      courierDetails: {
                        ...labelData.inputs.courierDetails,
                        dimension: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.courierDetails?.dimension || false}
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: Hide the SKU related information. We will be required to
                retain carrier specific mandatory details even if this box is
                checked.
              </p>
            </div>
            {/* <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Show the Billable Weight on the Label."
                labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
              />
              <p className="font-Open text-base font-normal leading-[22px] text-[#777777] capitalize pt-2">
                Note: By default, product weight and package dimensions are
                shown on the shipping label.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {/* 4 */}
      <div className="mx-5  my-5 md:my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-lg md:text-[22px] font-semibold leading-5 md:leading-7 capitalize text-[#1C1C1C]">
            Order Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-3 md:gap-y-6 md:gap-x-14 md:pt-6">
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName=" gap-x-2 !w-6 !h-6 "
                label="Hide the Order Value for Prepaid Orders."
                labelClassName="!font-Open !text-[14px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      orderDetails: {
                        ...labelData.inputs.orderDetails,
                        paymentMode: e.value,
                      },
                    },
                  });
                }}
                checked={labelData?.inputs?.orderDetails?.paymentMode || false}
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: This is only for the Prepaid Orders. The Order Value will
                be shown as Collectable Amount for COD Orders.
              </p>
            </div>
            <div>
              <Checkbox
                style={{ accentColor: "black" }}
                checkboxClassName="gap-x-2 !h-6 !w-6"
                label="Hide The Product Name."
                labelClassName="!font-Open !text-[15px] md:!text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                onChange={(e: any) => {
                  setLabelData({
                    ...labelData,
                    inputs: {
                      ...labelData.inputs,
                      orderDetails: {
                        ...labelData.inputs.orderDetails,
                        productDetails: e.value,
                      },
                    },
                  });
                }}
                checked={
                  labelData?.inputs?.orderDetails?.productDetails || false
                }
              />
              <p className="font-Open text-[13px] md:text-base font-normal leading-5 md:leading-[22px] text-[#777777] capitalize pt-1 md:pt-2">
                Note: Hide the SKU related information. We will be required to
                retain carrier specific mandatory details even if this box is
                checked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelCard;
