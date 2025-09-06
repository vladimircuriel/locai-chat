import { useDisclosure } from '@heroui/use-disclosure'

export default function useSidebarWithConversations() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const IS_FIRST_TIME = localStorage.getItem('isFirstTime') === null

  return {
    isOpen,
    onOpen,
    onOpenChange,
    isFirstTime: IS_FIRST_TIME,
  }
}
