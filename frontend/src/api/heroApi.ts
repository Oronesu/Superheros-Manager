import axios from "axios";
import type { Hero } from "../types/Hero";

const API_URL = "http://localhost:5000/api/heroes";

export const getHeroes = async (nom?: string): Promise<Hero[]> => {
  const res = await axios.get(API_URL, { params: { nom } });
  return res.data; 
};


export const getHeroById = async (id: number): Promise<Hero> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createHero = async (heroData: Partial<Hero> | FormData) => {
  const headers =
    heroData instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {};

  const res = await axios.post(API_URL, heroData, { headers });
  return res.data;
};

export const updateHero = async (id: number, heroData: Partial<Hero> | FormData) => {
  const headers =
    heroData instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {};

  const res = await axios.put(`${API_URL}/${id}`, heroData, { headers });
  return res.data;
};


export const deleteHero = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
