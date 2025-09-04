import type { PromptSuggestion } from '@lib/constants/suggestions.contants'
import { useState } from 'react'

export default function usePromptInputFullLineWithBottomActions() {
  const [prompt, setPrompt] = useState('')

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    setPrompt(`Help me ${suggestion.label.toLowerCase()}`)
  }

  return { prompt, setPrompt, handleSuggestionSelect }
}
