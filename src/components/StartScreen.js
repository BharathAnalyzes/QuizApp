import React from 'react'
import { useNavigate } from 'react-router-dom'

const StartScreen = () => {
    const navigate=useNavigate();
    const handleQuiz=()=>{
        navigate("/easyquestion");
        //navigate("/mediumquestion");
        //navigate("/hardquestion");
    }
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 h-auto p-10 bg-gray-100 text-center rounded-lg shadow-lg">
            <h1 className="font-bold text-3xl mb-5"> HELLO USER ! </h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleQuiz}>
            Start Quiz
            </button>
        </div>
    </div>
  )
}

export default StartScreen
