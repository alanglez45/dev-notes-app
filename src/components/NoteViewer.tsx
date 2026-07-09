import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../hooks/useTheme'

interface NoteViewerProps {
  content: string
  dark?: boolean
}

function getLang(className?: string): string {
  if (!className) return ''
  const match = className.match(/language-(\w+)/)
  return match ? match[1] : ''
}

function LinkRenderer({
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  const isExternal = href?.startsWith('http')
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

function ImageRenderer({
  src,
  alt,
  ...props
}: React.ComponentPropsWithoutRef<'img'>) {
  const [zoom, setZoom] = useState(false)

  if (!src) return null

  const isExternal = src.startsWith('http')
  const cleanSrc = src.replace(/^(\.\.\/)+/, '')
  const imgSrc = isExternal ? src : `${import.meta.env.BASE_URL}notes/${cleanSrc}`

  return (
    <>
      <img
        src={imgSrc}
        alt={alt || ''}
        className={`md-image ${zoom ? 'zoomed' : ''}`}
        onClick={() => setZoom(!zoom)}
        loading="lazy"
        {...props}
      />
      {zoom && <div className="zoom-overlay" onClick={() => setZoom(false)} />}
    </>
  )
}

function CodeRenderer({ dark, ...props }: React.ComponentPropsWithoutRef<'code'> & { dark: boolean }) {
  const { className, children, ...rest } = props
  const content = String(children).replace(/\n$/, '')
  const lang = getLang(className)
  const isInline = !lang && !content.includes('\n')
  const [copied, setCopied] = useState(false)

  if (isInline) {
    return (
      <code className="inline-code" {...rest}>
        {children}
      </code>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { }
  }

  return (
    <div className="code-block-wrap">
      <div className="code-block-header">
        <span className="code-lang">{lang || 'text'}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        style={dark ? oneDark : oneLight}
        language={lang || 'text'}
        customStyle={{ margin: 0, borderRadius: '0 0 8px 8px', fontSize: '1.4rem', lineHeight: 1.5 }}
        PreTag="div"
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}

export function NoteViewer({ content, dark: forceDark }: NoteViewerProps) {
  const { dark: themeDark } = useTheme()
  const dark = forceDark ?? themeDark
  const components = useMemo<Components>(() => ({
    a: LinkRenderer,
    img: ImageRenderer,
    code: (props) => <CodeRenderer dark={dark} {...props} />,
  }), [dark])

  return (
    <div className="note-viewer">
      <Markdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  )
}
