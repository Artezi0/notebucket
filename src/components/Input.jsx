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
    <CodeMirror 
      className='input__input'
      value={active.body}
      onChange={(value) => {
        onUpdate({
          ...active,
          body: value,
          lastModified: Date.now()
        })
      }}
      extensions={[
        markdown({ 
          base: markdownLanguage, 
          codeLanguages: languages 
        })
      ]} 
    />
  )
}