import React from "react";

export default function StopBtn({ session, setIsTimerRunning, setSession }) {
  const stop = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-testid="stop"
      title="Stop the session"
      disabled={!session ? true : false}
      onClick={stop}
    >
      <span className="oi oi-media-stop" />
    </button>
  );
}
