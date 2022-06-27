import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import TextareaAutosize from 'react-textarea-autosize'

import { UserAuth } from '../context/AuthContext'

import '../styles/app.scss'

export default function Edit() {
  const { onUpdate, getActive } = UserAuth()

  function onEdit(field, value) {
    onUpdate({
      ...getActive(),
      [field]: value,
      lastModified: Date.now()
    })
  }

  return (
    <CodeMirror 
      className='input'
      value={getActive().body} 
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