import { useState } from "react";
import Menu from "../../assets/Navbar/menu.svg";
import Orders from "../../assets/Navbar/orders.svg";
import Weight from "../../assets/Navbar/weight.svg";
import Catalogue from "../../assets/Navbar/catalogue.svg";
import { useNavigate } from "react-router-dom";

interface IBottomBarProps {}

const BottomBar: React.FunctionComponent<IBottomBarProps> = (props) => {
  const navigate = useNavigate();
  const menuItem = [
    {
      text: "Home",
      path: "/order",
      icon: Menu,
      isActive: false,
    },
    {
      text: "Orders",
      path: "/order",
      icon: Orders,
      isActive: false,
    },
    {
      text: "Weight",
      path: "/order",
      icon: Weight,
      isActive: false,
    },
    {
      text: "Catalogue",
      path: "/order",
      icon: Catalogue,
      isActive: false,
    },
  ];
  const [bottomMenuItem, setBottomMenuItem]: any = useState(menuItem);
  const handleNavigate = (index: number, path: any) => {
    bottomMenuItem?.forEach((e: any) => {
      e.isActive = false;
    });
    let arr = bottomMenuItem;
    arr[index].isActive = true;
    setBottomMenuItem(arr);
  };

  return (
    <>
      <section
        className="p-6 flex justify-between rounded-t-3xl lg:hidden  h-20 w-full fixed inset-x-0 bottom-0 z-10 bg-[white] cursor-pointer"
        style={{
          boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        {bottomMenuItem?.map((e: any, index: number) => {
          return (
            <>
              <div
                className={`m-1 cursor-pointer ${
                  e.isActive ? "bg-[black]" : ""
                }`}
                key={index}
              >
                {e.isActive}
                <img
                  src={e.icon}
                  height={"24px"}
                  width={"24px"}
                  onClick={() => handleNavigate(index, e.path)}
                  alt=""
                />
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default BottomBar;
