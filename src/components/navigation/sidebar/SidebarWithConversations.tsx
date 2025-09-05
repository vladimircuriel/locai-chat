import ChatOptionsDropDown from '@components/dropdown/ChatOptionsDropDown'
import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown'
import { Listbox, ListboxItem, ListboxSection } from '@heroui/listbox'
import { cn } from '@heroui/react'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { Spacer } from '@heroui/spacer'
import { Icon } from '@iconify/react'
import useSidebarWithConversations from '@lib/hooks/useSidebarWithConversations'
import type React from 'react'
import SidebarDrawer from './SidebarDrawer'

export default function SidebarWithConversations({
  children,
  title,
  subTitle,
  classNames = {},
  setAmountOfConversations,
  handleSetCurrentConversation,
}: {
  children?: React.ReactNode
  header?: React.ReactNode
  title?: string
  subTitle?: string
  classNames?: Record<string, string>
  setAmountOfConversations: React.Dispatch<React.SetStateAction<number>>
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
}) {
  const { isOpen, onOpen, onOpenChange, conversations } = useSidebarWithConversations()

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-full">
          {/* <AcmeIcon className="text-background" /> */}
        </div>
        <span className="text-foreground text-base leading-6 font-bold uppercase">Acme AI</span>
      </div>

      <Spacer y={8} />

      <ScrollShadow className="-mr-6 h-full max-h-full pr-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          fullWidth
          className="bg-default-foreground text-default-50 mt-2 mb-6 h-[44px] justify-start gap-3 px-3 py-[10px]"
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
                className="group text-default-500 h-[44px] px-[12px] py-[10px]"
                endContent={
                  <ChatOptionsDropDown
                    conversationId={conversation.id}
                    setAmountOfConversations={setAmountOfConversations}
                  />
                }
              >
                {conversation.title || 'Untitled conversation'}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </ScrollShadow>

      <Spacer y={8} />

      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="text-default-600 justify-start"
          startContent={
            <Icon className="text-default-600" icon="solar:info-circle-line-duotone" width={24} />
          }
          variant="light"
        >
          About
        </Button>

        <Button
          className="text-default-600 justify-start"
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
    <div className="flex h-full min-h-192 w-full">
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
            'rounded-t-medium   flex h-16 min-h-16 items-center justify-between gap-2 rounded-none px-4 py-3',
            classNames?.['header'],
          )}
        >
          <Button isIconOnly className="flex sm:hidden" size="sm" variant="light" onPress={onOpen}>
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          {(title || subTitle) && (
            <div className="w-full min-w-[120px] sm:w-auto">
              <div className="text-small text-foreground truncate leading-5 font-semibold">
                {title}
              </div>
              <div className="text-small text-default-500 truncate leading-5 font-normal">
                {subTitle}
              </div>
            </div>
          )}

          <Dropdown className="bg-content1">
            <DropdownTrigger>
              <Button
                disableAnimation
                className="text-default-400 w-full min-w-[120px] items-center data-[hover=true]:bg-[unset]"
                endContent={
                  <Icon
                    className="text-default-400"
                    height={20}
                    icon="solar:alt-arrow-down-linear"
                    width={20}
                  />
                }
                variant="light"
              >
                ACME v4
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="acme model version" className="p-0 pt-2" variant="faded">
              <DropdownSection
                classNames={{
                  heading: 'text-tiny px-[10px]',
                }}
                title="Model"
              >
                <DropdownItem
                  key="acme-v4"
                  className="text-default-500 data-[hover=true]:text-default-500"
                  classNames={{
                    description: 'text-default-500 text-tiny',
                  }}
                  description="Newest and most advanced model"
                  endContent={
                    <Icon
                      className="text-default-foreground"
                      height={24}
                      icon="solar:check-circle-bold"
                      width={24}
                    />
                  }
                  startContent={
                    <Icon
                      className="text-default-400"
                      height={24}
                      icon="solar:star-rings-linear"
                      width={24}
                    />
                  }
                >
                  ACME v4
                </DropdownItem>

                <DropdownItem
                  key="acme-v3.5"
                  className="text-default-500 data-[hover=true]:text-default-500"
                  classNames={{
                    description: 'text-default-500 text-tiny',
                  }}
                  description="Advanced model for complex tasks"
                  startContent={
                    <Icon
                      className="text-default-400"
                      height={24}
                      icon="solar:star-shine-outline"
                      width={24}
                    />
                  }
                >
                  ACME v3.5
                </DropdownItem>

                <DropdownItem
                  key="acme-v3"
                  className="text-default-500 data-[hover=true]:text-default-500"
                  classNames={{
                    description: 'text-default-500 text-tiny',
                  }}
                  description="Great for everyday tasks"
                  startContent={
                    <Icon
                      className="text-default-400"
                      height={24}
                      icon="solar:star-linear"
                      width={24}
                    />
                  }
                >
                  ACME v3
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </header>
        <div className="flex h-full">
          <div className=" flex h-full w-full flex-col gap-4 py-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
