# Projet Kresus TODO Management

## Résumé

Ce projet est une application de gestion de TODOs conçue dans le cadre d'un test technique chez Kresus.  
Il s'articule autour d'une interface utilisateur où les utilisateurs peuvent s'authentifier, afficher la liste des TODOs avec une pagination, ajouter de nouveaux TODOs et assurer que la création du TODO subit une validation avant d'être envoyé à l'API.

## Lancer le projet

### Pré-requis

- Assurez-vous d'avoir installé Node.js version `18.17.1` sur votre machine.

### Frontend

1. Ouvrez un terminal dans le répertoire racine et naviguez vers le dossier `/frontend` du projet :

   ```bash
   cd frontend
   ```

2. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

3. Pour lancer l'application frontend en mode développement :

   ```bash
   npm run serve
   ```

   L'application devrait maintenant être accessible à `http://localhost:8080` ou un port similaire (le port exact sera affiché dans le terminal).

### Backend

1. Ouvrez un terminal dans le répertoire racine et naviguez vers le dossier `/backend` du projet :

   ```bash
   cd backend
   ```

2. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

3. Générez un nouveau client prisma :

   ```bash
   npx prisma:generate
   ```

4. Pour lancer le serveur backend en mode développement :

   ```bash
   npm run start:dev
   ```

   Le serveur backend devrait maintenant être en cours d'exécution et écouter sur un port spécifique (généralement `3000`).

## Exécution des tests unitaires du Backend

Pour exécuter les tests unitaires du backend, suivez les étapes ci-dessous :

1. Naviguez vers le répertoire `backend` :

   ```bash
   cd backend
   ```

2. Lancez les tests unitaires en exécutant la commande suivante :
   ```bash
   npm run test
   ```

## Routes du Backend

L'API backend offre plusieurs points d'entrée pour gérer l'authentification, la vérification du token et les opérations CRUD liées aux TODOs :

- **POST `/login`**

  - **Description** : Permet à un utilisateur de s'authentifier.
  - **Paramètres du corps de la requête (Body)** :
    - `email`: Adresse e-mail de l'utilisateur.
    - `password`: Mot de passe de l'utilisateur.
  - **Réponse** : En cas de succès, retourne un token JWT.

- **GET `/token`**

  - **Description** : Vérifie si le token JWT fourni dans le Header Authorization est valide.
  - **Headers** :
    - `Authorization`: Bearer `token`
  - **Réponse** : Retourne un message confirmant la validité du token ou une erreur si le token est invalide.

- **GET `/todos`**

  - **Description** : Récupère la liste de tous les TODOs.
  - **Réponse** : Liste des TODOs.

- **GET `/todos/:id`**

  - **Description** : Récupère un todo spécifique en fonction de son id.
  - **Réponse** : Le TODO correspondant à l'identifiant fourni.

- **POST `/todos`**

  - **Description** : Crée un nouveau TODO.
  - **Paramètres du corps de la requête (Body)** :
    - `title`: Titre du TODO.
    - `content`: Contenu ou description du TODO.
    - `priority`: Priorité du TODO (valeurs possibles : "high", "low", "medium").
    - `executionDate` (optionnel): Date d'exécution du TODO en format ISO 8601.
  - **Réponse** : Détails du TODO créé.

- **DELETE `/todos/:id`**
  - **Description** : Supprime un TODO spécifique en fonction de son ID.
  - **Paramètres du chemin (Path)** :
    - `id`: ID du TODO à supprimer.
  - **Réponse** : Message confirmant la suppression ou une erreur si le TODO n'a pas été trouvé.
