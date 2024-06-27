import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../../assets/downwardArrow.svg";
import Cart from "./Cart";

type Props = {
  // setState: React.Dispatch<React.SetStateAction<any>>;
  setPlaceOrderButton: any;
  completeData: any;
  setUpdatedData: React.Dispatch<React.SetStateAction<any>>;
  updatedData: any;
  enabled: any;
};

const Index: React.FC<Props> = ({
  completeData,
  setUpdatedData,
  updatedData,
  setPlaceOrderButton,
  enabled,
}) => {
  const [accordianOpen, setOpenAccordian] = useState(false);
  const [boxAndProductAccordian, setBoxAndProductAccordian] = useState(false);
  const [borderErrorColor, setBorderErrorColor] = useState(false);
  const [initialBorderError, setInitialBorderError] = useState(false);

  const handleParentAccordian = (hasErrors: boolean) => {
    setBorderErrorColor(hasErrors);
  };

  useEffect(() => {
    if (updatedData?.boxInfo) {
      updatedData.boxInfo.forEach((box: any) => {
        box.products.forEach((product: any) => {
          if (!product.name || product.deadWeight === 0) {
            setInitialBorderError(true);
            handleParentAccordian(true);
          }
        });
        if (
          !box.name ||
          box.deadWeight === 0 ||
          box.length === 0 ||
          box.breadth === 0 ||
          box.height === 0
        ) {
          setInitialBorderError(true);
          handleParentAccordian(true);
        }
      });
    }
    if (updatedData?.boxInfo?.length === 0) {
      setInitialBorderError(true);
      handleParentAccordian(true);
    }
  }, [updatedData]);

  return (
    <div>
      <div>
        <div
          className={`flex justify-between border py-4 px-4 mx-4 rounded-lg ${
            borderErrorColor ? "border-red-600" : "border-[#E8E8E8]"
          }`}
          onClick={() => setOpenAccordian(!accordianOpen)}
        >
          <p>Box And Products</p>
          {accordianOpen ? (
            <img src={UpwardArrow} alt="icon" />
          ) : (
            <img src={DownwardArrow} alt="icon" />
          )}
        </div>

        <div>
          {accordianOpen && (
            <>
              {updatedData?.boxInfo?.length == 0 ? (
                <div>
                  <div className="flex justify-center items-center h-28 border-l border-r border-b border-[#E8E8E8] mx-4 rounded-lg text-base">
                    <p>No Data Found</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Cart
                    completeData={completeData}
                    setBoxAndProductAccordian={setBoxAndProductAccordian}
                    boxAndProductAccordian={boxAndProductAccordian}
                    boxBorderError={handleParentAccordian}
                    setUpdatedData={setUpdatedData}
                    updatedData={updatedData}
                    setPlaceOrderButton={setPlaceOrderButton}
                    enabled={enabled}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
