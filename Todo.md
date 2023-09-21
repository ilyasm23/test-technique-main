## **Introduction**

Te sera livré durant ce test technique une "User story" te décrivant le besoin d'un client.
En fonction de ce besoin tu devras développer une interface frontend et développer le backend adéquat afin de pouvoir persister la donnée par le biais d'une API. La donnée sera persistée au sein d'une base de donnée `sqlite`, le backend est en `Nest` utilisant l'ORM `Prisma` et l'API requise doit suivre le modèle `REST`.
Le frontend quant à lui utilise la version 3 de `vue` et nous préconisons l'utilisation de `composition` API. <br>
Une sensibilité vis à vis de l'organisation, la propreté du code serait appréciée.
Nous laissons libre choix concernant la design de cette fonctionnalité, mais un design propre serait également apprécié.

> **-ETQ = "En tant que"** </br> **-Tu as le droit de t'aider de google** </br> **-Tu retrouveras également des résidus de code au sein du backend te permettant de t'orienter, mais ils te seront d'aucune utilité à propos du développement de la fonctionnalité demandée, ils sont uniquement là pour servir de repère vis à vis de l'organisation de Nest afin que tu t'y retrouves plus facilement.** </br>

> **Commandes Utiles:** </br> **- npm run serve : lance un serveur de développement pour le frontend** </br> **- npm run start:dev : lance un serveur de développement pour le backend** </br> **- prisma:generate : génère un nouveau client prisma**

## **Contexte**

> L'app est une solution de gestion de TODOs. La base de données contient déjà un jeu de quelques TODOs pour afficher une liste simple.

## **Rendu minimal**

- ETQ user je souhaite m'authentifier sur l'application
- ETQ user je souhaite afficher la liste des TODOs
- ETQ user je souhaite ajouter un nouveau TODO
- ETQ user je souhaite que le formulaire de création de TODO subisse une validation avant envoi à l'API

  - Champs obligatoire : titre (texte de moins de 50 charactères), contenu((texte de moins de 256 charactères)), priorité ("haut","bas","moyen")
  - Champs optionnels : date d'éxécution (exemple: "23/09/2023")

- ETQ développeur je veux avoir à disposition un guide (langue francaise) me permettant de démarrer l'application
- ETQ développeur, au moment de créer la fonctionnalité, l'interface utilisateur doit utiliser la langue francaise mais le code doit être écrit en anglais.

<br> Remarques : <br />

- Concernant l'authentification, <b>toute la partie backend est déjà en place</b>. Nous attendons donc une implementation du frontend (router, page login, redirection). <br />Les identifiants de connexion sont : toto@kresus.eu / test
- Libre à toi d'utiliser une librairie graphique ou un framework CSS
- <b>Le backend et le frontend tourne sous Node 18.17.1</b>

## **Bonus (si tu as le temps et l'envie)**

- Mettre en place des tests unitaires simples
- Pagination de la liste des TODOS
- Dockerisation (Docker Compose). N'oublie pas de faire un guide détaillant comment démarrer l'application.
