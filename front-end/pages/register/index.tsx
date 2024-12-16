import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import NavbarSheet from "@/components/NavbarSheet";
import router from "next/router";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "player",
  });

  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Animation trigger

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100); // Delay for smooth animation
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    setSubmitted(true);
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Head>
        <title>Register | Manchester Shitty</title>
        <meta name="description" content="Create a new account" />
      </Head>
      <div className="min-h-screen bg-zinc-950 text-yellow-500 flex items-center justify-center">
        <div className="absolute top-12 right-8">
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
            Create an Account
          </h1>

          {submitted ? (
            <p
              className={`text-green-400 text-center font-semibold transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              Account successfully created!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`space-y-4 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div>
                <label htmlFor="username" className="block font-medium mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email:
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
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-700 text-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="player">Player</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-1">
                  Password:
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
                  Confirm Password:
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
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
