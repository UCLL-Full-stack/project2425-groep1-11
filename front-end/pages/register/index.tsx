import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import NavbarSheet from "@/components/NavbarSheet";
import router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService"; 

type Role = "Player" | "Coach" | "Admin";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Player",
  });

  const [errors, setErrors] = useState<{ confirmPassword?: string; general?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Animation trigger
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100); // Delay for smooth animation
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, confirmPassword: "", general: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: t("register.fail") });
      return;
    }

    try {
      const response = await UserService.signup({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      console.log("User registered successfully:", response);
      setSubmitted(true);

      
      setTimeout(() => router.push("/"), 2000);
    } catch (error: any) {
      console.error("Error during registration:", error);
      setErrors({ general: error.message || "An error occurred. Please try again." });
    }
  };

  return (
    <>
      <Head>
        <title>Register | Manchester Shitty</title>
        <meta name="description" content="Create a new account" />
      </Head>
      <div className="min-h-screen bg-zinc-950 text-yellow-500 flex items-center justify-center">
        <div className="absolute top-12 right-24">
          <NavbarSheet />
        </div>
        <div
          className={`w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-lg transform transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={80}
              height={80}
              draggable={false}
              className={`transition-all duration-700 cursor-pointer ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              onClick={() => router.push("/")}
            />
          </div>
          <h1
            className={`text-4xl font-bold text-center font-bebas mb-6 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {t("register.title")}
          </h1>

          {submitted ? (
            <p
              className={`text-green-400 text-center font-semibold transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {t("register.success")}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`space-y-4 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {errors.general && (
                <p className="text-red-500 text-center font-semibold">{errors.general}</p>
              )}
              

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  {t("register.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="role" className="block font-medium mb-1">
                  {t("register.role")}
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="Player">{t("register.player")}</option>
                  <option value="Coach">{t("register.coach")}</option>
                  <option value="Admin">{t("register.admin")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-1">
                  {t("register.password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-medium mb-1">
                  {t("register.confirm")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
              >
                {t("register.register")}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Register;
