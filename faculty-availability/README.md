# Faculty Availability System

A modern full-stack MERN (MongoDB, Express, React, Node.js) application that enables faculty members to manage and display their availability status in real-time. Students and colleagues can easily check if a faculty member is available, busy, or not in their cabin, complete with status messages for context.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Real-Time Updates](#real-time-updates)
- [Authentication](#authentication)
- [File Structure Explanation](#file-structure-explanation)
- [Future Enhancements](#future-enhancements)

## Overview

The Faculty Availability System is designed to streamline communication between faculty members and students by providing a centralized platform to check faculty availability. Faculty members can update their status in real-time, and all connected users receive instant updates via Socket.IO without needing to refresh the page.

### Key Problem It Solves
- Students waste time looking for faculty members during cabin hours
- Faculty members have no centralized way to communicate their availability
- No real-time mechanism to notify students of status changes
- Difficulty managing multiple faculty schedules across departments

## Features

### For Faculty Members
- **Secure Authentication**: Register and login with email/password
- **Status Management**: Update availability status with three options:
  - 🟢 **Available** - Ready to meet with students
  - 🟡 **Busy** - Currently occupied but in cabin
  - 🔴 **Not in Cabin** - Away from workspace
- **Custom Status Messages**: Add contextual information (e.g., "In a meeting until 3 PM")
- **Profile Dashboard**: View and manage personal profile information
  - Full name
  - Department
  - Cabin number
  - Current status
- **Real-Time Updates**: Changes are broadcast instantly to all connected users

### For Students
- **View All Faculty**: Browse complete faculty directory
- **Check Availability**: See real-time availability status of any faculty member
- **Read Status Messages**: Get context about why a faculty member is unavailable
- **Department Information**: Filter faculty by department
- **Live Updates**: Automatic updates without page refresh (Socket.IO)

### System Features
- **JWT-Based Authentication**: Secure token-based authentication
- **Real-Time Communication**: Socket.IO for instant notifications
- **Password Encryption**: bcrypt for secure password storage
- **CORS Support**: Configured for cross-origin requests
- **RESTful API**: Clean and organized API endpoints
- **Database Persistence**: MongoDB for reliable data storage

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Socket.IO**: Real-time bidirectional communication
- **JWT (JSON Web Tokens)**: Authentication and authorization
- **bcryptjs**: Password hashing and encryption
- **CORS**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management

### Frontend
- **React 18**: UI library
- **Vite**: Modern build tool and development server
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests
- **Socket.IO Client**: Real-time communication client
- **CSS**: Styling and responsive design

## Project Structure

```
faculty-availability/
├── backend/                      # Express.js backend server
│   ├── package.json             # Backend dependencies
│   ├── server.js                # Main server entry point
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   └── Faculty.js           # MongoDB Faculty schema
│   └── routes/
│       ├── auth.js              # Authentication routes (register/login)
│       └── faculty.js           # Faculty management routes
│
├── frontend/                     # React + Vite frontend
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── index.html               # HTML entry point
│   ├── src/
│   │   ├── main.jsx             # React entry point
│   │   ├── App.jsx              # Main App component
│   │   ├── App.css              # Application styles
│   │   ├── index.css            # Global styles
│   │   ├── assets/              # Static assets (images, etc.)
│   │   ├── components/          # Reusable components
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   └── FacultyCard.jsx  # Faculty display card
│   │   └── pages/               # Page components
│   │       ├── Home.jsx         # Home/landing page
│   │       ├── Login.jsx        # Login page
│   │       ├── Dashboard.jsx    # Faculty dashboard
│   │       └── StudentView.jsx  # Student view of all faculty
│   └── public/                  # Public static files
│
└── README.md                    # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) - Version 8 or higher
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **Git** (optional, for version control)

### Verify Installation
```bash
node --version   # Should be v16.0.0 or higher
npm --version    # Should be 8.0.0 or higher
```

## Installation

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd faculty-availability

# Or navigate to the project folder if already downloaded
cd "c:\Users\prasi\Desktop\MERN Capstone\faculty-availability"
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Configuration

### Backend Environment Setup

1. Create a `.env` file in the `backend/` directory:
```bash
cd backend
echo. > .env
```

2. Add the following variables to `.env`:
```env
# MongoDB Connection String
# For local MongoDB: mongodb://localhost:27017/faculty-availability
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name
MONGODB_URI=mongodb://localhost:27017/faculty-availability

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server Port
PORT=5000

# Frontend Origin (for CORS)
FRONTEND_ORIGIN=http://localhost:5173
```

### MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
# Windows: Services > MongoDB > Start
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env` with your Atlas connection string

## Running the Application

### Option 1: Run Both Backend and Frontend in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App will run on http://localhost:5173
```

### Option 2: Production Build

**Build Backend:**
```bash
cd backend
npm start  # Runs with Node directly
```

**Build and Preview Frontend:**
```bash
cd frontend
npm run build   # Creates optimized build
npm run preview # Serves the built files
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "email": "faculty@university.edu",
  "password": "securePassword123",
  "fullName": "Dr. John Doe",
  "department": "Computer Science",
  "cabinNumber": "A-101"
}

Response: { token, facultyId }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "faculty@university.edu",
  "password": "securePassword123"
}

Response: { token, facultyId }
```

### Faculty Routes (`/api/faculty`)

#### Get All Faculty (Public)
```
GET /api/faculty

Response: [{ id, fullName, department, cabinNumber, status, statusMessage, ... }]
```

#### Get Current Faculty Profile (Protected)
```
GET /api/faculty/me
Headers: Authorization: Bearer <token>

Response: { id, email, fullName, department, status, statusMessage, ... }
```

#### Update Faculty Status (Protected)
```
PUT /api/faculty/status
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "status": "available" | "busy" | "not_in_cabin",
  "statusMessage": "In a meeting until 3 PM"
}

Response: Updated faculty object
```

## Real-Time Updates

The application uses **Socket.IO** for real-time communication:

### Server Events
- **`connection`** - Client connects to the server
- **`disconnect`** - Client disconnects from the server

### Client Events
- Faculty status updates are broadcast to all connected clients
- Changes appear instantly without page refresh
- Subscribes to status update events

### Example (Frontend)
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('facultyStatusUpdate', (updatedFaculty) => {
  console.log('Faculty status updated:', updatedFaculty);
});
```

## Authentication

### How It Works
1. Faculty registers with email, password, and profile information
2. Password is hashed with **bcryptjs** before storage
3. Upon login, user receives a JWT token
4. Token is stored in browser's localStorage
5. Token is sent with each protected API request
6. Middleware validates token on each request

### JWT Token Format
```
Header: { alg: "HS256", typ: "JWT" }
Payload: { facultyId, iat, exp }
Signature: HMACSHA256(header.payload, secret)
```

### Protected Routes
Routes requiring authentication check for valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

## File Structure Explanation

### Backend Files

**`server.js`**
- Main application entry point
- Initializes Express app and Socket.IO
- Sets up middleware (CORS, JSON parsing)
- Connects to MongoDB
- Starts HTTP server

**`middleware/auth.js`**
- JWT verification middleware
- Extracts token from Authorization header
- Validates token signature
- Attaches `facultyId` to request object

**`models/Faculty.js`**
- Mongoose schema definition
- Defines faculty data structure
- Sets validation rules
- Indexes for unique fields (email)

**`routes/auth.js`**
- Registration endpoint
- Login endpoint
- Password hashing and verification
- Token generation

**`routes/faculty.js`**
- Faculty listing endpoint
- Profile retrieval endpoint
- Status update endpoint
- Socket.IO event emission on status change

### Frontend Files

**`main.jsx`**
- React application entry point
- Mounts App component to DOM

**`App.jsx`**
- Main application component
- Sets up routing with React Router
- Manages authentication state

**`pages/Login.jsx`**
- Faculty login/registration form
- Handles authentication flow
- Stores token in localStorage

**`pages/Dashboard.jsx`**
- Faculty member's personal dashboard
- Status update interface
- Profile display
- Real-time status management

**`pages/StudentView.jsx`**
- Student's view of all faculty
- Faculty directory listing
- Real-time status display

**`pages/Home.jsx`**
- Landing page
- Introduction and navigation

**`components/Header.jsx`**
- Navigation component
- User info display
- Logout functionality

**`components/FacultyCard.jsx`**
- Reusable card component
- Displays faculty information
- Shows availability status
- Displays status message

## Troubleshooting

### Common Issues

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify `MONGODB_URI` in `.env` file
- Check MongoDB credentials if using Atlas

**"Frontend can't reach backend"**
- Ensure backend is running on port 5000
- Check `FRONTEND_ORIGIN` in backend `.env`
- Verify frontend origin (usually `http://localhost:5173` for Vite)

**"JWT Token is invalid"**
- Clear browser localStorage and login again
- Ensure `JWT_SECRET` matches between sessions
- Check token expiration time

**"Port already in use"**
```bash
# Backend on Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend on Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**"CORS errors"**
- Ensure backend `FRONTEND_ORIGIN` matches frontend URL
- Check that CORS middleware is configured correctly
- Verify API requests use correct headers

## Future Enhancements

Potential features for future versions:

- **Email Notifications**: Send alerts when faculty updates status
- **Calendar Integration**: Add availability scheduling by time slots
- **User Roles**: Implement admin dashboard for user management
- **Search & Filter**: Advanced search by department, name, or status
- **Status History**: Track status changes over time
- **Notifications**: Desktop or email notifications for status changes
- **Mobile App**: React Native mobile application
- **Detailed Availability**: Calendar view with hourly slots
- **Automated Status**: Set automatic status changes based on schedule
- **Analytics**: Dashboard showing peak availability times
- **Two-Factor Authentication**: Enhanced security with 2FA
- **Appointment Booking**: Students can book office hours
- **Profile Customization**: Personalized profiles with photo/bio
- **Department Management**: Organize faculty by departments

## Development Notes

### Best Practices
- Always use environment variables for sensitive data
- Keep JWT_SECRET secure and unique
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Regular database backups
- Keep dependencies updated

### Code Quality
- Use ESLint for code consistency
- Write meaningful commit messages
- Document complex functions
- Test APIs with Postman or similar tools
- Implement proper error handling

### Deployment Considerations
- Use process manager (PM2) for production
- Set up reverse proxy (Nginx)
- Configure SSL/TLS certificates
- Monitor server logs
- Set up automated backups
- Use environment-specific configurations

## License

This project is part of a capstone assignment. Modify and use as needed for educational purposes.

## Contributing

For contributions or issues:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: Active Development
