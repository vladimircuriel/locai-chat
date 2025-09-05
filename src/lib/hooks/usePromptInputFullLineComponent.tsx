import { saveConversation } from '@lib/db/conversation.db'
import { saveMessage } from '@lib/db/message.db'
import type { Conversation } from '@lib/models/conversation.model'
import type { Message } from '@lib/models/message.model'
import React, { useCallback, useState } from 'react'

export type usePromptInputProps = Readonly<{
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  handleMessageSend: () => void
}>

export default function usePromptInputFullLineComponent({
  prompt,
  handleMessageSend,
}: usePromptInputProps) {
  const [assets, setAssets] = useState<string[]>([])

  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(async () => {
    if (!prompt) return

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: prompt.slice(0, 20),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const savedConversation = await saveConversation(conversation)

    const message: Message = {
      id: crypto.randomUUID(),
      conversationId: savedConversation.id,
      text: prompt,
      user: 'user',
      favorite: false,
      timestamp: new Date(),
      status: 'sent',
    }

    await saveMessage(message)

    handleMessageSend()

    inputRef?.current?.focus()
  }, [prompt, handleMessageSend])

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
        handleMessageSend()
      }
    },
    [handleSubmit, handleMessageSend],
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
