import { useEffect, useRef, useState } from "react";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const seconds: number = time.getSeconds();
  const minutes: number = time.getMinutes();
  const hours: number = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
  const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const clockSize = 300;
  const center = clockSize / 2;
  const numberRadius = 120;

  return (
    <>
      <div
        className="center-all"
        style={{
          fontSize: "1.4rem",
          backgroundColor: "#000",
          color: "cyan",
          fontFamily: "monospace",
          fontWeight: "600",
        }}
      >
        {hours > 9 ? hours : `0${hours}`}:
        {minutes > 9 ? minutes : `0${minutes}`}:
        {seconds > 9 ? seconds : `0${seconds}`}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${clockSize}px`,
            height: `${clockSize}px`,
            borderRadius: "50%",
            border: "5px solid #333",
            backgroundColor: "#ddd",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#333",
              zIndex: 10,
            }}
          ></div>
          {clockNumbers.map((number) => {
            const angle = (number - 3) * (Math.PI / 6);

            const x = center + numberRadius * Math.cos(angle);
            const y = center + numberRadius * Math.sin(angle);

            return (
              <div
                key={number}
                style={{
                  position: "absolute",
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: "translate(-50%, -50%)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                  zIndex: 5,
                }}
              >
                {number}
              </div>
            );
          })}

          {/* Hour Hand */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "4px",
              height: "80px",
              backgroundColor: "#333",
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
              borderRadius: "2px",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "3px",
              height: "120px",
              backgroundColor: "#555",
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
              borderRadius: "1.5px",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "2px",
              height: "130px",
              backgroundColor: "#dc3545",
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
              borderRadius: "1px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
