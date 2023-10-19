import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/auth");
    }
  }, [cookies.access_token, navigate]);
};

export default useAuth;
