import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVObs2ZWLEdDtxOndm_DDUdlz9zIlew8E",
  authDomain: "dropsite-e8ab0.firebaseapp.com",
  projectId: "dropsite-e8ab0",
  storageBucket: "dropsite-e8ab0.appspot.com",
  messagingSenderId: "191396122609",
  appId: "1:191396122609:web:462ecd41f225d8464a3e50",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
