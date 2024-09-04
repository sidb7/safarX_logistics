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
  return (
    <div className={`${className} items-center scroll-smooth w-[100%]`}>
      {(!isLgScreen || showHeaderForDesktop) && (
        <div
          className={`flex rounded-tl-lg rounded-tr-lg ${
            accordianOpen
              ? "border-b"
              : "border-none rounded-bl-lg rounded-br-lg"
          } items-center z-10  top-0  p-2 ${
            !isLgScreen ? "bg-[#F6F6F6] " : "bg-[#ffffff]"
          } bg-[#F6F6F6] top-0`}
          style={{ position: "sticky" }}
          onClick={() => setAccordianOpen(!accordianOpen)}
        >
          {headerChild}
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
