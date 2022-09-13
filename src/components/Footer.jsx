const Footer = ({ 
  handleCheckClick, 
  handleGameReset, 
  isCheckingAnswers, 
  correctAnswersNumber, 
  numberQuestions,
  allAnswered
}) => {
  return (
    <footer>
      {isCheckingAnswers ?
        <>
          <h3>You scored {correctAnswersNumber}/{numberQuestions} correct answers</h3>
          <button className='btn-primary btn-reset' onClick={handleGameReset}>Play again</button>
        </> :
        <button disabled={!allAnswered} className='btn-primary' onClick={handleCheckClick}>Check answers</button>
      }
    </footer>
  )
}

export default Footer