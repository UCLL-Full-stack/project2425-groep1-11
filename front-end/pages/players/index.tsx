import { Player } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditPlayer from "@/components/player/EditPlayer";
import DeletePlayer from "@/components/player/DeletePlayer";
import PlayerService from "@/services/PlayerService";
import useSWR from "swr";

const Players: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch players 
  const { data: playerList, error, mutate } = useSWR("/players", PlayerService.getAllPlayers);

  useEffect(() => {
    if (playerList) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [playerList]);

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setIsEditing(true);
  };

  const handleDelete = (player: Player) => {
    setSelectedPlayer(player);
    setIsDeleting(true);
  };

  const savePlayer = async (updatedPlayer: Player) => {
    await PlayerService.updatePlayer(updatedPlayer.id, {
      ...updatedPlayer,
      birthdate: new Date(updatedPlayer.birthdate),
    });
    mutate(); 
    setIsEditing(false);
    setSelectedPlayer(null);
  };

  const confirmDelete = async () => {
    if (selectedPlayer) {
      await PlayerService.deletePlayer(selectedPlayer.id);
      mutate(); 
      setIsDeleting(false);
      setSelectedPlayer(null);
    }
  };

  if (error) return(
  <> 
    <div className="text-3xl absolute inset-0 flex items-center justify-center text-red-500 font-bebas bg-zinc-900">Failed to load players!</div>
    <div className="absolute top-12 right-8">
        <NavbarSheet />
    </div>
  </>
  );
  if (!playerList) return (
  <>
    <div className="text-3xl absolute inset-0 flex items-center justify-center text-yellow-500 font-bebas bg-zinc-900">Loading players...</div>
    <div className="absolute top-12 right-8">
            <NavbarSheet />
        </div>
  </>
  );

  return (
    <>
      <Head>
        <title>Squad | Manchester Shitty</title>
        <meta name="description" content="Meet the players of Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>

      <div className="min-h-screen bg-zinc-900 py-8">
        <div className="absolute top-12 right-8">
          <NavbarSheet />
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
            <h1 className="text-6xl font-bold text-yellow-500 font-bebas">The Squad</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {playerList.map((player: Player, index: number) => (
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
                    className="w-4/6 object-contain"
                  />
                </div>

                <div className="p-4 bg-gray-300 rounded-lg">
                  <div className="absolute right-4 top-2 flex gap-2">
                    <button
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
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{player.name}</h2>
                  <p className="text-gray-800">
                    <strong>Position:</strong> {player.position}
                  </p>
                  <p className="text-gray-800">
                    <strong>Number:</strong> {player.number}
                  </p>
                  <p className="text-gray-800">
                    <strong>Birthdate:</strong>{" "}
                    {new Intl.DateTimeFormat("en-GB").format(new Date(player.birthdate))}
                  </p>
                  {player.stat && (
                    <div className="mt-4">
                      <p className="text-gray-800">
                        <strong>Appearances:</strong> {player.stat.appearances}
                      </p>
                      <p className="text-gray-800">
                        <strong>Goals:</strong> {player.stat.goals}
                      </p>
                      <p className="text-gray-800">
                        <strong>Assists:</strong> {player.stat.assists}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default Players;
