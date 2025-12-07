export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Hero {
  id: number;
  nom: string;
  alias?: string;
  univers: "Marvel" | "DC" | "Autre";
  image?: string;
  powerstats: Powerstats;
}
