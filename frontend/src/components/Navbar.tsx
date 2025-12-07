import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
      <div className="container-fluid">
        {/* Logo / Titre */}
        <Link className="navbar-brand" to="/dashboard">
        SuperHeroManager
        </Link>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Tableau de bord
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/heroes/add">
                Ajouter un héros
              </Link>
            </li>
          </ul>
        </div>

        {/* Zone utilisateur */}
        <div className="d-flex">
          {user ? (
            <>
              <span className="navbar-text me-3">Connecté : {user}</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-light" to="/login">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
