import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  cabinNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'not_in_cabin'],
    default: 'not_in_cabin'
  },
  statusMessage: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Faculty', facultySchema);
