import { useState, useEffect } from "react";
import NavBar from "./~components/NavBar";
import TopBar from "./~components/TopBar";
import { Outlet } from "react-router-dom";
import { ResponsiveState } from "../utils/responsiveState";
import { getRoles } from "../redux/reducers/role";
import { useDispatch } from "react-redux";
// import BottomBar from "./~components/BottomBar";

interface ICommonLayoutProps { }

const CommonLayout: React.FunctionComponent<ICommonLayoutProps> = (props) => {
  const [openMobileSideBar, setMobileSideBar]: any = useState(false);
  const { isLgScreen } = ResponsiveState();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoles());
  }, [])

  return (
    <>
      <main className="!h-screen">
        <NavBar
          openMobileSideBar={openMobileSideBar}
          setMobileSideBar={setMobileSideBar}
        />
        <TopBar
          openMobileSideBar={openMobileSideBar}
          setMobileSideBar={setMobileSideBar}
        />
        <main className="lg:ml-16  lg:pl-5 !h-[calc(100vh-74px)] overflow-auto">
          <Outlet />
          {/* <BottomBar  /> */}
        </main>
      </main>
    </>
  );
};

export default CommonLayout;
