import MessagingChatMessage from '@components/card/MessageCard'
import PromptInputFullLineWithBottomActions from '@components/inputs/PromptInputFullLineWithBottomActions'
import PromptInputWithActions from '@components/inputs/PromptInputWithActions'
import SidebarWithConversations from '@components/navigation/sidebar/SidebarWithConversations'
import { Chip } from '@heroui/chip'
import { ScrollShadow } from '@heroui/scroll-shadow'
import useIndexPage from '@lib/hooks/useIndexPage'

export default function Index() {
  const {
    amountOfConversations,
    conversations,
    setAmountOfConversations,
    handleSetCurrentConversation,
    handleCreateNewConversation,
    handleDeleteConversation,
    handleUserSendMessage,
    handleAddConversation,
    currentConversation,
    conversationMessages,
    engineState,
    model,
    setModel,
    downloadProgress,
  } = useIndexPage()

  return (
    <>
      {amountOfConversations === 0 && (
        <div className="flex h-screen max-h-[calc(100vh-140px)] w-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center w-full max-w-xl gap-8">
              <h1 className="text-3xl font-bold leading-9 text-default-foreground">LocAI Chat</h1>
              <div className="flex flex-col w-full gap-4">
                <PromptInputFullLineWithBottomActions
                  setAmountOfConversations={setAmountOfConversations}
                  amountOfConversations={amountOfConversations}
                  handleSetCurrentConversation={handleSetCurrentConversation}
                  handleUserSendMessage={handleUserSendMessage}
                  handleAddConversation={handleAddConversation}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {amountOfConversations > 0 && (
        <div className="w-full max-w-full h-dvh">
          <SidebarWithConversations
            setAmountOfConversations={setAmountOfConversations}
            handleSetCurrentConversation={handleSetCurrentConversation}
            handleCreateNewConversation={handleCreateNewConversation}
            handleDeleteConversation={handleDeleteConversation}
            currentConversation={currentConversation}
            currentModel={model}
            setModel={setModel}
            conversations={conversations}
            engineState={engineState}
            title={currentConversation?.title || 'New Conversation'}
            classNames={{
              header: 'min-h-[40px] h-[40px] py-[12px] overflow-hidden',
            }}
          >
            <div className="relative flex flex-col h-full px-4">
              {!currentConversation && (
                <div className="flex flex-col items-center justify-center h-full gap-10">
                  <div className="flex rounded-full bg-foreground">ACME IA</div>
                </div>
              )}
              {conversationMessages.length > 0 && (
                <ScrollShadow className="flex h-full max-h-[75vh] flex-col gap-2.5 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 pb-8">
                  {conversationMessages.map((conversationMessage) => (
                    <MessagingChatMessage key={conversationMessage.id} {...conversationMessage} />
                  ))}
                </ScrollShadow>
              )}
              <div className="flex flex-col max-w-full gap-2 mt-auto">
                {engineState?.isDownloading && (
                  <Chip color="success" variant="dot" className="mb-2">
                    {downloadProgress.slice(0, 140)}...
                  </Chip>
                )}
                <PromptInputWithActions
                  currentConversation={currentConversation}
                  handleSetCurrentConversation={handleSetCurrentConversation}
                  handleSendMessageToCurrentConversation={handleUserSendMessage}
                  handleAddConversation={handleAddConversation}
                  engineState={engineState}
                />
                <p className="px-2 font-medium leading-5 text-center text-small text-default-500">
                  WebLLM Models can make mistakes. Please verify critical information.
                </p>
              </div>
            </div>
          </SidebarWithConversations>
        </div>
      )}
    </>
  )
}
