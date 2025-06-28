import { useRef, useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const seconds = Math.floor(time / 100);
  const milliSeconds = time % 100;

  const handleStart = () => {
    if (running) return;

    setRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev >= 1000) {
          clearInterval(timerRef.current);
          setRunning(false);
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <p>
        <span style={{ fontSize: "4rem" }}>{seconds}</span>
        <span style={{ fontSize: "1.5rem", padding: "0 10px" }}>s</span>
        <span style={{ fontSize: "2rem" }}>{milliSeconds}</span>
      </p>
      <div>
        <button onClick={running ? handleStop : handleStart}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
