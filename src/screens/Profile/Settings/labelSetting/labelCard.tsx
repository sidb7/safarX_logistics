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
  console.log();
  const sellerDetails = Object.entries(labelData?.inputs?.sellerDetails);
  const buyerDetails = Object.entries(labelData?.inputs?.buyerDetails);
  const courierDetails = Object.entries(labelData?.inputs?.courierDetails);
  const orderDetails = Object.entries(labelData?.inputs?.orderDetails);

  return (
    <>
      {/* 1 */}

      <div className="mx-5 my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C]">
            Buyer Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-5 md:grid md:grid-cols-4 md:gap-y-6 md:gap-x-14 md:pt-6">
            {buyerDetails.map((value: any) => {
              const [key, data] = value;
              return (
                <div className="flex">
                  <Checkbox
                    style={{ accentColor: "black" }}
                    checkboxClassName="gap-2 !h-6 !w-6"
                    onChange={(e: any) => {
                      setLabelData({
                        ...labelData,
                        inputs: {
                          ...labelData.inputs,
                          buyerDetails: {
                            ...labelData.inputs.buyerDetails,
                            [key]: e.value,
                          },
                        },
                      });
                    }}
                    label={key}
                    labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                    name={key}
                    checked={data || false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="mx-5 my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C]">
            Seller Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-5 md:grid md:grid-cols-4 md:gap-y-6 md:gap-x-14 md:pt-6">
            {sellerDetails.map((value: any) => {
              const [key, data] = value;
              return (
                <div className="flex">
                  <Checkbox
                    style={{ accentColor: "black" }}
                    checkboxClassName="gap-2 !h-6 !w-6"
                    onChange={(e: any) => {
                      setLabelData({
                        ...labelData,
                        inputs: {
                          ...labelData.inputs,
                          sellerDetails: {
                            ...labelData.inputs.sellerDetails,
                            [key]: e.value,
                          },
                        },
                      });
                    }}
                    label={key}
                    labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                    name={key}
                    checked={data || false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="mx-5 my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C]">
            Courier Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-5 md:grid md:grid-cols-4 md:gap-y-6 md:gap-x-14 md:pt-6">
            {courierDetails.map((value: any) => {
              const [key, data] = value;
              return (
                <div className="flex">
                  <Checkbox
                    style={{ accentColor: "black" }}
                    checkboxClassName="gap-2 !h-6 !w-6"
                    onChange={(e: any) => {
                      setLabelData({
                        ...labelData,
                        inputs: {
                          ...labelData.inputs,
                          courierDetails: {
                            ...labelData.inputs.courierDetails,
                            [key]: e.value,
                          },
                        },
                      });
                    }}
                    label={key}
                    labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                    name={key}
                    checked={data || false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 4 */}
      <div className="mx-5 my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C]">
            Order Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-5 md:grid md:grid-cols-4 md:gap-y-6 md:gap-x-14 md:pt-6">
            {orderDetails.map((value: any) => {
              const [key, data] = value;
              return (
                <div className="flex">
                  <Checkbox
                    style={{ accentColor: "black" }}
                    checkboxClassName="gap-2 !h-6 !w-6"
                    onChange={(e: any) => {
                      setLabelData({
                        ...labelData,
                        inputs: {
                          ...labelData.inputs,
                          orderDetails: {
                            ...labelData.inputs.orderDetails,
                            [key]: e.value,
                          },
                        },
                      });
                    }}
                    label={key}
                    labelClassName="!font-Open !text-lg !text-[#777777] !font-semibold !leading-[22px] !capitalize"
                    name={key}
                    checked={data || false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelCard;
