const BASE = "http://localhost:3000/api";

async function request(path, options = {}) {
  let res;

  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    throw new Error("Unable to reach the API. Make sure Rails is running on port 3000.");
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    throw new Error(`The API returned an invalid response (HTTP ${res.status}).`);
  }

  if (!res.ok) {
    const message = body?.errors ? JSON.stringify(body.errors) : body?.error;
    throw new Error(message || `The API request failed (HTTP ${res.status}).`);
  }

  return body;
}

export function getVisitors(page = 1) {
  return request(`/visitors?page=${page}`);
}

export function createVisitor(data) {
  return request("/visitors", { method: "POST", body: JSON.stringify(data) });
}

export function checkOut(id) {
  return request(`/visitors/${id}/check_out`, { method: "PATCH" });
}

export function searchVisitors(q) {
  return request(`/visitors/search?q=${encodeURIComponent(q)}`);
}

export function getHosts() {
  return request("/hosts");
}
