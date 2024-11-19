import { useQuiz } from '../contexts/QuizContext';
import Timer from './Timer';
function Header() {
  const { status } = useQuiz();
  return (
    <div
      className={`border-b pb-5 mb-5 ${
        status === 'active' ? 'timer-start' : ''
      }`}
    >
      <h1 className="text-xl uppercase text-center">Quiz Blitz</h1>
      {status === 'active' && <Timer />}
    </div>
  );
}

export default Header;
