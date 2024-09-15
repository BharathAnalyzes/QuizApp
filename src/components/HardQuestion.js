import React, { useContext, useState } from 'react';
import question from "../MockData/question.json";
import questionContext from '../MockData/context';
import { useNavigate } from 'react-router-dom';

const HardQuestion = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);  // New state to track if the user failed the hard level

    const questions = question?.hard;
    const { totalScore, setTotalScore } = useContext(questionContext); // Manage the total score
    const navigate = useNavigate(); // Hook to handle navigation

    // Function to validate the selected answer
    const validateRightAnswer = () => {
        if (questions?.[currentIndex]?.correctAnswer.trim().toLowerCase() === selectedOption.trim().toLowerCase()) {
            setIsCorrectAnswer(true);  // Correct answer
            setTotalScore(totalScore + 30); // Increase score by 30 for hard level
        } else {
            setIsCorrectAnswer(false); // Wrong answer
        }
    };

    // Function to move to the next question
    const handleNextQuestion = () => {
        setSelectedOption("");  // Reset selected option
        setIsCorrectAnswer(null);  // Reset the answer status
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);  // Move to next question
    };

    // Function to handle hard level submission
    const handleHardLevelSubmit = () => {
        if (totalScore < 120) {  // Assuming 120 is the passing score
            setHasFailed(true);   // Set failed status if score is less than 120
        }
        setIsSubmitted(true);  // Mark the quiz as submitted
    };

    // Function to restart only the hard level
    const handleRetryHardLevel = () => {
        setCurrentIndex(0);  // Reset to the first question of the hard level
        setSelectedOption("");  // Reset selected option
        setIsCorrectAnswer(null);  // Reset answer status
        setIsSubmitted(false);  // Reset submitted status
        setHasFailed(false);  // Reset failed status
    };

    // Function to restart the entire quiz
    const handleRestartQuiz = () => {
        setTotalScore(0);  // Reset the total score
        navigate('/');  // Navigate to the home or first question (modify the route if needed)
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                {/* Conditionally show the heading only if the quiz is not submitted */}
                {!isSubmitted && (
                    <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
                        Welcome to Hard Questions
                    </h1>
                )}

                {!isSubmitted ? (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                {questions[currentIndex]?.question}
                            </h2>

                            {/* Render question input based on type */}
                            {questions[currentIndex]?.type === "multiple-choice" && (
                                <div className="space-y-2">
                                    {questions[currentIndex]?.options.map((option, i) => (
                                        <div key={i}>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={`Multiple-Question${currentIndex}`}
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={(e) => setSelectedOption(e.target.value)}
                                                    className="form-radio text-blue-600"
                                                />
                                                <span className="text-gray-700">{option}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {questions[currentIndex]?.type === "true-false" && (
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`TrueFalse-Question${currentIndex}`}
                                            value="true"
                                            checked={selectedOption === "true"}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="text-gray-700">True</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`TrueFalse-Question${currentIndex}`}
                                            value="false"
                                            checked={selectedOption === "false"}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="text-gray-700">False</span>
                                    </label>
                                </div>
                            )}

                            {questions[currentIndex]?.type === "text-input" && (
                                <div className="my-4">
                                    <input
                                        type="text"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        placeholder="Type your answer"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex justify-between items-center">
                            <button
                                onClick={validateRightAnswer}
                                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
                            >
                                Submit
                            </button>

                            {currentIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleHardLevelSubmit}
                                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Submit Hard Level
                                </button>
                            )}
                        </div>

                        {/* Display the result after submitting */}
                        {isCorrectAnswer !== null && (
                            <div className="mt-4 text-center">
                                <h1 className={`text-xl font-bold ${isCorrectAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrectAnswer ? "Correct Answer ✅" : "Wrong Answer ❌"}
                                </h1>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        {hasFailed ? (
                            <>
                                <h1 className="text-2xl font-bold mb-5 text-red-600">
                                    You failed at the hard level. Try again!
                                </h1>
                                <button
                                    onClick={handleRetryHardLevel}
                                    className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Retry Hard Level
                                </button>
                                <button
                                    onClick={handleRestartQuiz}
                                    className="m-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Re-Start
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold mb-5 text-green-600">
                                    Congratulations! 🎉 You've completed all levels!
                                </h1>
                                <button
                                    onClick={handleRestartQuiz}
                                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Re-Start
                                </button>
                            </>
                        )}
                        <p className="text-lg mt-4">Your total score: {totalScore}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HardQuestion;
