const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Protected route so only logged in users can chat with AI
router.post('/chat', protect, aiController.chatWithAI);

module.exports = router;
