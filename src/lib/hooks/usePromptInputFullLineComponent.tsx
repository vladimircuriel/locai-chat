import { saveConversation } from '@lib/db/conversation.db'
import type { Conversation } from '@lib/models/conversation.model'
import React, { useCallback, useState } from 'react'
import type { Engine } from './useWebLLM'

export type usePromptInputProps = Readonly<{
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  handleMessageSend: (conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
  currentModel: Engine | null
}>

export default function usePromptInputFullLineComponent({
  prompt,
  handleMessageSend,
  handleAddConversation,
  currentModel,
}: usePromptInputProps) {
  const [assets, setAssets] = useState<string[]>([])

  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(async () => {
    if (!prompt) return

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: prompt,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const savedConversation = await saveConversation(conversation)
    handleAddConversation(conversation)
    handleMessageSend(savedConversation.id)

    setAssets([])

    inputRef?.current?.focus()
  }, [prompt, handleMessageSend, handleAddConversation])

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleSubmit()
    },
    [handleSubmit],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (currentModel && (!currentModel.isReady || currentModel.isGenerating)) {
        e.preventDefault()
        return
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()

        handleSubmit()
      }
    },
    [handleSubmit, currentModel],
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
