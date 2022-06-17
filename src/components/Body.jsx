import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Edit from './Edit'
import View from './View'
import '../styles/app.scss'

export default function Body({ onAdd, onUpdate, onDelete, active, split, read }) {
  const [ state, setState ] = useState('Status')
  const [ status, isStatus ] = useState(false)
  const [ modal, isModal ] = useState(false)
  const [ input, isInput ] = useState(false)

  function onEdit(field, value) {
    onUpdate({
      ...active,
      [field]: value,
      lastModified: Date.now()
    })
  }

  function handleDateStr() {
    return new Date(active.lastModified).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric', 
    })
  }

  const Modal = () => {
    async function handleImage(e) {
      const file = e.target.files[0]
      const data = new FormData()

      data.append('file', file)
      data.append('upload_preset', 'notebucket')
      data.append('cloud_name', 'artezi0')
      
      if(file.size > 5000000) {
        alert('File too big')
      }
      if(file.size < 5000000) {
        let resp = await fetch('https://api.cloudinary.com/v1_1/artezi0/image/upload', {
          method: 'POST',
          body: data
        })

        let res = await resp.json() 
        let img = res.url
        onUpdate({
          ...active, 
          cover: {
            isCover: true,
            value: img
          },
          lastModified: Date.now()
        })
      }
      isModal(false)
    }

    function handleLinks(e) {
      e.preventDefault()
      
      const inputLink = document.getElementById('inputLink')
      if (inputLink.value !== "" || undefined) {
        onUpdate({
          ...active, 
          cover: {
            isCover: true,
            value: inputLink.value
          },
          lastModified: Date.now()
        })
      }
      isModal(false)
    }

    function handleColor() {
      let hexColor = "#"
      const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
      const randomHex = () => { return Math.floor(Math.random() * hex.length)}    
      
      for (let i = 0; i < 6; i++) {
        hexColor += hex[randomHex()]
      }

      onUpdate({
        ...active, 
        cover: {
          isCover: true,
          value: hexColor.toString()
        },
        lastModified: Date.now()
      })
    }

    return (
      <Tabs className='cover__modal'>
        <TabList className='cover__modal-tab'>
          <Tab>Color</Tab>
          <Tab>Link</Tab>
          <Tab>Upload</Tab>
        </TabList>
        <TabPanel className='cover__modal-color'>
          <button onClick={handleColor}>Randomize</button>
        </TabPanel>
        <TabPanel className='cover__modal-link'>
          <form onSubmit={handleLinks} autoComplete='off'>
            <input type='hidden' autoComplete='false'/>
            <input type='text' placeholder='Image link' id='inputLink' spellCheck='false'/>
          </form>
        </TabPanel>
        <TabPanel className='cover__modal-upload'>
          <label htmlFor="inputImg">Select image</label>
          <input 
            type="file"  
            id='inputImg'
            onChange={handleImage}
            accept='.png, .jpeg, .jpg, .webp'
            style={{ display: 'none' }}
          />
          <p>Image can't be larger than 5mb</p>
        </TabPanel>
      </Tabs>
    )
  }

  const Cover = () => {    
    return (
      <div className='body__header-cover' style={{ background: active.cover.value}}>
        {modal && <Modal />}
        <div className='cover__actions'>
          <button type='button' onClick={() => isModal(!modal)}>Set cover</button>
          <button type='button' onClick={() => onUpdate({...active, cover: {isCover: false, value: active.cover.value}, lastModified: Date.now()})}>Remove</button>
        </div>
        <img src={active.cover.value} className='cover-image' alt=''/>
      </div>
    )
  }

  const Status = () => {
    function handleStatus(e) {
      let val = e.target.value
      let text
      if (val == 0) {
        onEdit('stats', '#E8E7E3')
        text = 'Active'
      }
      if (val == 1) {
        onEdit('stats', '#FFBD44')
        text = 'Delayed'
      }
      if (val == 2) {
        onEdit('stats', '#89CA00')
        text = 'Completed'
      }
      if (val == 3) {
        onEdit('stats', '#FF605C')
        text = 'Dropped'
      }
      
      setState(text)
      isStatus(!status)
    }

    return (
      <div className="status">
        <button className="status__btn" value={0} onClick={handleStatus}>
          <div className='status__btn-stats'></div>
          Active
        </button>
        <button className="status__btn" value={1} onClick={handleStatus}>
          <div className='status__btn-stats'></div>
          Delayed
        </button>
        <button className="status__btn" value={2} onClick={handleStatus}>
          <div className='status__btn-stats'></div>
          Completed
        </button>
        <button className="status__btn" value={3} onClick={handleStatus}>
          <div className='status__btn-stats'></div>
          Dropped
        </button>
      </div>
    )
  }

  const Warn = () => {
    return (
      <div className='body__msg'>
        <svg width="200" height="200" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.15529 19.6221C10.6162 22.083 13.7012 22.8389 15.1602 22.9883C15.7403 23.0762 16.1094 22.7685 16.1358 22.3203C16.1709 21.9072 15.916 21.5732 15.3975 21.4678C14.0703 21.248 11.3369 20.6064 9.26271 18.5146C5.8965 15.1572 5.22853 9.9453 8.00588 7.15917C10.2295 4.94432 13.9209 5.16405 16.6455 6.63182L17.7969 5.49803C14.2988 3.37108 9.65822 3.30077 6.90725 6.05174C3.62014 9.34764 4.00685 15.4736 8.15529 19.6221ZM21.5147 6.86913L22.2617 6.11327C22.6485 5.71776 22.6836 5.14647 22.2969 4.77733L22.0332 4.52245C21.6904 4.20604 21.1367 4.23241 20.7588 4.60155L20.0029 5.35741L21.5147 6.86913ZM12.9278 15.4473L20.8643 7.51952L19.3438 6.0078L11.416 13.9355L10.6514 15.7812C10.5547 16.0273 10.8008 16.2646 11.0381 16.1767L12.9278 15.4473ZM11.4951 16.9414C14.2988 19.8594 19.124 20.9492 21.7608 18.3213C23.9053 16.168 23.7207 12.3447 21.3828 9.04003L20.2578 10.165C21.9805 12.7051 22.2969 15.5703 20.6533 17.2139C18.6319 19.2353 15.336 18.3213 13.1826 16.2646L11.4951 16.9414Z" fill="currentColor"/>
        </svg>
        <p className='body__msg-subtitle'>It's so quiet here. Select a note <br /> or create one!</p>
        <button type='button' onClick={onAdd}>Create document</button>
      </div>
    )
  }

  return (
    <section className='body'>
      {!active && <Warn />}
      {active &&
        <>
          <div className="body__header">
            {active.cover.isCover && <Cover />}
            <div className="body__header-info">
              <div onClick={() => isInput(true)}  className={input ? 'info-name disabled' : 'info-name'}>
                <form onSubmit={(e) => e.preventDefault() & isInput(false)}>
                  <input 
                    onChange={(e) => onEdit('title', e.target.value)} 
                    value={active.title} 
                    spellCheck='false'
                    disabled={input ? false : true}
                  />
                </form>
              </div>
              <p className='info-date'>Last modified {handleDateStr()}</p>
            </div>
            <div className="body__header-actions">
              {status && <Status />}
              <div className='status-block' style={{ background: `${active.stats}` }}></div>
              <button type='button' className='actions__stats' onClick={() => isStatus(!status)}>{state} <i className={status ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'}></i></button>
              <button type='button' className='actions__cover' onClick={() => onUpdate({...active, cover: {isCover: true, value: active.cover.value}, lastModified: Date.now()})}>
                <svg width="18" height="13" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.46777 16.8633H18.5234C20.4219 16.8633 21.4062 15.8877 21.4062 14.0156V3.31055C21.4062 1.43848 20.4219 0.462891 18.5234 0.462891H3.46777C1.56934 0.462891 0.584961 1.42969 0.584961 3.31055V14.0156C0.584961 15.8877 1.56934 16.8633 3.46777 16.8633ZM3.57324 15.1406C2.75586 15.1406 2.30762 14.7188 2.30762 13.8662V3.45996C2.30762 2.60742 2.75586 2.17676 3.57324 2.17676H18.418C19.2266 2.17676 19.6836 2.60742 19.6836 3.45996V13.8662C19.6836 14.7188 19.2266 15.1406 18.418 15.1406H3.57324ZM4.28516 8.64551H17.7061C18.1543 8.64551 18.4004 8.39062 18.4004 7.94238V4.17188C18.4004 3.72363 18.1543 3.45996 17.7061 3.45996H4.28516C3.83691 3.45996 3.59082 3.72363 3.59082 4.17188V7.94238C3.59082 8.39062 3.83691 8.64551 4.28516 8.64551Z" fill="currentColor"/>
                </svg>
                Add Cover
              </button>
              <button type='button' className='actions__delete' onClick={() => onDelete(active.id)}>
                <svg width="14" height="17" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.96582 20.7686H13.043C14.3965 20.7686 15.2666 19.9512 15.3369 18.5977L15.9258 5.94141H16.8926C17.3408 5.94141 17.6836 5.58984 17.6836 5.15039C17.6836 4.71094 17.332 4.37695 16.8926 4.37695H12.9902V3.05859C12.9902 1.70508 12.1289 0.914062 10.6611 0.914062H7.32129C5.85352 0.914062 4.99219 1.70508 4.99219 3.05859V4.37695H1.10742C0.667969 4.37695 0.316406 4.71973 0.316406 5.15039C0.316406 5.59863 0.667969 5.94141 1.10742 5.94141H2.07422L2.66309 18.5977C2.7334 19.96 3.59473 20.7686 4.96582 20.7686ZM6.63574 3.1377C6.63574 2.68945 6.95215 2.39941 7.43555 2.39941H10.5469C11.0303 2.39941 11.3467 2.68945 11.3467 3.1377V4.37695H6.63574V3.1377ZM5.1416 19.1953C4.6582 19.1953 4.30664 18.835 4.28027 18.3164L3.69141 5.94141H14.2822L13.7109 18.3164C13.6934 18.8438 13.3506 19.1953 12.8496 19.1953H5.1416ZM6.40723 17.7803C6.78516 17.7803 7.02246 17.543 7.01367 17.1914L6.75 7.99805C6.74121 7.64648 6.49512 7.41797 6.13477 7.41797C5.76562 7.41797 5.52832 7.65527 5.53711 8.00684L5.80078 17.2002C5.80957 17.5518 6.05566 17.7803 6.40723 17.7803ZM9 17.7803C9.36914 17.7803 9.62402 17.5518 9.62402 17.2002V8.00684C9.62402 7.65527 9.36914 7.41797 9 7.41797C8.63086 7.41797 8.38477 7.65527 8.38477 8.00684V17.2002C8.38477 17.5518 8.63086 17.7803 9 17.7803ZM11.5928 17.7891C11.9443 17.7891 12.1904 17.5518 12.1992 17.2002L12.4629 8.00684C12.4717 7.65527 12.2344 7.42676 11.8652 7.42676C11.5049 7.42676 11.2588 7.65527 11.25 8.00684L10.9863 17.2002C10.9775 17.543 11.2148 17.7891 11.5928 17.7891Z" fill="currentColor"/>
                </svg>
                Delete note
              </button>
            </div>
          </div>
          {split ?
          <div className="body__header-split">
            <Edit onUpdate={onUpdate} active={active} />
            <View active={active} />
          </div> : 
          <div className="body__header-main">
            {read ? 
            <View active={active} /> :
            <Edit onUpdate={onUpdate} active={active} />
            }
          </div> 
          }
         
        </>
      }
    </section>
  )
}