import React, { useEffect, useRef, useState } from 'react'
import QuizHook from './Hook/QuizHook'
import Question from './components/Question';
import Swal from 'sweetalert2'

function App() {

  const data = QuizHook()

  const [selectedId, setSelectedId] = useState(0);
  const [question, setQuestion] = useState({});
  const [flag, setFlag] = useState(false);
  const [timeLeft, setTimeLeft] = useState("0 : 00");
  const [answerHistory, setAnswerHistory] = useState();
  const intervalId = useRef(null);
  const [timeEnd, setTimeEnd] = useState(false);


  // generate flag and fill question
  useEffect(() => {
    if (data.questions?.length > 0)
      setQuestion(() => data.questions[selectedId])

    if (selectedId >= data.questions?.length - 1)
      setFlag(true);
    else
      setFlag(false);
  }, [selectedId, data])

  // timer
  useEffect(() => {

    if (data && data?.duration) {
      let minute = data?.duration-1
      let sec = 60;
      intervalId.current = setInterval(() => {
        if(sec == 0 && minute > 0){
          minute--;
          sec = 60;
        }
        if(sec == 0 && minute == 0){ 
          // submitAnswer(); // NOTE:
          clearTimer(); 
        }
        else sec = sec-1; 

        if(sec <= 30 && minute == 0) setTimeEnd(true)
        
        setTimeLeft(`${minute} : ${sec}`);
      }, 1000);
    }    
  }, [data])

  const clearTimer = () => {
    if(intervalId.current)
      clearInterval(intervalId.current);
    intervalId.current = null;
  }

  const nextQuestion = () => {

    if (selectedId < data.questions?.length - 1)
      setSelectedId((id) => id + 1)

    if (selectedId >= data.questions?.length - 2)
      setFlag(true);
    else
      setFlag(false);
  }

  // result
  const submitAnswer = () => { 
    let right = 0;
    let wrong = 0;
    
    clearTimer();

    if(answerHistory){
      for(const key in answerHistory){
        if (answerHistory[key].is_correct)
          right++;
        else
          wrong++;
      }
    }
    const result = (right*4)-wrong > 0 ? (right*4)-wrong : 0

    Swal.fire({
      title: 'Result',
      html: `
        <h1>Total Score: <strong>${result}</strong></h1>
        <p>Time Saved: ${timeLeft}*</p>
      `
    })
  }


  return (
    <>
      <div className="w-full bg-gray-50 flex">
        <div className="flex h-screen w-1/5 flex-col bg-gray-700 text-white">
          <h1 className="mt-10 mx-auto text-3xl font-bold">Quiz</h1>
          <h1 className="mt-10 ml-5 text-xl font-bold">Questions</h1>
          <ul className="overflow-y-scroll">
            {data.questions?.map((ques, index) => (

              <li
                key={ques.id}
                className={`flex flex-row cursor-pointer space-x-2 py-4 px-10 text-gray-300 hover:bg-slate-600 ${selectedId === index ? "bg-slate-600 font-semibold" : ""} `}
                onClick={() => setSelectedId(index)}
              >
                <span className='text-lg'>{index + 1}.</span>
                <p> {ques.description} </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-10 w-4/5 flex flex-col justify-start items-start">
          <div className="w-full pt-10 mb-10 flex flex-col gap-6">
            <h1 className="w-full text-2xl ">Today's Topic: <strong><em>{data?.topic}</em></strong></h1>
            {/* timer and marks */}
            <div className=" w-full flex gap-5 justify-between px-5">
              {/* marks */}
              <div className="flex gap-5">
                <p className='text-red-500'>Negative Marking: <strong>{data?.negative_marks}*</strong></p>
                <p className='text-green-500'>Correct Answer: <strong>{data?.correct_answer_marks}*</strong></p>
              </div>
              {/* timer */}
              <p className={`${timeEnd ? "text-red-500 text-lg font-semibold" : "text-black"}`}>Time Left: {timeLeft}</p>
            </div>
          </div>
          {
            data && (
              <Question
                id = {selectedId}
                QnA = {question}
                onClick = {nextQuestion}
                answerHistory = {answerHistory}
                setAnswerHistory = {setAnswerHistory}
                flag = {flag}
                submitAnswer = {submitAnswer}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App