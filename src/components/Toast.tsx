import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  duration?: number;
};

export default function Toast({ message, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        background: "#333",
        color: "#fff",
        padding: "1rem",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        minWidth: "250px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontWeight: "bold",
          marginLeft: "1rem",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
