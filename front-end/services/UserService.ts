import { Role, User, UserInlogInput } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async (): Promise<any[]> => {
  const response = await fetch(`${API}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }
  const data = await response.json();
  return data;
};

const signup = async (user: {
  username: string;
  email: string;
  password: string;
  role: Role;
}): Promise<any> => {
  const response = await fetch(`${API}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      role: user.role,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user.");
  }
  const data = await response.json();
  return data;
};

const login = (user: UserInlogInput) => {
  
  return fetch(`${API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.message || "Failed to authenticate.");
      });
    }
    return response.json();
  });
}

const getUserByEmail = async (email: string): Promise<any> => {
  const response = await fetch(`${API}/users/find?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch user by email.");
  }
  const data = await response.json();
  return data;
};

const UserService = {
  getAllUsers,
  signup,
  login,
  getUserByEmail,
};

export default UserService;
