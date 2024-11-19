import { createContext, useContext, useEffect, useReducer } from 'react';
import { useQuestions } from '../hooks/useQuestions';

const QuizContext = createContext();

const SECS_PER_QUESTION = 5;

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

function QuizProvider({ children }) {
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

  const question = questions.at(index);

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
    <QuizContext.Provider
      value={{
        status,
        secondsRemaining,
        dispatch,
        category,
        categories,
        totalQuestions,
        index,
        answer,
        points,
        maxPossiblePoints,
        questions,
        question,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside the CitiesProvider');
  return context;
}

export { QuizProvider, useQuiz };
