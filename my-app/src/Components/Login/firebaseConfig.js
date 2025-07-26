import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAS_uDSKOM3q8v1Eio8FrbADd1dKw6CAMc",
  authDomain: "wedding-planner-328d7.firebaseapp.com",
  projectId: "wedding-planner-328d7",
  storageBucket: "wedding-planner-328d7.firebasestorage.app",
  messagingSenderId: "321340962078",
  appId: "1:321340962078:web:160ccb6ac8656afb7ec50f",
  measurementId: "G-J0BR57WE4Y"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };