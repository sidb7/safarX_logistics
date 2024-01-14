import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Old_NavBar";

interface ITypesProps {}

const Layout = (props: ITypesProps) => {
  return (
    <>
      <div className="flex flex-col h-screen justify-between ">
        <header className="fixed top-0 z-10 w-full ">{/* <NavBar /> */}</header>

        <div>
          <main>
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
