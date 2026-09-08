import { useState, useEffect } from "react";
import { createVisitor, searchVisitors, getHosts } from "./api";

export default function RegistrationForm({ onRegistered }) {
  const [form, setForm] = useState({ full_name: "", company_name: "", host_id: "", purpose: "" });
  const [hosts, setHosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getHosts().then((data) => { if (data) setHosts(data); });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "full_name" && value.length >= 2) {
      searchVisitors(value).then((data) => { if (data) setSuggestions(data); });
    } else if (name === "full_name") {
      setSuggestions([]);
    }
  }

  function fillFromSuggestion(s) {
    setForm((f) => ({
      ...f,
      full_name: s.full_name,
      company_name: s.company_name || f.company_name,
      host_id: s.host_id ? String(s.host_id) : f.host_id,
    }));
    setSuggestions([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createVisitor({ ...form, host_id: form.host_id || null });
    setForm({ full_name: "", company_name: "", host_id: "", purpose: "" });
    setSuggestions([]);
    onRegistered();
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Register Visitor</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <label>Full Name *<br />
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              autoComplete="off"
              style={{ width: "260px" }}
            />
          </label>
          {suggestions.length > 0 && (
            <ul style={dropdownStyle}>
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  style={{ padding: "6px 8px", cursor: "pointer" }}
                  onClick={() => fillFromSuggestion(s)}
                >
                  {s.full_name} — {s.company_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Company<br />
            <input name="company_name" value={form.company_name} onChange={handleChange} style={{ width: "260px" }} />
          </label>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Host *<br />
            <select name="host_id" value={form.host_id} onChange={handleChange} required style={{ width: "268px" }}>
              <option value="">Select host…</option>
              {hosts.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Purpose<br />
            <textarea name="purpose" value={form.purpose} onChange={handleChange} rows={3} style={{ width: "260px" }} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const dropdownStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  background: "#fff",
  border: "1px solid #ccc",
  listStyle: "none",
  margin: 0,
  padding: 0,
  width: "260px",
  zIndex: 10,
};
