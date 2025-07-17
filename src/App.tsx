import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SandboxPage from "./pages/SandboxPage";
import ReactComponentsPage from "./pages/ReactComponentsPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sandbox" element={<SandboxPage />} />
        <Route path="/components" element={<ReactComponentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
