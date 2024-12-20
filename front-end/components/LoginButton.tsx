import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useTranslation } from "next-i18next";

interface LoginButtonProps {
  onLogout: () => void; 
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation(); 

  // Check session storage for token on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage on logout
    setIsLoggedIn(false); // Update state
    onLogout(); // Call the onLogout callback
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state on successful login
    setShowLogin(false); // Close login modal
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
    </div>
  );
};

export default LoginButton;
