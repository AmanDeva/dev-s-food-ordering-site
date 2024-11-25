import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAINrPgX-IL8-I523KL6FNmM6nXfq0ODMI",
  authDomain: "dev-s-paradise-restaurant.firebaseapp.com",
  projectId: "dev-s-paradise-restaurant",
  storageBucket: "dev-s-paradise-restaurant.appspot.com",
  messagingSenderId: "174617965313",
  appId: "1:174617965313:web:2c430b28b841d690e5e100",
  measurementId: "G-XMTP2LYH57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with custom settings
const auth = getAuth(app);
auth.useDeviceLanguage();

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, googleProvider, db };