import { useState, useEffect } from 'react'
import IntroScreen from './components/IntroScreen';
import Question from './components/Question';

function App() {
  const [showIntroScreen, setShowIntroScreen] = useState(false)
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(q => {
        let allOptions = []
        allOptions = q.incorrect_answers.concat([q.correct_answer])
        allOptions.sort(() => Math.random() - 0.5);
        return {...q, all_answers: allOptions}
      })))
      .catch(err => console.error(err))    
  },[])

  const handleQuizStart = () => {
    setShowIntroScreen(prev => !prev)
  }

  const handleAnswerSelection = (answer, question) => {
    if(isCheckingAnswers) return
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
    if(!questions.every(q => q.selected_answer)) {
      console.log('not answered')
      return
    } 
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
