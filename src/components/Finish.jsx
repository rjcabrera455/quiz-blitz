import { useQuiz } from '../contexts/QuizContext';
import { useQuestions } from '../hooks/useQuestions';

function Finish() {
  const { points, maxPossiblePoints, dispatch } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  const { getQuestions } = useQuestions();
  function handleClick() {
    getQuestions('restart', dispatch);
  }
  return (
    <>
      <div
        className={`${
          percentage >= 50 ? 'bg-green-500' : 'bg-red-500'
        } p-5 rounded-md text-white mb-2.5`}
      >
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </div>

      <div className="text-end">
        <button
          className="py-2.5 px-5 rounded-md bg-body text-white"
          onClick={handleClick}
        >
          Restart
        </button>
      </div>
    </>
  );
}

export default Finish;
