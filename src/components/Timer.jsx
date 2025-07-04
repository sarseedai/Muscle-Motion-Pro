import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-100 rounded-md p-4 max-w-sm mx-auto shadow">
      <div className="text-3xl font-mono">{formatTime(time)}</div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Reset
      </button>
    </div>
  );
}
