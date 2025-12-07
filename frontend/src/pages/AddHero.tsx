import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createHero } from "../api/heroApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  alias: Yup.string(),
  univers: Yup.string().oneOf(["Marvel", "DC", "Autre"]).required("Univers requis"),
});

export default function AddHero() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <h2>Ajouter un héros</h2>
      <Formik
        initialValues={{ nom: "", alias: "", univers: "Autre", imageUrl: "" }}
        validationSchema={HeroSchema}
        onSubmit={async (values) => {
          // Vérif : soit fichier, soit URL
          if (file && values.imageUrl) {
            alert("Choisis soit un fichier, soit un lien externe, pas les deux !");
            return;
          }

          if (file) {
            // 🔹 Upload fichier via FormData
            const formData = new FormData();
            formData.append("image", file);
            formData.append("nom", values.nom);
            formData.append("alias", values.alias);
            formData.append("univers", values.univers);

            await createHero(formData);
          } else {
            // 🔹 Envoi avec URL externe
            const heroData = {
              nom: values.nom,
              alias: values.alias,
              univers: values.univers as "Marvel" | "DC" | "Autre",
              image: values.imageUrl, // stocke directement l’URL
            };
            await createHero(heroData);
          }

          navigate("/dashboard");
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label>Nom</label>
              <Field name="nom" className="form-control" />
              <ErrorMessage name="nom" component="div" />
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

            {/* Upload fichier */}
            <div className="mt-3">
              <label>Upload image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={values.imageUrl.length > 0} // désactive si URL remplie
              />
            </div>

            {/* Lien externe */}
            <div className="mt-3">
              <label>Lien externe</label>
              <Field
                name="imageUrl"
                className="form-control"
                disabled={file !== null} // désactive si fichier choisi
              />
            </div>

            <button type="submit" className="btn btn-success mt-3">
              Ajouter
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
