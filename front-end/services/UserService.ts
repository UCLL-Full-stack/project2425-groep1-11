const API = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (user: {
  email: string;
  password: string;
  role: string;
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
  const data = await response.json();
  return data;
};

export const getUserByEmail = async (email: string): Promise<any> => {
  const response = await fetch(`${API}/users/find?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const data = await response.json();
  return data;
};
