import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function Question({ id, QnA, onClick, flag, answerHistory, setAnswerHistory, submitAnswer }) {
  const [ques, setQues] = useState();
  const navigate = useNavigate()

  const [isSelected, setIsSelected] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [keyword, setKeyword] = useState()
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    setQues(QnA);

    // Restore previous selection if available
    if (answerHistory && answerHistory[QnA?.id]) {
      setIsSelected(answerHistory[QnA?.id]);
      setIsClicked(true);
    } else {
      resetAll();
    }
  }, [QnA, answerHistory]);
  
  useEffect(() => {
    
    if (Object.keys(QnA).length > 0) {
      // console.log(QnA);
      
      const text = JSON.parse(QnA.reading_material?.keywords);
      setKeyword(text)
    }
  }, [QnA])

  // Reset function
  const resetAll = () => {
    setIsClicked(false);
    setIsSelected(null);
  };

  const ansHandle = (option) => {
    if (isClicked) return; // Prevent multiple clicks

    setIsSelected(option);
    setIsClicked(true);

    // Store answer in parent state
    setAnswerHistory((prev) => ({
      ...prev,
      [QnA?.id]: option,
    }));
  };
  
  // button functions
  const buttonHandle = () => {
    if (flag) {
      submitAnswer();
      setFinish(true);
    } else {
      resetAll();
      onClick();
    }
  };

  const reStart = () => {
    navigate("/Landing");
  }

  return (
    <div className="w-full flex flex-col justify-start ">
      <h1 className="text-xl">
        <strong>Q{id + 1}.</strong> {ques?.description}
      </h1>

      {/* Options */}
      <div className="w-full px-10 mt-10 flex flex-col gap-3">
        {ques &&
          ques.options?.map((option, index) => (
            <motion.li
              key={index}
              initial={{ scale: 1, opacity: 1 }}
              animate={
                option?.id === isSelected?.id
                  ? option?.is_correct
                    ? { backgroundColor: "rgb(34, 197, 94)", color: "white" }
                    : { x: [-5, 5, -5, 5, 0], backgroundColor: "rgb(239, 68, 68)", color: "white" }
                  : {}
              }
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-full list-none text-lg border-1 py-3 px-5 rounded-4xl 
              ${isClicked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200 hover:font-semibold'}`}
              onClick={() => ansHandle(option)}
            >
              {option.description}
            </motion.li>
          ))}
      </div>

      {
        isClicked &&

        <ul className="mt-10 mr-25 border-2 rounded-xl p-4 text-justify overflow-y-scroll h-[35%]">
          <li className="w-full">
            <h1 className='text-center text-xl font-bold mb-2'>-:Reading Material:- </h1>
            <p className='text-lg inline'>Keywords: </p>
            <p className='mb-5 inline'>
              {
                keyword && (
                  keyword.map(item => (
                    <span
                      key={item}
                      className='mx-5 font-semibold'
                    >
                      {item}
                    </span>
                  ))
                )
              }
            </p>
            <h1 className='text-center text-xl font-bold mb-2 mt-10'>-:Practice Material:- </h1>
            <p className='text-lg inline'>Keywords: </p>
            <p className='mb-5 inline'>
              {
                QnA.reading_material.practice_material.keywords?.map(item => (
                  <span
                    key={item}
                    className='mx-5 font-semibold'
                  >
                    {item}
                  </span>
                ))
              }
            </p>
          </li>
        </ul>

      }


      {
        !finish && 
          <button
          onClick={buttonHandle}
          className={`absolute bottom-10 right-10 text-xl text-white px-6 py-3 rounded-lg cursor-pointer transition-transform transform hover:scale-105 bg-green-500 `}
          >
            {flag ? 'Submit' : 'Next'}
          </button>
      }
      {
        finish && 
          <button
          onClick={() => navigate("/")}
          className={`absolute bottom-10 left-1/2  text-xl text-white px-6 py-3 rounded-lg cursor-pointer transition-transform transform hover:scale-105 bg-blue-500 `}
          >
            Restart
          </button>
      }
    </div>
  );
}

export default Question;
