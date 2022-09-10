import { useState, useEffect } from 'react'
import IntroScreen from './components/IntroScreen';
import questionsData from './data.json'

function App() {
  const [showIntroScreen, setShowIntroScreen] = useState(true)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(questionsData.results)
  },[])
  
  const handleQuizStart = () => {
    setShowIntroScreen(prev => !prev)
  }

  return (
    <main className='container'>
      {showIntroScreen ? 
        <IntroScreen startQuiz={handleQuizStart} /> :
        <p>quiz</p>
      }
    </main>
  );
}

export default App;
