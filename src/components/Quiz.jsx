import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [quizData, setQuizData] = useState([]); 
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;

  useEffect(() => {
    fetch('/data/questions.json')
      .then(response => response.json())
      .then(setQuizData) 
      .catch((error) => console.error('Error fetching quiz data:', error)); 
  }, []);

  
  const handleOptionClick = (option) => {
    setSelectedOption(option); 
    setIsConfirmed(false);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1); 
      }
      setIsConfirmed(true); 
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); 
      } else {
        setQuizFinished(true); 
      }
      setSelectedOption(null); 
    }
  };;

  
  if (quizData.length === 0) {
    return <div>Laddar frågor...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  if (quizFinished) {
    return (
      <div className="quiz-result">
        <img src="/wow-logo.png" alt="Logo" className="top-image" />
        <h2>Thanks for playing</h2>
        <p>You scored {score} out of {totalQuestions}</p>
        <button> Restart Quiz </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className="option" 
          >
            {option}
          </div>
        ))}
      </div>

      <button
        onClick={handleConfirmAnswer}
        disabled={!selectedOption}
      >
        Confirm Answer
      </button>

      {isConfirmed && (
        <button
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      )}
      <div className="question-tracker">
      {currentQuestionNumber} of {totalQuestions} questions
      </div>
    </div>
  );
};

export default Quiz;