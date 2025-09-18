import React from "react";

interface IGuidelinesSectionProps {}

const GuidelinesSection: React.FunctionComponent<IGuidelinesSectionProps> = (
  props
) => {
  const handleDownload = () => {
    // const pdfUrl =
    //   "https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/blaze/assets/SY_Packaging%20Guide.pdf?response[…]f36adf0c0fca4435752efe347aa334866cd1e6c0669edb";
    const pdfUrl = "";
    window.open(pdfUrl, "_blank");
  };

  const companyName = process.env.REACT_APP_WHITE_COMPANYNAME;

  return (
    <>
      <div className="mx-2 md:mx-8 mt-10 lg:mt-[81px] mb-6">
        {/* Modern banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#E7E4FF] via-[#CFDFFF] to-[#F8F8FF] shadow-xl px-6 py-8 flex flex-col gap-2 mb-8 animate-fadein">
          <h2 className="font-Open text-2xl md:text-3xl font-extrabold text-[#160783] mb-1 tracking-tight">
            Packaging Guidelines for Easy, Hassle-Free Shipping
          </h2>
          <p className="font-Open text-base md:text-lg text-[#697586] max-w-2xl">
            Follow these guidelines to securely pack and label your shipments,
            ensuring a smooth delivery process and item protection. For expert
            tips and details,{" "}
            <span
              className="font-Open text-base font-semibold text-[#9082FF] underline cursor-pointer"
              onClick={handleDownload}
            >
              [Get the Full Guide]
            </span>
          </p>
        </div>
        {/* Guidelines as bullet points with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadein">
          {[
            {
              title: "Ensure packaging of Proper Size",
              desc: "Use a sturdy, corrugated box that can support the weight of your contents. Ensure the box is the correct size to prevent movement inside.",
              icon: "📦",
            },
            {
              title: "Choose Appropriate Packing Materials",
              desc: "Select sturdy boxes, bubble wrap, and packing paper to protect your items. Proper materials ensure your package arrives safely without damage.",
              icon: "🧰",
            },
            {
              title: "Wrap Items Individually",
              desc: "Wrap each item separately with bubble wrap or packing paper to avoid damage during shipping. This ensures each item stays secure and protected throughout transit.",
              icon: "🛡️",
            },
            {
              title: "Cushion and Fill",
              desc: "Fill empty spaces with cushioning materials but avoid overstuffing.",
              icon: "🧸",
            },
            {
              title: "Label Accurately",
              desc: "Print or write the shipping label clearly. Avoid placing the label over seams or tape for better visibility.",
              icon: "🏷️",
            },
            {
              title: "Mark Fragile Items",
              desc: "Mark packages with 'FRAGILE' stickers if necessary. For liquid or perishable items, use leak-proof containers and appropriate insulation.",
              icon: "⚠️",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-3xl md:text-4xl mt-1 text-[#9082FF]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-Open text-lg font-bold text-[#160783] mb-1">
                  {item.title}
                </h3>
                <p className="font-Open text-base text-[#697586] leading-6">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuidelinesSection;

/* Add this to your global CSS or Tailwind config:
@keyframes fadein {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadein {
  animation: fadein 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
*/
