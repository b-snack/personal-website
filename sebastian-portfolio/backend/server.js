const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas

const snapshotSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: 'Auto-saved snapshot'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});


// guestbook schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  // NEW: Array of user IDs who liked this message
  likedBy: {
    type: [String],  // Array of strings (user identifiers)
    default: []
  },
  // NEW: Total like count (for faster queries)
  likeCount: {
    type: Number,
    default: 0
  }
});


const Message = mongoose.model('Message', messageSchema);
const Snapshot = mongoose.model('Snapshot', snapshotSchema);



// Routes

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new message
app.post('/api/messages', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newMessage = new Message({
      name: name || 'Anonymous',
      message: message.trim()
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all snapshots
app.get('/api/snapshots', async (req, res) => {
  try {
    const snapshots = await Snapshot.find().sort({ date: 1 });
    res.json(snapshots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new snapshot
app.post('/api/snapshots', async (req, res) => {
  try {
    const { description, data } = req.body;
    
    const newSnapshot = new Snapshot({
      description: description || 'Auto-saved snapshot',
      data: data || {}
    });

    await newSnapshot.save();
    res.status(201).json(newSnapshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete old snapshots (keep only last 50)
app.delete('/api/snapshots/cleanup', async (req, res) => {
  try {
    const snapshots = await Snapshot.find().sort({ date: -1 });
    
    if (snapshots.length > 50) {
      const toDelete = snapshots.slice(50);
      const idsToDelete = toDelete.map(s => s._id);
      await Snapshot.deleteMany({ _id: { $in: idsToDelete } });
      res.json({ deleted: idsToDelete.length });
    } else {
      res.json({ deleted: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like system (by claude -> im still learning this)
app.post('/api/messages/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;  // User identifier from frontend
    
    // Validation
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the message
    const message = await Message.findById(id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if user already liked this message
    const alreadyLiked = message.likedBy.includes(userId);
    
    if (alreadyLiked) {
      // UNLIKE: Remove user from likedBy array
      message.likedBy = message.likedBy.filter(id => id !== userId);
      message.likeCount = message.likedBy.length;
      console.log(`💔 User ${userId} unliked message ${id}`);
    } else {
      // LIKE: Add user to likedBy array
      message.likedBy.push(userId);
      message.likeCount = message.likedBy.length;
      console.log(`❤️ User ${userId} liked message ${id}`);
    }

    await message.save();
    
    res.json({
      liked: !alreadyLiked,  // Return new like status
      likeCount: message.likeCount,
      likedBy: message.likedBy
    });
    
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Get like status for a specific user
app.get('/api/messages/:id/like/:userId', async (req, res) => {
  try {
    const { id, userId } = req.params;
    
    const message = await Message.findById(id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const liked = message.likedBy.includes(userId);
    
    res.json({
      liked,
      likeCount: message.likeCount
    });
    
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({ error: 'Failed to check like status' });
  }
});
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});