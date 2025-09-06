import ChatOptionsDropDown from '@components/dropdown/ChatOptionsDropDown'
import InfoModal from '@components/modal/InfoModal'
import ModelModal from '@components/modal/ModelModal'
import { Button } from '@heroui/button'
import { Listbox, ListboxItem, ListboxSection } from '@heroui/listbox'
import { cn } from '@heroui/react'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { Spacer } from '@heroui/spacer'
import { Icon } from '@iconify/react'
import useSidebarWithConversations from '@lib/hooks/useSidebarWithConversations'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Conversation } from '@lib/models/conversation.model'
import type { Model } from '@lib/models/model.model'
import type React from 'react'
import SidebarDrawer from './SidebarDrawer'

type SidebarWithConversationsProps = Readonly<{
  children?: React.ReactNode
  header?: React.ReactNode
  title?: string
  subTitle?: string
  classNames?: Record<string, string>
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
  handleDeleteConversation: (conversationId: string) => Promise<void>
  handleCreateNewConversation: () => void
  conversations: Conversation[]
  currentConversation?: Conversation
  currentModel: Model
  engineState: Engine | null
  setModel: React.Dispatch<React.SetStateAction<Model>>
}>

export default function SidebarWithConversations({
  children,
  title,
  subTitle,
  classNames = {},
  setAmountOfConversations,
  handleSetCurrentConversation,
  handleCreateNewConversation,
  handleDeleteConversation,
  conversations,
  currentConversation,
  currentModel,
  engineState,
  setModel,
}: SidebarWithConversationsProps) {
  const { isOpen, onOpen, onOpenChange, isFirstTime } = useSidebarWithConversations()

  const content = (
    <div className="relative flex flex-col flex-1 h-full p-6 w-72">
      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground">
          {/* <AcmeIcon className="text-background" /> */}
        </div>
        <span className="text-base font-bold leading-6 uppercase text-foreground">Acme AI</span>
      </div>

      <Spacer y={8} />

      <ScrollShadow className="-mr-6 h-full max-h-full pr-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          fullWidth
          className="bg-default-foreground text-default-50 mt-2 mb-6 h-[44px] justify-start gap-3 px-3 py-[10px]"
          onPress={handleCreateNewConversation}
          startContent={
            <Icon className="text-default-50" icon="solar:chat-round-dots-linear" width={24} />
          }
        >
          New Chat
        </Button>

        <Listbox aria-label="Recent chats" variant="flat">
          <ListboxSection
            classNames={{
              base: 'py-0',
              heading: 'py-0 pl-[10px] text-small text-default-400',
            }}
            title="Recent"
          >
            {conversations.map((conversation) => (
              <ListboxItem
                key={conversation.id}
                onPress={() => handleSetCurrentConversation(conversation.id)}
                className={`group text-default-500 text-start h-[44px] px-[12px] py-[10px] ${currentConversation?.id === conversation.id ? 'bg-default-200/70 text-foreground' : 'hover:bg-default-200/50'}`}
                endContent={
                  <ChatOptionsDropDown
                    conversationId={conversation.id}
                    setAmountOfConversations={setAmountOfConversations}
                    handleDeleteConversation={handleDeleteConversation}
                  />
                }
              >
                {conversation.title.slice(0, 30) || 'Untitled conversation'}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </ScrollShadow>

      <Spacer y={8} />

      <div className="flex flex-col mt-auto">
        <InfoModal isFirstTime={isFirstTime} />
        <Button
          className="justify-start text-default-600"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:settings-minimalistic-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Laboratory
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex w-full h-full min-h-192">
      <SidebarDrawer
        className="bg-default-50 h-full flex-none rounded-[14px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex w-full flex-col px-4 sm:max-w-[calc(100%-288px)]">
        <header
          className={cn(
            'rounded-t-medium flex h-16 min-h-16 items-center justify-between gap-2 rounded-none px-4 py-3',
            classNames?.['header'],
          )}
        >
          <Button isIconOnly className="flex sm:hidden" size="sm" variant="light" onPress={onOpen}>
            <Icon
              className="text-default-600"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          {(title || subTitle) && (
            <div className="w-full min-w-[200px] sm:w-auto">
              <div className="font-semibold leading-5 truncate text-small text-start text-foreground">
                {title}
              </div>
              <div className="font-normal leading-5 truncate text-small text-start text-default-500">
                {subTitle}
              </div>
            </div>
          )}

          <ModelModal selectedModel={currentModel} setModel={setModel} engineState={engineState} />
        </header>
        <div className="flex h-full">
          <div className="flex flex-col w-full h-full gap-4 py-3 ">{children}</div>
        </div>
      </div>
    </div>
  )
}
