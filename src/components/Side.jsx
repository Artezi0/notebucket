import React, { useState } from 'react'
import { BsSortAlphaUp } from 'react-icons/bs'
import data from '../../package.json'
import '../styles/app.scss'

export default function Side({ onAdd, onDelete, setActive, active, notes }) {
  const [ workspace, isWorkspace ] = useState(true)
  const [ status, isStatus ] = useState(false)
  const [ state, setState ] = useState(true)
  const [ search, setSearch ] = useState('')
  let sorted
  
  if (state) {
    sorted = notes.sort((a, b) => b.lastModified - a.lastModified)
  }
  if (!state) {
    sorted = notes.sort((a, b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
      
      return 0
    })
  }

  function deleteAll() {
    confirm('Are you sure?')
    if (true) {
      localStorage.removeItem(notes)
    }
  }

  return (
    <div className='side'>
      <div className="side__header">
          Notebucket <span>{data.version}</span>
      </div>
      <div className="side__actions">
        <input type="text" placeholder='Search note' onChange={(e) => setSearch(e.target.value)}/>
        <button type='button' onClick={() => setState(!state)}><BsSortAlphaUp /></button>
        <button type='button' className='action-btn' onClick={deleteAll}>Delete all</button>
        <button type='button' className='action-btn' onClick={onAdd}>New note</button>
      </div>
      <button type='button' className='side__toggle' onClick={() => isStatus(!status)}>Status</button>
      {status && 
      <ul className='side__status'>
        <li>Active</li>
        <li>Delayed</li>
        <li>Done</li>
      </ul>
      } 

      <button type='button' className='side__toggle'>Tags</button>

      <button type='button' className='side__toggle' onClick={() => isWorkspace(!workspace)}>Workspace</button>
      {workspace && 
      <ul className='side__workspace'>
      {sorted.map(({ id, title, body }) => {
        return (
          <div className={`note ${id === active && "active"}`}
              onClick={() => setActive(id)} 
              key={id}>
            <p className='note__title'>{title}</p>
            <p className='note__bodt'>{body}</p>
            <button type='button' className='note__delete' onClick={(e) => onDelete(id)}>
              <i className="fa-solid fa-ban"></i>
            </button>
          </div>       
        )})
      }
      </ul>
      }
     
    </div>
  )
}