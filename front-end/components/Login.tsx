import { useTranslation } from "next-i18next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import UserService from "@/services/UserService";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login success
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = `${t("login.popup.username")} ${t("login.fail")}`;
    }
    if (!password.trim()) {
      newErrors.password = `${t("login.popup.password")} ${t("login.fail")}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await UserService.login({ email, password });
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("role", response.role);
        sessionStorage.setItem("email", response.email);
        sessionStorage.setItem("id", response.id);
        console.log("Login successful:", response);

        setIsLoggedIn(true); 
        setTimeout(() => {
          router.push("/"); 
          handleClose();
        }, 2000); 
      } catch (error: any) {
        setErrors({ general: error.message || t("login.fail") });
      }
    }
  };

  return (
    <div
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  onClick={handleBackdropClick}
>
  <div
    className={`bg-zinc-900 border border-yellow-500 rounded-lg p-6 w-96 shadow-lg transform transition-all duration-300 ${
      isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
    }`}
  >
    <h2 className="text-xl font-bold text-white mb-4">{t("login.in")}</h2>
    {isLoggedIn ? (
      <p className="text-green-500 text-center mb-4">{t("login.success")}</p>
    ) : (
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            {t("login.popup.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-1 mt-1 block w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            } bg-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-black`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            {t("login.popup.password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-1 mt-1 block w-full ${
              errors.password ? "border-red-500" : "border-gray-300"
            } bg-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-black`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-yellow-500 font-bold text-black py-2 px-4 rounded-lg hover:bg-zinc-800 hover:text-yellow-500 border border-yellow-500 transition"
          >
            {t("login.in")}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-gray-500 hover:underline hover:text-red-500"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    )}

    {!isLoggedIn && (
      <div className="mt-4">
        <p className="text-sm text-gray-500 text-center mb-2">
          {t("login.popup.no_account")}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            {t("login.popup.register")}
          </span>
        </p>
        <table className="w-full text-black text-sm mt-2 rounded-lg border-gray-600">
          <thead>
            <tr className="bg-yellow-500 ">
              <th className="border  border-gray-600 px-2 py-1">{t("login.popup.email")}</th>
              <th className="border border-gray-600 px-2 py-1">{t("login.popup.password")}</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr>
              <td className="border text-center border-gray-600 px-2 py-1">team11@admin.be</td>
              <td className="border text-center border-gray-600 px-2 py-1">admin</td>
            </tr>
            <tr>
              <td className="border text-center border-gray-600 px-2 py-1">team11@coach.be</td>
              <td className="border text-center border-gray-600 px-2 py-1">coach</td>
            </tr>
            <tr>
              <td className="border text-center border-gray-600 px-2 py-1">team11@player.be</td>
              <td className="border text-center border-gray-600 px-2 py-1">player</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

  );
};

export default Login;
