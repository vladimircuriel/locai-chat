import SUGGESTIONS from '@lib/constants/suggestions.constants'
import usePromptInputFullLineWithBottomActions from '@lib/hooks/usePromptInputFullLineWithBottomActions'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Conversation } from '@lib/models/conversation.model'
import PromptInputFullLineComponent from './PromptInputFullLineComponent'
import PromptSuggestions from './PromptSuggestions'

type PromptInputFullLineWithBottomActionsProps = Readonly<{
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  amountOfConversations: number
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
  handleUserSendMessage: (message: string, conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
  currentModel: Engine | null
}>

export default function PromptInputFullLineWithBottomActions({
  setAmountOfConversations,
  handleSetCurrentConversation,
  handleUserSendMessage,
  handleAddConversation,
  currentModel,
}: PromptInputFullLineWithBottomActionsProps) {
  const { prompt, setPrompt, handleSuggestionSelect, handleMessageSend } =
    usePromptInputFullLineWithBottomActions({
      setAmountOfConversations,
      handleSetCurrentConversation,
      handleUserSendMessage,
    })

  return (
    <div className="flex flex-col w-full gap-4">
      <PromptInputFullLineComponent
        prompt={prompt}
        setPrompt={setPrompt}
        handleMessageSend={handleMessageSend}
        handleAddConversation={handleAddConversation}
        currentModel={currentModel}
      />
      <PromptSuggestions onSelect={handleSuggestionSelect} suggestions={SUGGESTIONS} />
    </div>
  )
}
