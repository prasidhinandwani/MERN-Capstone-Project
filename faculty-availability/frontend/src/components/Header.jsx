import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <h1>🎓 Faculty Finder</h1>
      <div className="header-links">

        <Link to="/students">Students</Link>

        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Faculty Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
