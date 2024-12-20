import { Team } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;

const getAllTeams = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/teams`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
    });

    if (!response.ok) throw new Error("Failed to fetch teams.");

    return await response.json();
}

const addTeam = async (teamData: Omit<Team, "id">) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/teams/add`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,},
        body: JSON.stringify(teamData),
    });

    if (!response.ok) throw new Error("Failed to add team.");

    return await response.json();
}


const TeamService = {
    getAllTeams,
    addTeam,
}


export default TeamService;