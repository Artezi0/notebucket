import { createContext, useContext, useEffect, useState } from "react"
import { doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { auth, db } from '../firebase'
import { GoogleAuthProvider,
         GithubAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut } from "firebase/auth"

const UserContext = createContext()

export function AuthContextProvider({ children }) {
  const providerGoogle = new GoogleAuthProvider()
  const providerGithub = new GithubAuthProvider()
  const [ notes, setNotes ] = useState([])
  const [ user, setUser ] = useState({})
  const [ active, setActive ] = useState(false)

  /* Listen and fetch database realtime */
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      onSnapshot(collection(db, currentUser.uid), (snapShot) => {
        let list = []  
  
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
      })  
        setNotes(list)
      }, 
      (error) => {
        console.warn(error)
      }) 
    })
    
    return () => {
      authChange() 
    }
  }, [])

  /* Google authentication */ 
  function googleAuth() {
    return ( 
      signInWithPopup(auth, providerGoogle) 
        .then((result) => {
          const user = result.user
        })
    )
  } 
  
  /* Github authentication */ 
  function githubAuth() {
    return (
      signInWithPopup(auth, providerGithub)
        .then((result) => {
          const user = result.user
        })
    )
  }
  
  /* Log out current user */ 
  function logout() {
    return signOut(auth)
  }

  /* Get active document */ 
  function getActive() {
    let x = notes.find(({ id }) => id === active)
    
    return x
  }

  /* Create new document */ 
  async function onAdd() {
    let newNote = {
      title: 'Untitled',
      body: `# Hello world`,
      lastModified: Date.now(),
      cover: {
        isCover: false,
        value: '#E8E7E3'
      },
      stats: ''
    }

   await addDoc(collection(db, user.uid), newNote)
  }

  /* Delete current document */
  async function onDelete() {
    setActive(false)
    await deleteDoc(doc(db, user.uid, active))
  }

  /* Wipe out current user data */
  async function onDeleteAll() {
    setActive(false)
    await deleteDoc(collection(db, user.uid))
  } 

  /* Update user data */ 
  async function onUpdate(updated) {
    const arrays = notes.map((note) => {
      if (note.id === updated.id) {
        return updated
      }

     return note
    })
    
    const x = arrays.find(({ id }) => id === active)
    await updateDoc(doc(db, user.uid, active), {
      title: x.title,
      lastModified: x.lastModified,
      stats: x.stats,
      cover: {
        isCover: x.cover.isCover,
        value: x.cover.value
      },
      body: x.body,
    })
  }
  
  return (
    <UserContext.Provider 
      value={{ googleAuth, 
               githubAuth, 
               logout,
               onAdd,
               onUpdate,
               onDelete,
               onDeleteAll,
               setActive,
               getActive,
               active,
               notes, 
               user }}>
      {children}
    </UserContext.Provider>
  )
}

export function UserAuth() {
  return useContext(UserContext)
}