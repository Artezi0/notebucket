import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { createTheme } from '@uiw/codemirror-themes'
import { languages } from '@codemirror/language-data'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { tags as t } from '@lezer/highlight'

import { UserAuth } from '../../context/AuthContext'

import '../../styles/app.scss'

const gray= '#CCC0B3',
      red = '#fb4934',
      green = '#b8bb26',
      yellow = '#fabd2f',
      blue = '#83a598',
      purple = '#d3869b',
      aqua = '#8ec07c',
      orange = '#fe8019'

const theme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
  },
  styles: [
    { tag: t.keyword, color: red },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: aqua },
    { tag: [t.variableName], color: blue },
    { tag: [t.function(t.variableName)], color: green, fontStyle: 'bold' },
    { tag: [t.labelName], color: gray },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: purple},
    { tag: [t.definition(t.name), t.separator], color: gray },
    { tag: [t.brace], color: gray },
    { tag: [t.annotation], color: red },
    { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: purple },
    { tag: [t.typeName, t.className], color: yellow },
    { tag: [t.operator, t.operatorKeyword], color: aqua },
    { tag: [t.tagName], color: aqua, fontStyle: 'bold' },
    { tag: [t.squareBracket], color: orange },
    { tag: [t.angleBracket], color: blue },
    { tag: [t.attributeName], color: aqua },
    { tag: [t.regexp], color: aqua },
    { tag: [t.quote], color: purple },
    { tag: [t.string], color: green },
    { tag: t.link, color: orange,
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
      cursor: 'pointer'
    },
    { tag: [t.url, t.escape, t.special(t.string)], color: green},
    { tag: [t.meta], color: yellow },
    { tag: [t.comment], color: gray, fontStyle: 'italic' },
    { tag: t.strong, fontWeight: 'bold', color: orange },
    { tag: t.emphasis, fontStyle: 'italic', color: yellow },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.heading1, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '32px', color: aqua },
    { tag: t.heading2, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '24px', color: aqua },
    { tag: t.heading3, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '18.72px', color: aqua },
    { tag: t.heading4, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '16px', color: aqua },
    { tag: t.heading5, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '13.28px', color: aqua },
    { tag: t.heading6, lineHeight: '1.5em', fontWeight: 'bold', fontSize: '10.72px', color: aqua },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: purple },
    { tag: [t.processingInstruction, t.inserted], color: blue },
    { tag: [t.contentSeparator], color: gray },
    { tag: t.invalid, color: orange, borderBottom: `1px dotted ${red}` }
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