import { Stats } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;

const getAllStats = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/stats`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
    });

    if (!response.ok) throw new Error("Failed to fetch stats.");

    return await response.json();
}

const addStats = async (statsData: Omit<Stats, "id">) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/stats/add`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(statsData),
    });

    if (!response.ok) throw new Error("Failed to add stats.");

    return await response.json();
}

const updateStats = async (id: number, updatedStats: Omit<Stats, "id">) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/stats/update/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(updatedStats),
    });

    if (!response.ok) throw new Error("Failed to update stats.");

    return await response.json();
}

const deleteStats = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API}/stats/delete/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
    });

    if (!response.ok) throw new Error("Failed to delete stats.");

    return await response.json();
}

export { getAllStats, addStats, updateStats, deleteStats };