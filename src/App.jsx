import React, { useState } from 'react';
import Home from './components/Home';

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
        <div>
          <h2>Quiz kommer snart!</h2>
        </div>
      )}
    </div>
  );
};

export default App;


