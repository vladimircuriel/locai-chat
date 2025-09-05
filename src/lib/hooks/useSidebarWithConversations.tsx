import { useDisclosure } from '@heroui/use-disclosure'

export default function useSidebarWithConversations() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return {
    isOpen,
    onOpen,
    onOpenChange,
  }
}
