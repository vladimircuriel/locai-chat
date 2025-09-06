import type { PromptSuggestion } from '@lib/constants/suggestions.constants'
import { useState } from 'react'

type UsePromptInputFullLineWithBottomActionsProps = Readonly<{
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
  handleUserSendMessage: (message: string, conversationId: string) => void
}>

export default function usePromptInputFullLineWithBottomActions({
  setAmountOfConversations,
  handleSetCurrentConversation,
  handleUserSendMessage,
}: UsePromptInputFullLineWithBottomActionsProps) {
  const [prompt, setPrompt] = useState('')

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setPrompt(`Help me ${suggestion.label.toLowerCase()}`)
  }

  const handleMessageSend = async (conversationId: string) => {
    setAmountOfConversations((prev: number) => prev + 1)
    await handleSetCurrentConversation(conversationId)
    handleUserSendMessage(prompt, conversationId)
    setPrompt('')
  }

  return { prompt, setPrompt, handleSuggestionSelect, handleMessageSend }
}
