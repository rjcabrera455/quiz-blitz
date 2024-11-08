export function useQuestions() {
  function getQuestions(type, dispatch) {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: type, payload: data });
      });
  }

  return { getQuestions };
}
