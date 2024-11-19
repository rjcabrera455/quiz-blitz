import { useQuiz } from '../contexts/QuizContext';

function Progress() {
  const { totalQuestions, index, answer, points, maxPossiblePoints } =
    useQuiz();
  return (
    <div>
      <progress
        max={totalQuestions}
        value={index + Number(answer !== null)}
        className="w-full rounded-md overflow-hidden"
      />
      <div className="flex justify-between mb-2.5">
        <p>
          Question <strong>{index + 1}</strong> / {totalQuestions}
        </p>

        <p>
          <strong>{points}</strong> / {maxPossiblePoints}
        </p>
      </div>
    </div>
  );
}

export default Progress;
