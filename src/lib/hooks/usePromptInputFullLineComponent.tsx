import type { PromptInputProps } from '@components/inputs/PromptInputFullLineComponent'
import React, { useCallback, useState } from 'react'

export default function usePromptInputFullLineComponent({ prompt, setPrompt }: PromptInputProps) {
  const [assets, setAssets] = useState<string[]>([])

  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(() => {
    if (!prompt) return

    setPrompt('')
    inputRef?.current?.focus()
  }, [prompt, setPrompt])

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleSubmit()
    },
    [handleSubmit],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()

        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items)

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile()

        if (!blob) continue

        const reader = new FileReader()

        reader.onload = () => {
          const base64data = reader.result as string

          setAssets((prev) => [...prev, base64data])
        }
        reader.readAsDataURL(blob)
      }
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = () => {
          const base64data = reader.result as string

          setAssets((prev) => [...prev, base64data])
        }
        reader.readAsDataURL(file)
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  return {
    assets,
    setAssets,
    inputRef,
    fileInputRef,
    handleKeyDown,
    handlePaste,
    handleFileUpload,
    onSubmit,
  }
}
