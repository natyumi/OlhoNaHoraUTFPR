import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZQuxp-qBeJcAHRsiLrleso2Xjz-OAuJU",
  authDomain: "olho-na-hora-utfpr.firebaseapp.com",
  projectId: "olho-na-hora-utfpr",
  storageBucket: "olho-na-hora-utfpr.appspot.com",
  messagingSenderId: "3397334714",
  appId: "1:3397334714:web:3a789990c627da3d997483",
  measurementId: "G-VV823VZBWK"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const database = getDatabase();
export const storage = getStorage();