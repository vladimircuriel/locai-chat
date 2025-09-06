import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Icon } from '@iconify/react'
import useChatOptionsDropDown from '@lib/hooks/useChatOptionsDropDown'

type ChatOptionsDropDownProps = Readonly<{
  conversationId: string
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  handleDeleteConversation: (conversationId: string) => Promise<void>
}>

export default function ChatOptionsDropDown({
  conversationId,
  setAmountOfConversations,
  handleDeleteConversation,
}: ChatOptionsDropDownProps) {
  const { handleShare } = useChatOptionsDropDown({
    setAmountOfConversations,
    conversationId,
  })

  return (
    <Dropdown>
      <DropdownTrigger>
        <Icon
          className="text-default-500 opacity-0 group-hover:opacity-100"
          icon="solar:menu-dots-bold"
          width={24}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" className="py-2" variant="faded">
        <DropdownItem
          key="share"
          className="text-default-600 data-[hover=true]:text-default-900"
          onPress={handleShare}
          startContent={
            <Icon
              className="text-default-600"
              height={20}
              icon="solar:square-share-line-linear"
              width={20}
            />
          }
        >
          Copy JSON
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger-500 data-[hover=true]:text-danger-500"
          color="danger"
          onPress={async () => await handleDeleteConversation(conversationId)}
          startContent={
            <Icon
              className="text-danger-500"
              height={20}
              icon="solar:trash-bin-minimalistic-linear"
              width={20}
            />
          }
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
