import React, { useState, useRef, useEffect } from "react"
import FileSaver from 'file-saver'

import { UserAuth } from "../context/AuthContext"
import '../styles/app.scss'

export default function Spotlight({ isSpot }) {
  const [ search, setSearch ] = useState('')
  const [ command, isCommand ] = useState(false)
  const ref = useRef(null)

  const { onAdd, onDelete, active, setActive, notes } = UserAuth()

  let commands = [
    {
      id: 0,
      icon: <svg width="14" height="13" viewBox="0 0 20 19" fill="none" xmlns="https://www.w3.org/2000/svg">
      <path d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.99121 16.9316C5.95703 16.9316 2.73145 13.6885 2.73145 9.6543C2.73145 5.62012 5.95703 2.38574 9.98242 2.38574C14.0166 2.38574 17.2598 5.62012 17.2686 9.6543C17.2773 13.6885 14.0254 16.9316 9.99121 16.9316ZM6.74805 10.4893H9.15625V12.9062C9.15625 13.3896 9.49902 13.7324 9.97363 13.7324C10.4658 13.7324 10.8174 13.3896 10.8174 12.9062V10.4893H13.2344C13.7178 10.4893 14.0693 10.1465 14.0693 9.66309C14.0693 9.17969 13.7266 8.82812 13.2344 8.82812H10.8174V6.41113C10.8174 5.91895 10.4658 5.57617 9.97363 5.57617C9.49902 5.57617 9.15625 5.91895 9.15625 6.41113V8.82812H6.74805C6.24707 8.82812 5.9043 9.17969 5.9043 9.66309C5.9043 10.1465 6.25586 10.4893 6.74805 10.4893Z" fill="currentColor"/>
      </svg>
      ,
      title: 'New note',
      action: onAdd,
    },
    {
      id: 1,
      icon: <svg width="14" height="17" viewBox="0 0 18 21" fill="none" xmlns="https://www.w3.org/2000/svg">
      <path d="M4.96582 20.7686H13.043C14.3965 20.7686 15.2666 19.9512 15.3369 18.5977L15.9258 5.94141H16.8926C17.3408 5.94141 17.6836 5.58984 17.6836 5.15039C17.6836 4.71094 17.332 4.37695 16.8926 4.37695H12.9902V3.05859C12.9902 1.70508 12.1289 0.914062 10.6611 0.914062H7.32129C5.85352 0.914062 4.99219 1.70508 4.99219 3.05859V4.37695H1.10742C0.667969 4.37695 0.316406 4.71973 0.316406 5.15039C0.316406 5.59863 0.667969 5.94141 1.10742 5.94141H2.07422L2.66309 18.5977C2.7334 19.96 3.59473 20.7686 4.96582 20.7686ZM6.63574 3.1377C6.63574 2.68945 6.95215 2.39941 7.43555 2.39941H10.5469C11.0303 2.39941 11.3467 2.68945 11.3467 3.1377V4.37695H6.63574V3.1377ZM5.1416 19.1953C4.6582 19.1953 4.30664 18.835 4.28027 18.3164L3.69141 5.94141H14.2822L13.7109 18.3164C13.6934 18.8438 13.3506 19.1953 12.8496 19.1953H5.1416ZM6.40723 17.7803C6.78516 17.7803 7.02246 17.543 7.01367 17.1914L6.75 7.99805C6.74121 7.64648 6.49512 7.41797 6.13477 7.41797C5.76562 7.41797 5.52832 7.65527 5.53711 8.00684L5.80078 17.2002C5.80957 17.5518 6.05566 17.7803 6.40723 17.7803ZM9 17.7803C9.36914 17.7803 9.62402 17.5518 9.62402 17.2002V8.00684C9.62402 7.65527 9.36914 7.41797 9 7.41797C8.63086 7.41797 8.38477 7.65527 8.38477 8.00684V17.2002C8.38477 17.5518 8.63086 17.7803 9 17.7803ZM11.5928 17.7891C11.9443 17.7891 12.1904 17.5518 12.1992 17.2002L12.4629 8.00684C12.4717 7.65527 12.2344 7.42676 11.8652 7.42676C11.5049 7.42676 11.2588 7.65527 11.25 8.00684L10.9863 17.2002C10.9775 17.543 11.2148 17.7891 11.5928 17.7891Z" fill="currentColor"/>
      </svg>           
      ,
      title: 'Delete note',
      action: onDelete
    },
    {
      id: 2,
      icon: <svg width="14" height="13" viewBox="0 0 22 21" fill="none" xmlns="https://www.w3.org/2000/svg">
      <path d="M11 12.9902C11.457 12.9902 11.8262 12.6211 11.8262 12.1816V3.73535L11.7559 2.43457L12.3008 3.07617L13.5312 4.38574C13.6719 4.54395 13.874 4.62305 14.0762 4.62305C14.4805 4.62305 14.8145 4.33301 14.8145 3.91992C14.8145 3.7002 14.7266 3.54199 14.5771 3.39258L11.6328 0.553711C11.4131 0.342773 11.2197 0.272461 11 0.272461C10.7891 0.272461 10.5869 0.342773 10.376 0.553711L7.42285 3.39258C7.27344 3.54199 7.19434 3.7002 7.19434 3.91992C7.19434 4.33301 7.51953 4.62305 7.92383 4.62305C8.12598 4.62305 8.33691 4.54395 8.47754 4.38574L9.69922 3.07617L10.2441 2.42578L10.1826 3.73535V12.1816C10.1826 12.6211 10.5518 12.9902 11 12.9902ZM3.47656 20.9883H18.5146C20.4219 20.9883 21.415 20.0039 21.415 18.123V12.9639C21.415 12.0322 21.3271 11.5225 20.8789 10.9863L18.3213 7.83984C17.1523 6.40723 16.7129 6.06445 15.1045 6.06445H13.4521V7.52344H15.1484C15.7549 7.52344 16.1416 7.64648 16.6426 8.26172L19.3584 11.6279C19.666 12.0234 19.543 12.1904 19.0947 12.1904H13.584C13.127 12.1904 12.916 12.5156 12.916 12.8584V12.8936C12.916 13.8428 12.1777 14.8535 11 14.8535C9.81348 14.8535 9.0752 13.8428 9.0752 12.8936V12.8584C9.0752 12.5156 8.87305 12.1904 8.40723 12.1904H2.90527C2.44824 12.1904 2.35156 11.9971 2.6416 11.6279L5.33984 8.28809C5.8584 7.65527 6.23633 7.52344 6.85156 7.52344H8.54785V6.06445H6.89551C5.28711 6.06445 4.85645 6.39844 3.66113 7.85742L1.1123 10.9863C0.681641 11.5137 0.584961 12.0322 0.584961 12.9639V18.123C0.584961 20.0039 1.57812 20.9883 3.47656 20.9883ZM3.56445 19.2305C2.75586 19.2305 2.31641 18.8086 2.31641 17.9648V13.7373H7.58105C7.8623 15.3018 9.22461 16.4619 11 16.4619C12.7754 16.4619 14.1377 15.3018 14.4189 13.7373H19.6836V17.9648C19.6836 18.8086 19.2354 19.2305 18.4268 19.2305H3.56445Z" fill="currentColor"/>
      </svg>      
      ,
      title: 'Export note',
      action: handleExport
    }
  ]

  let sorted = notes.filter((data) => data.title.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, '')))
  let sortedCommands = commands.filter((command) => command.title.toLowerCase().replace(/\s/g, '').includes(search.substr(1).toLowerCase().replace(/\s/g, '')))

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

  function handleCommand() {
    if (search.charAt(0) == '>') {
      isCommand(true)
    } else {
      isCommand(false)
    }
  }  

  function handleExport() {
    let blob = new Blob([active.body], {type: "text/plain;charset=utf-8"})

    if (active) {
      FileSaver.saveAs(blob, `${active.title}.txt`)
    }
  }

  return (
    <div className="spotlight">
      <div className="spotlight__container" ref={ref}>
        <div className="spotlight__container-input">
          <button type="button" className="input__search">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="https://www.w3.org/2000/svg">
              <path d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z" fill="currentColor"/>
            </svg>
          </button>
          <input 
            id="search"
            type="text" 
            placeholder="Search or jump to"
            autoFocus="true"
            spellCheck="false"
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleCommand}
            value={search}
          />
          <button type="button" className="input__clear" onClick={() => setSearch('')}>
            <svg width="14" height="13" viewBox="0 0 20 19" fill="none" xmlns="https://www.w3.org/2000/svg">
              <path d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.99121 16.9316C5.95703 16.9316 2.73145 13.6885 2.73145 9.6543C2.73145 5.62012 5.95703 2.38574 9.98242 2.38574C14.0166 2.38574 17.2598 5.62012 17.2686 9.6543C17.2773 13.6885 14.0254 16.9316 9.99121 16.9316ZM7.1084 13.3457C7.33691 13.3457 7.53906 13.2666 7.68848 13.1084L9.99121 10.8057L12.2939 13.1084C12.4434 13.2578 12.6367 13.3457 12.874 13.3457C13.3223 13.3457 13.6738 12.9941 13.6738 12.5459C13.6738 12.3262 13.5859 12.1328 13.4365 11.9834L11.125 9.67188L13.4365 7.35156C13.6035 7.18457 13.6826 7.00879 13.6826 6.79785C13.6826 6.34961 13.3311 5.99805 12.8828 5.99805C12.6631 5.99805 12.4785 6.06836 12.3115 6.23535L9.99121 8.54688L7.6709 6.24414C7.52148 6.08594 7.33691 6.00684 7.1084 6.00684C6.66016 6.00684 6.30859 6.34961 6.30859 6.79785C6.30859 7.01758 6.39648 7.21094 6.55469 7.36035L8.85742 9.67188L6.55469 11.9922C6.39648 12.1328 6.30859 12.335 6.30859 12.5459C6.30859 12.9941 6.66016 13.3457 7.1084 13.3457Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div className="spotlight__container-tips">
          <p className="tip"><span>Tip:</span> type <code>{'>'}</code> to run command</p>
        </div>
        <ul className="spotlight__container-result">
        {!command && sorted.map(({ id, title, stats }) => {
          return (
          <div className={`note ${id === active && "active"}`}
               onClick={() => setActive(id) & isSpot(false)} 
               key={id}>
            <div className='note__stats' style={{ background: stats }}></div>
            <p className='note__title'>{title}</p>
            <button className='note__action'>Jump to</button>
          </div>       
          )})
        }
        {!command && sorted.length == 0 && 
            <div className="result__warn">
              <h3>No result</h3>
              <p>Seems there are no result, check if there's a typo</p>
            </div>
        }
        {command && sortedCommands.map(({ id, icon, title, action }) => {
          return (
          <div className="result__commands">
            <div className="command" onClick={action} key={id}>
              {icon}
              <p className="command__title">{title}</p>
              <p className="command__action">Run</p>
            </div>
          </div>
          )})
        }
        {command && sortedCommands.length == 0 && 
            <div className="result__warn">
              <h3>No result</h3>
              <p>Seems there are no result, check if there's a typo</p>
            </div>
        }
        </ul>
      </div>
    </div>
  )
}