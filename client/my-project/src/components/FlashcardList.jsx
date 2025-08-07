import React, { useState } from 'react';
import API from '../api';

const FlashcardList = () => {
  const [studentId, setStudentId] = useState('');
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await API.get(`/get-subject?student_id=${studentId}`);
      setCards(res.data);
    } catch (err) {
      alert('Error fetching flashcards');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">View Your Flashcards</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchCards}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Fetch
          </button>
        </div>

        {cards.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📘 Flashcards:</h3>
            <ul className="space-y-4">
              {cards.map((card, index) => (
                <li key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p><strong className="text-blue-700">Q:</strong> {card.question}</p>
                  <p><strong className="text-green-700">A:</strong> {card.answer}</p>
                  <p><em className="text-gray-500">Subject:</em> {card.subject}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">No flashcards found for this student ID.</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;
