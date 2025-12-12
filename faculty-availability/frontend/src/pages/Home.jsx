import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import FacultyCard from '../components/FacultyCard';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function Home() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const socketRef = useRef(null);

  useEffect(() => {
    fetchFaculty();

    socketRef.current = io(API_BASE, {
      transports: ['websocket'],   // correct
      // path: '/socket.io/'       // default, optional
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on('statusUpdated', (updated) => {
      console.log("Received update:", updated);
      setFaculty(prev => {
        const idx = prev.findIndex(f => f._id === updated._id);
        if (idx === -1) return [updated, ...prev];
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/faculty`);
      setFaculty(response.data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {/* Rest of your component */}
    </div>
  );
}

export default Home;
