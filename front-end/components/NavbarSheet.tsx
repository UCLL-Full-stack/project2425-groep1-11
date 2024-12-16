import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaTable,
} from "react-icons/fa";
import LoginButton from "./LoginButton";

const NavbarSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSheet = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  const getLinkClass = (path: string) =>
    router.pathname === path
      ? "bg-yellow-500 text-black"
      : "hover:bg-yellow-500 hover:text-black";

  return (
    <div className="relative z-50">
      <button
        onClick={toggleSheet}
        className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSheet}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-zinc-900 text-yellow-500 border-l border-yellow-500 shadow-2xl transform transition-transform duration-500 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-500">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={50}
              height={50}
            />
            <button
              onClick={toggleSheet}
              className="text-yellow-500 hover:text-red-500 transition"
            >
              <FaTimes size={28} />
            </button>
          </div>

          <nav className="font-bebas flex flex-col px-6 mt-8">
            <Link
              href="/"
              className={`flex items-center gap-4 text-xl font-semibold py-3 px-4 rounded transition-all ${getLinkClass(
                "/"
              )}`}
            >
              <FaHome size={20} /> Home
            </Link>
            <Link
              href="/players"
              className={`flex items-center gap-4 text-xl font-semibold py-3 px-4 rounded transition-all ${getLinkClass(
                "/players"
              )}`}
            >
              <FaUsers size={20} /> Squad
            </Link>
            <Link
              href="/coaches"
              className={`flex items-center gap-4 text-xl font-semibold py-3 px-4 rounded transition-all ${getLinkClass(
                "/coaches"
              )}`}
            >
              <FaChalkboardTeacher size={20} /> Coaches
            </Link>
            <Link
              href="/table"
              className={`flex items-center gap-4 text-xl font-semibold py-3 px-4 rounded transition-all ${getLinkClass(
                "/table"
              )}`}
            >
              <FaTable size={20} /> Table
            </Link>
          </nav>

          <div className="mt-auto px-6 py-6 border-t border-yellow-500">
            <LoginButton isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>Language:</span>
              <select className="bg-zinc-800 text-yellow-500 rounded px-2 py-1 border border-yellow-500 focus:outline-none">
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
