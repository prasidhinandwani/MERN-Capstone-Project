import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "../components/Header";
import FacultyCard from "../components/FacultyCard";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function StudentView() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    loadFaculty();

    socketRef.current = io(API_BASE, { transports: ["websocket"] });

    socketRef.current.on("statusUpdated", (updated) => {
      setLastUpdate(new Date().toLocaleTimeString());

      setFaculty((prev) => {
        const idx = prev.findIndex((f) => f._id === updated._id);
        if (idx === -1) return [...prev, updated];
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const loadFaculty = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/faculty`);
      setFaculty(res.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div
        style={{
          background: "#e8ffe8",
          textAlign: "center",
          padding: "10px",
          fontWeight: "bold",
          color: "#1c7a2d",
        }}
      >
        🔄 Live Faculty Availability (Student View)
      </div>

      {lastUpdate && (
        <p style={{ textAlign: "center", marginTop: "8px", color: "#666" }}>
          Last update received at: <strong>{lastUpdate}</strong>
        </p>
      )}

      <div className="container" style={{ marginTop: "20px" }}>
        {loading ? (
          <div className="loading">Loading faculty data...</div>
        ) : (
          <div className="faculty-grid">
            {faculty.map((f) => (
              <FacultyCard key={f._id} faculty={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentView;
