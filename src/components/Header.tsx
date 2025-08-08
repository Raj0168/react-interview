import { Link } from "react-router-dom";
import '../styles/Header.css';

const Header = () => (
  <header className="header-container">
    <nav className="header-nav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/sandbox" className="nav-link">Sandbox</Link>
      <Link to="/components" className="nav-link">Components</Link>
      <Link to="/practice" className="nav-link">Practice</Link>
    </nav>
  </header>
);

export default Header;