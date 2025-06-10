import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBigWX__5k7AzMJXjZYlpS6VQ6ui0ojSLc",
  authDomain: "inmobiliaria-vue-2453b.firebaseapp.com",
  projectId: "inmobiliaria-vue-2453b",
  storageBucket: "inmobiliaria-vue-2453b.firebasestorage.app",
  messagingSenderId: "145893002449",
  appId: "1:145893002449:web:f0383313528e30956c89f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
