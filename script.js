// script.js

// *** Importez les fonctions des services Firebase nécessaires ***
// Ces fonctions deviennent disponibles grâce aux balises <script type="module" src="..."> dans index.html
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

// *** Accéder à l'instance Firebase App qui a été rendue globale ***
const app = window.firebaseApp;

if (app) {
    console.log("DEBUG: Firebase App accessible dans script.js !");

    // *** Obtenir les instances des services à partir de l'App ***
    const db = getFirestore(app);   // Instance Firestore
    const auth = getAuth(app);     // Instance Authentication
    const provider = new GoogleAuthProvider(); // Instance du fournisseur Google

    console.log("DEBUG: Firestore et Auth instances obtenues.");
    console.log("DEBUG: auth instance:", auth);
    console.log("DEBUG: provider instance:", provider);


    // --- Éléments UI d'authentification ---
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const userInfoDiv = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    const userAvatarImg = document.getElementById('userAvatar');

    console.log("DEBUG: Éléments UI d'authentification récupérés.");
    console.log("DEBUG: signInBtn:", signInBtn);
    console.log("DEBUG: signOutBtn:", signOutBtn);
    console.log("DEBUG: userInfoDiv:", userInfoDiv);
    console.log("DEBUG: userNameSpan:", userNameSpan);
    console.log("DEBUG: userAvatarImg:", userAvatarImg);


    // --- Logique d'authentification ---

    // 1. Écouter le clic sur le bouton de connexion
    // On vérifie si le bouton existe avant d'ajouter l'écouteur
    if (signInBtn) {
        console.log("DEBUG: signInBtn trouvé, ajout de l'écouteur de clic.");
        signInBtn.addEventListener('click', async () => {
            console.log("DEBUG: Click sur signInBtn détecté.");
            try {
                // Ouvre la popup de connexion Google
                console.log("DEBUG: Appel de signInWithPopup...");
                const result = await signInWithPopup(auth, provider);
                // Cette ligne ne sera atteinte que si la popup se ferme avec succès (connexion ou annulation par l'utilisateur)
                console.log("DEBUG: signInWithPopup a terminé.", result); // Log complet du résultat
                console.log("DEBUG: Connexion réussie:", result.user);
                // onAuthStateChanged va gérer la mise à jour de l'UI
            } catch (error) {
                // Gérer les erreurs de connexion
                console.error("DEBUG: Erreur détectée pendant signInWithPopup.");
                console.error("DEBUG: Code d'erreur:", error.code);
                console.error("DEBUG: Message d'erreur:", error.message);
                console.error("DEBUG: Objet d'erreur complet:", error); // Log complet de l'objet erreur

                 // Messages d'erreur courants
                if (error.code === 'auth/popup-closed-by-user') {
                    console.log("INFO: Popup de connexion fermée par l'utilisateur.");
                } else if (error.code === 'auth/cancelled-popup-request') {
                     console.log("INFO: Tentative d'ouverture de popup annulée (probablement déjà une ouverte ou bloquée par le navigateur).");
                } else if (error.code === 'auth/auth-domain-config-error') {
                    console.error("ERREUR CRITIQUE: Erreur de configuration du domaine d'authentification. Vérifiez vos domaines autorisés dans la console Firebase.");
                }
                 // Plus d'infos sur les codes d'erreur : https://firebase.google.com/docs/auth/web/google-signin#handle_account_and_credential_errors
            }
        });
    } else {
         console.error("DEBUG: Élément #signInBtn non trouvé dans le DOM !");
    }


    // 2. Écouter le clic sur le bouton de déconnexion
     // On vérifie si le bouton existe avant d'ajouter l'écouteur
     if (signOutBtn) {
        console.log("DEBUG: signOutBtn trouvé, ajout de l'écouteur de clic.");
        signOutBtn.addEventListener('click', async () => {
            console.log("DEBUG: Click sur signOutBtn détecté.");
            try {
                console.log("DEBUG: Appel de signOut...");
                await signOut(auth);
                console.log("DEBUG: signOut a terminé.");
                console.log("DEBUG: Déconnexion réussie.");
                // onAuthStateChanged va gérer la mise à jour de l'UI
            } catch (error) {
                 console.error("DEBUG: Erreur détectée pendant signOut.");
                 console.error("DEBUG: Message d'erreur:", error.message);
                 console.error("DEBUG: Objet d'erreur complet:", error); // Log complet de l'objet erreur
            }
        });
     } else {
        console.error("DEBUG: Élément #signOutBtn non trouvé dans le DOM !");
     }


    // 3. Écouter les changements d'état d'authentification (connexion/déconnexion)
    // Cette fonction se déclenche au chargement de la page ET à chaque changement d'état.
     if (userInfoDiv && signInBtn && userNameSpan && userAvatarImg) { // Vérifie que les éléments UI existent
        console.log("DEBUG: Écouteur onAuthStateChanged configuré.");
        onAuthStateChanged(auth, (user) => {
            console.log("DEBUG: onAuthStateChanged déclenché. User:", user);
            if (user) {
                // L'utilisateur est connecté
                console.log("DEBUG: Utilisateur connecté détecté. UID:", user.uid);

                // Afficher les infos utilisateur et le bouton de déconnexion
                userInfoDiv.classList.remove('hidden');
                signInBtn.classList.add('hidden');
                 console.log("DEBUG: UI mise à jour pour l'utilisateur connecté.");


                // Mettre à jour les infos utilisateur
                userNameSpan.textContent = user.displayName || 'Utilisateur'; // Utilise le nom ou un texte par défaut
                console.log("DEBUG: Nom d'utilisateur défini sur:", userNameSpan.textContent);

                if (user.photoURL) {
                    userAvatarImg.src = user.photoURL;
                    userAvatarImg.classList.remove('hidden'); // Assurez-vous que l'image est visible si elle existe
                     console.log("DEBUG: URL de l'avatar défini sur:", user.photoURL);
                } else {
                     userAvatarImg.classList.add('hidden'); // Cache l'image s'il n'y a pas d'avatar
                      console.log("DEBUG: Pas d'URL d'avatar, image cachée.");
                     // Vous pourriez aussi afficher un avatar par défaut ici
                }

                            // --- Logique post-connexion (Exemple: Vérifier/Créer profil Firestore) ---
            // Décommenter ce bloc une fois que votre collection 'users' est prête dans Firestore

            console.log("DEBUG: Vérification du profil utilisateur dans Firestore...");
            const userRef = db.collection('users').doc(user.uid);
            userRef.get().then(doc => {
               if (doc.exists) {
                   console.log("DEBUG: Données utilisateur Firestore chargées:", doc.data());
                   // Mettre à jour l'UI avec les données Firestore (badges, points...)
                   // Exemple : userNameSpan.textContent = doc.data().name || user.displayName;
               } else {
                   console.log("DEBUG: Nouvel utilisateur, création du profil Firestore...");
                   // Créer un nouveau document pour cet utilisateur dans la collection 'users'
                   userRef.set({
                       uid: user.uid,
                       email: user.email,
                       name: user.displayName || 'Utilisateur', // Utilise le nom de Google ou 'Utilisateur'
                       photoURL: user.photoURL || '', // Utilise la photo Google ou vide
                       reputation: 1, // Score initial
                       badges: [], // Array vide de badges initiaux
                       createdAt: new Date() // Timestamp de création
                   }).then(() => {
                       console.log("DEBUG: Profil utilisateur Firestore créé avec succès.");
                   }).catch(error => {
                       console.error("DEBUG: Erreur lors de la création du profil utilisateur Firestore:", error);
                   });
               }
            }).catch(error => {
               console.error("DEBUG: Erreur lors du chargement du profil utilisateur Firestore:", error);
            });
                */

            } else {
                // L'utilisateur est déconnecté
                console.log("DEBUG: Utilisateur déconnecté détecté.");
                // Cacher les infos utilisateur et afficher le bouton de connexion
                userInfoDiv.classList.add('hidden');
                signInBtn.classList.remove('hidden');
                console.log("DEBUG: UI mise à jour pour l'utilisateur déconnecté.");


                 // Réinitialiser les infos utilisateur affichées
                userNameSpan.textContent = '';
                userAvatarImg.src = ''; // Vider l'URL de l'avatar
                userAvatarImg.classList.add('hidden'); // Cacher l'image

            }
        });
     } else {
         console.error("DEBUG: Un ou plusieurs éléments UI d'authentification sont manquants pour onAuthStateChanged (userInfo, signInBtn, userName, userAvatar) !");
     }


} else {
    console.error("DEBUG: L'instance Firebase App n'est PAS accessible dans script.js. Vérifiez l'initialisation dans index.html.");
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
    console.log("DEBUG: IntersectionObserver supporté, configuré.");
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


} else {
    // Fallback pour les navigateurs ne supportant pas IntersectionObserver
    console.log("DEBUG: IntersectionObserver non supporté, animation scroll-reveal désactivée.");
    scrollElements.forEach(el => {
        el.classList.add("is-visible"); // Rendre les éléments visibles directement
    });
}


// --- Autres scripts JavaScript iront ici ---
// La logique pour lire/écrire dans Firestore, gérer les votes, etc.,
// utilisera les instances 'db' et 'auth'.