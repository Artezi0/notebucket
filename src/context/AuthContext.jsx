import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../firebase'
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         GoogleAuthProvider,
         GithubAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut } from "firebase/auth"

const UserContext = createContext()

export function AuthContextProvider({ children }) {
    const [ user, setUser ] = useState({})
    const providerGoogle = new GoogleAuthProvider()
    const providerGithub = new GithubAuthProvider()

    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function googleAuth() {
        return ( 
            signInWithPopup(auth, providerGoogle) 
            .then((result) => {
                const user = result.user
                console.log(user)
            })
        )
    } 

    function githubAuth() {
        return (
            signInWithPopup(auth, providerGithub)
            .then((result) => {
                const user = result.user
                console.log(user)
            })
        )
    }

    function updateUser(name, avatar, email, pass) {
      const user = auth.currentUser

      updateProfile(user, { displayName: name, photoURL: avatar })
      updateEmail(user, email)
      if (pass !== "" || undefined) { updatePassword(user, pass)}
      
      location.reload()
    }

    function login(email, password) {
        return (
            signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user
                console.log(user)
            })
        )
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, 
            (currentUser) => {
                setUser(currentUser)
            }
        )
        return () => { unsubscribe() }
    }, [])

    return (
        <UserContext.Provider 
            value={{ createUser, 
                     googleAuth, 
                     githubAuth, 
                     updateUser,
                     login, 
                     logout, 
                     user }}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth() {
    return useContext(UserContext)
}