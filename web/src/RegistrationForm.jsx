import { useState, useEffect } from "react";
import { createVisitor, searchVisitors, getHosts } from "./api";

export default function RegistrationForm({ onRegistered }) {
  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    host_id: "",
    purpose: "",
  });

  const [hosts, setHosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hostsLoading, setHostsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHosts() {
      setHostsLoading(true);
      setError("");

      try {
        const data = await getHosts();

        if (!Array.isArray(data)) {
          throw new Error("The API returned an unexpected host list.");
        }

        if (!cancelled) {
          setHosts(data);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message);
        }
      } finally {
        if (!cancelled) {
          setHostsLoading(false);
        }
      }
    }

    loadHosts();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((f) => ({ ...f, [name]: value }));
    setError("");

    if (name === "full_name") {
      if (value.trim().length >= 2) {
        setSearchLoading(true);

        searchVisitors(value.trim())
          .then((data) => {
            if (!Array.isArray(data)) {
              throw new Error("The API returned an unexpected visitor list.");
            }

            setSuggestions(data);
          })
          .catch((requestError) => {
            setSuggestions([]);
            setError(requestError.message);
          })
          .finally(() => {
            setSearchLoading(false);
          });
      } else {
        setSuggestions([]);
        setSearchLoading(false);
      }
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
    setSearchLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await createVisitor({
        ...form,
        host_id: form.host_id || null,
      });

      setForm({
        full_name: "",
        company_name: "",
        host_id: "",
        purpose: "",
      });

      setSuggestions([]);

      onRegistered();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Register Visitor</h2>

      {error && (
        <p role="alert" style={{ color: "#b42318" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <label>
            Full Name *<br />
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              autoComplete="off"
              disabled={submitting}
              style={{ width: "260px" }}
            />
          </label>

          {searchLoading && (
            <p role="status" style={{ margin: "4px 0", color: "#666" }}>
              Searching previous visitors...
            </p>
          )}

          {!searchLoading &&
            form.full_name.trim().length >= 2 &&
            suggestions.length === 0 &&
            !error && (
              <p role="status" style={{ margin: "4px 0", color: "#666" }}>
                No previous visitors found.
              </p>
            )}

          {suggestions.length > 0 && (
            <ul style={dropdownStyle}>
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  style={{ padding: "6px 8px", cursor: "pointer" }}
                  onClick={() => fillFromSuggestion(s)}
                >
                  {s.full_name} � {s.company_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Company<br />
            <input
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              disabled={submitting}
              style={{ width: "260px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Host *<br />

            {hostsLoading ? (
              <p role="status" style={{ margin: "4px 0", color: "#666" }}>
                Loading hosts...
              </p>
            ) : hosts.length === 0 ? (
              <p role="status" style={{ margin: "4px 0", color: "#666" }}>
                No hosts are currently available.
              </p>
            ) : (
              <select
                name="host_id"
                value={form.host_id}
                onChange={handleChange}
                required
                disabled={submitting}
                style={{ width: "268px" }}
              >
                <option value="">Select host�</option>

                {hosts.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label>
            Purpose<br />
            <textarea
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              rows={3}
              disabled={submitting}
              style={{ width: "260px" }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || hostsLoading || hosts.length === 0}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
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
