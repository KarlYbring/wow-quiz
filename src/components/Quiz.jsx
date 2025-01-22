import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Håller reda på vilken fråga vi är på
  const [selectedOption, setSelectedOption] = useState(null); // Håller reda på användarens val
  const [quizData, setQuizData] = useState([]); // Frågor som hämtas från JSON
  const [isConfirmed, setIsConfirmed] = useState(false);
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;

  // Hämtar quizdata från JSON-filen när komponenten laddas
  useEffect(() => {
    fetch('/data/questions.json')
      .then(response => response.json())
      .then(setQuizData) // Uppdatera quizData med hämtad data
      .catch((error) => console.error('Error fetching quiz data:', error)); // Fångar eventuella fel
  }, []);

  // Hanterar när en användare väljer ett alternativ
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Uppdatera vald option
    setIsConfirmed(false);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption) {
      setIsConfirmed(true); // Bekräfta svaret
    }
  };

  // Går till nästa fråga
  const handleNextQuestion = () => {
    if (selectedOption) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Gå till nästa fråga
      setSelectedOption(null); // Återställ vald option
    }
  };

  // Om quizData är tom, visa en laddningsindikator
  if (quizData.length === 0) {
    return <div>Laddar frågor...</div>;
  }

  // Hämta den aktuella frågan och dess alternativ
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2> {/* Visa frågan */}

      <div className="options-container">
        {/* Rendera alternativ som knappar */}
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)} // Hantera användarens val
            className="option" // Enkel klassnamn för alla alternativ
          >
            {option}
          </div>
        ))}
      </div>
      <button

      onClick={handleConfirmAnswer}
      disabled={!selectedOption} // Inaktiverad om inget alternativ är valt
      >
        Confirm Answer
      </button>

      <button
        onClick={handleNextQuestion}
        disabled={!selectedOption} // Knappen är inaktiverad tills ett svar är valt
      >
        Next Question
      </button>
      <div className="question-tracker">
      {currentQuestionNumber} of {totalQuestions} questions
      </div>
    </div>
    
  );
};

export default Quiz;
