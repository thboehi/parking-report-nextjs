# Gestion des avertissements de parking - Agrola TopShop Châtel-St-Denis 🚗

Ce projet est une application web développée avec **Next.js** permettant de gérer les avertissements posés sur les véhicules stationnés indûment dans le parking de la station **Agrola TopShop** à Châtel-St-Denis.

## 🚀 Fonctionnalités principales

- **Ajout de plaques d'immatriculation** :
  - Sélection du pays (par défaut : *Suisse*).
  - Si *Suisse* est sélectionné, choix du canton (par défaut : *Fribourg*).

- **Gestion des avertissements** :
  - Augmente automatiquement le nombre d'avertissements si la plaque est déjà signalée.
  - Suivi des avertissements avec indication des **dénonciations** (Oui/Non).

- **Recherche en temps réel** :
  - Recherche partielle des numéros de plaques.
  - Résultats affichés dynamiquement dans la liste des plaques.

- **Tri avancé** :
  - Tri par date de création ou de modification.
  - Ordre de tri ascendant ou descendant.

- **Suppression des plaques** :
  - Suppression sécurisée avec confirmation via une alerte personnalisée (SweetAlert2).

## 🛠️ Technologies utilisées

- **Frontend** :
  - Framework : [Next.js](https://nextjs.org/)
  - Style : [Tailwind CSS](https://tailwindcss.com/)
  - Composants interactifs : [SweetAlert2](https://sweetalert2.github.io/)

- **Backend** :
  - Base de données : [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  - ORM : Mongoose

- **Autres outils** :
  - Développement local : Node.js
  - Gestion des dépendances : npm

## 📂 Structure du projet

```plaintext
parking-report-nextjs/
├── app/                 # Dossier des pages et composants Next.js
│   ├── api/             # API interne pour la gestion des données
│   ├── page.js          # Page principale du projet
├── lib/                 # Fichier de connexion à la base de données
├── models/              # Modèles Mongoose
├── public/              # Ressources statiques (ex. : logo)
├── styles/              # Fichiers de style globaux
├── .env.local           # Variables d'environnement (non versionnées)
└── README.md            # Documentation du projet