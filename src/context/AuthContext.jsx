import { createContext, useContext, useEffect, useState } from 'react'
import { doc, collection, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { GoogleAuthProvider,
         GithubAuthProvider,
         signInWithRedirect,
         onAuthStateChanged,
         signOut } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router'

const UserContext = createContext()

export function AuthContextProvider({ children }) {
  const providerGoogle = new GoogleAuthProvider()
  const providerGithub = new GithubAuthProvider()
  const navigate = useNavigate()
  
  const [ active, setActive ] = useState(false)
  const [ notes, setNotes ] = useState([])
  const [ user, setUser ] = useState({})

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to='/' />
  }

  /* Listen and fetch database realtime */
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) { 
        navigate('/notes')
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
      }
    
      if (!user) { navigate('/') }
    })
    
    return () => {
      authChange() 
    }
  }, [])

  /* Google authentication */ 
  async function googleAuth() {
    return ( 
      signInWithRedirect(auth, providerGoogle)
    )
  } 
  
  /* Github authentication */ 
  function githubAuth() {
    return (
      signInWithRedirect(auth, providerGithub)
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
      isRead: false,
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
    await updateDoc(doc(db, user.uid, active), {
      title: updated.title,
      lastModified: updated.lastModified,
      stats: updated.stats,
      isRead: updated.isRead,
      cover: {
        isCover: updated.cover.isCover,
        value: updated.cover.value
      },
      body: updated.body,
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
               user,
               ProtectedRoute }}>
      {children}
    </UserContext.Provider>
  )
}

export function UserAuth() {
  return useContext(UserContext)
}