import React, { useEffect, useState } from "react";
import UpwardArrow from "../../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../../assets/downwardArrow.svg";
import Box from "./Box";
import Products from "./Product";

interface IPROPS {
  completeData: any;
  setBoxAndProductAccordian: any;
  boxAndProductAccordian: any;
  boxBorderError: any;
}

const Cart = (props: IPROPS) => {
  const {
    completeData,
    setBoxAndProductAccordian,
    boxAndProductAccordian,
    boxBorderError,
  } = props;

  const [productErrors, setProductErrors] = useState<{
    [key: number]: boolean;
  }>({});
  const [boxErrors, setBoxErrors] = useState<{ [key: number]: boolean }>({});
  const [packageErrorBorders, setPackageErrorBorders] = useState<{
    [key: number]: boolean;
  }>({});

  // Data came from previous file
  const boxInfo = completeData?.completeData?.boxInfo;

  // State for opening only particular on clicked accordion
  const [openCartIndex, setOpenCartIndex] = useState<number | null>(null);

  const handleProductCallback = (index: number, hasErrors: boolean) => {
    boxBorderError(hasErrors);

    setProductErrors((prevErrors) => {
      if (prevErrors[index] === hasErrors) {
        return prevErrors;
      }

      if (hasErrors) {
        setBoxAndProductAccordian(hasErrors);
      }
      return {
        ...prevErrors,
        [index]: hasErrors,
      };
    });

    setPackageErrorBorders((prevBorders) => ({
      ...prevBorders,
      [index]: hasErrors,
    }));
  };

  const handleBoxCallback = (index: number, hasErrors: boolean) => {
    boxBorderError(hasErrors);

    setBoxErrors((prevErrors) => {
      if (prevErrors[index] === hasErrors) {
        return prevErrors;
      }
      return {
        ...prevErrors,
        [index]: hasErrors,
      };
    });

    setPackageErrorBorders((prevBorders) => ({
      ...prevBorders,
      [index]: hasErrors,
    }));
  };

  const toggleCart = (index: number) => {
    if (openCartIndex === index) {
      setOpenCartIndex(null);
    } else {
      setOpenCartIndex(index);
    }
  };

  useEffect(() => {
    completeData?.completeData?.boxInfo?.forEach(
      (box: any, boxIndex: number) => {
        let boxHasError = false;
        if (
          box?.name === "" ||
          box?.deadWeight === 0 ||
          box?.length === 0 ||
          box?.breadth === 0 ||
          box?.height === 0
        ) {
          boxHasError = true;
        }
        box?.products.forEach((product: any) => {
          if (product?.name === "" || product?.deadWeight === 0) {
            boxHasError = true;
          }
        });
        if (boxHasError) {
          setPackageErrorBorders((prevBorders) => ({
            ...prevBorders,
            [boxIndex]: true,
          }));
        }
      }
    );
  }, [completeData]);

  return (
    <div>
      <div className="border-b border-l border-r mx-4 p-4 mb-4 rounded-lg border-[#E8E8E8]">
        {boxInfo?.map((box: any, index: number) => {
          const isOpen = openCartIndex === index;
          const hasError =
            productErrors[index] ||
            boxErrors[index] ||
            packageErrorBorders[index] ||
            false;

          return (
            <div key={index}>
              <div>
                <div
                  className={`flex justify-between border rounded-lg ${
                    hasError ? "border-red-600" : "border-green"
                  } px-4 py-4 my-0 bg-gray-50`}
                  onClick={() => toggleCart(index)}
                >
                  <p>Package {index + 1}</p>
                  {isOpen ? (
                    <img src={UpwardArrow} alt="Collapse" />
                  ) : (
                    <img src={DownwardArrow} alt="Expand" />
                  )}
                </div>
              </div>
              <div className="mb-4">
                {isOpen && (
                  <div className="border-b border-l border-r border-[#E8E8E8] p-4 flex flex-col gap-y-4">
                    <Products
                      completeData={completeData}
                      index={index}
                      onChildClick={handleProductCallback}
                    />
                    <Box
                      completeData={completeData}
                      index={index}
                      onChildClick={handleBoxCallback}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
