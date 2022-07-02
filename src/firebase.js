import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'notebucket-d3638.firebaseapp.com',
  projectId: 'notebucket-d3638',
  storageBucket: 'notebucket-d3638.appspot.com',
  messagingSenderId: '658544889662',
  appId: '1:658544889662:web:e3b933ad97df67cd62e66f'
})

export const auth = getAuth()
export const db = getFirestore(firebaseConfig)
