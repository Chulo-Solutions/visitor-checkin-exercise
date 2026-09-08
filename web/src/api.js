const BASE = "http://localhost:3000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
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
