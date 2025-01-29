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
      .then((response) => response.json())
      .then(setQuizData)
      .catch((error) => console.error('Error fetching quiz data:', error));
  }, []); // Tar min json fil och gör om tillståndet till quizData

  useEffect(() => {

    if (isConfirmed) return; // stppar timern om clickat confirm answer
    setTimeLeft(20); // Ställer om timern till 20 sekunder vid varje fråga

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
          } else {
            setQuizFinished(true); // om tiden rinner ut och de inte finns frågor kvar så avslutas quiz.
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, totalQuestions, isConfirmed]);

  const handleOptionClick = (option) => {
    setSelectedOption(option); //markerar svar användaren valt
  };

  const handleConfirmAnswer = () => {
    if (selectedOption) {
      if (selectedOption === quizData[currentQuestionIndex]?.answer) {
        setScore(score + 1);
      }
      setIsConfirmed(true); // checkar om användaren svarat rätt och lägger till poäng.
    }
  }; 

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsConfirmed(false);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  }; // nollställer värden efter ny fråga visas, om frågorna är slut så avslutas spelet.

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsConfirmed(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(20);
  }; // nollställer allt när man start om spelet.

  if (quizData.length === 0) {
    return <div>Laddar frågor...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex] || {};

  if (quizFinished) {
    return (
      <div className="quiz-result">
        <img src="/wow-logo.png" alt="Logo" className="top-image" />
        <p>You scored {score} out of {totalQuestions}</p>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    ); //slutsida för quiz
  }

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>

      <div className="options-container">
        {currentQuestion.options?.map((option, index) => { //skapar ett div element för varje alternativ
          const isCorrect = isConfirmed && option === currentQuestion.answer; //checkar om användaren valt alterantiv och gissat rätt
          const isWrong =
            isConfirmed && selectedOption === option && option !== currentQuestion.answer; //checkar om användaren valt alterantiv och gissat fel

          return (
            <div
              key={index}
              onClick={() => !isConfirmed && handleOptionClick(option)} //användaren kan inte klicka på fler alterantiv om de bekräftat sitt svar
              className={`option 
                ${selectedOption === option ? 'selected' : ''} 
                ${isCorrect ? 'correct' : ''} 
                ${isWrong ? 'wrong' : ''}`} // om alternativ är rätt fel eller selected så applicerar vi CSS klassen.
            >
              {option}
            </div>
          );
        })}
      </div>

      {!isConfirmed && <div className="timer">{timeLeft} seconds left</div>}



      {!isConfirmed && (
        <button onClick={handleConfirmAnswer} disabled={!selectedOption}>
           Confirm Answer
       </button>
       )}

      {isConfirmed && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}

      <div className="question-tracker">
       Question {currentQuestionNumber} out of {totalQuestions}
      </div>
    </div>
  );
};

export default Quiz;
