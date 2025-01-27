import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [quizData, setQuizData] = useState([]); 
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;
  

  useEffect(() => {
    fetch('/data/questions.json')
      .then(response => response.json())
      .then(setQuizData) 
      .catch((error) => console.error('Error fetching quiz data:', error)); 
  }, []);
  
  useEffect(() => {
    setTimeLeft(20);
  
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
  
          if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null); // Återställ valt alternativ
          } else {
            setQuizFinished(true);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [currentQuestionIndex, totalQuestions]);


  
  const handleOptionClick = (option) => {
    console.log('Clicked option:', option); // Kontrollera vilket alternativ som klickades
    setSelectedOption(option); 
    console.log('Updated selectedOption:', selectedOption); // Kontrollera state (observera att setState är asynkront)
  };

  const handleConfirmAnswer = () => {
    if (selectedOption) {
      if (selectedOption === currentQuestion.answer) {
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
            className={`option ${selectedOption === option ? 'selected' : ''}`}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="timer">{timeLeft} seconds left</div> 

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