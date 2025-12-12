import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, department, cabinNumber } = req.body;

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      email,
      password: hashedPassword,
      fullName,
      department,
      cabinNumber
    });

    await faculty.save();

    const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      faculty: {
        id: faculty._id,
        email: faculty.email,
        fullName: faculty.fullName,
        department: faculty.department,
        cabinNumber: faculty.cabinNumber,
        status: faculty.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      token,
      faculty: {
        id: faculty._id,
        email: faculty.email,
        fullName: faculty.fullName,
        department: faculty.department,
        cabinNumber: faculty.cabinNumber,
        status: faculty.status,
        statusMessage: faculty.statusMessage
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
