import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successEmitter } from "../ToastEmitter";
import { BaseUrls } from "../BaseUrls";

export const authContext = createContext(null);

function AuthState({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("auth-token") || "");
  const [isLogin, setIsLogin] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [profile, setProfile] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem("auth-token");
    setToken("");
    setIsLogin(false);
    navigate("/login");
    successEmitter("Logout successfully!");
  };

  const getProfileFunc = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${BaseUrls}/auth/profile`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setIsLogin(true);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        isLogin,
        fetching,
        setIsLogin,
        profile,
        setProfile,
        logoutHandler,
        token,
        setToken,
        getProfileFunc,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
