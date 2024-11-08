export function useQuestions() {
  function getQuestions(type, dispatch) {
    fetch('https://rjcabrera455.github.io/api/quiz-blitz/questions.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: type, payload: data.questions });
      });
  }

  return { getQuestions };
}
