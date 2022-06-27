import TextareaAutosize from 'react-textarea-autosize';

import { UserAuth } from '../context/AuthContext';

import '../styles/app.scss'

export default function Edit() {
  const { getActive } = UserAuth()

  const placeholder = `Start writting... \nDon't know how write markdown?`

  return (
    <TextareaAutosize 
      className='input'
      value={getActive().body}
      placeholder={placeholder}
      spellCheck='false'
    />
  )
}