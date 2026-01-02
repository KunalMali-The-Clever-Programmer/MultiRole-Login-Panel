import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OAuthRedirect() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      login({ token, role: "USER", username: "GoogleUser" });
      navigate("/user", { replace: true });
    }
  }, []);

  return <h2>Logging you in...</h2>;
}
