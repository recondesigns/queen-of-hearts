import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfXrwa0eY0AAup9xxLzQUexCprnIIsFis",
  authDomain: "vfw-queen-of-hearts.firebaseapp.com",
  projectId: "vfw-queen-of-hearts",
  storageBucket: "vfw-queen-of-hearts.firebasestorage.app",
  messagingSenderId: "504803789708",
  appId: "1:504803789708:web:32633d6ebfbd96b30c64a9"
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyDfXrwa0eY0AAup9xxLzQUexCprnIIsFis',
//   authDomain: 'vfw-queen-of-hearts.firebaseapp.com',
//   projectId: 'vfw-queen-of-hearts',
//   storageBucket: 'vfw-queen-of-hearts.firebasestorage.app',
//   messagingSenderId: '504803789708',
//   appId: '1:504803789708:web:32633d6ebfbd96b30c64a9',
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)