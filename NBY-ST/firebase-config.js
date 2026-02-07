// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, onSnapshot, query, orderBy, addDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsBzUXKm_421QMAj2UG8IZYDiFLgc8vfw",
    authDomain: "student-council-nby-68.firebaseapp.com",
    projectId: "student-council-nby-68",
    storageBucket: "student-council-nby-68.firebasestorage.app",
    messagingSenderId: "198592356446",
    appId: "1:198592356446:web:c8de1a525606b10e8254cf",
    measurementId: "G-DW5W1B6NC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// --- Functions สำหรับจัดการข้อมูล ---

// 1. เช็คสิทธิ์ Admin จาก Firestore
export const checkIsAdmin = async (email) => {
    if (!email) return false;
    const docRef = doc(db, "admins", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists(); 
};

// 2. ดึงรายการลิงก์ (เรียงตามลำดับ order)
export const getLinks = (callback) => {
    const q = query(collection(db, "links"), orderBy("order", "asc"));
    return onSnapshot(q, callback);
};

// 3. เพิ่มลิงก์ใหม่
export const addLink = (title, url, order) => {
    return addDoc(collection(db, "links"), { 
        title, 
        url, 
        order: parseInt(order) || 0,
        createdAt: new Date()
    });
};

// 4. ลบลิงก์
export const deleteLink = (id) => {
    return deleteDoc(doc(db, "links", id));
};

// 5. แต่งตั้ง Admin ใหม่
export const addAdmin = (email) => {
    return setDoc(doc(db, "admins", email), { 
        role: "admin", 
        assignedBy: "sw2684226@gmail.com" 
    });
};