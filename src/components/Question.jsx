
const Question = ({ question, handleAnswerSelection, isCheckingAnswers }) => {

  const selectedStyle = {
    backgroundColor: '#D6DBF5',
    border: '1px solid #D6DBF5'
  }

  const correctStyle = {
    backgroundColor: '#94D7A2',
    border: '1px solid #94D7A2'
  }

  const incorrectStyle = {
    backgroundColor: '#F8BCBC',
    border: '1px solid #F8BCBC'
  }

  const fadedStyle = {
    opacity: '0.5'
  }

  const getStyles = (option) => {
    if (isCheckingAnswers) {
      if (option === question.correct_answer) {
        return correctStyle
      }
      if (option === question.selected_answer) {
        return incorrectStyle
      }
      return fadedStyle
    }
    if (option === question.selected_answer) {
      return selectedStyle
    }
  }

  const optionElements = question.all_answers.map(option => {
    return (
      <button
        key={option}
        style={getStyles(option)}
        className='option-button'
        onClick={(e) => handleAnswerSelection(e.target.textContent, question.question)}
      >
        {option}
      </button>
    )
  })

  return (
    <div className='question-container'>
      <h3>{question.question}</h3>
      <div className='option-container'>
        {optionElements}
      </div>
    </div>
  )
}

export default Question