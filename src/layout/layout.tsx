import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

type Props = {};

export const CommonLayout = (props: Props) => {
  return (
    <div className="flex flex-col h-screen justify-between ">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>

      <div className="relative top-20">
        {/* <div>
            <Breadcrumb/>
          </div> */}

        <main className="pb-24">
          <div className="relative top-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
