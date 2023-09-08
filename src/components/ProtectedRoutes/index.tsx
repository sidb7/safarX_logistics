import * as React from "react";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, getLocalStorage } from "../../utils/utility";
import { POST } from "../../utils/webService";
import { VALIDATE_USER_TOKEN } from "../../utils/ApiUrls";

interface Props {
  children?: any;
  // any props that come into the component
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //used getLocalStorage to get the token from local storage

  const localUserToken = getLocalStorage(
    "891f5e6d-b3b3-4c16-929d-b06c3895e38d"
  );

  React.useEffect(() => {
    (async () => {
      const response = await POST(VALIDATE_USER_TOKEN);
      if (!response?.data?.success) {
        setIsAuthenticated(false);
        clearLocalStorage();
        navigate("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    })();
  }, [localUserToken, navigate]);

  if (isAuthenticated === true) {
    return children;
  }
};

export default ProtectedRoute;
