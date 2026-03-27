import { useEffect, useRef } from 'react'

interface Props {
  html: string
  width: number | string
}

export function PreviewFrame({ html, width }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html
    }
  }, [html])

  return (
    <iframe
      ref={iframeRef}
      style={{ width, height: '100%', border: 'none', transition: 'width 300ms' }}
      sandbox="allow-scripts allow-same-origin"
      title="Preview"
    />
  )
}
