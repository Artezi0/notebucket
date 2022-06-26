import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

import Body from './components/Body'
import Side from './components/Side'
import Top from './components/Top'
import Login from './components/Login'
import { AuthContextProvider, UserAuth } from './context/AuthContext'
import { NoUserRoutes, UserRoutes } from './context/ProtectedRoutes'
 
import './styles/app.scss'

export default function App() {
  const [ sidebar, isSidebar ] = useState(true)
  const [ read, isRead ] = useState(false)
  const [ split, isSplit ] = useState(false)
  const [ notes, setNotes ] = useState( localStorage.notes ? JSON.parse(localStorage.notes) : [])
  const [ active, setActive ] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function onDelete(noteId) {
    setNotes(notes.filter(({ id }) => id !== noteId)) 
  }

  function onUpdate(updated) {
    const updatedArr = notes.map((note) => {
      if (note.id === updated.id) {
        return updated;
      }
      return note;
    })
    setNotes(updatedArr)
  }

  function getActive() {
    return notes.find(({ id }) => id === active);
  }

  function handleSide() {
    isSidebar(!sidebar)
    document.getElementById('left').classList.toggle('disabled')
  }

  /* Keyboard shortcuts handler */
  function handleShortcut(e) {      
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 83) { handleSide() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 78) { onAdd() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 82) { if (active) { isRead(!read); isSplit(false) }}
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 87) { if (active) { isSplit(!split); isRead(false) }}
  }

  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)
    
    return () => {
      document.removeEventListener('keyup', handleShortcut)
    }
  }, [handleShortcut])


  return (
    <main className='App'>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={    
            <NoUserRoutes>
              <Login />
            </NoUserRoutes>        
          }/>
          <Route path='/notes' element={
            <UserRoutes>
              <main className='App__app'>
                <section className='App__app-left' id='left'>
                  <Side
                    notes={notes}
                    onDelete={onDelete}
                    setActive={setActive}
                    active={getActive()}
                    handleSide={handleSide}
                    sidebar={sidebar}
                  />
                </section>
                <section className='App__app-right' id='right'>
                  <Top 
                    notes={notes}
                    setNotes={setNotes}
                    setActive={setActive}
                    active={getActive()}
                    handleSide={handleSide}
                    sidebar={sidebar}
                    isSplit={isSplit}
                    split={split}
                    isRead={isRead}
                    read={read}
                  />
                  <Body
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    setActive={setActive}
                    active={getActive()}
                    split={split}
                    read={read}
                  />
                </section>
              </main>
            </UserRoutes>
          }/>
        </Routes>
      </AuthContextProvider>
    </main>
  )
}

