import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";

const API_URL = "https://opentdb.com/api.php?amount=5";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false); 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      const data = await response.json();
      const formattedQuestions = data.results.map(question => ({
        id: question.question,
        question: question.question,
        correct_answer: question.correct_answer,
        answers: [...question.incorrect_answers, question.correct_answer],
      }));
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    setUserAnswer({ isCorrect, correctAnswer: currentQuestion.correct_answer });
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer(null);
    if (currentQuestionIndex +1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer(null);
    setLoading(true);
    setGameOver(false);
    fetchData();
  };

  return (
    <div id="quiz-container">
      {loading ? (
        <p>Loading...</p>
      ) : gameOver ? ( 
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score: {score}</p>
          <button id="button" onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <Question
          question={questions[currentQuestionIndex]}
          userAnswer={userAnswer}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
