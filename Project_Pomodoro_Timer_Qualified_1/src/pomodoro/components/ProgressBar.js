import React from "react";

export default function ProgressBar({ session, focusDuration, breakDuration }) {
  const currentTimer =
    session?.label === "Focusing" ? focusDuration : breakDuration;
  const percent =
    ((currentTimer * 60 - session?.timeRemaining) / (currentTimer * 60)) * 100;

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percent}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
