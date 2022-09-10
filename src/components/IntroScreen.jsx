import React from 'react'

const IntroScreen = ({ startQuiz }) => {
  return (
    <>
      <h1>Quizzical</h1>
      <h3>This is a quiz game</h3>
      <button onClick={startQuiz}>Start quiz</button>
    </>
  )
}

export default IntroScreen