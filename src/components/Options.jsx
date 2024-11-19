import { useQuiz } from '../contexts/QuizContext';

function Options() {
  const { question, dispatch, answer } = useQuiz();
  const { options } = question;
  const hasAnswered = answer !== null;
  return (
    <div>
      {options.map((option, index) => (
        <button
          className={`border p-2.5 rounded-md  cursor-pointer mb-2.5 w-full text-start transition-all ${
            index === answer ? 'answer' : ''
          } ${
            hasAnswered
              ? index === question.correctOption
                ? 'border-green-500 bg-green-500'
                : 'border-red-500 bg-red-500'
              : 'hover:translate-x-2'
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: 'answer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
