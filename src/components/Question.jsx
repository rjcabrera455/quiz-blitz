import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

function question() {
  const { question } = useQuiz();

  return (
    <>
      <h1 className="text-xl mb-5">{question.question}</h1>

      <Options />
    </>
  );
}

export default question;
