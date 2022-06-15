import React from "react"
import { useState, useRef, useEffect } from "react"
import '../styles/app.scss'

export default function Spotlight({ notes, setActive, active, isSpot }) {
  const [ search, setSearch ] = useState('')
  const ref = useRef(null)

  let sorted = notes.filter((note) => note.title.toLowerCase().replace(/\s/g, '').includes(search))

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          isSpot(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [ref])
  }

  useOutsideAlerter(ref)

  return (
    <div className='spotlight' ref={ref}>
      <div className='spotlight__input'>
        <div className='spotlight__input-icon'>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z" fill="currentColor"/>
          </svg>
        </div>
        <input 
          type='text' 
          placeholder='Search' 
          spellCheck='false'
          onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/\s/g, ''))} />
      </div>
      <div className='spotlight__result'>
        <ul className="spotlight__result-list">
        {sorted.map(({ id, title, stats }) => {
          return (
          <div className={`note ${id === active && "active"}`}
               onClick={() => setActive(id) & isSpot(false)} 
               key={id}>
            <div className='note__stats' style={{ background: stats }}></div>
            <p className='note__title'>{title}</p>
          </div>       
          )})
        }
        {sorted.length == 0 && 
          <div className="result-list-warn">
            <h3>No result</h3>
            <p>Seems there are no result, check if there's a typo</p>
          </div>
        }
        </ul>
      </div>
    </div>
  )
}