import SUGGESTIONS from '@lib/constants/suggestions.contants'
import usePromptInputFullLineWithBottomActions from '@lib/hooks/usePromptInputFullLineWithBottomActions'
import PromptInputFullLineComponent from './PromptInputFullLineComponent'
import PromptSuggestions from './PromptSuggestions'

export default function PromptInputFullLineWithBottomActions() {
  const { prompt, setPrompt, handleSuggestionSelect } = usePromptInputFullLineWithBottomActions()

  return (
    <div className="flex w-full flex-col gap-4">
      <PromptInputFullLineComponent prompt={prompt} setPrompt={setPrompt} />
      <PromptSuggestions onSelect={handleSuggestionSelect} suggestions={SUGGESTIONS} />
    </div>
  )
}
