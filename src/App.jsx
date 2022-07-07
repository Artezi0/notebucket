import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Top from './components/Top'
import Side from './components/Side'
import Body from './components/Body'
import Login from './components/Login'
import { AuthContextProvider } from './context/AuthContext'

import './styles/app.scss'

export default function App() {
  const [ sidebar, isSidebar ] = useState(true)
  const [ read, isRead ] = useState(false)
  
  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)
    
    return () => {
      document.removeEventListener('keyup', handleShortcut)
    }
  }, [handleShortcut])
  
  function handleSide() {
    isSidebar(!sidebar)
    document.getElementById('left').classList.toggle('disabled')
  }

  function handleShortcut(e) {      
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 83) { handleSide() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 78) { onAdd() }
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 82) { if (active) { isRead(!read); isSplit(false) }}
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 87) { if (active) { isSplit(!split); isRead(false) }}
  }
  
  return (
    <AuthContextProvider>
      <main className='App'>
        <Routes>
          <Route path='/'>
            <Route index element={
              <Login />
            }/>
            <Route path='notes' element={ 
              <main className='App__app'>
                <section className='App__app-left' id='left'>
                  <Side handleSide={handleSide}/>
                </section>
                <section className='App__app-right' id='right'>
                  <Top 
                    handleSide={handleSide}
                    sidebar={sidebar}
                    isRead={isRead}
                    read={read}
                  />
                  <Body read={read} />
                </section>
              </main>
            }/>
          </Route>
        </Routes>
      </main>
    </AuthContextProvider>
  )
}

