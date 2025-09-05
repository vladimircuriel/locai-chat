import { addToast } from '@heroui/react'
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
  const handleShare = useCallback(async () => {
    const result = await transformIntoJSONWithMessages(conversationId)

    if (result && typeof result === 'object' && 'json' in result && 'conversation' in result) {
      await navigator.clipboard.writeText(result.json)

      addToast({
        title: `Conversation '${result.conversation.title}' copied to clipboard`,
        description: 'The conversation has been copied to your clipboard in JSON format.',
        color: 'success',
        severity: 'success',
      })
    }
  }, [conversationId])

  const handleDelete = useCallback(async () => {
    setAmountOfConversations((prev) => Math.max(prev - 1, 0))

    await deleteMessagesByConversation(conversationId)
    const deletedConversation = await deleteConversation(conversationId)

    addToast({
      title: 'Conversation deleted',
      description: `The conversation '${deletedConversation?.title}' has been deleted successfully.`,
      color: 'danger',
      severity: 'danger',
    })
  }, [conversationId, setAmountOfConversations])

  return { handleShare, handleDelete }
}
