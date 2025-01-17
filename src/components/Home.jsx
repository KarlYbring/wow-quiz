import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div>
      <h1>World of Warcraft Quiz</h1>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default Home;

