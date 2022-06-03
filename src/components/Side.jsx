import React from 'react'
import data from '../../package.json'
import '../styles/app.scss'

export default function Side({ onAdd, onDelete, setActive, active, notes}) {
  const sorted = notes.sort((a, b) => b.lastModified - a.lastModified)
  
  return (
    <div className='side'>
      <div className="side__header">
        <div className="side__header-logo">
          <span>{data.version}</span>
        </div>
        <div className="side__header-actions">
          <button type='button' className='action-btn'>Setting</button>
          <button type='button' className='action-btn'>Delete all</button>
          <button type='button' className='action-btn' onClick={onAdd}>New note</button>
        </div>
      </div>
      <button type='button' className='toggle-list'>Workspace</button>
      <ul className="side__workspace">
        {sorted.map(({ id, cover, title }) => {
          return (
            <div className={`note ${id === active && "active"}`}
                onClick={() => setActive(id)} 
                key={id}>
              <span className='note__block' style={{ background: `${cover}` }}></span>
              <p className='note__title'>{title}</p>
              <button type='button' className='note__delete' onClick={(e) => onDelete(id)}>
                <i className="fa-solid fa-ban"></i>
              </button>
            </div>       
          )})
        }
      </ul>
    </div>
  )
}