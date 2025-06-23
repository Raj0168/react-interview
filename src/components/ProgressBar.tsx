import { useEffect, useRef, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef(null);

  const startProgress = () => {
    if (running) return;

    setRunning(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const pauseProgress = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="center-all">
      <div
        style={{
          width: "90%",
          height: "20px",
          border: "1px solid #fff",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "cyan",
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        ></div>
      </div>
      <span style={{ marginTop: "1rem" }}>
        <p style={{ textAlign: "center", padding:"10px" }}>{progress}%</p>
        <button onClick={startProgress} disabled={running}>
          Start
        </button>
        <button onClick={pauseProgress} disabled={!running}>
          Stop
        </button>
        <button onClick={resetProgress}>Reset</button>
      </span>
    </div>
  );
}
