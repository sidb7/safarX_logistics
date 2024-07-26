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
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        console.log("🚀 ~ useEffect ~ parsedUserInfo:", parsedUserInfo);
        const {
          sellerId,
          email,
          contactNumber,
          isReturningUser,
          name,
          nextStep,
          isWalletRechage,
        } = parsedUserInfo;

        window?.dataLayer?.push({
          event: "page_view",
          seller_email: email,
          sellerId: sellerId,
          seller_name: name,
          seller_kyc: nextStep?.kyc,
          isWalletRechage: isWalletRechage,
          seller_mobileNumber: contactNumber,
          seller_bank_verification_done: nextStep?.bank,
          isReturningUser: isReturningUser,
        });
      } catch (error) {
        console.error("Failed to parse user info:", error);
      }
    } else {
      console.log("No user info available in localStorage");
    }
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
        <main className="lg:ml-16  lg:pl-5 !h-[calc(100vh-65px)] customScroll">
          <Outlet />
          {/* <BottomBar  /> */}
        </main>
      </main>
    </>
  );
};

export default CommonLayout;
