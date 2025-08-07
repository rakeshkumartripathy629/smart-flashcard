const Flashcard = require('../models/Flashcard');
const classifySubject = require('../utils/subjectClassifier');

// Add a new flashcard
exports.addFlashcard = async (req, res) => {
  try {
    const { student_id, question, answer } = req.body;

    const subject = classifySubject(question); // Classify subject using utils

    const flashcard = new Flashcard({ student_id, question, answer, subject });
    await flashcard.save();

    res.status(201).json({ message: 'Flashcard added successfully', subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get flashcards grouped by subject and one from each subject
exports.getFlashcards = async (req, res) => {
  try {
    const { student_id, limit = 5 } = req.query;

    const allCards = await Flashcard.find({ student_id });

    const subjects = {};
    for (const card of allCards) {
      if (!subjects[card.subject]) subjects[card.subject] = [];
      subjects[card.subject].push(card);
    }

    const selected = [];
    for (const group of Object.values(subjects)) {
      if (group.length > 0) selected.push(group[0]); // pick one from each subject
    }

    // Shuffle selected cards
    const shuffled = selected.sort(() => Math.random() - 0.5).slice(0, Number(limit));

    res.json(shuffled);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
