import TextareaAutosize from 'react-textarea-autosize';

import { UserAuth } from '../context/AuthContext';

import '../styles/app.scss'

export default function Edit() {
  const { onUpdate, getActive } = UserAuth()
  const placeholder = `Start writting... \nDon't know how write markdown?`

  function onEdit(field, value) {
    onUpdate({
      ...getActive(),
      [field]: value,
      lastModified: Date.now()
    })
  }

  return (
    <TextareaAutosize 
      className='input'
      value={getActive().body}
      onChange={(e) => onEdit('body', e.target.value)}
      placeholder={placeholder}
      spellCheck='false'
    />
  )
}