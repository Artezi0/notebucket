import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import '../../styles/app.scss'
import { Link } from 'react-router-dom'

export default function({ title, cover, body, lastModified }) {
  document.title = title
  
  function handleDateStr() {
    return new Date(lastModified).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric', 
    })
  }

  return (
    <main className='viewNote'>
      <Link to='/notes' className='viewNote__btn'>
        <svg width='18' height='18' viewBox='0 0 152 152' fill='none' xmlns='https://www.w3.org/2000/svg'>            <rect x='1' y='1' width='150' height='150' rx='20' fill='black'/>
          <path d='M131.655 55.4545L118.615 134H104.271L78.3835 84.5639H77.7699L69.5241 134H52.9176L65.9574 55.4545H80.5312L106.304 104.852H106.956L115.125 55.4545H131.655Z' fill='#BDBDBD'/>
          <path d='M114.655 32.4545L101.615 111H87.2713L61.3835 61.5639H60.7699L52.5241 111H35.9176L48.9574 32.4545H63.5312L89.304 81.8523H89.956L98.125 32.4545H114.655Z' fill='#E1DFE1'/>
          <path d='M96.6548 18.4545L83.6151 97H69.2713L43.3835 47.5639H42.7699L34.5241 97H17.9176L30.9574 18.4545H45.5312L71.304 67.8523H71.956L80.125 18.4545H96.6548Z' fill='#F5F5F5'/>
          <rect x='1' y='1' width='150' height='150' rx='20' stroke='#B1B1B1'/>
        </svg>
        Open Notebucket
      </Link>
      {cover.isCover && 
        <div className='viewNote__cover' style={{ background: cover.value }}> 
          <img src={cover.value} alt=''/>
        </div>
      }
      <div className='viewNote__info'>
        <h1 className='viewNote__info-title'>{title}</h1>
        <p className='viewNote__info-date'>Last modified {handleDateStr()}</p>
      </div>
      <ReactMarkdown 
        className='viewNote__body'
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