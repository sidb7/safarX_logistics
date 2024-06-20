import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../../assets/downwardArrow.svg";
import Cart from "./Cart";

const Index = (completeData: any) => {
  const [accordianOpen, setOpenAccordian] = useState<any>(false);
  const [boxAndProductAccordian, setBoxAndProductAccordian] =
    useState<boolean>(false);
  const [borderErrorColor, setBorderErrorColor] = useState<any>(false);
  const [initialBorderError, setInitialBorderError] = useState<any>(false);

  const handleParentAccordian = (hasErrors: any) => {
    setBorderErrorColor(hasErrors);
    // const hasAnyErrors = Object.values(hasErrors).some(
    //   (error) => error === true
    // );
    // setBorderErrorColor(hasAnyErrors);
  };

  useEffect(() => {
    completeData?.completeData?.boxInfo?.map((box: any, index: any) => {
      box?.products?.map((product: any, index: any) => {
        if (product?.name === "" || product?.deadWeight === 0) {
          setInitialBorderError(true);
        }
      });
      if (
        box?.name === "" ||
        box?.deadWeight === 0 ||
        box?.length === 0 ||
        box?.breadth === 0 ||
        box?.height === 0
      ) {
        setInitialBorderError(true);
      }
    });
  }, [completeData]);

  return (
    <div>
      <div>
        <div
          className={`flex justify-between border py-4 px-4 mx-4  rounded-lg  ${
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

        {accordianOpen && (
          <Cart
            completeData={completeData}
            setBoxAndProductAccordian={setBoxAndProductAccordian}
            boxAndProductAccordian={boxAndProductAccordian}
            boxBorderError={handleParentAccordian}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
