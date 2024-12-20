import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useTranslation } from "next-i18next";
import router from "next/router";

interface LoginButtonProps {
  onLogout: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setShowLogoutMessage(true);
    onLogout();

    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 2000);
    router.push("/");
  };

  return (
    <div className="relative">
      <button
        onClick={isLoggedIn ? handleLogout : toggleLogin}
        className={`font-bold py-2 px-4 rounded-lg transition ${
          isLoggedIn
            ? "bg-yellow-500 text-black hover:bg-red-500"
            : "bg-yellow-500 text-black hover:bg-green-500"
        }`}
      >
        {isLoggedIn ? t("login.out") : t("login.in")}
      </button>

      {showLogin && <Login onClose={toggleLogin} />}

      {showLogoutMessage && (
        <div
          className="fixed top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
        >
          {t("login.out_success")}
        </div>
      )}
    </div>
  );
};

export default LoginButton;
