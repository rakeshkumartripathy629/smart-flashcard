const ruleBasedSubjects = {
  Physics: ['newton', 'force', 'motion', 'gravity', 'velocity'],
  Biology: ['photosynthesis', 'cell', 'plant', 'animal', 'organism'],
  Chemistry: ['atom', 'molecule', 'compound', 'reaction'],
  Math: ['equation', 'algebra', 'calculus', 'geometry'],
  History: ['war', 'revolution', 'ancient', 'medieval', 'empire'],
};

const classifySubject = (text) => {
  const lowerText = text.toLowerCase();
  for (const [subject, keywords] of Object.entries(ruleBasedSubjects)) {
    if (keywords.some((word) => lowerText.includes(word))) {
      return subject;
    }
  }
  return 'General';
};

module.exports = classifySubject;
