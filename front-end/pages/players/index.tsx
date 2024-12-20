import { Player, User } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";
import { FaEdit, FaPlus, FaSortNumericDown, FaSortNumericUp, FaTrash } from "react-icons/fa";
import EditPlayer from "@/components/player/EditPlayer";
import DeletePlayer from "@/components/player/DeletePlayer";
import PlayerService from "@/services/PlayerService";
import useSWR from "swr";
import AddPlayer from "@/components/player/AddPlayer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Players: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [role, setRole] = useState("");
  const { t } = useTranslation("");
  // Fetch players 
  const { data: playerList, error, mutate } = useSWR("/players", PlayerService.getAllPlayers);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== null) {setRole(role)};
    if (playerList) {
      setSortedPlayers([...playerList]);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [playerList]);

  const handleAddPlayer = async (newPlayer: Omit<Player, "id">) => {
    await PlayerService.addPlayer({...newPlayer, teamId: 1});
    mutate();
    setIsAdding(false);
  };

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setIsEditing(true);
  };

  const handleDelete = (player: Player) => {
    setSelectedPlayer(player);
    setIsDeleting(true);
  };

  const savePlayer = async (updatedPlayer: Player) => {
    await PlayerService.updatePlayer(updatedPlayer.id!, {
      name: updatedPlayer.name,
      number: updatedPlayer.number,
      position: updatedPlayer.position,
      birthdate: updatedPlayer.birthdate,
      stat: {
        id: updatedPlayer.stat.id!,
        appearances: updatedPlayer.stat.appearances,
        goals: updatedPlayer.stat.goals,
        assists: updatedPlayer.stat.assists,
      },
    });
    mutate();
    setIsEditing(false);
    setSelectedPlayer(null);
  };

  const confirmDelete = async () => {
    if (selectedPlayer) {
      await PlayerService.deletePlayer(selectedPlayer.id!);
      mutate();
      setIsDeleting(false);
      setSelectedPlayer(null);
    }
  };

  const handleSortPlayers = () => {
    const sorted = [...sortedPlayers].sort((a, b) => 
      sortAscending ? a.number - b.number : b.number - a.number
    );
    setSortedPlayers(sorted);
    setSortAscending(!sortAscending);
  };

  if (error)
    return (
      <>
        <div className="text-3xl absolute inset-0 flex items-center justify-center text-red-500 font-bebas bg-zinc-900">
          {t('squad.fail')}
        </div>
        <div className="absolute top-12 right-8">
          <NavbarSheet />
        </div>
      </>
    );

  if (!playerList)
    return (
      <>
        <div className="text-3xl absolute inset-0 flex items-center justify-center text-yellow-500 font-bebas bg-zinc-900">
        {t('squad.loading')}
        </div>
        <div className="absolute top-12 right-8">
          <NavbarSheet />
        </div>
      </>
    );
    console.log(role);
  return (
    <>
      <Head>
        <title>Squad | Manchester Shitty</title>
        <meta name="description" content="Meet the players of Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>

      <div className="min-h-screen bg-zinc-900 py-8">
        <div className="absolute top-12 right-24">
          <NavbarSheet />
        </div>
        <div className="absolute top-12 left-24 flex gap-4">
        {(role === "Admin" || role === "Coach") && (
          <>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-green-600 hover:text-white transition"
          >
            <FaPlus /> {t('squad.add_button')}
          </button>
          </>
        )}
        
          <button
            onClick={handleSortPlayers}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-zinc-900 font-bold rounded hover:bg-blue-600 hover:text-white transition"
          >
            {sortAscending ? <FaSortNumericDown /> : <FaSortNumericUp />}
            {t('squad.sort_button')}
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
            <h1 className="text-6xl font-bold text-yellow-500 font-bebas">{t('squad.title')}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {sortedPlayers.map((player: Player, index: number) => (
              <div
                key={player.id}
                className={`relative bg-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-gray-300 flex justify-center items-center p-2 rounded-lg">
                <img
                  src={player.imageUrl || "/images/shittylogo.png"}
                  alt={player.name}
                  className={`${player.imageUrl ? "w-4/6" : "w-5/6"} object-contain`}
                />
                </div>


                <div className="p-4 bg-gray-300 rounded-lg">
                  <div className="absolute right-4 top-2 flex gap-2">
                    {role === "Admin" && (
                      <><button
                      onClick={() => handleEdit(player)}
                      className="text-black hover:text-yellow-500 transition"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(player)}
                      className="text-black hover:text-red-600 transition"
                    >
                      <FaTrash size={20} />
                    </button></>
                    )}
                    
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{player.name}</h2>
                  <p className="text-gray-800">
                    <strong>{t('squad.player_position')}</strong> {player.position}
                  </p>
                  <p className="text-gray-800">
                    <strong>{t('squad.player_number')}</strong> {player.number}
                  </p>
                  <p className="text-gray-800">
                    <strong>{t('squad.player_birthdate')}</strong>{" "}
                    {new Intl.DateTimeFormat("en-GB").format(new Date(player.birthdate))}
                  </p>

                  {player.stat && (
                        <div className="mt-4">
                        <p className="text-gray-800">
                            <strong>{t('squad.player_apps')}</strong> {player.stat.appearances}
                        </p>
                        <p className="text-gray-800">
                            <strong>{t('squad.player_goals')}</strong> {player.stat.goals}
                        </p>
                        <p className="text-gray-800">
                            <strong>{t('squad.player_assists')}</strong> {player.stat.assists}
                        </p>
                        </div>
                    )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAdding && (
        <AddPlayer
          onSave={handleAddPlayer}
          onClose={() => setIsAdding(false)}
        />
      )}

      {isEditing && selectedPlayer && (
        <EditPlayer
          player={selectedPlayer}
          onSave={savePlayer}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isDeleting && selectedPlayer && (
        <DeletePlayer
          playerName={selectedPlayer.name}
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

export default Players;
