import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHeroById, deleteHero } from "../api/heroApi";
import type { Hero } from "../types/Hero";

export default function HeroDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    if (id) {
      getHeroById(Number(id)).then(setHero);
    }
  }, [id]);

  if (!hero) return <p>Chargement...</p>;

  const handleDelete = async () => {
    await deleteHero(hero.id);
    navigate("/dashboard");
  };

  return (
    <>
      {/* 🔹 Flèche retour */}
      <button
        className="btn btn-link mb-3"
        onClick={() => navigate("/dashboard")}
      >
        ← Retour au tableau de bord
      </button>

      <h2>{hero.nom}</h2>
      {hero.image && (
        <img
          src={`http://localhost:5000/${hero.image}`}
          alt={hero.nom}
          className="img-fluid mb-3"
        />
      )}
      <p><strong>Alias:</strong> {hero.alias || "—"}</p>
      <p><strong>Univers:</strong> {hero.univers}</p>
      <h5>Powerstats</h5>
      <ul>
        {Object.entries(hero.powerstats).map(([stat, val]) => (
          <li key={stat}>{stat}: {val}</li>
        ))}
      </ul>
      <button
        className="btn btn-warning me-2"
        onClick={() => navigate(`/heroes/${hero.id}/edit`)}
      >
        Modifier
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Supprimer
      </button>
    </>
  );
}
