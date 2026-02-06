// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ===== Auth ===== */
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function watchAuth(cb) {
  onAuthStateChanged(auth, cb);
}

/* ===== Site Data ===== */
export async function loadPage(pageId) {
  const ref = doc(db, "pages", pageId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function savePage(pageId, data) {
  const ref = doc(db, "pages", pageId);
  await setDoc(ref, data, { merge: true });
}
