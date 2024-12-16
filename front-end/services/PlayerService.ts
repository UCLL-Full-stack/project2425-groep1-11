const API = process.env.NEXT_PUBLIC_API_URL;

const getAllPlayers = async () => {
  const response = await fetch(`${API}/players`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const getPlayerById = async (id: number) => {
  const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
  const response = await fetch(`${API}/players/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

const addPlayer = async (playerData: {
  name: string;
  number: number;
  position: string;
  birthdate: string;
}) => {
  const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
  const response = await fetch(`${API}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playerData),
  });
  return await response.json();
};

const updatePlayer = async (
  id: number,
  playerData: {
    name: string;
    number: number;
    position: string;
    birthdate: string;
  }
) => {
  const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
  const response = await fetch(`${API}/players/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playerData),
  });
  return await response.json();
};

const deletePlayer = async (id: number) => {
  const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
  const response = await fetch(`${API}/players/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.ok;
};

const PlayerService = {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer,
};

export default PlayerService;
