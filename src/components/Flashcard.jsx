import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Flashcard.css'
import { useLocation } from 'react-router-dom'; 

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const subjectId = location.state?.subjectId;

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(`https://flashcard-backend-gamma.vercel.app/api/questions?subject=${subjectId}`);
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (subjectId) {
      fetchFlashcards();
    }
  }, [subjectId]);

  const handleReveal = (index) => {
    setRevealedIndex(index === revealedIndex ? null : index);
  };

  const handleAddFlashcard = async () => {
    if (!newQuestion || !newAnswer) {
      alert('Please enter both a question and an answer.');
      return;
    }

    try {
      const response = await axios.post('https://flashcard-backend-gamma.vercel.app/api/addquestions', {
        question: newQuestion,
        answer: newAnswer,
        subject: subjectId,
      });

      if (response.data.success) {
        setFlashcards([...flashcards, response.data.flashcard]);
        setNewQuestion('');
        setNewAnswer('');
      } else {
        alert('Failed to add flashcard.');
      }
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      const response = await axios.delete(`https://flashcard-backend-gamma.vercel.app/api/questions/${id}`);

      if (response.data.success) {
        setFlashcards(flashcards.filter(flashcard => flashcard._id !== id));
      } else {
        alert('Failed to delete flashcard.');
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="flashcard-container" id="flashcard">
      <h1>Flashcards</h1>
      
      <div>
        <div id="new_question">
          <input 
            id="new-qn"
            type="text" 
            placeholder="New Question" 
            value={newQuestion} 
            onChange={(e) => setNewQuestion(e.target.value)} 
          />
          <input 
            id="new-ans"
            type="text" 
            placeholder="New Answer" 
            value={newAnswer} 
            onChange={(e) => setNewAnswer(e.target.value)} 
          />
          <button className="button" onClick={handleAddFlashcard}>Add Flashcard</button>
        </div>
      </div><br /><br /><br />

      {loading ? (
        <p>Loading...</p>
      ) : (
        flashcards.length === 0 ? (
          <p>No flashcards available. Please add some questions.</p>
        ) : (
          flashcards.map((flashcard, index) => (
            <div key={flashcard._id} className="flashcard">
              <h2>{flashcard.question}</h2>
              {revealedIndex === index && <p>{flashcard.answer}</p>}
              <button className="button flash-btn" onClick={() => handleReveal(index)}>
                {revealedIndex === index ? 'Hide Answer' : 'Reveal Answer'}
              </button>
              <button className="button flash-btn" onClick={() => handleDeleteFlashcard(flashcard._id)}>
                Delete
              </button>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Flashcard;
