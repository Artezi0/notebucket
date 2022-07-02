import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { UserAuth } from '../context/AuthContext'

export default function View() {
  const { getActive } = UserAuth()

  return (
    <ReactMarkdown 
      className='view'
      children={getActive().body} 
      remarkPlugins={[[remarkGfm, {singleTilde: false}], remarkMath, remarkRehype]}
      rehypePlugins={[rehypeKatex, rehypeRaw]} 
      linkTarget='_blank'
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={gruvboxLight}
              wrapLongLines
              customStyle={{
                background: 'none',
                padding: '0',
              }}
              language={match[1]}
              PreTag='div'
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    />
  )
} 