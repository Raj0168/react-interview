import { ThemeProvider } from "../../../context/ThemeContext";
import Toolbar from "./Toolbar";

export default function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  );
}
