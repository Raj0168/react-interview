import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const ReactComponentsPage = lazy(() => import("./pages/ReactComponentsPage"));
const SandboxPage = lazy(() => import("./pages/SandboxPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const DashboardPage = lazy(() => import("./Dashboard/dashboard"));

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const hideHeaderRoutes = ["/dashboard"];

  const isHeaderHidden = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!isHeaderHidden && <Header />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/components" element={<ReactComponentsPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
