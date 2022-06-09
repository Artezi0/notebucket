import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import '../styles/app.scss'

export default function Edit({ active, onUpdate }) {
  let [ state, setState ] = useState({
    body: active.body
  })

  function onEdit(field, value) {
    onUpdate({
      ...active,
      [field]: value,
      lastModified: Date.now()
    })
  }  

  const placeholder = `Start writting... \nDon't know how write markdown?`

  return (
    <TextareaAutosize 
      className='input'
      value={active.body}
      onChange={(e) => onEdit('body', e.target.value)}
      placeholder={placeholder}
      spellCheck='false'
    />
  )
}