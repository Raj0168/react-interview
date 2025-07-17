import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => (
  <div className="homepage-container">
    <h1 className="homepage-title">
      <span>React</span> Practice Playground
    </h1>
    <p className="homepage-description">
      Welcome to the React Interview Problems Playground. Use this app to
      practice building React components, and explore the TypeScript/JavaScript
      sandbox for live code testing. Dive into an interactive environment
      designed to sharpen your React skills and prepare you for your next
      challenge.
    </p>

    <div className="card-container">
      <div className="practice-card">
        <div className="card-image-placeholder">{"</>"}</div>
        <h2 className="card-title">Code Sandbox</h2>
        <p className="card-description">
          Experiment with TypeScript/JavaScript in a live coding environment.
          Test your ideas instantly.
        </p>
        <Link to="/sandbox" className="card-button primary-button">
          Go to Sandbox
        </Link>
      </div>

      <div className="practice-card">
        <div className="card-image-placeholder">{"{}"}</div>
        <h2 className="card-title">React Components</h2>
        <p className="card-description">
          Explore a collection of common React components and practice building
          them from scratch.
        </p>
        <Link to="/components" className="card-button secondary-button">
          Go to React Components Page
        </Link>
      </div>
    </div>

    <p className="homepage-footer">Happy coding! Unleash your potential.</p>
  </div>
);

export default HomePage;
