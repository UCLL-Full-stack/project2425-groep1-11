const API = process.env.NEXT_PUBLIC_API_URL;

const getAllCoaches = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/coaches`, {
     method: "GET",
      headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
    }
  });
  if (!response.ok) throw new Error("Failed to fetch coaches.");
  return await response.json();
};

const addCoach = async (coachData: { name: string; job: string; imageUrl?: string; teamId: number }) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/coaches/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
    body: JSON.stringify(coachData),
  });
  if (!response.ok) throw new Error("Failed to add coach.");
  return await response.json();
};

const updateCoach = async (id: number, coachData: { name: string; job: string; imageUrl?: string }) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/coaches/update/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
   },
    body: JSON.stringify(coachData),
  });
  if (!response.ok) throw new Error("Failed to update coach.");
  return await response.json();
};

const deleteCoach = async (id: number) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API}/coaches/delete/${id}`, { 
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`}
  });
  if (!response.ok) throw new Error("Failed to delete coach.");
};

const CoachService = {
  getAllCoaches,
  addCoach,
  updateCoach,
  deleteCoach,
};

export default CoachService;
