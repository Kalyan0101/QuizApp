import { useEffect, useState } from 'react'

function QuizHook() {

    const [data, setData] = useState({})

    useEffect(() => {
        fetch("https://api.jsonserve.com/Uw5CrX")
        .then(res => res.json())
        .then(res => setData(res))
    }, [])
    return data
    }

export default QuizHook