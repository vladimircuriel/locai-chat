import { addToast } from '@heroui/react'
import { useClipboard } from '@heroui/use-clipboard'
import { deleteConversation, transformIntoJSONWithMessages } from '@lib/db/conversation.db'
import { deleteMessagesByConversation } from '@lib/db/message.db'
import { useCallback } from 'react'

type UseChatOptionsDropDownProps = Readonly<{
  conversationId: string
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
}>

export default function useChatOptionsDropDown({
  conversationId,
  setAmountOfConversations,
}: UseChatOptionsDropDownProps) {
  const { copy } = useClipboard()

  const handleShare = useCallback(async () => {
    const result = await transformIntoJSONWithMessages(conversationId)

    if (result && typeof result === 'object' && 'json' in result && 'conversation' in result) {
      copy(result.json)

      addToast({
        title: `Conversation '${result.conversation.title}' copied to clipboard`,
        description: 'The conversation has been copied to your clipboard in JSON format.',
        color: 'success',
        severity: 'success',
      })
    }
  }, [conversationId, copy])

  return { handleShare }
}
