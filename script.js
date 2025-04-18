// script.js

// *** Accès aux instances Firebase (pour prototypage simple via variables globales) ***
// ATTENTION: En production, il est préférable d'importer les modules spécifiques
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
// const db = getFirestore(window.firebaseApp); // Accéder à l'app globale et initialiser Firestore ici
// ou simplement accéder directement à l'instance globale si elle a été rendue globale:
const app = window.firebaseApp; // L'instance Firebase App globale
const db = window.firestoreDb; // L'instance Firestore globale

if (app && db) {
    console.log("Firebase instances (app, db) accessibles dans script.js !");
    // Ici, vous pouvez commencer à interagir avec Firebase
    // Exemple: lire des données de Firestore
    // db.collection('articles').get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.id, '=>', doc.data());
    //     });
    // });
} else {
    console.error("Les instances Firebase ne sont pas accessibles dans script.js. Vérifiez l'initialisation dans index.html.");
}


// *** Logique de Scroll Reveal avec IntersectionObserver ***

const scrollElements = document.querySelectorAll(".scroll-reveal");

const observerOptions = {
  root: null, // Utilise le viewport comme conteneur
  rootMargin: "0px",
  threshold: 0.1 // Déclenche quand au moins 10% de l'élément est visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
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

console.log("Scroll Reveal observer configuré dans script.js.");


// --- Autres scripts JavaScript iront ici ---
// Vous pouvez ajouter ici toute la logique UI/UX qui ne dépend pas *directement* de Firebase pour l'instant.
// Lorsque vous devrez interagir avec Firestore, Auth, etc., utilisez les variables 'app', 'db', etc.
// qui ont été rendues globales, ou passez par les imports module (méthode recommandée pour l'avenir).