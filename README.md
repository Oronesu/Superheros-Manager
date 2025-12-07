# SuperHeroManager
## Résumé

SuperHeroManager est une application full-stack permettant de gérer une base de données de super-héros. Elle offre une interface intuitive pour ajouter, modifier, rechercher et supprimer des profils de héros, avec la possibilité d’associer une image via upload ou lien externe. L’application est construite avec Node.js, Express, MongoDB, React et Vite.

## Installation

### Prérequis

Installer MongoDB : https://www.mongodb.com/try/download/community

Installer mongosh : https://www.mongodb.com/docs/mongodb-shell/install/

Lancer mongosh pour démarrer le serveur MongoDB

### Backend
```bash 
cd backend
npm install
```

Remplir la base de données et ajouter un utilisateur et lancer le serveur
```bash
ts-node src/utils/seedDatabase.ts
ts-node src/utils/seedUser.ts
npm run dev
```



### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Fonctionnalités

- Authentification simple avec session persistante
- Ajout de héros avec image (upload ou lien externe)
- Modification complète des profils
- Suppression de héros
- Recherche dynamique par nom
- Affichage responsive en cartes (5 par ligne)
- Dashboard fluide avec navbar fixe

## Arborescence

```plaintext
SuperHeroManager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/express
│   │   ├── uploads/ (généré au lancement)
│   │   ├── utils/
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   ├── SuperHerosComplet.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
```
