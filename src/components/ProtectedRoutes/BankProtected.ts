import * as React from "react";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, getLocalStorage } from "../../utils/utility";
import { POST } from "../../utils/webService";
import { VALIDATE_USER_TOKEN } from "../../utils/ApiUrls";
import { setWalletBalance } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import sessionManager from "../../utils/sessionManager";

interface Props {
  children?: any;
  // any props that come into the component
}

const BankProtected = ({ children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { sellerInfo } = sessionManager({});
  // let sellerId = localStorage.getItem("sellerId");
  let sellerId = sellerInfo?.sellerId;

  //used getLocalStorage to get the token from local storage

  // const localUserToken = getLocalStorage(
  //   `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
  // );

  const token = sellerInfo?.token;
  const localUserToken = token;

  React.useEffect(() => {
    localUserToken &&
      (async () => {
        const response = await POST(VALIDATE_USER_TOKEN);

        if (!response?.data?.success) {
          setIsAuthenticated(false);
          clearLocalStorage();
          sessionStorage.clear();
          navigate("/auth/login");
        } else {
          const { nextStep, walletBalance } = response?.data?.data[0];
          const { kyc, bank } = nextStep;

          //if kyc not verified return to "/"
          if (!kyc) {
            navigate("/");
            return;
          }

          //if bank not verified return to "/"
          if (!bank || !(walletBalance > 0)) {
            const { sellerInfo } = sessionManager(response?.data?.data[0]);
            // localStorage.setItem(
            //   "kycValue",
            //   JSON.stringify(response?.data?.data[0])
            // );
            // localStorage.setItem(
            //   "walletAmt",
            //   response?.data?.data[0]?.walletBalance
            // );
            setIsAuthenticated(true);
            dispatch(
              setWalletBalance({ amt: response?.data?.data[0]?.walletBalance })
            );
          } else {
            navigate("/");
          }
        }
      })();
  }, [localUserToken, navigate]);

  if (isAuthenticated === true) {
    return children;
  }
};

export default BankProtected;
