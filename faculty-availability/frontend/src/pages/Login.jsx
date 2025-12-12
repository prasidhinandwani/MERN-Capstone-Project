import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    department: '',
    cabinNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Faculty Login' : 'Faculty Registration'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cabin Number</label>
                <input
                  type="text"
                  name="cabinNumber"
                  value={formData.cabinNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="auth-toggle">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: '#1e3a5f' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
