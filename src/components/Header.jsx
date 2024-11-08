import Timer from './Timer';
function Header({ status, secondsRemaining, dispatch }) {
  return (
    <div
      className={`border-b pb-5 mb-5 ${
        status === 'active' ? 'timer-start' : ''
      }`}
    >
      <h1 className="text-xl uppercase text-center">Quiz Blitz</h1>
      {status === 'active' && (
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
      )}
    </div>
  );
}

export default Header;
