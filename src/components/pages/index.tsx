import MessagingChatMessage from '@components/card/MessageCard'
import PromptInputFullLineWithBottomActions from '@components/inputs/PromptInputFullLineWithBottomActions'
import PromptInputWithActions from '@components/inputs/PromptInputWithActions'
import SidebarWithConversations from '@components/navigation/sidebar/SidebarWithConversations'
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
    downloadProgress,
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
        <div className="h-dvh w-full max-w-full">
          <SidebarWithConversations
            setAmountOfConversations={setAmountOfConversations}
            handleSetCurrentConversation={handleSetCurrentConversation}
            handleCreateNewConversation={handleCreateNewConversation}
            handleDeleteConversation={handleDeleteConversation}
            conversations={conversations}
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
                <ScrollShadow className="flex h-full max-h-[75vh] flex-col gap-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 pb-8">
                  {conversationMessages.map((conversationMessage) => (
                    <MessagingChatMessage key={conversationMessage.id} {...conversationMessage} />
                  ))}
                </ScrollShadow>
              )}
              <div className="mt-auto flex max-w-full flex-col gap-2">
                {engineState?.isDownloading && (
                  <div className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-default-200/70 px-4 py-2 text-default-600 shadow-md">
                    <span className="text-small font-medium leading-5">
                      Downloading model... {downloadProgress}
                    </span>
                  </div>
                )}
                <PromptInputWithActions
                  currentConversation={currentConversation}
                  handleSetCurrentConversation={handleSetCurrentConversation}
                  handleSendMessageToCurrentConversation={handleUserSendMessage}
                  engineState={engineState}
                />
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
