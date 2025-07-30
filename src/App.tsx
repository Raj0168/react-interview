import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const ReactComponentsPage = lazy(() => import("./pages/ReactComponentsPage"));
const SandboxPage = lazy(() => import("./pages/SandboxPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/components" element={<ReactComponentsPage />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
