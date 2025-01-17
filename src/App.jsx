import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';

const App = () => {
  const [isQuizActive, setQuizActive] = useState(false);

  const startQuiz = () => {
    setQuizActive(true);
  };

  return (
    <div className="App">
      {isQuizActive ? (
        <Quiz />
      ) : (
        <Home onStart={startQuiz} />
      )}
    </div>
  );
};

export default App;