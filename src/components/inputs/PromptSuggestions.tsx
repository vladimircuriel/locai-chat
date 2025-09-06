import { Button } from '@heroui/button'
import { Icon } from '@iconify/react'
import type { PromptSuggestion } from '@lib/constants/suggestions.constants'

interface PromptSuggestionsProps {
  onSelect?: (suggestion: PromptSuggestion) => void
  suggestions: PromptSuggestion[]
}

export default function PromptSuggestions({ onSelect, suggestions }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          className="border-default-200 text-default-foreground hover:border-default-400 hover:text-foreground data-[hover=true]:border-default-400 data-[hover=true]:text-foreground h-8 gap-2 rounded-full border-1 px-3 transition-colors duration-150!"
          startContent={<Icon className="text-default-500" icon={suggestion.icon} width={18} />}
          variant="light"
          onPress={() => onSelect?.(suggestion)}
        >
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
