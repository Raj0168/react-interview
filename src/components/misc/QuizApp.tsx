import { useState } from "react";

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    questionText: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 4,
    questionText: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
  {
    id: 5,
    questionText: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
];

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback(
        "Incorrect. The correct answer was: " + currentQuestion.correctAnswer
      );
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    setFeedback(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizEnded(false);
    setSelectedOption(null);
    setFeedback(null);
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "10px" }}>Quiz App</h1>

      {!quizEnded ? (
        <div>
          <h2
            style={{ marginBottom: "20px", color: "#555", fontSize: "1.5em" }}
          >
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </h2>
          <p
            style={{
              marginBottom: "25px",
              fontSize: "1.2em",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {currentQuestion.questionText}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor:
                    selectedOption === option ? "#e6f7ff" : "#f0f0f0",
                  color: selectedOption === option ? "#007bff" : "#333",
                  cursor: "pointer",
                  fontSize: "1em",
                  fontWeight: selectedOption === option ? "bold" : "normal",
                  transition:
                    "background-color 0.2s, color 0.2s, border-color 0.2s",
                  outline: "none",
                  textAlign: "left",
                }}
                onMouseOver={(e) => {
                  if (selectedOption !== option)
                    e.currentTarget.style.backgroundColor = "#e5e5e5";
                }}
                onMouseOut={(e) => {
                  if (selectedOption !== option)
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <p
              style={{
                marginTop: "10px",
                fontSize: "1em",
                fontWeight: "bold",
                color: feedback.startsWith("Correct") ? "#28a745" : "#dc3545",
              }}
            >
              {feedback}
            </p>
          )}

          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            style={{
              padding: "12px 25px",
              fontSize: "1.1em",
              backgroundColor: selectedOption === null ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: selectedOption === null ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              marginTop: "20px",
            }}
            onMouseOver={(e) => {
              if (selectedOption !== null)
                e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              if (selectedOption !== null)
                e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            {currentQuestionIndex < quizQuestions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ color: "#28a745", marginBottom: "15px" }}>
            Quiz Completed!
          </h2>
          <p
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#000",
            }}
          >
            Your Score: {score} out of {quizQuestions.length}
          </p>
          <button
            onClick={handleRestartQuiz}
            style={{
              padding: "12px 25px",
              fontSize: "1.1em",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#5a6268")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6c757d")
            }
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
