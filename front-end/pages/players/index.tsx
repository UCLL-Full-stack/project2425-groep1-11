import { Player } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import LoginButton from "@/components/loginButton";
import NavbarSheet from "@/components/NavbarSheet";

const players: Player[] = [
  {
    id: 1,
    name: "Fort Nite",
    position: "Forward",
    number: 9,
    birthdate: new Date("1998-07-15"),
    stat: { playerId: 1, appearances: 25, goals: 15, assists: 7 },
    pictureUrl: "https://i.imgur.com/PooLmZC.jpeg",
  },
  {
    id: 2,
    name: "P. Diddy",
    position: "Midfielder",
    number: 10,
    birthdate: new Date("1995-05-10"),
    stat: { playerId: 2, appearances: 30, goals: 10, assists: 12 },
    pictureUrl: "https://i.imgur.com/vEYY90r.jpeg",
  },
  {
    id: 3,
    name: "Lebron James",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 4,
    name: "Michael Jordan",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 5,
    name: "Lionel Messi",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 6,
    name: "Jeff The Land Shark",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 7,
    name: "HEE HEE",
    position: "Defender",
    number: 4,
    birthdate: new Date("2000-03-20"),
    stat: { playerId: 3, appearances: 28, goals: 3, assists: 5 },
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
];

const Players: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Head>
        <title>Manchester Shitty Squad</title>
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
            <h1 className="text-6xl font-bold text-yellow-600 font-bebas">The Squad</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img
                  src={player.pictureUrl || "/default-player-image.png"}
                  alt={player.name}
                  className="w-3/6 ml-28 h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{player.name}</h2>
                  <p className="text-gray-600">
                    <strong>Position:</strong> {player.position}
                  </p>
                  <p className="text-gray-600">
                    <strong>Number:</strong> {player.number}
                  </p>
                  <p className="text-gray-600">
                    <strong>Birthdate:</strong>{" "}
                    {new Intl.DateTimeFormat("en-US").format(player.birthdate)}
                  </p>
                  {player.stat && (
                    <div className="mt-4">
                      <p className="text-gray-600">
                        <strong>Appearances:</strong> {player.stat.appearances}
                      </p>
                      <p className="text-gray-600">
                        <strong>Goals:</strong> {player.stat.goals}
                      </p>
                      <p className="text-gray-600">
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
    </>
  );
};

export default Players;
