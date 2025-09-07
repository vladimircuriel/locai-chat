import ImagoType from '@components/brand/ImagoType'
import MessagingChatMessage from '@components/card/MessageCard'
import PromptInputFullLineWithBottomActions from '@components/inputs/PromptInputFullLineWithBottomActions'
import PromptInputWithActions from '@components/inputs/PromptInputWithActions'
import MobileModal from '@components/modal/MobileModal'
import NoWebGPUModal from '@components/modal/NoWebGPUModal'
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
    laboratoryModalProps,
    currentConversation,
    conversationMessages,
    engineState,
    scrollRef,
    model,
    setModel,
    downloadProgress,
    webGPUSupported,
    isMobile,
  } = useIndexPage()

  if (!webGPUSupported) {
    return <NoWebGPUModal isOpen={!webGPUSupported} />
  }

  if (isMobile) {
    return (
      <div className="w-full max-w-full h-dvh overflow-clip">
        <div className="relative flex flex-col h-full px-4">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <ImagoType width={180} height={46} fill="none" />
            <MobileModal isMobile={isMobile} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {amountOfConversations === 0 && (
        <div className="flex h-screen max-h-[calc(100vh-140px)] w-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center w-full max-w-xl gap-8">
              <h1 className="text-3xl font-bold leading-9 sr-only text-default-foreground">
                LocAI Chat
              </h1>
              <ImagoType width={180} height={46} fill="none" />
              <div className="flex flex-col max-w-full gap-2 overflow-scroll">
                {engineState?.isDownloading && (
                  <Chip color="success" variant="dot">
                    <span className="block truncate">{downloadProgress.slice(0, 140)}...</span>
                  </Chip>
                )}
              </div>
              <div className="flex flex-col w-full gap-4">
                <PromptInputFullLineWithBottomActions
                  setAmountOfConversations={setAmountOfConversations}
                  amountOfConversations={amountOfConversations}
                  handleSetCurrentConversation={handleSetCurrentConversation}
                  handleUserSendMessage={handleUserSendMessage}
                  handleAddConversation={handleAddConversation}
                  currentModel={engineState}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {amountOfConversations > 0 && (
        <div className="w-full max-w-full h-dvh overflow-clip">
          <SidebarWithConversations
            setAmountOfConversations={setAmountOfConversations}
            handleSetCurrentConversation={handleSetCurrentConversation}
            handleCreateNewConversation={handleCreateNewConversation}
            handleDeleteConversation={handleDeleteConversation}
            laboratoryModalProps={laboratoryModalProps}
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
                  <ImagoType width={180} height={46} fill="none" />
                </div>
              )}
              {conversationMessages.length > 0 && (
                <ScrollShadow
                  ref={scrollRef}
                  className="flex h-full max-h-[75vh] flex-col gap-2.5 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 pb-8"
                >
                  {conversationMessages.map((conversationMessage) => (
                    <MessagingChatMessage key={conversationMessage.id} {...conversationMessage} />
                  ))}
                </ScrollShadow>
              )}
              <div className="flex flex-col max-w-full gap-2 overflow-scroll">
                {engineState?.isDownloading && (
                  <Chip color="success" variant="dot" className="mb-2">
                    <span className="block truncate">{downloadProgress.slice(0, 140)}...</span>
                  </Chip>
                )}
              </div>
              <div className="flex flex-col max-w-full mt-4">
                <PromptInputWithActions
                  currentConversation={currentConversation}
                  handleSetCurrentConversation={handleSetCurrentConversation}
                  handleSendMessageToCurrentConversation={handleUserSendMessage}
                  handleAddConversation={handleAddConversation}
                  engineState={engineState}
                />
              </div>
            </div>
          </SidebarWithConversations>
        </div>
      )}
    </>
  )
}
