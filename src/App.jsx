import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';

const App = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Funktion för att starta quizet
  const startQuiz = () => {
    setIsQuizActive(true);
  };

  // Funktion för att starta om quizet
  const restartQuiz = () => {
    setIsQuizActive(false);
  };

  return (
    <div>
      {/* Om quizet inte är aktivt, visa Home, annars Quiz */}
      {!isQuizActive ? (
        <Home onStart={startQuiz} />
      ) : (
        <Quiz onRestart={restartQuiz} />
      )}
    </div>
  );
};

export default App;
