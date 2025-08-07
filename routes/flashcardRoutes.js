const express = require('express');
const router = express.Router();
const { addFlashcard, getFlashcards } = require('../controllers/flashcardController');

router.post('/flashcard', addFlashcard);
router.get('/get-subject', getFlashcards);

module.exports = router;
