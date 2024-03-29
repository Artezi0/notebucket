import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserAuth } from './context/AuthContext'
import { AnimatePresence } from 'framer-motion'

import View from './components/Web/View'
import Top from './components/App/Top'
import Side from './components/App/Side'
import Body from './components/App/Body'
import Login from './components/Web/Login'
import Loader from './components/Module/Loader'

import './styles/app.scss'

export default function App() {  
  const { notes } = UserAuth()
  const [ sidebar, isSidebar ] = useState(true)

  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)
    
    return () => {
      document.removeEventListener('keyup', handleShortcut)
    }
  }, [handleShortcut])
  
  function handleSide() {
    document.getElementById('left').classList.toggle('disabled')
    isSidebar(!sidebar)
  }

  function handleShortcut(e) {      
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 83) { handleSide() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 78) { onAdd() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 82) { if (active) { isRead(!read); isSplit(false) }}
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 87) { if (active) { isSplit(!split); isRead(false) }}
  }

  return (
      <main className='App'>
        <AnimatePresence>
          <Routes>
            <Route path='/'>
              <Route index element={
                <Login />
              }/>
              <Route path='notes' element={   
                <section className='App__app'>
                  <section className='App__app-left' id='left'>
                    <Side handleSide={handleSide}/>
                  </section>
                  <section className='App__app-right' id='right'>
                    <Top 
                      handleSide={handleSide}  
                      side={sidebar} />
                    <Body />
                  </section>
                </section>
              }/>
              {notes.map(({id, title, cover, body, lastModified}) => {
                return (
                  <Route 
                    key={id}
                    path={id} 
                    element={
                      <View 
                        title={title}
                        cover={cover}
                        body={body}
                        lastModified={lastModified}
                      />
                    }   
                  />
                )
              })}
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
  )
}
