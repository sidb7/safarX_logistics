import { createContext, useContext, useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import downArrow from "../../../assets/downwardArrow.svg";

function Accordian({
  children,
  headerChild,
  showHeaderForDesktop,
  className,
  childClassName,
}: any) {
  const [accordianOpen, setAccordianOpen] = useState(false);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  console.log("accordian-comdition", !accordianOpen && !isLgScreen);

  return (
    <div className={`${className} items-center scroll-smooth w-[100%]`}>
      {(!isLgScreen || showHeaderForDesktop) && (
        <div
          className={`flex rounded-tl-lg rounded-tr-lg ${
            accordianOpen && "border-b"
          } items-center z-10  top-0  p-2 ${
            !isLgScreen ? "bg-[#F6F6F6] " : "bg-[#ffffff] border-b"
          } bg-[#F6F6F6] top-0 
          ${!accordianOpen && !isLgScreen ? "rounded-bl-lg rounded-br-lg" : ""}
          `}
          style={{ position: "sticky" }}
        >
          {headerChild}

          {!isLgScreen && (
            <button
              className="mx-2 w-[25px] h-[25px] flex justify-center items-center rounded-full hover:bg-[#e7e7e7] transition duration-300 ease-in-out"
              onClick={() => setAccordianOpen(!accordianOpen)}
            >
              <img src={downArrow} />
            </button>
          )}
        </div>
      )}
      {!isLgScreen ? (
        accordianOpen && <div className={`${childClassName}`}>{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

export default Accordian;
