import Header from './components/Header';
import Start from './components/Start';
import Loader from './components/Loader';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Finish from './components/Finish';
import { useQuiz } from './contexts/QuizContext';

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="max-w-[800px] mx-auto my-5 shadow-md bg-white rounded-md p-5">
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'ready' && <Start />}
      {status === 'active' && (
        <>
          <Progress />
          <Question />
          <NextButton />
        </>
      )}

      {status === 'finished' && <Finish />}
    </div>
  );
}
