import React, { useContext, useState } from 'react';
import question from "../MockData/question.json";
import questionContext from '../MockData/context';
import { useNavigate } from 'react-router-dom';

const EasyQuestion = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track if the level is submitted

    const questions = question?.medium;
    const { totalScore, setTotalScore } = useContext(questionContext);
    const navigate = useNavigate(); // Hook to handle navigation

    // Function to validate the selected answer
    const validateRightAnswer = () => {
        if (questions?.[currentIndex]?.correctAnswer.trim().toLowerCase() === selectedOption.trim().toLowerCase()) {
            setIsCorrectAnswer(true);  // Correct answer
            setTotalScore(totalScore + 20); // Increase score by 10
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

    // Function to handle Easy level submission
    const handleEasyLevelSubmit = () => {
        setIsSubmitted(true); // Set the state to true to indicate the submission
    };
    const handleReload = () => {
        setCurrentIndex(0);  // Reset to the first question of the hard level
        setSelectedOption("");  // Reset selected option
        setIsCorrectAnswer(null);  // Reset answer status
        setIsSubmitted(false);  // Reset submitted status
       // navigate("/mediumquestion"); 
    }
    const handleRestartQuiz = () => {
        setTotalScore(0);  // Reset the total score
        navigate('/');  // Navigate to the home or first question (modify the route if needed)
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
                    Welcome to Medium Questions
                </h1>

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
                        className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 text-sm sm:px-3 sm:py-2 sm:text-base md:px-5 md:py-2 md:text-lg"
                    >
                        Submit
                    </button>

                    {currentIndex < 2 && (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Next
                        </button>
                    )}

                    {/* Show Submit Easy Level button after the third question */}
                    {currentIndex >= 2 && (
                        <button
                            onClick={handleEasyLevelSubmit}
                            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 text-sm sm:px-3 sm:py-2 sm:text-base md:px-5 md:py-2 md:text-lg"
                        >
                            Submit Medium Level
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
            </div>

            {/* Render the result after the level is submitted */}
            {isSubmitted && (
                <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    {totalScore < 60 ? (
                        <div>
                            <h1 className="text-2xl font-bold text-red-600">Sorry, you didn't qualify.</h1>
                            <p className="mt-2 text-lg text-gray-700">Try again to qualify for the next round!</p>
                            <button
                                onClick={handleReload} // Reload the page for the user to try again
                                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                            >
                                Try Again
                            </button>
                            <button
                                    onClick={handleRestartQuiz}
                                    className="mx-4 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Re-Start
                                </button>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-bold text-green-600">Congratulations! 🎉</h1>
                            <p className="mt-2 text-lg text-gray-700">You qualified for the next round.</p>
                            <button
                                onClick={() => navigate('/hardquestion')} // Navigate to MediumQuestion
                                className="mt-4 bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600"
                            >
                                Go to Next Level
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EasyQuestion;
