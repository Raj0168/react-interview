import { useState, useEffect, useRef, type JSX } from "react";

type ProgressBar = {
  id: number;
  progress: number;
};

export default function ProgressBars2(): JSX.Element {
  const [progressBars, setProgressBars] = useState<ProgressBar[]>([]);
  const timersRef = useRef<Record<number, number>>({});

  const addProgressBar = (): void => {
    const id = Date.now() + Math.random();
    setProgressBars((prev) => [...prev, { id, progress: 0 }]);

    const interval = setInterval(() => {
      setProgressBars((prevBars) =>
        prevBars.map((bar) =>
          bar.id === id
            ? {
                ...bar,
                progress: bar.progress >= 100 ? 100 : bar.progress + 1,
              }
            : bar
        )
      );
    }, 20);

    timersRef.current[id] = interval;
  };

  useEffect(() => {
    progressBars.forEach((bar) => {
      if (bar.progress >= 100 && timersRef.current[bar.id]) {
        clearInterval(timersRef.current[bar.id]);
        delete timersRef.current[bar.id];
      }
    });
  }, [progressBars]);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearInterval);
    };
  }, []);

  return (
    <div>
      <button onClick={addProgressBar}>Add</button>
      {progressBars.map((bar) => (
        <div key={bar.id} style={{ margin: "10px" }}>
          <div
            style={{
              border: "1px solid black",
              width: "100%",
              height: "20px",
              backgroundColor: "#333",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${bar.progress}%`,
                backgroundColor: "green",
                transition: "width 0.02s linear",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
