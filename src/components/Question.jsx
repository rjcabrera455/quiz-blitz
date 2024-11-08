import Options from './Options';

function question({ question, index, answer, dispatch }) {
  return (
    <>
      <h1 className="text-xl mb-5">{question.question}</h1>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </>
  );
}

export default question;
