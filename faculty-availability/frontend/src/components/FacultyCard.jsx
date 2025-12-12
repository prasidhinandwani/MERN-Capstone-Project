function FacultyCard({ faculty }) {
  const statusLabels = {
    available: 'Available',
    busy: 'Busy',
    not_in_cabin: 'Not in Cabin'
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="faculty-card">
      <h3 className="faculty-name">{faculty.fullName}</h3>
      <p className="faculty-info">📚 {faculty.department}</p>
      <p className="faculty-info">🚪 Cabin: {faculty.cabinNumber}</p>
      
      <span className={`status-badge status-${faculty.status}`}>
        {statusLabels[faculty.status]}
      </span>

      {faculty.statusMessage && (
        <p className="status-message">"{faculty.statusMessage}"</p>
      )}

      <p className="updated-time">
        Updated: {formatTime(faculty.updatedAt)}
      </p>
    </div>
  );
}

export default FacultyCard;
