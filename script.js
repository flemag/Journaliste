// script.js

// *** Accès aux instances Firebase (pour prototypage simple via variables globales) ***
// Ces variables globales ont été définies dans le script d'initialisation de index.html
const app = window.firebaseApp;
const db = window.firestoreDb;
const auth = window.firebaseAuth;
const provider = window.googleAuthProvider; // Le fournisseur Google

if (app && db && auth && provider) {
    console.log("Firebase instances (app, db, auth, provider) accessibles dans script.js !");

    // --- Éléments UI d'authentification ---
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const userInfoDiv = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    const userAvatarImg = document.getElementById('userAvatar');

    // --- Logique d'authentification ---

    // 1. Écouter le clic sur le bouton de connexion
    signInBtn.addEventListener('click', async () => {
        try {
            // Ouvre la popup de connexion Google
            const result = await signInWithPopup(auth, provider);
            // L'utilisateur est connecté. Les informations sont dans result.user
            console.log("Connexion réussie:", result.user);
            // onAuthStateChanged va gérer la mise à jour de l'UI
        } catch (error) {
            // Gérer les erreurs de connexion
            console.error("Erreur de connexion:", error.code, error.message);
            // Afficher un message d'erreur à l'utilisateur si besoin
        }
    });

    // 2. Écouter le clic sur le bouton de déconnexion
    signOutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log("Déconnexion réussie.");
            // onAuthStateChanged va gérer la mise à jour de l'UI
        } catch (error) {
            console.error("Erreur de déconnexion:", error.message);
        }
    });

    // 3. Écouter les changements d'état d'authentification (connexion/déconnexion)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // L'utilisateur est connecté
            console.log("État d'authentification changé: Utilisateur connecté", user);
            // Afficher les infos utilisateur et le bouton de déconnexion
            userInfoDiv.classList.remove('hidden');
            signInBtn.classList.add('hidden');

            // Mettre à jour les infos utilisateur
            userNameSpan.textContent = user.displayName || user.email; // Utilise le nom ou l'email
            if (user.photoURL) {
                userAvatarImg.src = user.photoURL;
                userAvatarImg.classList.remove('hidden'); // Assurez-vous que l'image est visible si elle existe
            } else {
                 userAvatarImg.classList.add('hidden'); // Cache l'image s'il n'y a pas d'avatar
                 // Vous pourriez aussi afficher un avatar par défaut
            }


            // Ici, vous chargerez les données spécifiques à cet utilisateur depuis Firestore
            // (score de réputation, badges, articles, etc.)
            // Par exemple:
            // db.collection('users').doc(user.uid).get().then(doc => {
            //    if (doc.exists) {
            //        console.log("Données utilisateur Firestore:", doc.data());
            //        // Mettre à jour l'UI avec les données Firestore (badges, points...)
            //    } else {
            //        console.log("Nouvel utilisateur, création du profil Firestore...");
            //        // Créer un nouveau document pour cet utilisateur dans la collection 'users'
            //        db.collection('users').doc(user.uid).set({
            //            uid: user.uid,
            //            email: user.email,
            //            name: user.displayName,
            //            photoURL: user.photoURL,
            //            reputation: 1, // Score initial
            //            badges: [],
            //            createdAt: new Date()
            //        });
            //    }
            // }).catch(error => {
            //    console.error("Erreur lors du chargement/création du profil utilisateur Firestore:", error);
            // });


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
    console.error("Les instances Firebase (app, db, auth, provider) ne sont pas toutes accessibles dans script.js.");
}


// *** Logique de Scroll Reveal avec IntersectionObserver ***
// (Gardée de l'étape précédente)

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
      // Optionnel : si on ne veut l'animer qu'une seule fois
      // observer.unobserve(entry.target);
    }
    // else {
    //   // Décommenter si l'animation doit se refaire en scrollant vers le haut
    //   // entry.target.classList.remove("is-visible");
    // }
  });
}, observerOptions);

scrollElements.forEach(el => {
  observer.observe(el);
});

console.log("Scroll Reveal observer configuré dans script.js.");


// --- Autres scripts JavaScript iront ici ---
// Vous pouvez maintenant ajouter la logique de lecture/écriture Firestore,
// en utilisant les variables 'db' et 'auth' (qui contient l'utilisateur connecté si il y en a un).