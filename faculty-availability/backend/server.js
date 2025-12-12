// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import authRoutes from './routes/auth.js';
import facultyRoutes from './routes/faculty.js';

dotenv.config();

const app = express();
app.use(express.json());

// IMPORTANT: allow your frontend origin (Vite default: http://localhost:5173)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create HTTP server and Socket.IO server
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Make io available to routes via app.locals
app.locals.io = io;

app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Faculty Finder API is running' });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: log socket connections
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});
