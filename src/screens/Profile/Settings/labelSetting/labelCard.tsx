import React from "react";
import Checkbox from "../../../../components/CheckBox";

interface ILabelCardProps {}

const LabelCard: React.FunctionComponent<ILabelCardProps> = () => {
  return (
    <>
      {/* 1 */}
      <div className="mx-5 my-10 border-[1px] border-solid border-[#A4A4A4] rounded-lg">
        <div className="p-3">
          <h2 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C]">
            Buyer Details
          </h2>
          <div className="flex flex-col gap-y-5 pt-5 md:grid md:grid-cols-4 md:gap-y-6 md:gap-x-14 md:pt-6">
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  name
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  mobile
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  address 1
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  address 2
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  pincode
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  state
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  city
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  country
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Gst Number
                </p>
              </div>
            </div>
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
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  name
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  mobile
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  address 1
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  address 2
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  pincode
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  state
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  city
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  country
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Gst Number
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Company Name
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Seller Logo
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Shipped By
                </p>
              </div>
            </div>
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
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Courier Name
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  AWB Barcode
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  AWB
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Route Code
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Dimension
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Weight
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Cluster Code
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Service Number
                </p>
              </div>
            </div>
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
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Order ID Barcode
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  order ID
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Creation Date
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Invoice Value
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Payment Mode
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Collectable Amount
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Product Details
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Product Dimension
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <Checkbox
                  style={{ accentColor: "black" }}
                  checkboxClassName="gap-2 !h-6 !w-6"
                />
                <p className="font-Open text-lg text-[#777777] font-semibold leading-[22px] capitalize">
                  Product Weight
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelCard;
