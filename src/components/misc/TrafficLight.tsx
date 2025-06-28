import { useState, useEffect } from "react";

const horizontal:boolean = false;

export default function TrafficLight() {
  const [color, setColor] = useState<string>("red");

  useEffect(() => {
    let timeoutId:number;

    const transition = (currentColor:string) => {
      let nextColor;
      let delay;

      switch (currentColor) {
        case "red":
          nextColor = "yellow";
          delay = 4000;
          break;
        case "yellow":
          nextColor = "green";
          delay = 500;
          break;
        case "green":
          nextColor = "red";
          delay = 3000;
          break;
        default:
          nextColor = "red";
          delay = 4000;
      }

      timeoutId = setTimeout(() => {
        setColor(nextColor);
        transition(nextColor);
      }, delay);
    };

    transition(color);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      style={{
        transform: horizontal
          ? "rotate(90deg) translateY(-100%)"
          : "rotate(0deg)",
        transformOrigin: "top left",
        display: "inline-block",
      }}
    >
      <div
        style={{
          height: "300px",
          width: "100px",
          background: "#000",
          borderRadius: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "70px",
              width: "70px",
              background: color === "red" ? "red" : "#666",
              zIndex: "100",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              height: "70px",
              width: "70px",
              background: color === "yellow" ? "yellow" : "#666",
              zIndex: "100",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              height: "70px",
              width: "70px",
              background: color === "green" ? "green" : "#666",
              zIndex: "100",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
