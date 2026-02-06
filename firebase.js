import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function loadSite() {
  const ref = doc(db, "site", "main");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveSite(data) {
  const ref = doc(db, "site", "main");
  await setDoc(ref, data, { merge: true });
}
