import React, { useEffect, useState } from "react";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

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
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", { username, password });
      handleClose(); 
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-zinc-900 border border-double border-yellow-500 rounded-lg p-6 w-96 shadow-lg transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-1 mt-1 block w-full ${
                errors.username ? "border-red-500" : "border-gray-300"
              } bg-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-black`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
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
              className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-zinc-800 hover:text-yellow-500 border border-yellow-500 transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-gray-500 hover:underline hover:text-red-500"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
