import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Start from './components/Start';
import Loader from './components/Loader';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Finish from './components/Finish';
import { useQuestions } from './hooks/useQuestions';

const SECS_PER_QUESTION = 5;

export default function App() {
  const initialState = {
    category: '',
    categories: [],
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'ready':
      case 'restart':
        const categories = [
          ...new Set(action.payload.map((question) => question.category)),
        ];
        const obj = {
          categories: categories,
          questions: action.payload,
          status: 'ready',
        };

        if (action.type === 'ready') {
          return {
            ...state,
            ...obj,
          };
        } else {
          return {
            ...initialState,
            ...obj,
          };
        }
      case 'start':
        const questions = state.questions.filter(
          (question) => question.category === action.category
        );
        return {
          ...state,
          questions: questions,
          status: 'active',
          secondsRemaining: questions.length * SECS_PER_QUESTION,
        };
      case 'answer':
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case 'next':
        return { ...state, index: state.index + 1, answer: null };
      case 'finish':
        return {
          ...state,
          status: 'finished',
        };
      case 'tick':
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? 'finished' : state.status,
        };

      default:
        throw new Error('Action Unknown');
    }
  }

  const [
    {
      category,
      categories,
      questions,
      status,
      index,
      answer,
      points,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { getQuestions } = useQuestions();

  useEffect(() => {
    getQuestions('ready', dispatch);
  }, []);

  const totalQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="max-w-[800px] mx-auto my-5 shadow-md bg-white rounded-md p-5">
      <Header
        status={status}
        secondsRemaining={secondsRemaining}
        dispatch={dispatch}
      />
      {status === 'loading' && <Loader />}
      {status === 'ready' && (
        <Start
          category={category}
          categories={categories}
          dispatch={dispatch}
        />
      )}
      {status === 'active' && (
        <>
          <Progress
            totalQuestions={totalQuestions}
            index={index}
            answer={answer}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
          />
          <Question
            question={questions.at(index)}
            index={index}
            answer={answer}
            dispatch={dispatch}
          />
          <NextButton
            index={index}
            answer={answer}
            totalQuestions={totalQuestions}
            dispatch={dispatch}
          />
        </>
      )}

      {status === 'finished' && (
        <Finish
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
