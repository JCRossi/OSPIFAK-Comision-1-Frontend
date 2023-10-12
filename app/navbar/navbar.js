import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light navbar shadow-sm">
      <div className="container-navbar">
        <a className="navbar-brand" href="/dashboard">
          <img src="/imagen.jpeg" alt="Imagen" style={{ width: "120px", height: "auto" }} />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link">
              Wanchope <i className="fas fa-user"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Salir <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
