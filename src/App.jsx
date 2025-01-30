import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';

const App = () => {
  const [isQuizActive, setIsQuizActive] = useState(false); // quiz inaktiv tills vi aktiverar

  const startQuiz = () => {
    setIsQuizActive(true);
  };

  const restartQuiz = () => {
    setIsQuizActive(false);
  };

  return (
    <div>
      {!isQuizActive ? (
        <Home onStart={startQuiz} />
      ) : (
        <Quiz onRestart={restartQuiz} />
      )}
    </div> //om Quiz inte är aktivt så visar vi antingen startsida eller slutsida
  );
};

export default App;
