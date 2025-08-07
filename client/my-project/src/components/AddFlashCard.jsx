import React, { useState } from 'react';
import API from '../api';

const AddFlashcard = () => {
  const [form, setForm] = useState({ student_id: '', question: '', answer: '' });
  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/flashcard', form);
      setSubject(res.data.subject);
      alert('Flashcard added successfully!');
      setForm({ student_id: '', question: '', answer: '' });
    } catch (err) {
      alert('Error adding flashcard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Add Smart Flashcard</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            placeholder="Student ID"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Question"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Answer"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add Flashcard
          </button>
        </form>
        {subject && (
          <p className="mt-4 text-center text-green-700 font-semibold">
            📚 Detected Subject: <span className="font-bold">{subject}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AddFlashcard;
