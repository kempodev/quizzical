import { useState, useEffect } from 'react'
import IntroScreen from './components/IntroScreen';
import Question from './components/Question';
import Footer from './components/Footer';

function App() {
  const [showIntroScreen, setShowIntroScreen] = useState(true)
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false)
  const [allAnswered, setAllAnswered] = useState(false)
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    const checkAnswerCount = () => {
      if (questions.length > 0 && questions.every(q => q.selected_answer)) {
        setAllAnswered(true)
      }
    }

    checkAnswerCount()
  }, [questions])

  const fetchQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=5&encode=url3986')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setQuestions(data.results.map(q => {
        let allOptions = []
        allOptions = q.incorrect_answers.concat([q.correct_answer])
        const allDecodedOptions = allOptions.map(option => decodeURIComponent(option))
        allOptions.sort(() => Math.random() - 0.5);
        return {
          ...q,
          question: decodeURIComponent(q.question),
          correct_answer: decodeURIComponent(q.correct_answer),
          all_answers: allDecodedOptions
        }
      })))
      .catch(err => console.error(err))
  }

  const countCorrectAnswers = () => {
    const correctArray = questions.filter(q => q.selected_answer === q.correct_answer)
    setCorrectAnswersNumber(correctArray.length)
  }

  const handleQuizStart = () => {
    setShowIntroScreen(prev => !prev)
  }

  const handleAnswerSelection = (answer, question) => {
    if (isCheckingAnswers) return
    setQuestions(prevQuestions => (
      prevQuestions.map(q => {
        if (q.question === question) {
          return { ...q, selected_answer: answer }
        } else {
          return q
        }
      })
    ))
  }

  const handleCheckClick = () => {
    if (!questions.every(q => q.selected_answer)) {
      return
    }
    countCorrectAnswers()
    setIsCheckingAnswers(prev => !prev)
  }

  const handleGameReset = () => {
    setAllAnswered(false)
    setQuestions([])
    fetchQuestions()
    setCorrectAnswersNumber(0)
    setIsCheckingAnswers(prev => !prev)
  }

  const questionElements = questions.map(question => (
    <Question
      key={question.question}
      handleAnswerSelection={handleAnswerSelection}
      question={question}
      isCheckingAnswers={isCheckingAnswers}
    />
  ))

  return (
    <main className='container'>
      {showIntroScreen ?
        <IntroScreen startQuiz={handleQuizStart} /> :
        <>
          <h1>Quizzical</h1>
          {questions.length > 0 ? questionElements : <h3>Loading questions...</h3>}
          <Footer
            handleCheckClick={handleCheckClick}
            handleGameReset={handleGameReset}
            isCheckingAnswers={isCheckingAnswers}
            correctAnswersNumber={correctAnswersNumber}
            numberQuestions={questions.length}
            allAnswered={allAnswered}
          />
        </>
      }
    </main>
  );
}

export default App;
