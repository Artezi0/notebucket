import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import Body from './components/Body'
import Side from './components/Side'
import Submenu from './components/Submenu'
import Top from './components/Top'
import './styles/app.scss'

export default function App() {
  const [ submenu, isSubmenu ] = useState(false)
  const [ sidebar, isSidebar ] = useState(false)
  const [ read, isRead ] = useState(false)
  const [ notes, setNotes ] = useState( localStorage.notes ? JSON.parse(localStorage.notes) : [])
  const [ active, setActive ] = useState(false)

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function onAdd() {
    var newNote = {
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
  }

  function onDelete(noteId) {
    setNotes(notes.filter(({ id }) => id !== noteId))
    location.reload()
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
    document.getElementById('left').classList.toggle('active')
  }

  return (
    <main className='App'>
      <section className='App__left' id='left'>
        <Side
          onAdd={onAdd}
          onDelete={onDelete}
          setActive={setActive}
          active={active}
          notes={notes}
        />
      </section>
      <section className='App__right' id='right'>
        <Top 
          submenu={submenu}
          isSubmenu={isSubmenu}
          handleSide={handleSide}
          onUpdate={onUpdate}
          active={getActive()}
          isRead={isRead}
          read={read}
        />
        {submenu && <Submenu />}
        <Body
          onAdd={onAdd}
          onUpdate={onUpdate}
          active={getActive()}
          setActive={setActive}
          isRead={isRead}
          read={read}
        />
      </section>
    </main>
  )
}

