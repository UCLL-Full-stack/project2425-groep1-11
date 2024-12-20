import { Player } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;

const getAllPlayers = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/players`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
  });

  if (!response.ok) throw new Error("Failed to fetch players.");

  const players = await response.json();
  return players.map((player: any) => ({
    ...player,
    birthdate: new Date(player.birthdate), // Convert birthdate to Date object
    stat: player.stat  || {appearances: 0, goals: 0, assists: 0}
  }));
};

const getPlayerById = async (id: number) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/players/${id}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
  });

  if (!response.ok) throw new Error("Failed to fetch player by ID.");

  return { ...await response.json(), birthdate: new Date((await response.json()).birthdate) };
};

const addPlayer = async (playerData: { name: string; number: number; position: string; birthdate: Date; teamId: 1; imageUrl?: string; }) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/players/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
    body: JSON.stringify(playerData),
  });

  if (!response.ok) throw new Error("Failed to add player.");

  return await response.json();
};

const updatePlayer = async (
  id: number,
  updatedPlayer: { name: string; number: number; position: string; birthdate: Date; stat?: { id: number; appearances: number; goals: number; assists: number } }
) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/players/update/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
    body: JSON.stringify({
      name: updatedPlayer.name,
      number: updatedPlayer.number,
      position: updatedPlayer.position,
      birthdate: updatedPlayer.birthdate,
      stat: updatedPlayer.stat, 
    }),
  });

  if (!response.ok) throw new Error("Failed to update player and stats");

  return await response.json();
};

const deletePlayer = async (id: number) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/players/delete/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
  });

  if (!response.ok) throw new Error("Failed to delete player.");

  const data = await response;
  return data;
};

const PlayerService = {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer,
};

export default PlayerService;
