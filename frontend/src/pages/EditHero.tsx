import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHeroById, updateHero } from "../api/heroApi";
import type { Hero } from "../types/Hero";

export default function EditHero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getHeroById(Number(id)).then(setHero);
  }, [id]);

  if (!hero) return <p>Chargement...</p>;

  return (
    <>
      <h2>Modifier un héros</h2>
      <Formik
        initialValues={{
          nom: hero.nom,
          alias: hero.alias || "",
          univers: hero.univers,
          imageUrl: hero.image && hero.image.startsWith("http") ? hero.image : "",
        }}
        onSubmit={async (values) => {
          if (file && values.imageUrl) {
            alert("Choisis soit un fichier, soit un lien externe, pas les deux !");
            return;
          }

          if (file) {
            // Upload fichier
            const formData = new FormData();
            formData.append("image", file);
            formData.append("nom", values.nom);
            formData.append("alias", values.alias);
            formData.append("univers", values.univers);

            await updateHero(Number(id), formData);
          } else {
            // URL externe
            const heroData = {
              nom: values.nom,
              alias: values.alias,
              univers: values.univers as "Marvel" | "DC" | "Autre",
              image: values.imageUrl,
            };
            await updateHero(Number(id), heroData);
          }

          navigate("/dashboard");
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label>Nom</label>
              <Field name="nom" className="form-control" />
            </div>
            <div>
              <label>Alias</label>
              <Field name="alias" className="form-control" />
            </div>
            <div>
              <label>Univers</label>
              <Field as="select" name="univers" className="form-select">
                <option value="Marvel">Marvel</option>
                <option value="DC">DC</option>
                <option value="Autre">Autre</option>
              </Field>
            </div>

            {/* 🔹 Upload fichier */}
            <div className="mt-3">
              <label>Upload image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={values.imageUrl.length > 0}
              />
            </div>

            {/* 🔹 Lien externe */}
            <div className="mt-3">
              <label>Lien externe</label>
              <Field
                name="imageUrl"
                className="form-control"
                disabled={file !== null}
              />
            </div>

            <button type="submit" className="btn btn-warning mt-3">
              Modifier
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
