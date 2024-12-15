import React, { useState } from "react";
import Login from "./Login";

interface LoginButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void; 
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoggedIn, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false); 

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout();
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
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      {showLogin && <Login onClose={toggleLogin} />}
    </div>
  );
};

export default LoginButton;
