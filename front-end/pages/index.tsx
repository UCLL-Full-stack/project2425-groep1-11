import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router from "next/router";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const { t } = useTranslation();

  const handleLocaleChange = async (event: { target: { value: string } }) => {
    const selectedLocale = event.target.value;
    router.push(router.pathname, router.asPath, { locale: selectedLocale });
  };

  return (
    <>
      <Head>
        <title>Manchester Shitty</title>
        <meta name="description" content="Official website of Manchester Shitty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>
      <main className="relative flex flex-col items-center justify-center h-screen bg-zinc-950 text-yellow-500 px-4 py-8">
        <div className="absolute top-4 right-4 md:top-12 md:right-24">
          <LoginButton onLogout={handleLogout} />
        </div>

        <div
          className={`flex flex-col items-center gap-6 md:gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="/images/shittylogo.svg"
            alt="Manchester Shitty Logo"
            width={200}
            height={200}
            priority
            draggable={false}
            className="md:w-96 md:h-96 w-40 h-40"
          />
          <h1 className="text-4xl md:text-7xl font-extrabold text-center font-bebas">
            {t("home.title")}
          </h1>
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link
              href="/players"
              className="relative block w-48 md:w-56 h-16 md:h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-lg md:text-xl transition-transform duration-300 group-hover:-translate-y-4">
                {t("home.squad")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-xs md:text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
                {t("home.squad_description")}
              </span>
            </Link>
            <Link
              href="/coaches"
              className="relative block w-48 md:w-56 h-16 md:h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-lg md:text-xl transition-transform duration-300 group-hover:-translate-y-4">
                {t("home.coach")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-xs md:text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
                {t("home.coach_description")}
              </span>
            </Link>
            <Link
              href="/table"
              className="relative block w-48 md:w-56 h-16 md:h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-lg md:text-xl transition-transform duration-300 group-hover:-translate-y-4">
                {t("home.table")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-xs md:text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
                {t("home.table_description")}
              </span>
            </Link>
          </nav>
        </div>
        <div
          className={`flex flex-col md:flex-row items-center mt-8 text-sm text-gray-400 gap-2 md:gap-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span>{t("nav.language.title")}</span>
          <select
            className="bg-zinc-800 text-yellow-500 rounded px-2 py-1 border border-yellow-500 focus:outline-none"
            onChange={handleLocaleChange}
            value={i18n.language}
          >
            <option value="en">{t("nav.language.en")}</option>
            <option value="nl">{t("nav.language.nl")}</option>
            <option value="ir">{t("nav.language.ir")}</option>
            <option value="ja">{t("nav.language.ja")}</option>
          </select>
        </div>
        <footer className="flex mt-10 text-xs md:text-sm text-gray-500">
          {t("home.footer", { year: new Date().getFullYear() })}
        </footer>
      </main>
    </>
  );
}


export const getServerSideProps = async (context) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    }
  }
};