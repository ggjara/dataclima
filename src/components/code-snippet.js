import React, { useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

const md = new MarkdownIt({
  html: true,
  linkify: false,
})

const CodeSnippet = (code) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  console.log('code: ', code.code)
  return <div dangerouslySetInnerHTML={{ __html: md.render(code.code) }} />
}

export default CodeSnippet
