import React, { useState, useEffect } from 'react'
import CodeMirror, { lineNumbers } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import '../styles/app.scss'

export default function Input({ active, onUpdate }) {
  const [ state, setState ] = useState(active.body)

  function onEdit(field, value) {
    onUpdate({
      ...active,
      [field]: value,
      lastModified: Date.now()
    })
  }

  return (
    <>
      <button onClick={() => console.log(state)}>Yield</button>
      <CodeMirror 
        className='input__input'
        value={active.body}
        onChange={(value) => {
          onUpdate({
            ...active,
            body: state,
            lastModified: Date.now()
          })
          setState(value)
        }}
        extensions={[
          markdown({ 
            base: markdownLanguage, 
            codeLanguages: languages 
          })
        ]} 
      />
    </>
  )
}