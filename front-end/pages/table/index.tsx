import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";

interface Team {
  id: number;
  teamName: string;
  points: number;
}

const Table: React.FC = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      const mockTeams: Team[] = [
        { id: 1, teamName: "Manchester Shitty", points: 32 },
        { id: 2, teamName: "Fortnite United", points: 28 },
        { id: 3, teamName: "P. Diddy FC", points: 25 },
        { id: 4, teamName: "Lebron Strikers", points: 21 },
      ];
      setTeams(mockTeams);
    };

    fetchTeams();

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <>
      <Head>
        <title>League Table | Manchester Shitty</title>
        <meta name="description" content="League table for Manchester Shitty" />
      </Head>
      <div className="min-h-screen bg-zinc-900 text-yellow-500 py-8">
        <div className="absolute top-12 right-24"><NavbarSheet /></div>
        <div className="container mx-auto px-4">
        
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={100}
              height={100}
              draggable={false}
              className="mr-4 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-6xl font-extrabold text-yellow-500 ml-4 font-bebas">
              League Table
            </h1>
          </div>

          {/* League Table */}
          <div
            className={`w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700  ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-yellow-500 text-black text-xl">
                  <th className="w-1/12 py-4 text-center">Position</th>
                  <th className="w-7/12 py-4 text-left pl-4">Club</th>
                  <th className="w-4/12 py-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.id}
                      className={`even:bg-gray-100 odd:bg-gray-200 text-gray-800 text-lg hover:bg-yellow-300 transition-all duration-200 transform delay-${
                        200 * (index + 1)
                      } ${
                        isLoaded
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      <td className="text-center py-3">{index + 1}</td>
                      <td className={`py-3 pl-4 ${team.teamName === "Manchester Shitty" ? "font-bold" : ""}`}>{team.teamName}</td>
                      <td className="text-center py-3 font-bold">
                        {team.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
