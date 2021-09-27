import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import SessionTitle from "./components/SessionTitle";
import PlayBtn from "./components/PlayBtn";
import StopBtn from "./components/StopBtn";
import ProgressBar from "./components/ProgressBar";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  const elapsedSeconds = prevState.timeTotal - timeRemaining;
  return {
    ...prevState,
    timeRemaining,
    percentComplete: (elapsedSeconds / prevState.timeTotal) * 100,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        duration: minutesToDuration(breakDuration),
        timeRemaining: breakDuration * 60,
        percentComplete: 0,
      };
    }
    return {
      label: "Focusing",
      duration: minutesToDuration(focusDuration),
      timeRemaining: focusDuration * 60,
      percentComplete: 0,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const style = !session ? { display: "none" } : { display: null };

  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  let percent;
  if (session) {
    percent = Math.round(
      (secondsToDuration(session) - session.timeRemaining) * 100
    );
  }

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* ✔ TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* ✔ TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                onClick={() => {
                  setFocusDuration(Math.max(focusDuration - 5, 5));
                }}
                disabled={session}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>
              {/* ✔ TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                onClick={() => {
                  setFocusDuration(Math.min(focusDuration + 5, 60));
                }}
                disabled={session}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* ✔ TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* ✔ TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  onClick={() => {
                    setBreakDuration(Math.max(breakDuration - 1, 1));
                  }}
                  disabled={session}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* ✔ TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  onClick={() => {
                    setBreakDuration(Math.min(breakDuration + 1, 15));
                  }}
                  disabled={session}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <PlayBtn playPause={playPause} isTimerRunning={isTimerRunning} />
          <StopBtn
            session={session}
            setSession={setSession}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
      </div>
      <div style={style}>
        <SessionTitle
          session={session}
          percent={percent}
          isTimerRunning={isTimerRunning}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          nextSession={nextSession}
        />
        <ProgressBar
          session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
