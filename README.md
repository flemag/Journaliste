# Journaliste


Ce projet de plateforme de journalisme citoyen vise à offrir un espace vivant où des enquêteurs et journalistes amateurs publient des articles, les lecteurs votent pour faire émerger les tendances, et participent à la vérification du contenu via un système vrai/faux. Il combine la crowdsourcing (invitation ouverte à contribuer) , des mécaniques de gamification (leaderboards, points et badges) , et un mapping collaboratif pour l’info locale inspiré d’Ushahidi . Côté style, on s’appuie sur les typos print inspirées et la narration interactive (scroll triggered storytelling) , un layout en gros blocs contrastés , et des micro interactions pour un ressenti vivant . L’âme du projet se retrouve dans une palette audacieuse, des animations légères et un ton éditorial transparent, armé pour lutter contre la désinformation et valoriser le local comme le global.
 
1. Vision & Âme du projet
1.1 Mission éditoriale
•	Faire remonter les enquêtes pertinentes grâce à un système de vote communautaire, tout en maintenant un haut niveau de rigueur .
•	Valoriser l’info locale par une carte interactive, véritable « tableau de bord » géolocalisé des articles .
•	Instaurer un canon éthique : transparence sur les sources, suivi des correctifs, et pondération des votes selon la réputation des contributeurs .
1.2 Ton & Narration
•	Éditorial transversal : rubriques locales, investigations, culture, environnement…
•	Storytelling interactif : animations au scroll, transitions dynamiques pour immerger le lecteur .
•	**Communauté acteur **: retours instantanés, badges de « Fact Checker » ou « Enquêteur vedette », inspirés des 108 mécaniques de gamification .
 
2. Fonctionnalités clés
2.1 Publication & Workflow
•	Éditeur WYSIWYG avec support Markdown pour faciliter les contributions.
•	Moderation collaborative : tout article passe par un mini audit communautaire avant publication finale .
2.2 Classement & Gamification
•	Leaderboard des contributeurs et articles les plus tendances .
•	Points & Badges attribués pour chaque publication, vote ou correction, avec déverrouillage de privilèges à seuils .
•	Missions et défis périodiques (ex. « enquête photo sur un lieu public ») pour animer la communauté .
2.3 Vérification Vrai/Faux
•	Vote pondéré vrai/faux par utilisateur, avec score de crédibilité calculé selon l’historique de contributions .
•	Signalement et modération : système d’alertes capture les publications jugées « improbables » et enclenche un processus de vérification rapide .
 
3. Taxonomie & UX
3.1 Catégories & Filtrage
•	Infobulles et tags interactifs pour naviguer par thèmes (local, politique, culture…).
•	Vue carte pour explorer les articles géolocalisés, à la manière d’Ushahidi .
3.2 Parcours Utilisateur
•	Accueil personnalisé via un algorithme simple (likes, votes, localisation).
•	Micro interactions (notifications animées, transitions de cartes) pour un ressenti réactif .
•	Responsive PWA : possibilité de lire et voter hors ligne, puis synchronisation automatique.
 
4. Identité visuelle & Style
4.1 Principes graphiques
•	Print inspired typography : polices serif sur titres, contrastant avec un corps de texte sans serif .
•	Layout en big blocks et zones de couleur vive pour guider naturellement l’œil .
•	Brutalism et morphism pour des éléments graphiques audacieux, organiques et reconnaissables .
4.2 Animation & Interactivité
•	Scroll triggered effects pour révéler les articles, citations marquantes et timelines d’enquête .
•	Cursor animations et hover states ludiques pour renforcer le caractère hors norme.
 
5. Tech Stack & Déploiement
1.	Front-end statique hébergé sur GitHub Pages pour la vitesse et la simplicité.
2.	Firebase Spark : Firestore pour articles & votes, Realtime DB pour notifications et peuplements en live .
3.	Cloud Functions pour la modération automatisée, pondération des votes et envoi d’emails.
4.	Google Gemini API (prototype direct en front, production via App Check & proxy) pour générer des résumés ou relances d’enquête.
 
En combinant ces choix fonctionnels, UX et visuels, vous obtenez une plateforme à l’âme engagée, au look atypique et résolument orientée communauté. Chaque composant – de la carte locale aux badges de fact checking – sert à marquer les esprits et à défendre une info libre, collaborative et fiable.


Contexte : Titre du Projet : Plateforme de Journalisme Citoyen Local et Collaboratif

1.	Contexte et Vision

Ce projet vise à créer une plateforme web gratuite, accessible et mobile-first, permettant à des journalistes amateurs, enquêteurs ou citoyens engagés de publier des articles, en particulier sur des thèmes locaux ou spécifiques. Les lecteurs peuvent consulter ces articles, y réagir, les valider ou les remettre en question de manière communautaire.

Le style de la plateforme est pensé pour être atypique, avec une forte identité graphique, rappelant les carnets de terrain, les fanzines, ou les dossiers d’enquête. Le projet s’adresse à tous ceux qui veulent faire entendre leur voix dans un espace crédible et ouvert.

2.	Objectifs

Offrir un espace d’expression libre, responsable et participatif.

Mettre en avant les sujets de proximité ou les enquêtes de terrain.

Créer un système communautaire d’évaluation des articles (fiabilité, pertinence).

Favoriser l’accès mobile, hors-ligne et l’ergonomie sur petits écrans.

Reposer uniquement sur des outils gratuits et accessibles à tous.


3.	Architecture Technique

Frontend :

GitHub Pages (Hébergement statique gratuit)

HTML/CSS/JS (avec Tailwind CSS pour le style mobile-first)

PWA (installable sur smartphone, hors-ligne)


Backend :

Firebase (Spark Plan gratuit)

Firestore (base de données temps réel)

Firebase Hosting (si besoin de migrer depuis GitHub Pages)

Auth (anonyme ou par compte Google)

App Check (protection de l’API Gemini)



IA :

Google Gemini API (génération de résumés, vérification contextuelle des articles)



4.	Fonctionnalités Clés

Soumission d’articles (titre, contenu, image, catégorie)

Lecture et exploration par catégorie ou localisation

Système de « tendance » (votes pour popularité)

Vérification communautaire : chaque utilisateur vote « crédible » ou « improbable »

Système de badges ou score de fiabilité des auteurs

Intégration PWA (installable et hors-ligne)


5.	Design et Identité Visuelle

Style « dossier confidentiel », « enquêteur » ou « underground »

Thème sombre optionnel, typographie manuscrite ou machine à écrire

Mise en page par cartes ou journaux pliés

UX fluide, minimaliste et orienté mobile


6.	Philosophie et Éthique

Liberté d’expression avec modération communautaire

Aucune publicité ou pistage utilisateur

Transparence du code (open source)

Accessibilité maximale : pas besoin de compte pour lire


7.	Prochaines Étapes

Création du prototype visuel (maquettes)

Mise en place du repo GitHub

Déploiement initial sur GitHub Pages avec Firebase lié

Ajout de la PWA et test sur mobile

Intégration progressive des fonctions communautaires et IA


Ce document servira de feuille de route pour tout le développement du projet.



