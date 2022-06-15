import React from 'react'
import FileSaver from 'file-saver'
import { useRef, useEffect } from 'react'

import '../styles/app.scss'

export default function Submenu({ active, isSubmenu }) {
  const ref = useRef(null)
  
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          isSubmenu(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [ref])
  }

  useOutsideAlerter(ref)

  function handleExport() {
    let blob = new Blob([active.body], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, `${active.title}.txt`)
  }

  return (
    <div className='submenu' ref={ref}>
      <p className='submenu__title'>Options</p>
      <ul className="submenu__actions">
        <button type='button' onClick={handleExport}>
          <span>Export as</span><br />
          <span>text (pdf on work)</span>
        </button>
      </ul>
      <ul className='submenu__info'>
        <li><a href='https://github.com/Artezi0/note' target='_blank'>
          <svg width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.99121 16.9316C5.95703 16.9316 2.73145 13.6885 2.73145 9.6543C2.73145 5.62012 5.95703 2.38574 9.98242 2.38574C14.0166 2.38574 17.2598 5.62012 17.2686 9.6543C17.2773 13.6885 14.0254 16.9316 9.99121 16.9316ZM9.98242 11.1133C10.4658 11.1133 10.7471 10.8408 10.7559 10.3311L10.8877 6.10352C10.9053 5.58496 10.5186 5.20703 9.97363 5.20703C9.42871 5.20703 9.05078 5.57617 9.06836 6.09473L9.19141 10.3311C9.20898 10.832 9.49023 11.1133 9.98242 11.1133ZM9.98242 14.0312C10.5537 14.0312 11.0195 13.6182 11.0195 13.0557C11.0195 12.502 10.5625 12.0889 9.98242 12.0889C9.41113 12.0889 8.94531 12.502 8.94531 13.0557C8.94531 13.6094 9.41992 14.0312 9.98242 14.0312Z" fill="currentColor"/>
          </svg>
          Updates
        </a></li>
        <li><a href="#">
          <svg width="14" height="14" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.08789 18.1758C14.0713 18.1758 18.1846 14.0625 18.1846 9.08789C18.1846 4.11328 14.0625 0 9.0791 0C4.10449 0 0 4.11328 0 9.08789C0 14.0625 4.11328 18.1758 9.08789 18.1758ZM9.08789 16.3652C5.05371 16.3652 1.82812 13.1221 1.82812 9.08789C1.82812 5.05371 5.05371 1.81934 9.0791 1.81934C13.1133 1.81934 16.3564 5.05371 16.3652 9.08789C16.374 13.1221 13.1221 16.3652 9.08789 16.3652ZM8.89453 10.8369C9.37793 10.8369 9.68555 10.5557 9.71191 10.1953C9.71191 10.1689 9.71191 10.125 9.7207 10.0898C9.74707 9.6416 10.0547 9.34277 10.626 8.96484C11.4961 8.40234 12.0498 7.89258 12.0498 6.88184C12.0498 5.42285 10.7314 4.5791 9.16699 4.5791C7.66406 4.5791 6.63574 5.26465 6.36328 6.09082C6.31055 6.24023 6.27539 6.38965 6.27539 6.54785C6.27539 6.97852 6.60938 7.24219 7.01367 7.24219C7.53223 7.24219 7.64648 6.97852 7.91895 6.67969C8.2002 6.24023 8.56934 5.98535 9.08789 5.98535C9.78223 5.98535 10.2393 6.38086 10.2393 6.96973C10.2393 7.50586 9.87012 7.7959 9.12305 8.30566C8.49902 8.74512 8.04199 9.19336 8.04199 9.98438V10.0811C8.04199 10.582 8.34961 10.8369 8.89453 10.8369ZM8.87695 13.5352C9.43945 13.5352 9.90527 13.1309 9.90527 12.5684C9.90527 12.0146 9.44824 11.6016 8.87695 11.6016C8.30566 11.6016 7.83984 12.0146 7.83984 12.5684C7.83984 13.1221 8.30566 13.5352 8.87695 13.5352Z" fill="currentColor"/>
          </svg>
          Help
        </a></li>
      </ul>
    </div>
  )
}

