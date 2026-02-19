import React, { useEffect } from "react";
import { useAuthState } from "../contextapi/AuthState";
import { useNavigate } from "react-router-dom";

function AuthProtector({ children }) {
  const { isLogin, token } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!isLogin) && (!token)) {
      navigate("/login");
      return;
    }
  }, []);

  return <>{children}</>;
}

export default AuthProtector;
