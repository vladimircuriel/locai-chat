import { saveConversation } from '@lib/db/conversation.db'
import type { Conversation } from '@lib/models/conversation.model'
import { useCallback, useState } from 'react'

type UsePromptInputWithActionsProps = Readonly<{
  currentConversation: Conversation | undefined
  handleSetCurrentConversation: (conversationId: string) => void
  handleSendMessageToCurrentConversation: (message: string) => void
}>

export default function usePromptInputWithActions({
  currentConversation,
  handleSetCurrentConversation,
  handleSendMessageToCurrentConversation,
}: UsePromptInputWithActionsProps) {
  const [prompt, setPrompt] = useState<string>('')

  const handleMessageSend = useCallback(async () => {
    if (!prompt) return
    let conversationId = currentConversation?.id

    if (!conversationId) {
      const conversation: Conversation = {
        id: crypto.randomUUID(),
        title: prompt.slice(0, 40),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const savedConversation = await saveConversation(conversation)
      conversationId = savedConversation.id

      handleSetCurrentConversation(conversationId)
    }

    handleSendMessageToCurrentConversation(prompt)
    setPrompt('')
  }, [
    prompt,
    currentConversation,
    handleSetCurrentConversation,
    handleSendMessageToCurrentConversation,
  ])

  return { prompt, setPrompt, handleMessageSend }
}
