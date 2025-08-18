import { useTheme } from "../../../context/ThemeContext";

export default function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "dark" ? "#333" : "#eee",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}
