import * as React from "react";
import NavBar from "./~components/NavBar";
import TopBar from "./~components/TopBar";
import { Outlet } from "react-router-dom";

interface ICommonLayoutProps {}

const CommonLayout: React.FunctionComponent<ICommonLayoutProps> = (props) => {
  return (
    <>
      <main className="h-screen">
        {/* <NavBar /> */}
        {/* <TopBar /> */}
        {/* <main className="ml-12 p-6 h-[calc(100vh-74px)] overflow-auto">
          <Outlet />
        </main> */}
      </main>
    </>
  );
};

export default CommonLayout;
