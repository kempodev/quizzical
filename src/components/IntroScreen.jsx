import React from 'react'

const IntroScreen = ({ startQuiz }) => {
  return (
    <div className='intro-container'>
      <h1>Quizzical</h1>
      <h3>Multiple choice quiz game</h3>
      <h5>by Joona Kemppainen</h5>
      <button className='btn-primary btn-large' onClick={startQuiz}>Start quiz</button>
    </div>
  )
}

export default IntroScreen