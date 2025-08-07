import React from 'react';
import AddFlashcard from './components/AddFlashCard';
import FlashcardList from './components/FlashcardList';

const App = () => (
  <div style={{ padding: '20px' }}>
    <h1>Smart Flashcard App</h1>
    <AddFlashcard />
    <hr />
    <FlashcardList />
  </div>
);

export default App;
