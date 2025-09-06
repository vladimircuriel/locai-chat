import SUGGESTIONS from '@lib/constants/suggestions.constants'
import usePromptInputFullLineWithBottomActions from '@lib/hooks/usePromptInputFullLineWithBottomActions'
import type { Conversation } from '@lib/models/conversation.model'
import PromptInputFullLineComponent from './PromptInputFullLineComponent'
import PromptSuggestions from './PromptSuggestions'

type PromptInputFullLineWithBottomActionsProps = Readonly<{
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  amountOfConversations: number
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
  handleUserSendMessage: (message: string, conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
}>

export default function PromptInputFullLineWithBottomActions({
  setAmountOfConversations,
  handleSetCurrentConversation,
  handleUserSendMessage,
  handleAddConversation,
}: PromptInputFullLineWithBottomActionsProps) {
  const { prompt, setPrompt, handleSuggestionSelect, handleMessageSend } =
    usePromptInputFullLineWithBottomActions({
      setAmountOfConversations,
      handleSetCurrentConversation,
      handleUserSendMessage,
    })

  return (
    <div className="flex w-full flex-col gap-4">
      <PromptInputFullLineComponent
        prompt={prompt}
        setPrompt={setPrompt}
        handleMessageSend={handleMessageSend}
        handleAddConversation={handleAddConversation}
      />
      <PromptSuggestions onSelect={handleSuggestionSelect} suggestions={SUGGESTIONS} />
    </div>
  )
}
