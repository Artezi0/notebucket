import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import '../../styles/app.scss'

export default function({ title, cover, body }) {
  document.title = title
  
  return (
    <main className='view'>
      {cover.isCover && 
        <div 
          className='view__cover' 
          style={{ background: cover.value }}> 
          <img src={cover.value} alt=''/>
        </div>
      }

      <div className='view__info'>
        <h1 className='view__info-title'>{title}</h1>
      </div>
      
      <ReactMarkdown 
        className='view__body'
        children={body} 
        remarkPlugins={[[remarkGfm, {singleTilde: false}], remarkMath, remarkRehype]}
        rehypePlugins={[rehypeKatex, rehypeRaw]} 
        linkTarget='_blank'
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={gruvboxDark}
              wrapLongLines
              customStyle={{
                padding: '.5em .5em .5em 1em',
                borderRadius: '4px'
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
    </main>
  )
}