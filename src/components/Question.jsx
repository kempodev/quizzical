
const Question = ({ question, handleAnswerSelection }) => {

  const selectedStyle = {
    backgroundColor: '#D6DBF5',
    border: '1px solid #D6DBF5'
  }
  
  const optionElements = question.all_answers.map(option => {
    return (
      <button 
        key={option}
        style={option === question.selected_answer ? selectedStyle : {}}
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