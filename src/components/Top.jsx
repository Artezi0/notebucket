import React, { useState } from 'react'
import '../styles/app.scss'

export default function Top({ submenu, isSubmenu, handleSide, onUpdate, active, isSplit, split, isRead, read }) {
  const [ input, isInput ] = useState(false)
  let filenameStyle 
  let filename 
  
  function onEdit(field, value) {
    onUpdate({
      ...active,
      [field]: value,
      lastModified: Date.now()
    })
  }

  function handleStyle() {
    if (active) {
      filename = active.title
      filenameStyle = { color: "#000000" }
      document.title = active.title
    } 
    if (!active) {
      filename = "No selected"
      filenameStyle = { 
        color: "#19171199",
        pointerEvents: "none"
      }
      document.title = "Notebucket, Organize your notes"
    }

    return filename && filenameStyle
  }

  handleStyle()

  const Input = () => {
    function handleNaming(e) {
      e.preventDefault()

      const value = document.getElementById('inputVal').value
      if (value == "") {
        // ...
      } 
      if (value !== "") {
        onEdit('title', value)
      }

      isInput(!input)
    }

    function handlePlaceholder() {
      if (active) {
        return active.title
      }
      if (!active) {
        return 'Insert a filename!'
      }
    }

    return (
      <form className="top__info-input" spellCheck='false' autoComplete='off' onSubmit={handleNaming}>
        <input type='hidden' autoComplete='false'></input>
        <input type='text' placeholder={handlePlaceholder()} id='inputVal'></input>
      </form>
    )
  }

  return (
    <nav className='top'>
      <div className="top__info">
        <button type='button' className='top__info-btn' onClick={handleSide}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6.85156C13.2266 5.9375 11.5039 5.12012 9.48242 5.12012C6.78418 5.12012 4.60449 6.51758 4.02441 7.84473V21.0371C4.02441 21.8984 4.58691 22.2324 5.21094 22.2324C5.67676 22.2324 5.94043 22.0918 6.23926 21.8721C6.83691 21.3887 7.8125 20.8262 9.48242 20.8262C11.1611 20.8262 12.3037 21.3887 12.8135 21.8193C13.0947 22.0303 13.4199 22.2324 14 22.2324C14.5801 22.2324 14.8965 22.0127 15.1865 21.8193C15.7314 21.415 16.8389 20.8262 18.5176 20.8262C20.1875 20.8262 21.1807 21.3975 21.7607 21.8721C22.0596 22.0918 22.3232 22.2324 22.7891 22.2324C23.4131 22.2324 23.9756 21.8984 23.9756 21.0371V7.84473C23.3955 6.51758 21.2246 5.12012 18.5176 5.12012C16.4961 5.12012 14.7822 5.9375 14 6.85156ZM5.93164 8.45117C6.16895 7.87109 7.46973 6.88672 9.48242 6.88672C11.4951 6.88672 12.8398 7.87988 13.0508 8.45117V20.0439C12.1455 19.3936 10.8535 19.042 9.48242 19.042C8.10254 19.042 6.81934 19.3936 5.93164 20.0703V8.45117ZM22.0684 8.45117V20.0703C21.1807 19.3936 19.8975 19.042 18.5176 19.042C17.1465 19.042 15.8545 19.3936 14.9492 20.0439V8.45117C15.1602 7.87988 16.5049 6.88672 18.5176 6.88672C20.5303 6.88672 21.8311 7.87109 22.0684 8.45117Z" fill="currentColor"/>
          </svg>
        </button>
        <p className='top__info-filename' onClick={() => isInput(!input)} style={filenameStyle}>{filename}</p>
        {input && <Input />}
      </div>
      <div className="top__menu">
        <button type='button' className="top__menu-readonly" onClick={() => isRead(!read)}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38379 21.8281C11.2051 21.8281 13.3672 18.5234 13.3672 13.6543C13.3672 8.77637 11.2051 5.48926 8.38379 5.48926C5.5625 5.48926 3.40039 8.77637 3.40039 13.6543C3.40039 18.5234 5.5625 21.8281 8.38379 21.8281ZM19.6074 21.8281C22.4287 21.8281 24.5908 18.5234 24.5908 13.6543C24.5908 8.77637 22.4287 5.48926 19.6074 5.48926C16.7949 5.48926 14.624 8.77637 14.624 13.6543C14.624 18.5234 16.7949 21.8281 19.6074 21.8281ZM6.61719 16.6777C8.09375 16.6777 9.07812 15.6582 9.07812 14.1113C9.07812 12.582 8.09375 11.5449 6.61719 11.5449C6.01074 11.5449 5.49219 11.7207 5.08789 12.0283C5.43945 9.02246 6.79297 7.0625 8.38379 7.05371C10.2646 7.04492 11.7939 9.7168 11.7939 13.6543C11.7939 17.5654 10.2646 20.2549 8.38379 20.2637C6.97754 20.2725 5.76465 18.752 5.25488 16.3174C5.63281 16.5547 6.08984 16.6777 6.61719 16.6777ZM17.8408 16.6777C19.3086 16.6777 20.3018 15.6582 20.3018 14.1113C20.3018 12.582 19.3086 11.5449 17.8408 11.5449C17.2256 11.5449 16.707 11.7207 16.2939 12.0283C16.6543 9.02246 18.0078 7.0625 19.6074 7.0625C21.4795 7.0625 23.0088 9.73438 23.0088 13.6543C23.0088 17.5742 21.4795 20.2549 19.6074 20.2549C18.2012 20.2549 16.9795 18.7432 16.4697 16.3174C16.8477 16.5547 17.3135 16.6777 17.8408 16.6777ZM5.92285 13.8037C5.61523 13.751 5.41309 13.3818 5.4834 12.9951C5.5625 12.6084 5.87012 12.3359 6.16895 12.3887C6.48535 12.4502 6.66992 12.8193 6.59082 13.1973C6.52051 13.584 6.23047 13.8564 5.92285 13.8037ZM17.1465 13.8037C16.8301 13.7422 16.6367 13.3818 16.707 12.9951C16.7861 12.6084 17.0762 12.3359 17.3838 12.3887C17.709 12.4414 17.8936 12.8193 17.8145 13.1973C17.7354 13.584 17.4541 13.8564 17.1465 13.8037Z" fill="currentColor"/>
          </svg>
        </button>
        <button type='button' className="top__menu-split" onClick={() => isSplit(!split)}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.45898 20.29C6.45898 22.1885 7.43457 23.1729 9.31543 23.1729H18.6758C20.5566 23.1729 21.5322 22.1885 21.5322 20.29V7.02734C21.5322 5.1377 20.5566 4.14453 18.6758 4.14453H9.31543C7.43457 4.14453 6.45898 5.1377 6.45898 7.02734V20.29ZM8.18164 20.1846V7.13281C8.18164 6.31543 8.60352 5.86719 9.45605 5.86719H13.1299V21.4502H9.45605C8.60352 21.4502 8.18164 21.002 8.18164 20.1846ZM18.5264 5.86719C19.3789 5.86719 19.8096 6.31543 19.8096 7.13281V20.1846C19.8096 21.002 19.3789 21.4502 18.5264 21.4502H14.8525V5.86719H18.5264Z" fill="currentColor"/>
          </svg>
        </button>
        <button type='button' className='top__menu-submenu' onClick={() => isSubmenu(!submenu)}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.16016 9.50586C6.85449 9.50586 7.4082 8.95215 7.4082 8.25781C7.4082 7.57227 6.85449 7.00977 6.16016 7.00977C5.47461 7.00977 4.91211 7.57227 4.91211 8.25781C4.91211 8.95215 5.47461 9.50586 6.16016 9.50586ZM10.291 9.10156H22.2266C22.7012 9.10156 23.0791 8.73242 23.0791 8.25781C23.0791 7.7832 22.71 7.41406 22.2266 7.41406H10.291C9.8252 7.41406 9.44727 7.7832 9.44727 8.25781C9.44727 8.73242 9.81641 9.10156 10.291 9.10156ZM6.16016 14.9111C6.85449 14.9111 7.4082 14.3574 7.4082 13.6631C7.4082 12.9775 6.85449 12.415 6.16016 12.415C5.47461 12.415 4.91211 12.9775 4.91211 13.6631C4.91211 14.3574 5.47461 14.9111 6.16016 14.9111ZM10.291 14.5068H22.2266C22.7012 14.5068 23.0791 14.1377 23.0791 13.6631C23.0791 13.1885 22.71 12.8193 22.2266 12.8193H10.291C9.8252 12.8193 9.44727 13.1885 9.44727 13.6631C9.44727 14.1377 9.81641 14.5068 10.291 14.5068ZM6.16016 20.3164C6.85449 20.3164 7.4082 19.7627 7.4082 19.0684C7.4082 18.3828 6.85449 17.8203 6.16016 17.8203C5.47461 17.8203 4.91211 18.3828 4.91211 19.0684C4.91211 19.7627 5.47461 20.3164 6.16016 20.3164ZM10.291 19.9121H22.2266C22.7012 19.9121 23.0791 19.543 23.0791 19.0684C23.0791 18.5938 22.71 18.2246 22.2266 18.2246H10.291C9.8252 18.2246 9.44727 18.5938 9.44727 19.0684C9.44727 19.543 9.81641 19.9121 10.291 19.9121Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}
