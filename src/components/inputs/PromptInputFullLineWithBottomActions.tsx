import SUGGESTIONS from '@lib/constants/suggestions.contants'
import usePromptInputFullLineWithBottomActions from '@lib/hooks/usePromptInputFullLineWithBottomActions'
import PromptInputFullLineComponent from './PromptInputFullLineComponent'
import PromptSuggestions from './PromptSuggestions'

type PromptInputFullLineWithBottomActionsProps = Readonly<{
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  amountOfConversations?: number
}>

export default function PromptInputFullLineWithBottomActions({
  setAmountOfConversations,
}: PromptInputFullLineWithBottomActionsProps) {
  const { prompt, setPrompt, handleSuggestionSelect, handleMessageSend } =
    usePromptInputFullLineWithBottomActions({
      setAmountOfConversations,
    })

  return (
    <div className="flex w-full flex-col gap-4">
      <PromptInputFullLineComponent
        prompt={prompt}
        setPrompt={setPrompt}
        handleMessageSend={handleMessageSend}
      />
      <PromptSuggestions onSelect={handleSuggestionSelect} suggestions={SUGGESTIONS} />
    </div>
  )
}
