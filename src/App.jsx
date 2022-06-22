import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import Body from './components/Body'
import Side from './components/Side'
import Top from './components/Top'
import './styles/app.scss'

export default function App() {
  const [ sidebar, isSidebar ] = useState(true)
  const [ read, isRead ] = useState(false)
  const [ split, isSplit ] = useState(false)
  const [ notes, setNotes ] = useState( localStorage.notes ? JSON.parse(localStorage.notes) : [])
  const [ active, setActive ] = useState(false)

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function onAdd() {
    let newNote = {
      id: uuid(),
      cover: {
        isCover: false,
        value: '#E8E7E3',
      },
      stats: '',
      title: "Untitled",
      body: `# Hello world`,
      lastModified: Date.now()
    }

    setNotes([newNote, ...notes])
    setActive(newNote.id)
  }

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
    setNotes(updatedArr);
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
      <section className='App__left' id='left'>
        <Side
          handleSide={handleSide}
          onAdd={onAdd}
          onDelete={onDelete}
          setActive={setActive}
          active={getActive()}
          notes={notes}
          sidebar={sidebar}
        />
      </section>
      <section className='App__right' id='right'>
        <Top 
          handleSide={handleSide}
          active={getActive()}
          isSplit={isSplit}
          split={split}
          isRead={isRead}
          read={read}
          sidebar={sidebar}
        />
        <Body
          onAdd={onAdd}
          onUpdate={onUpdate}
          onDelete={onDelete}
          active={getActive()}
          setActive={setActive}
          split={split}
          read={read}
        />
      </section>
    </main>
  )
}

