import { useEffect, useRef, useState } from "react";
import InputWithImage from "../../components/InputWithImage/InputWithImage";
import PowerBoosterlogo from "../../assets/powerbooster.svg";
import ProfileLogo from "../../assets/Navbar/essential.svg";
import ShipyaariLogo from "../../assets/Navbar/shipyaariLogos.svg";
import HamMenu from "../../assets/Navbar/hamMenu.svg";
import { GetCurrentPath, clearLocalStorage } from "../../utils/utility";
import SearchIcon from "../../assets/Search.svg";
import CustomButton from "../../components/Button/index";
import locationImage from "../../assets/serv/location.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import ServicabilityPincode from "./ServicabilityPincode";
import { useNavigate } from "react-router-dom";

interface ITopBarProps {
  openMobileSideBar: any;
  setMobileSideBar: any;
}

const TopBar: React.FunctionComponent<ITopBarProps> = (props) => {
  const navigate = useNavigate();
  const { openMobileSideBar, setMobileSideBar } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav
        className="px-6 h-[60px] py-2 lg:p-3 grid justify-items-stretch items-center w-full box_shadow"
        style={{
          boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="justify-between lg:justify-self-end flex items-center gap-3">
          <div className="flex items-center gap-x-3 lg:hidden">
            <img src={HamMenu} alt="" onClick={() => setMobileSideBar(true)} />

            <div className="mt-1 p-1">
              <img src={ShipyaariLogo} alt="" />
            </div>
          </div>

          {/* <InputWithImage
            imgSrc={SearchIcon}
            inputClassName="hidden lg:!w-80 lg:flex !p-0"
            placeholder="Search"
          /> */}

          <img
            src={locationImage}
            width={"22px"}
            height={"22px"}
            alt=""
            className="cursor-pointer hidden"
            onClick={() => setIsModalOpen(true)}
          />

          <CustomButton
            icon={PowerBoosterlogo}
            showIcon={true}
            onlyIcon={true}
            className="bg-white hidden lg:!w-12"
            text={""}
            onClick={() => {}}
          />
          <div className="flex justify-self-end gap-x-3 ">
            <img
              src={SearchIcon}
              width={"22px"}
              className="lg:hidden"
              height={"22px"}
              alt=""
            />
            <div
              className="relative cursor-pointer col-span-1"
              ref={dropdownRef}
              onClick={() => setIsOpen(!isOpen)}
            >
              <CustomButton
                icon={ProfileLogo}
                showIcon={true}
                onlyIcon={true}
                className="bg-white !w-6 !h-6 !p-0 lg:w-fit "
                text={""}
                onClick={() => {}}
              />

              {isModalOpen && (
                <CenterModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <ServicabilityPincode
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </CenterModal>
              )}

              {/* <img src={ProfileLogo} alt="" /> */}
              {isOpen && (
                <div
                  className="origin-top-right z-10 absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white  ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
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
                      onClick={() => {
                        clearLocalStorage();
                        navigate("/auth/login");
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
