import { useState, useEffect } from 'react'
import IntroScreen from './components/IntroScreen';
import Question from './components/Question';
import questionsData from './data.json'

function App() {
  const [showIntroScreen, setShowIntroScreen] = useState(true)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(questionsData.results.map(q => {
      let allOptions = []
      allOptions = q.incorrect_answers.concat([q.correct_answer])
      allOptions.sort(() => Math.random() - 0.5);
      return {...q, all_answers: allOptions}
  }))
  },[])
  
  const handleQuizStart = () => {
    setShowIntroScreen(prev => !prev)
  }

  const handleAnswerSelection = (answer, question) => {
    setQuestions(prevQuestions => (
      prevQuestions.map(q => {
        if(q.question === question) {
          return {...q, selected_answer: answer}
        } else {
          return q
        }
    })
    ))
  }

  const handleCheckClick = () => {
    console.log('check click')
  }

  const questionElements = questions.map(question => (
    <Question 
      key={question.question} 
      handleAnswerSelection={handleAnswerSelection}
      question={question} 
    />
  ))

  return (
    <main className='container'>
      {showIntroScreen ? 
        <IntroScreen startQuiz={handleQuizStart} /> :
        <>
          {questionElements}
          <footer>
            <button className='btn-primary' onClick={handleCheckClick}>Check answers</button>
          </footer>
        </>
      }
    </main>
  );
}

export default App;
