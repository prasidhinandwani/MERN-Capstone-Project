// backend/routes/faculty.js
import express from 'express';
import Faculty from '../models/Faculty.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all faculty (public)
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find().select('-password');
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current faculty profile (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.facultyId).select('-password');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update status (protected) - emits socket event after update
router.put('/status', auth, async (req, res) => {
  try {
    const { status, statusMessage } = req.body;

    // Basic validation for status
    const allowed = ['available', 'busy', 'not_in_cabin'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.facultyId,
      { status, statusMessage, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // Emit to all connected clients
    try {
      const io = req.app.locals.io;
      if (io) {
        io.emit('statusUpdated', faculty);
      }
    } catch (emitErr) {
      console.error('Socket emit error:', emitErr);
    }

    res.json(faculty);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
