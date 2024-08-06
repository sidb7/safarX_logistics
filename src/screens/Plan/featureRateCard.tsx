import React, { useState } from "react";
import CustomInputBox from "../../components/Input";
import Checkbox from "../../components/CheckBox";
// import Checkbox from "../../../components/CheckBox";

interface IFeatureRateCardProps {
  featureRateCard: any;
}

const FeatureRateCard: React.FunctionComponent<IFeatureRateCardProps> = ({
  featureRateCard,
}) => {
  // console.log("🚀 ~ featureRateCard:", featureRateCard);
  const [featureRateCardData, setFeatureRateCardData] = useState<any>(
    featureRateCard || []
  );
  // console.log("🚀 ~ featureRateCardData:", featureRateCardData);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null);
  const [isActiveItemAccordionOpen, setIsActiveItemAccordionOpen] =
    useState(false);

  const toggleAccordion = (index: number) => {
    if (activeItem === index) {
      setActiveItem(null); // Close the accordion if it's already open
      setIsActiveItemAccordionOpen(!isActiveItemAccordionOpen);
    } else {
      setActiveItem(index); // Open the accordion
      setIsActiveItemAccordionOpen(true);
    }
  };

  const toggleSubAccordion = (index: number) => {
    setActiveSubItem(activeSubItem === index ? null : index);
  };
  return (
    <>
      {featureRateCardData?.[0]?.featureRateCard?.length > 0 ? (
        <div className="flex flex-col gap-y-4 overflow-auto custromScroll mx-5 mb-5">
          {featureRateCardData?.[0]?.featureRateCard?.map(
            (roleData: any, index: number) => (
              <div key={roleData?.id} className="accordionContainerBoxStyle">
                <div
                  className={`cursor-pointer px-4 py-3 flex justify-between items-center rounded-lg
              ${
                isActiveItemAccordionOpen && activeItem === index
                  ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                  : "bg-white"
              }
            `}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex basis-[90%] items-center gap-x-2">
                    <div className="text-[20px] font-Lato font-semibold">
                      {roleData.featureTitle}
                      <span> ({roleData?.featureSubMenu?.length})</span>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transform ${
                      activeItem === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeItem === index && isActiveItemAccordionOpen && (
                  <div>
                    {roleData?.featureSubMenu?.map(
                      (menuData: any, index2: number) => (
                        <div
                          key={index2}
                          className="accordionNestedContainerBoxStyle border border-[#e8e8e8]"
                        >
                          <div
                            className="cursor-pointer px-4 py-3 flex justify-between items-center"
                            onClick={
                              menuData?.submenu?.length
                                ? () => toggleSubAccordion(index2)
                                : undefined
                            }
                          >
                            <div className="flex items-center gap-x-3">
                              {menuData?.type !== "input" && (
                                <Checkbox
                                  key={index}
                                  showCase={true}
                                  checked={menuData?.isActive}
                                  onChange={() => {}}
                                  name={menuData.featureSubTitle}
                                  label={menuData.featureSubTitle}
                                  style={{ accentColor: "black" }}
                                  checkboxClassName="gap-2 mt-1"
                                  labelClassName={`${
                                    menuData?.isActive === false
                                      ? "!text-[18px] !text-[#E8E8E8] !font-Lato !font-semibold !leading-7"
                                      : "!text-[18px] !text-[#1C1C1C] !font-Lato !font-semibold !leading-7"
                                  }mt-1 `}
                                  disabled={
                                    menuData?.isActive === false ? true : false
                                  }
                                />
                              )}
                              {/* <div className="text-[18px] font-Lato font-semibold">
                              {menuData?.featureSubTitle}
                            </div> */}
                              {menuData?.type === "input" && (
                                <>
                                  <div className="text-[18px] font-Lato font-semibold">
                                    {menuData?.featureSubTitle}
                                  </div>
                                  <CustomInputBox
                                    label="Order"
                                    // containerClass="w-full"
                                    className="!h-[40px]"
                                    value={menuData?.value}
                                    onChange={(e) =>
                                      //   handle_Level_2_Pages(
                                      //     index,
                                      //     index2,
                                      //     true,
                                      //     e.target.value
                                      //   )
                                      {}
                                    }
                                    isDisabled={true}
                                  />
                                </>
                              )}
                            </div>
                            {menuData?.submenu?.length && (
                              <svg
                                className={`w-5 h-5 transform ${
                                  activeSubItem === index2 ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            )}
                          </div>
                          {activeSubItem === index2 && (
                            <div className="cursor-pointer px-10 py-3 flex gap-2">
                              {menuData?.submenu?.map(
                                (submenuData: any, index3: number) => (
                                  // console.log("menu screen", submenuData),
                                  <div
                                    key={index3}
                                    className="flex items-center gap-x-2"
                                  >
                                    {/* <Checkbox
                                      checked={submenuData?.isActive}
                                      onChange={() =>
                                        //   handle_Level_3_Pages(
                                        //     index,
                                        //     index2,
                                        //     index3,
                                        //     !submenuData?.isActive
                                        //   )
                                        {}
                                      }
                                    /> */}
                                    <Checkbox
                                      key={index}
                                      checked={submenuData?.isActive}
                                      showCase={true}
                                      onChange={() => {}}
                                      name={submenuData.name}
                                      label={submenuData.name}
                                      style={{ accentColor: "black" }}
                                      checkboxClassName="gap-2 mt-1"
                                      labelClassName={`${
                                        submenuData?.isActive === false
                                          ? "!text-[18px] !text-[#E8E8E8] !font-Lato !font-semibold !leading-7"
                                          : "!text-[18px] !text-[#1C1C1C] !font-Lato !font-semibold !leading-7"
                                      }mt-1 `}
                                      disabled={
                                        submenuData?.isActive === false
                                          ? true
                                          : false
                                      }
                                    />

                                    {/* <div className="text-[18px] font-Lato font-semibold">
                                      {submenuData?.name}
                                    </div> */}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="w-full h-52 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
          No Data Found
        </div>
      )}
    </>
  );
};

export default FeatureRateCard;
