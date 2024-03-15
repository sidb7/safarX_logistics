import { useState, useEffect } from "react";
import NavBar from "./~components/NavBar";
import TopBar from "./~components/TopBar";
import { Outlet, useNavigate } from "react-router-dom";
import { ResponsiveState } from "../utils/responsiveState";
import { getRoles } from "../redux/reducers/role";
import { useDispatch } from "react-redux";
// import BottomBar from "./~components/BottomBar";

interface ICommonLayoutProps {}

const CommonLayout: React.FunctionComponent<ICommonLayoutProps> = (props) => {
  const [openMobileSideBar, setMobileSideBar] = useState<boolean>(false);
  const { isLgScreen } = ResponsiveState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    const userInfo: any = sessionStorage?.getItem("userInfo");
    const { sellerId, email, isReturningUser, name, nextStep } =
      JSON.parse(userInfo);

    window?.dataLayer?.push({
      event: "page_view",
      seller_email: email,
      sellerId: sellerId,
      seller_name: name,
      seller_kyc: nextStep?.kyc,
      seller_bank_verification_done: nextStep?.bank,
      isReturningUser: isReturningUser,
    });
  }, [useNavigate()]);

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
        <main className="lg:ml-16  lg:pl-5 !h-[calc(100vh-150px)] customScroll">
          <Outlet />
          {/* <BottomBar  /> */}
        </main>
      </main>
    </>
  );
};

export default CommonLayout;
