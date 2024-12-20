import { Match } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;


const getAllMatches = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
    });
    if (!response.ok) throw new Error("Failed to fetch matches.");
    return await response.json();
}

const addMatch = async (matchData: {location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number, awayScore: number}) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches/add`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(matchData)
    });
    if (!response.ok) throw new Error("Failed to add match.");
    return await response.json();
}

const updateMatch = async (id: number, updatedMatch: {location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number, awayScore: number}) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches/update/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(updatedMatch)
    });
    if (!response.ok) throw new Error("Failed to update match.");
    return await response.json();
}


const deleteMatch = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches/delete/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
    });
    if (!response.ok) throw new Error("Failed to delete match.");
    const data = await response;
    return data;
}

const addPlayerToMatch = async (matchId: number, player_ids: number[]) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches/${matchId}/players`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({ player_ids }), 
    });

    if (!response.ok) throw new Error("Failed to add players to match.");
    return await response.json();
};

const getMatchPlayers = async (matchId: number) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/matches/${matchId}/players`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
     },
    });
  
    if (!response.ok) throw new Error("Failed to fetch match players.");
    return await response.json();
  };
  



const MatchService = {
    getAllMatches,
    addMatch,
    updateMatch,
    deleteMatch,
    addPlayerToMatch,
    getMatchPlayers
}

export default MatchService