import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';

const App = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);

  const startQuiz = () => {
    setIsQuizActive(true);
  };

  return (
    <div>
      {!isQuizActive ? (
        <Home onStart={startQuiz} />
      ) : (
        <Quiz />
      )}
    </div>
  );
};

export default App;


