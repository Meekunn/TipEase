const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api/v1";

const getToken = () => localStorage.getItem("tipease_token");

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  post: async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  put: async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  putForm: async <T>(path: string, body: FormData): Promise<T> => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      body,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
