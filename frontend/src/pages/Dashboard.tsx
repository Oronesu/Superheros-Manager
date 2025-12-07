import { useEffect, useState } from "react";
import { getHeroes } from "../api/heroApi";
import type { Hero } from "../types/Hero";
import HeroCard from "../components/HeroCard";

export default function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getHeroes(search).then(setHeroes);
  }, [search]);

  return (
    <>
      <h1>Tableau de bord</h1>

      {/* 🔹 Champ de recherche */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {heroes.map(hero => (
          <div key={hero.id} className="col-6 col-md-4 col-lg-2">
            <HeroCard hero={hero} />
          </div>
        ))}
      </div>
    </>
  );
}
