import React from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import ReactMarkdown from "react-markdown"

export default function View({ active }) {
  return (
    <ReactMarkdown 
      className='view'
      children={active.body} 
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]} 
    />
  )
} 