const BASE =
  import.meta.env.VITE_API_BASE ||
  "https://mini-plant-store-urvann.vercel.app/api";


// ---------- Auth ----------
export async function loginUser(username, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // { token, role }
}

export async function registerUser(username, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Register failed");
  return data; // { message: "User registered successfully" }
}

// ---------- Plants ----------
export async function fetchPlants(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.append("q", params.q);
  if (params.cat) qs.append("cat", params.cat);
  const res = await fetch(`${BASE}/plants?${qs.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
}

export async function addPlant(payload, token) {
  const res = await fetch(`${BASE}/plants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add plant");
  return data;
}
