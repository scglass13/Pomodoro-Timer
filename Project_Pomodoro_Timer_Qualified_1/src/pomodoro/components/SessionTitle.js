import React from "react";
import { secondsToDuration, minutesToDuration } from "../../utils/duration";

export default function SessionTitle({
  session,
  focusDuration,
  breakDuration,
  isTimerRunning,
}) {
  if (session === null) return null;
<<<<<<< HEAD
=======
  
>>>>>>> 4d1b345cee208b4e24362e6ac2fa77507c1fbace

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {session?.label} for{" "}
            {session?.label === "Focusing"
              ? minutesToDuration(focusDuration)
              : minutesToDuration(breakDuration)}{" "}
            minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining
          </p>
          {!isTimerRunning && <h2>PAUSED</h2>}
        </div>
      </div>
    </div>
  );
}
