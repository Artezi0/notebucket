import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { Firestore } from "firebase/firestore"

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDgMEojn5fQBQAYU6XGnZiuoa_tvGNf2fM",
  authDomain: "notebucket-d3638.firebaseapp.com",
  projectId: "notebucket-d3638",
  storageBucket: "notebucket-d3638.appspot.com",
  messagingSenderId: "658544889662",
  appId: "1:658544889662:web:e3b933ad97df67cd62e66f"
})

export const auth = getAuth(firebaseConfig)
export const db = Firestore(firebaseConfig)
export default firebaseConfig