import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { HexColorPicker } from 'react-colorful'
import Edit from './Edit'
import View from './View'
import '../styles/app.scss'

export default function Body({ onAdd, onUpdate, onDelete, active, split, read }) {
  const [ state, setState ] = useState('Status')
  const [ status, isStatus ] = useState(false)
  const [ modal, isModal ] = useState(false)
  const [ input, isInput ] = useState(false)
  const [ info, setInfo ] = useState('')
  const [ notif, isNotif ] = useState(false)

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

  const Notification = () => {
    return (
      <div className="body__notif">
        <div className="body__notif-text">{info}</div>
      </div>
    )
  }

  const Modal = () => {
    async function handleImage(e) {
      const file = e.target.files[0]
      const data = new FormData()

      data.append('file', file)
      data.append('upload_preset', 'notebucket')
      data.append('cloud_name', 'artezi0')
      
      if(file.size > 5000000) {
        alert('File is too big')
      }
      if(file.size < 5000000) {
        isNotif(true)
        setInfo('Uploading...')        
        let resp = await fetch('https://api.cloudinary.com/v1_1/artezi0/image/upload', {
          method: 'POST',
          body: data
        })

        setInfo('Image uploaded')  
        setTimeout(function() { isNotif(false) }, 3000)
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
          <button onClick={
            () => onUpdate({
              ...active, 
              cover: {
                isCover: false,
                value: active.cover.value
              },
              lastModified: Date.now()
            })
          }>Remove</button>
        </TabList>
        <TabPanel className='cover__modal-color'>
          <button onClick={handleColor}>Randomize</button>
          <HexColorPicker 
            color={active.cover.value}
            onChange={
              (e) => onUpdate({
                ...active, 
                cover: {
                  isCover: true,
                  value: e
                },
                lastModified: Date.now()
              })
            }
          />
        </TabPanel>
        <TabPanel className='cover__modal-link'>
          <form onSubmit={handleLinks} autoComplete='off'>
            <input type='hidden' autoComplete='false'/>
            <input type='text' placeholder='Paste image link' id='inputLink' spellCheck='false'/>
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
          <p>The maximum size per file is 5 MB.</p>
        </TabPanel>
      </Tabs>
    )
  }

  const Cover = () => {    
    return (
      <div className='body__header-cover' style={{ background: active.cover.value}}>
        {modal && <Modal />}
        <div className='cover__actions'>
          <button type='button' onClick={() => isModal(!modal)}>Customize</button>
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
          {notif && <Notification />}
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
              <button type='button' className='actions__cover' onClick={() => onUpdate({...active, cover: {isCover: true, value: active.cover.value}, lastModified: Date.now()})}>Add Cover</button>
              <button type='button' className='actions__delete' onClick={() => onDelete(active.id)}>Delete note</button>
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