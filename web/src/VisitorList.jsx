import { useState, useEffect } from "react";
import { getVisitors, searchVisitors, checkOut } from "./api";

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("en-NP", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function VisitorList({ onRefresh }) {
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadVisitors = async () => {
      setLoading(true);
      setError("");

      try {
        const data = search.trim() !== ""
          ? await searchVisitors(search)
          : await getVisitors(page);

        if (!Array.isArray(data)) {
          throw new Error("The API returned an unexpected visitor list.");
        }

        if (!cancelled) setVisitors(data);
      } catch (requestError) {
        if (!cancelled) setError(requestError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadVisitors();
    return () => {
      cancelled = true;
    };
  }, [page, search, onRefresh]);

  async function handleCheckOut(visitor) {
    setError("");
    try {
      await checkOut(visitor.id);
      setVisitors((prev) => prev.filter((v) => v.id !== visitor.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div>
      <h2>Active Visitors</h2>

      {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
      {loading && <p>Loading visitors...</p>}

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Search visitor by name..."
          value={search}
          onChange={handleSearch}
          style={{
            width: "260px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Company</th>
            <th style={th}>Host</th>
            <th style={th}>Purpose</th>
            <th style={th}>Checked In</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v) => (
            <tr key={v.id}>
              <td style={td}>{v.full_name}</td>
              <td style={td}>{v.company_name}</td>
              <td style={td}>{v.host_name || v.host_id}</td>
              <td style={td}>{v.purpose}</td>
              <td style={td}>{formatTime(v.checked_in_at)}</td>
              <td style={td}>
                <button onClick={() => handleCheckOut(v)} disabled={loading}>
                  Check Out
                </button>
              </td>
            </tr>
          ))}

          {visitors.length === 0 && (
            <tr>
              <td colSpan="6" style={{ padding: "12px", textAlign: "center" }}>
                No visitors found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {search.trim() === "" && (
        <div style={{ marginTop: "8px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span style={{ margin: "0 12px" }}>
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={visitors.length < 20}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ccc",
  padding: "6px 8px",
  textAlign: "left",
};

const td = {
  padding: "6px 8px",
  borderBottom: "1px solid #eee",
};