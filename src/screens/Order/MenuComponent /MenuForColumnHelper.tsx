import { useEffect, useRef, useState } from "react";
import HamBurger from "../../../assets/HamBurger.svg";
interface IMenuForColumnHelperProps {}

const MenuForColumnHelper: React.FunctionComponent<
  IMenuForColumnHelperProps
> = (props) => {
  const dropdownRef = useRef<any>();
  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div ref={dropdownRef}>
        <div className="flex" onClick={() => setIsExpanded(true)}>
          <img src={HamBurger} alt="" />
        </div>
        {isExpanded && (
          <div
            className="sticky w-56 rounded-md shadow-lg bg-white  ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-0.5" role="none">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Your Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 cursor-pointer  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => {}}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuForColumnHelper;
