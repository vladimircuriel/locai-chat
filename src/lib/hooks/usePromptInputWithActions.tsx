import { saveConversation } from '@lib/db/conversation.db'
import type { Conversation } from '@lib/models/conversation.model'
import { useCallback, useState } from 'react'

type UsePromptInputWithActionsProps = Readonly<{
  currentConversation: Conversation | undefined
  handleSetCurrentConversation: (conversationId: string) => void
  handleSendMessageToCurrentConversation: (message: string, conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
}>

export default function usePromptInputWithActions({
  currentConversation,
  handleSetCurrentConversation,
  handleSendMessageToCurrentConversation,
  handleAddConversation,
}: UsePromptInputWithActionsProps) {
  const [prompt, setPrompt] = useState<string>('')

  const handleMessageSend = useCallback(async () => {
    if (!prompt) return
    let conversationId = currentConversation?.id

    if (!conversationId) {
      const conversation: Conversation = {
        id: crypto.randomUUID(),
        title: prompt,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const savedConversation = await saveConversation(conversation)
      conversationId = savedConversation.id

      handleAddConversation(conversation)
      handleSetCurrentConversation(conversationId)
    }

    handleSendMessageToCurrentConversation(prompt, conversationId)
    setPrompt('')
  }, [
    prompt,
    currentConversation,
    handleAddConversation,
    handleSetCurrentConversation,
    handleSendMessageToCurrentConversation,
  ])

  return { prompt, setPrompt, handleMessageSend }
}
