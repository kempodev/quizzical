import React from 'react'

const IntroScreen = ({ startQuiz }) => {
  return (
    <div className='intro-container'>
      <h1>Quizzical</h1>
      <h3>This is a quiz game</h3>
      <button className='btn-primary btn-large' onClick={startQuiz}>Start quiz</button>
    </div>
  )
}

export default IntroScreen