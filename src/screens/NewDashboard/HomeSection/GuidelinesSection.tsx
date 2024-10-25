import React from "react";

interface IGuidelinesSectionProps {}

const GuidelinesSection: React.FunctionComponent<IGuidelinesSectionProps> = (
  props
) => {
  const handleDownload = () => {
    const pdfUrl =
      "https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/blaze/assets/SY_Packaging%20Guide.pdf?response[…]f36adf0c0fca4435752efe347aa334866cd1e6c0669edb";
    window.open(pdfUrl, "_blank");
  };
  return (
    <>
      <div className="mx-6 lg:mx-12 mt-10 lg:mt-[81px] mb-6">
        <div className="flex flex-col gap-y-4">
          <p className="font-Open text-lg lg:text-2xl font-semibold leading-8 text-[#1C1C1C]">
            Packaging Guidelines for Easy, Hassle-Free Shipping
          </p>
          <p className="font-Open text-base lg:text-xl font-normal leading-8 lg:leading-6 text-[#697586]">
            Follow these guidelines to securely pack and label your shipments,
            ensuring a smooth delivery process and item protection. For expert
            tips and details,{" "}
            <span
              className="font-Open text-[15px] lg:text-base font-normal leading-6 text-[#004EFF] cursor-pointer"
              onClick={handleDownload}
            >
              [Get the Full Guide]
            </span>
          </p>
        </div>
        {/* guidlines summary in cards  */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 lg:mt-10 gap-x-11 gap-y-10 ">
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  1. Ensure packaging of Proper Size
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Use a sturdy, corrugated box that can support the weight of
                  your contents. Ensure the box is the correct size to prevent
                  movement inside.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  2. Choose Appropriate Packing Materials
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Select sturdy boxes, bubble wrap, and packing paper to protect
                  your items. Proper materials ensure your package arrives
                  safely without damage.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  3. Wrap Items Individually
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Wrap each item separately with bubble wrap or packing paper to
                  avoid damage during shipping. This ensures each item stays
                  secure and protected throughout transit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  4. Cushion and Fill
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Fill empty spaces with cushioning materials but avoid
                  overstuffing
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  5. Label Accurately
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Print or write the shipping label clearly. Avoid placing the
                  label over seams or tape for better visibility.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_23px_23px_0px_rgba(133,133,133,0.04),_0px_6px_13px_0px_rgba(133,133,133,0.05),_0px_0px_0px_0px_rgba(133,133,133,0.05)] max-w-[351px] h-[291px] lg:h-[280px]">
            <div className="pt-[35px] px-[22px] flex flex-col space-y-2">
              <div>
                <h1 className="font-Open text-base lg:text-lg font-semibold leading-8 text-[#1C1C1C]">
                  6. Mark Fragile Items
                </h1>
              </div>
              <div>
                <p
                  className="font-Open text-sm lg:text-base font-normal text-[#697586] whitespace-pre-line"
                  style={{ lineHeight: "35.242px" }}
                >
                  Mark packages with "FRAGILE" stickers if necessary. For liquid
                  or perishable items, use leak-proof containers and appropriate
                  insulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidelinesSection;
