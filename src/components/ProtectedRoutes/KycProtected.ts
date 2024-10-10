import * as React from "react";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, getLocalStorage } from "../../utils/utility";
import { POST } from "../../utils/webService";
import { VALIDATE_USER_TOKEN } from "../../utils/ApiUrls";
import { setWalletBalance } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

interface Props {
  children?: any;
  // any props that come into the component
}

const KycProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //used getLocalStorage to get the token from local storage

  let sellerId = localStorage.getItem("sellerId");
  const localUserToken = getLocalStorage(
    `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
  );

  React.useEffect(() => {
    localUserToken &&
      (async () => {
        const response = await POST(VALIDATE_USER_TOKEN);

        if (!response?.data?.success) {
          setIsAuthenticated(false);
          clearLocalStorage();
          navigate("/auth/login");
        } else {
          const { nextStep } = response?.data?.data[0];
          const { kyc, bank, qna } = nextStep;

          if (kyc === false || bank === false || qna === false) {
            localStorage.setItem(
              "kycValue",
              JSON.stringify(response?.data?.data[0])
            );
            localStorage.setItem(
              "walletAmt",
              response?.data?.data[0]?.walletBalance
            );
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

export default KycProtectedRoute;
