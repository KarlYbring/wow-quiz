import React from 'react';
import './Quiz.css';
import '../components/Quiz.css';


const Home = ({ onStart }) => {
  return (
    <div className= "home-page">
      <img src="/wow-logo.png" alt="Logo" className="top-image" />
      <h1>World Of Warcraft Classic Quiz</h1>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default Home;

