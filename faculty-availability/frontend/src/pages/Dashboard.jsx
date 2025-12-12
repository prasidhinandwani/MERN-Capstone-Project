import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('not_in_cabin');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/faculty/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setStatus(response.data.status);
      setStatusMessage(response.data.statusMessage || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/faculty/status',
        { status, statusMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Status updated successfully!');
      fetchProfile();
    } catch (error) {
      alert('Error updating status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Welcome, {profile?.fullName}</h2>
          
          <div className="current-status">
            <p><strong>Department:</strong> {profile?.department}</p>
            <p><strong>Cabin:</strong> {profile?.cabinNumber}</p>
          </div>

          <div className="form-group">
            <label>Your Status</label>
            <div className="status-options">
              <button
                className={`status-option ${status === 'available' ? 'active' : ''}`}
                onClick={() => setStatus('available')}
              >
                ✅ Available
              </button>
              <button
                className={`status-option ${status === 'busy' ? 'active' : ''}`}
                onClick={() => setStatus('busy')}
              >
                🔴 Busy
              </button>
              <button
                className={`status-option ${status === 'not_in_cabin' ? 'active' : ''}`}
                onClick={() => setStatus('not_in_cabin')}
              >
                🚫 Not in Cabin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Status Message (optional)</label>
            <textarea
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="e.g., In a meeting until 3 PM"
              rows="3"
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ width: '100%' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

