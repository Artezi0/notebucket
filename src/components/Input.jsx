import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import '../styles/app.scss'

export default function Input({ active, onUpdate }) {
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
      onChange={(value) => onEdit('body', value)}
      extensions={[
        markdown({ 
          base: markdownLanguage, 
          codeLanguages: languages 
        })
      ]} 
    />
  )
}