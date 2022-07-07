import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { createTheme } from '@uiw/codemirror-themes'
import { languages } from '@codemirror/language-data'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { tags as t } from '@lezer/highlight'

import { UserAuth } from '../context/AuthContext'

import '../styles/app.scss'

const theme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
  },
  styles: [
    {
      tag: t.emphasis,
      color: '#ff9d5c',
      fontStyle: 'italic'
    },
    {
      tag: t.strong,
      color: '#e64a1f',
      fontWeight: '600'
    },
    {
      tag: t.strikethrough,
      textDecoration: 'line-through',
      color: '#CCC0B3'
    },
    {
      tag: t.link,
      color: '#e64a1f'
    },
    {
      tag: t.url,
      color: '#98971a',
    },
    { 
      tag: t.heading1, 
      fontSize: '32px',
      fontWeight: '600',
      color: '#458588',
    },
    { 
      tag: t.heading2, 
      fontSize: '24px',
      fontWeight: '600',
      color: '#458588',
    },
    { 
      tag: t.heading3, 
      fontSize: '18.72px',
      fontWeight: '600',
      color: '#458588',
    },
    { 
      tag: t.heading4, 
      fontSize: '16px',
      fontWeight: '600',
      color: '#458588'
    },
    { 
      tag: t.heading5, 
      fontSize: '13.28px',
      fontWeight: '600',
      color: '#458588' 
    },
    { 
      tag: t.heading6, 
      fontSize: '10.72px',
      fontWeight: '600',
      color: '#458588'
    },
    {
      tag: t.variableName,
      color: '#458588'
    },
    {
      tag: t.keyword,
      color: '#e64a1f'
    },
    {
      tag: t.number,
      color: '#b16286'
    },
    {
      tag: t.operator,
      color: '#689d6a'
    },
    {
      tag: t.comment,
      color: '#CCC0B3'
    },
    {
      tag: t.meta,
      color: '#CCC0B3'
    },
  ],
})

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
      theme={theme}
      placeholder='Start writting...'
      value={getActive().body} 
      onChange={(value) => onEdit('body', value)}
      extensions={[
        markdown({
          base: markdownLanguage,
          codeLanguages: languages
        }),
        EditorView.lineWrapping
      ]}
    />
  )
}