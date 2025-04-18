// script.js

// *** Importez les fonctions des services Firebase nécessaires ***
// Ces fonctions deviennent disponibles grâce aux balises <script type="module" src="..."> dans index.html
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

// *** Accéder à l'instance Firebase App qui a été rendue globale ***
const app = window.firebaseApp;

if (app) {
    console.log("Firebase App accessible dans script.js !");

    // *** Obtenir les instances des services à partir de l'App ***
    const db = getFirestore(app); // Instance Firestore
    const auth = getAuth(app);   // Instance Authentication
    const provider = new GoogleAuthProvider(); // Instance du fournisseur Google

    console.log("Firestore et Auth instances obtenues.");


    // --- Éléments UI d'authentification ---
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const userInfoDiv = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    const userAvatarImg = document.getElementById('userAvatar');

    // --- Logique d'authentification ---

    // 1. Écouter le clic sur le bouton de connexion
    // On vérifie si le bouton existe avant d'ajouter l'écouteur
    if (signInBtn) {
        signInBtn.addEventListener('click', async () => {
            try {
                // Ouvre la popup de connexion Google
                console.log("Tentative de connexion...");
                const result = await signInWithPopup(auth, provider);
                console.log("Connexion réussie:", result.user);
                // onAuthStateChanged va gérer la mise à jour de l'UI
            } catch (error) {
                // Gérer les erreurs de connexion
                console.error("Erreur de connexion:", error.code, error.message);
                // Vous pourriez afficher un message d'erreur plus convivial à l'utilisateur ici
                if (error.code === 'auth/popup-closed-by-user') {
                    console.log("Popup de connexion fermée par l'utilisateur.");
                } else if (error.code === 'auth/cancelled-popup-request') {
                     console.log("Tentative d'ouverture de popup annulée (probablement déjà une ouverte ou bloquée).");
                }
                 // Plus d'infos sur les codes d'erreur : https://firebase.google.com/docs/auth/web/google-signin#handle_account_and_credential_errors
            }
        });
    } else {
         console.error("Élément #signInBtn non trouvé !");
    }


    // 2. Écouter le clic sur le bouton de déconnexion
     // On vérifie si le bouton existe avant d'ajouter l'écouteur
     if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            try {
                console.log("Tentative de déconnexion...");
                await signOut(auth);
                console.log("Déconnexion réussie.");
                // onAuthStateChanged va gérer la mise à jour de l'UI
            } catch (error) {
                console.error("Erreur de déconnexion:", error.message);
                 // Afficher un message d'erreur à l'utilisateur si besoin
            }
        });
     } else {
        console.error("Élément #signOutBtn non trouvé !");
     }


    // 3. Écouter les changements d'état d'authentification (connexion/déconnexion)
    // Cette fonction se déclenche au chargement de la page ET à chaque changement d'état.
     if (userInfoDiv && signInBtn && userNameSpan && userAvatarImg) { // Vérifie que les éléments UI existent
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // L'utilisateur est connecté
                console.log("État d'authentification changé: Utilisateur connecté", user);

                // Afficher les infos utilisateur et le bouton de déconnexion
                userInfoDiv.classList.remove('hidden');
                signInBtn.classList.add('hidden');

                // Mettre à jour les infos utilisateur
                userNameSpan.textContent = user.displayName || 'Utilisateur'; // Utilise le nom ou un texte par défaut
                if (user.photoURL) {
                    userAvatarImg.src = user.photoURL;
                    userAvatarImg.classList.remove('hidden'); // Assurez-vous que l'image est visible si elle existe
                } else {
                     userAvatarImg.classList.add('hidden'); // Cache l'image s'il n'y a pas d'avatar
                     // Vous pourriez aussi afficher un avatar par défaut ici
                }

                // --- Logique post-connexion (Exemple: Vérifier/Créer profil Firestore) ---
                // Décommenter ce bloc une fois que votre collection 'users' est prête dans Firestore
                /*
                const userRef = db.collection('users').doc(user.uid);
                userRef.get().then(doc => {
                   if (doc.exists) {
                       console.log("Données utilisateur Firestore chargées:", doc.data());
                       // Mettre à jour l'UI avec les données Firestore (badges, points...)
                       // Exemple : userNameSpan.textContent = doc.data().name || user.displayName;
                   } else {
                       console.log("Nouvel utilisateur, création du profil Firestore...");
                       // Créer un nouveau document pour cet utilisateur dans la collection 'users'
                       userRef.set({
                           uid: user.uid,
                           email: user.email,
                           name: user.displayName || 'Utilisateur',
                           photoURL: user.photoURL || '',
                           reputation: 1, // Score initial
                           badges: [],
                           createdAt: new Date()
                       }).then(() => {
                           console.log("Profil utilisateur Firestore créé.");
                       }).catch(error => {
                           console.error("Erreur lors de la création du profil utilisateur Firestore:", error);
                       });
                   }
                }).catch(error => {
                   console.error("Erreur lors du chargement du profil utilisateur Firestore:", error);
                });
                */

            } else {
                // L'utilisateur est déconnecté
                console.log("État d'authentification changé: Utilisateur déconnecté");
                // Cacher les infos utilisateur et afficher le bouton de connexion
                userInfoDiv.classList.add('hidden');
                signInBtn.classList.remove('hidden');

                 // Réinitialiser les infos utilisateur affichées
                userNameSpan.textContent = '';
                userAvatarImg.src = ''; // Vider l'URL de l'avatar
                userAvatarImg.classList.add('hidden'); // Cacher l'image

            }
        });
     } else {
         console.error("Un ou plusieurs éléments UI d'authentification sont manquants (userInfo, signInBtn, userName, userAvatar) !");
     }


} else {
    console.error("L'instance Firebase App n'est pas accessible dans script.js. Vérifiez l'initialisation dans index.html.");
}


// *** Logique de Scroll Reveal avec IntersectionObserver ***
// (Gardée de l'étape précédente, fonctionne indépendamment de Firebase)

const scrollElements = document.querySelectorAll(".scroll-reveal");

const observerOptions = {
  root: null, // Utilise le viewport comme conteneur
  rootMargin: "0px",
  threshold: 0.1 // Déclenche quand au moins 10% de l'élément est visible
};

// Vérifie si IntersectionObserver est supporté
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optionnel : si on ne veut l'animer qu'une seule fois
          // observer.unobserve(entry.target);
        }
        // else {
        //   // Décommenter si l'animation doit se refaire en scrollant vers le haut
        //   // entry.target.classList.remove("is-visible");
        // }
      });
    }, observerOptions);

    // Observer chaque élément avec la classe .scroll-reveal
    scrollElements.forEach(el => {
      observer.observe(el);
    });

    console.log("Scroll Reveal observer configuré.");

} else {
    // Fallback pour les navigateurs ne supportant pas IntersectionObserver
    console.log("IntersectionObserver non supporté, animation scroll-reveal désactivée.");
    scrollElements.forEach(el => {
        el.classList.add("is-visible"); // Rendre les éléments visibles directement
    });
}


// --- Autres scripts JavaScript iront ici ---
// La logique pour lire/écrire dans Firestore, gérer les votes, etc.,
// utilisera les instances 'db' et 'auth' qui sont maintenant correctement obtenues.