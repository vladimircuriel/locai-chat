import { useDisclosure } from '@heroui/use-disclosure'
import { getAllConversations } from '@lib/db/conversation.db'
import type { Conversation } from '@lib/models/conversation.model'
import { useEffect, useState } from 'react'

export default function useSidebarWithConversations() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations = await getAllConversations()
      setConversations(fetchedConversations)
    }

    fetchConversations()
  }, [])

  return {
    conversations,
    setConversations,
    isOpen,
    onOpen,
    onOpenChange,
  }
}
