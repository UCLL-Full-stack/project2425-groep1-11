import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginButton from "./loginButton";

const NavbarSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  
    const handleLogout = () => {
      setIsLoggedIn(false);
    };

  const toggleSheet = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleSheet}
        className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-zinc-900 text-yellow-500 border-l-4 border-yellow-500 shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bebas font-bold">Menu</h2>
            <button
              onClick={toggleSheet}
              className="text-yellow-500 hover:text-red-500"
            >
              <FaTimes size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="block px-2 py-2 hover:bg-yellow-500 hover:text-black rounded transition"
            >
              Home
            </Link>
            <Link
              href="/players"
              className="block px-2 py-2 hover:bg-yellow-500 hover:text-black rounded transition"
            >
              Squad
            </Link>
            <Link
              href="/coaches"
              className="block px-2 py-2 hover:bg-yellow-500 hover:text-black rounded transition"
            >
              Coaches
            </Link>
            <Link
              href="/table"
              className="block px-2 py-2 hover:bg-yellow-500 hover:text-black rounded transition"
            >
              Table
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-4 justify-center">
            <div className=""><LoginButton isLoggedIn={isLoggedIn} onLogout={handleLogout}/></div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Language:</span>
              <select className="bg-zinc-800 text-yellow-500 rounded px-2 py-1 border border-yellow-500">
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
                <option value="ir">Perzisch</option>
                <option value="ja">Japans</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSheet;
