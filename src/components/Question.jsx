import React, { useEffect, useState } from 'react';

function Question({ id, QnA, onClick, flag, answerHistory, setAnswerHistory, submitAnswer }) {
  const [ques, setQues] = useState();
  const [isSelected, setIsSelected] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  // Reset function
  const resetAll = () => {
    setIsClicked(false);
    setIsSelected(null);
  };

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

  const buttonHandle = () => {
    if (flag) {
      console.log("submit");
      submitAnswer();
    }else{
      resetAll();
      onClick();
    }
  };


  return (
    <div className="w-full flex flex-col justify-start">
      <h1 className="text-xl">
        <strong>Q{id + 1}.</strong> {ques?.description}
      </h1>

      {/* Options */}
      <div className="w-full px-10 mt-10 flex flex-col gap-3">
        {ques &&
          ques.options?.map((option, index) => (
            <li
              key={index}
              className={`w-full list-none text-lg border-1 py-3 px-5 rounded-4xl 
                ${isClicked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200 hover:font-semibold'}                    
                ${option?.id === isSelected?.id ? (option?.is_correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : ''}`}
              onClick={() => ansHandle(option)}
            >
              {option.description}
            </li>
          ))}
      </div>

      <button
        onClick={buttonHandle}
        className={`absolute bottom-10 right-10 text-xl text-white px-6 py-3 rounded-lg cursor-pointer transition-transform transform hover:scale-105 bg-green-500 `}
      >
        {flag ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}

export default Question;
