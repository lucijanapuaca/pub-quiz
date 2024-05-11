import React from "react";

function Question({ question, userAnswer, onAnswer, onNextQuestion, score }) {
  const handleAnswerClick = (answer) => {
    onAnswer(answer);
  };


  const formattedQuestion = question.question
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&acute;/g, "´")
  .replace(/&rsquo;/g, "’")
  .replace(/&ldquo;/g, "“")
  .replace(/&rdquo;/g, "”")
  .replace(/&#039;/g, "'");


  return (
    <div>
      <h2>QUIZ</h2>
      <p>{formattedQuestion}</p>
      <ul id="offered-answers-list">
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button disabled={userAnswer !== null} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      {userAnswer !== null && (
        <div>
          <p >Your answer is {userAnswer.isCorrect ? 'correct' : 'incorrect'}</p>
          {!userAnswer.isCorrect && <p>Correct answer: {question.correct_answer}</p>}
        </div>
      )}
      <p>Score: {score}</p>
      <button id="button" onClick={onNextQuestion} disabled={userAnswer === null}>
        Next Question
      </button>
    </div>
  );
}

export default Question;
