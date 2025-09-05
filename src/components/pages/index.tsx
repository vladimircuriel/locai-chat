import MessagingChatMessage from '@components/card/MessageCard'
import PromptInputFullLineWithBottomActions from '@components/inputs/PromptInputFullLineWithBottomActions'
import PromptInputWithActions from '@components/inputs/PromptInputWithActions'
import SidebarWithConversations from '@components/navigation/sidebar/SidebarWithConversations'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { getAmountOfConversations, getConversationById } from '@lib/db/conversation.db'
import { getMessagesByConversation } from '@lib/db/message.db'
import type { Conversation } from '@lib/models/conversation.model'
import type { Message } from '@lib/models/message.model'
import { useEffect, useState } from 'react'

export function useIndexPage() {
  const [amountOfConversations, setAmountOfConversations] = useState<number>(0)
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(
    undefined,
  )
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])

  const handleSetCurrentConversation = async (conversationId: string) => {
    if (currentConversation?.id === conversationId) return

    const conversation = await getConversationById(conversationId)
    setCurrentConversation(conversation)
  }

  useEffect(() => {
    async function fetchConversationMessages() {
      if (!currentConversation) {
        setConversationMessages([])
        return
      }

      const messages = await getMessagesByConversation(currentConversation.id)
      setConversationMessages(messages)
    }

    fetchConversationMessages()
  }, [currentConversation])

  useEffect(() => {
    async function fetchAmountOfConversations() {
      const amount = await getAmountOfConversations()
      setAmountOfConversations(amount)
    }
    fetchAmountOfConversations()
  }, [])

  return {
    amountOfConversations,
    setAmountOfConversations,
    handleSetCurrentConversation,
    currentConversation,
    conversationMessages,
  }
}

export default function Index() {
  const {
    amountOfConversations,
    setAmountOfConversations,
    handleSetCurrentConversation,
    currentConversation,
    conversationMessages,
  } = useIndexPage()

  return (
    <>
      {amountOfConversations === 0 && (
        <div className="flex h-screen max-h-[calc(100vh-140px)] w-full">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-xl flex-col items-center gap-8">
              <h1 className="text-default-foreground text-3xl leading-9 font-bold">LocAI Chat</h1>
              <div className="flex w-full flex-col gap-4">
                <PromptInputFullLineWithBottomActions
                  setAmountOfConversations={setAmountOfConversations}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {amountOfConversations > 0 && (
        <div className="h-dvh w-full max-w-full">
          <SidebarWithConversations
            setAmountOfConversations={setAmountOfConversations}
            handleSetCurrentConversation={handleSetCurrentConversation}
            classNames={{
              header: 'min-h-[40px] h-[40px] py-[12px] justify-center overflow-hidden',
            }}
          >
            <div className="relative flex h-full flex-col px-4">
              {!currentConversation && (
                <div className="flex h-full flex-col items-center justify-center gap-10">
                  <div className="bg-foreground flex rounded-full">ACME IA</div>
                </div>
              )}
              {conversationMessages.length > 0 && (
                <ScrollShadow className="flex h-full max-h-[75vh] flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 pb-8">
                  {conversationMessages.map((conversationMessage) => (
                    <MessagingChatMessage key={conversationMessage.id} {...conversationMessage} />
                  ))}
                </ScrollShadow>
              )}
              <div className="mt-auto flex max-w-full flex-col gap-2">
                <PromptInputWithActions />
                <p className="text-small text-default-500 px-2 text-center leading-5 font-medium">
                  LocAI can make mistakes. Check important info.
                </p>
              </div>
            </div>
          </SidebarWithConversations>
        </div>
      )}
    </>
  )
}
