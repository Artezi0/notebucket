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
    // XML Style 
    {
      tag: t.quote,
      color: '#b16286'
    },
    {
      tag: t.monospace,
      background: '#F7F6F3',
    },
    {
      tag: t.strikethrough,
      textDecoration: 'line-through',
    },
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
      tag: t.link,
      color: '#98971a'
    },
    {
      tag: t.url,
      color: '#458588',
    },
     {
      tag: t.labelName,
      color: '#458588'
    },
    { 
      tag: t.heading1,
      fontSize: '32px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    { 
      tag: t.heading2, 
      fontSize: '24px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    { 
      tag: t.heading3, 
      fontSize: '18.72px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    { 
      tag: t.heading4, 
      fontSize: '16px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    { 
      tag: t.heading5, 
      fontSize: '13.28px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    { 
      tag: t.heading6, 
      fontSize: '10.72px',
      fontWeight: '600',
      color: '#458588',
      lineHeight: '2em',
    },
    {
      tag: t.contentSeparator,
      color: '#CCC0B3'
    },
    {
      tag: t.inserted,
      color: '#0000ff'
    },

    // Global style
    {
      tag: t.comment,
      color: '#CCC0B3',
      fontStyle: 'italic'
    },
    {
      tag: t.name,
      color: '#ff9d5c'
    },
    {
      tag: t.propertyName,
      color: '#e64a1f'
    },
    {
      tag: t.variableName,
      color: '#458588'
    },
    {
      tag: t.number,
      color: '#b16286'
    },
    {
      tag: t.null,
      color: '#b16286'
    },
    {
      tag: t.operator,
      color: '#689d6a'
    },
    {
      tag: t.bool,
      color: '#b16286'
    },
    {
      tag: t.brace,
      color: '#CCC0B3'
    },
    {
      tag: t.bracket,
      color: '#CCC0B3'
    },
    {
      tag: t.string,
      color: '#98971a'
    },
    {
      tag: t.keyword,
      color: '#e64a1f'
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