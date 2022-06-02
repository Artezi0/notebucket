import React from 'react'
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

  const dummy = `# This is H1
  ## This is H2
  
  *This is Itallic*
  __This is Bold__
  
  [ALT]('www.thisisalink.com')
  
  This is a paragraph`

  return (
    <CodeMirror 
      className='input__input'
      value={dummy} 
      extensions={[
        markdown({ 
          base: markdownLanguage, 
          codeLanguages: languages 
        })
      ]} 
    />
  )
}