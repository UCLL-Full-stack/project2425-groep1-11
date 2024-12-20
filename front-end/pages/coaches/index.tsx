import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSortAlphaDown, FaSortAlphaUp, FaTrash } from "react-icons/fa";
import NavbarSheet from "@/components/NavbarSheet";
import useSWR from "swr";

import { Coach } from "@/types";
import Image from "next/image";
import Head from "next/head";
import AddCoach from "@/components/coaches/AddCoach";
import EditCoach from "@/components/coaches/EditCoach";
import DeleteCoach from "@/components/coaches/DeleteCoach";
import CoachService from "@/services/CoachService";
import router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Coaches: React.FC = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortedCoaches, setSortedCoaches] = useState<Coach[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [role, setRole] = useState("");

  const { data: coachList, error, mutate } = useSWR("/coaches", CoachService.getAllCoaches);
  const  {t} = useTranslation('');
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (coachList) {
      setSortedCoaches([...coachList]);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }if (role !== null) {setRole(role)};
  }, [coachList]);

  const handleAddCoach = async (newCoach: Omit<Coach, "id">) => {
    await CoachService.addCoach({ ...newCoach, teamId: 1 });
    mutate();
    setIsAdding(false);
  };

  const handleEditCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsEditing(true);
  };

  const handleDeleteCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsDeleting(true);
  };

  const saveCoach = async (updatedCoach: Coach) => {
    await CoachService.updateCoach(updatedCoach.id, updatedCoach);
    mutate();
    setIsEditing(false);
    setSelectedCoach(null);
  };

  const confirmDelete = async () => {
    if (selectedCoach) {
      await CoachService.deleteCoach(selectedCoach.id);
      mutate();
      setIsDeleting(false);
      setSelectedCoach(null);
    }
  };

  const handleSortCoaches = () => {
    const sorted = [...sortedCoaches].sort((a, b) =>
      sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortedCoaches(sorted);
    setSortAscending(!sortAscending);
  };  

  console.log(role);

  if (error)
    return (
      <>
        <div className="text-3xl absolute inset-0 flex items-center justify-center text-red-500 font-bebas bg-zinc-900">
          {t('coach.messages.fail')}
        </div>
        <div className="absolute top-12 right-8">
          <NavbarSheet />
        </div>
      </>
    );

  if (!coachList)
    return (
      <div className="text-3xl absolute inset-0 flex items-center justify-center text-yellow-500 font-bebas bg-zinc-900">
        {t('coach.messages.loading')}
      </div>
    );

  return (
    <>
      <Head>
        <title>Coaches | Manchester Shitty</title>
        <meta name="description" content="Meet the coaches of Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>

      <div className="min-h-screen bg-zinc-900 py-8">
        <div className="absolute top-12 right-24">
          <NavbarSheet />
        </div>
        <div className="absolute top-12 left-24 flex gap-4">
          {role === "Admin" && (
            <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-green-600 hover:text-white transition"
          >
            <FaPlus /> {t('coach.coach')}
          </button>
          )}
          {(role === "Admin" || role === "Coach") && (
            <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-green-600 hover:text-white transition"
          >
            <FaPlus /> {t('coach.coach')}
          </button>
          )}
          <button
            onClick={handleSortCoaches}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-blue-600 hover:text-white transition"
          >
            {sortAscending ? <FaSortAlphaDown /> : <FaSortAlphaUp />} {t('coach.buttons.sort')}
          </button>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={100}
              height={100}
              priority
              draggable={false}
              className="mr-4 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-6xl font-bold text-yellow-500 font-bebas">{t('coach.title')}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {sortedCoaches.map((coach: Coach, index: number) => (
              <div
                key={coach.id}
                className={`relative bg-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-4 bg-gray-300 rounded-lg">
                  <div className="absolute right-4 top-2 flex gap-2">
                    {role === "Admin" && (
                      <>
                      <button
                        onClick={() => handleEditCoach(coach)}
                        className="text-black hover:text-yellow-500 transition"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteCoach(coach)}
                        className="text-black hover:text-red-600 transition"
                      >
                        <FaTrash size={20} />
                      </button> 
                      </>
                    )}
                   
                  </div>
                  <div className="bg-gray-300 flex justify-center items-center p-2 rounded-lg">
                    <img
                      src={coach.imageUrl || "/images/shittylogo.png"}
                      alt={coach.name}
                      className="w-full h-auto mt-2 rounded"
                      draggable={false}
                    />
                 </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{coach.name}</h2>
                  <p className="text-gray-800">
                    <strong>{t('coach.fields.job')}</strong> {coach.job}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAdding && <AddCoach onSave={handleAddCoach} onClose={() => setIsAdding(false)} />}
      {isEditing && selectedCoach && (
        <EditCoach
          coach={selectedCoach}
          onSave={saveCoach}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && selectedCoach && (
        <DeleteCoach
          coachName={selectedCoach.name}
          onDelete={confirmDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    }
  }
};




export default Coaches;
