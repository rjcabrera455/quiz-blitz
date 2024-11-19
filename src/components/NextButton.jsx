import { useQuiz } from '../contexts/QuizContext';

function NextButton() {
  const { answer, index, totalQuestions, dispatch } = useQuiz();
  if (answer === null) return;

  if (index < totalQuestions - 1) {
    return (
      <div className="text-right">
        <button
          className="py-2.5 px-5 rounded-md bg-body text-white"
          onClick={() => dispatch({ type: 'next' })}
        >
          Next
        </button>
      </div>
    );
  }

  if (index === totalQuestions - 1) {
    return (
      <div className="text-right">
        <button
          className="py-2.5 px-5 rounded-md bg-body text-white"
          onClick={() => dispatch({ type: 'finish' })}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
