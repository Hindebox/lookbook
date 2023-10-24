import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const isAuthenticated = !!cookies.access_token;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useAuth;
