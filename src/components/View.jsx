import React from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import ReactMarkdown from "react-markdown"

export default function View({ active }) {
  const dummy = `
  # This is H1
  ## This is H2
  
  *This is Itallic*
  __This is Bold__
  
  [ALT]('www.thisisalink.com')
  
  This is a paragraph
  `

  return (
    <ReactMarkdown 
      className='input__view'
      children={dummy} 
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]} 
    />
  )
} 