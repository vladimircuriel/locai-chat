import type { PromptSuggestion } from '@lib/constants/suggestions.contants'
import { useState } from 'react'

type UsePromptInputFullLineWithBottomActionsProps = Readonly<{
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
}>

export default function usePromptInputFullLineWithBottomActions({
  setAmountOfConversations,
}: UsePromptInputFullLineWithBottomActionsProps) {
  const [prompt, setPrompt] = useState('')

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setPrompt(`Help me ${suggestion.label.toLowerCase()}`)
  }

  const handleMessageSend = () => {
    setAmountOfConversations((prev: number) => prev + 1)
    setPrompt('')
  }

  return { prompt, setPrompt, handleSuggestionSelect, handleMessageSend }
}
