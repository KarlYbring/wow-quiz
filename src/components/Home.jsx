import React from 'react';
import './Quiz.css';
import '../components/Quiz.css';


const Home = ({ onStart }) => {
  return (
    <div className= "container">
      <h1>World of Warcraft Quiz</h1>
      <button onClick={onStart}>Start Quiz</button>
      <div classname="index"> </div>
    </div>
  );
};

export default Home;

