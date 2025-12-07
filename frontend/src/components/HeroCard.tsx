import type { Hero } from "../types/Hero";
import { Link } from "react-router-dom";

interface Props {
  hero: Hero;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function HeroCard({ hero, onEdit, onDelete }: Props) {
  return (
    <div className="card mb-3">
      {hero.image && (
        <img
            src={hero.image.startsWith("http") ? hero.image : `http://localhost:5000${hero.image}`}
            alt={hero.nom}
            className="card-img-top"
            />
      )}
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/heroes/${hero.id}`} className="text-decoration-none">
            {hero.nom}
          </Link>
          </h5>
        <p className="card-text"><strong>Alias:</strong> {hero.alias || "—"}</p>
        <p className="card-text"><strong>Univers:</strong> {hero.univers}</p>
        <ul>
          {Object.entries(hero.powerstats).map(([stat, val]) => (
            <li key={stat}>{stat}: {val}</li>
          ))}
        </ul>
        {onEdit && <button onClick={onEdit} className="btn btn-warning me-2">Modifier</button>}
        {onDelete && <button onClick={onDelete} className="btn btn-danger">Supprimer</button>}
      </div>
    </div>
  );
}
