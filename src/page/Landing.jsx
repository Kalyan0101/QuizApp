import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'


function Landing() {

  const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <div className="container">
        <h1 className='text-4xl text-[#333] mb-5'>Welcome to QuizMaster</h1>
        <p className='text-xl text-[#666] mb-7'>Test your knowledge with fun and interactive quizzes. Ready to challenge yourself?</p>
        <button
          className='cta-button'
          onClick={() => navigate("/quiz")}
        >
          Start Quiz
        </button>
      </div>

    </div>
  )
}

export default Landing