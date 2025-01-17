import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div className="home-container">
      <h1>World of Warcraft Classic Quiz</h1>
      <p>Testa dina kunskaper om World of Warcraft Classic!</p>
      <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Starta Quiz
      </button>
    </div>
  );
};

export default Home;