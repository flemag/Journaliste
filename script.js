// *** Initialisation de Firebase (version 8) ***
// Si vous avez choisi d'utiliser la version 9+ modulaire avec 'type="module"' dans index.html,
// vous initialiserez Firebase directement dans le script tag 'type="module"' dans index.html
// comme montré dans l'exemple commenté de l'index.html mis à jour.
// Sinon (si vous utilisez la v8 via CDN), vous pouvez initialiser ici :

/*
// Votre configuration Firebase ici
// REMPLACER LES PLACEHOLDERS AVEC VOS VRAIES INFOS DEPUIS LA CONSOLE FIREBASE
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    // measurementId: "YOUR_MEASUREMENT_ID" // Optionnel
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Obtenir une référence à Firestore (exemple)
// const db = firebase.firestore(); // Nécessite d'inclure le SDK Firestore via <script> dans index.html

console.log("Firebase Initialisé (desde script.js)!"); // Vérifiez dans la console du navigateur
*/

// NOTE : J'ai commenté le bloc Firebase init ici. Pour un démarrage rapide avec V8 CDN,
// la meilleure approche est de garder l'init dans un script tag DANS index.html AVANT script.js.
// La version mise à jour de index.html lie script.js en dernier et assume que l'init est faite avant,
// soit dans un script tag précédent, soit via l'approche modulaire type="module".
// POUR CETTE ÉTAPE, LAISSEZ LE FICHIER script.js VIDE OU AVEC SEULEMENT LA LOGIQUE SCROLL-REVEAL SUIVANTE.

// *** Logique de Scroll Reveal avec IntersectionObserver ***
// C'est une méthode plus performante que d'écouter l'événement 'scroll'

const scrollElements = document.querySelectorAll(".scroll-reveal");

const observerOptions = {
  root: null, // Utilise le viewport comme conteneur
  rootMargin: "0px",
  threshold: 0.1 // Déclenche quand au moins 10% de l'élément est visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // L'élément est visible
      entry.target.classList.add("is-visible");
      // Si vous voulez que l'animation ne se déclenche qu'une seule fois:
      // observer.unobserve(entry.target);
    }
    // else {
    //   // L'élément n'est plus visible (décommenter si l'animation doit se refaire en scrollant vers le haut)
    //   // entry.target.classList.remove("is-visible");
    // }
  });
}, observerOptions);

// Observer chaque élément avec la classe .scroll-reveal
scrollElements.forEach(el => {
  observer.observe(el);
});

console.log("Scroll Reveal observer configuré."); // Vérifiez dans la console du navigateur

// --- Autres scripts JavaScript iront ici ---
// Par exemple:
// - Gestion des événements UI (clicks sur boutons, soumission de formulaires)
// - Interaction avec Firebase (ajouter article, voter, lire données)
// - Logique de la carte interactive
// - Mise en place de la PWA (enregistrement du service worker)