/** biome-ignore-all lint/suspicious/noArrayIndexKey: it does not affect */

import { Button } from '@heroui/button'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import usePromptInputWithActions from '@lib/hooks/usePromptInputWithActions'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Conversation } from '@lib/models/conversation.model'
import PromptInput from './PromptInput'

type PromptInputWithActionsProps = {
  currentConversation: Conversation | undefined
  handleSetCurrentConversation: (conversationId: string) => Promise<void>
  handleSendMessageToCurrentConversation: (message: string, conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
  engineState: Engine | null
}

export default function PromptInputWithActions({
  currentConversation,
  handleSetCurrentConversation,
  handleSendMessageToCurrentConversation,
  handleAddConversation,
  engineState,
}: PromptInputWithActionsProps) {
  const { prompt, setPrompt, handleMessageSend } = usePromptInputWithActions({
    currentConversation,
    handleSetCurrentConversation,
    handleAddConversation,
    handleSendMessageToCurrentConversation,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <form className="rounded-medium bg-default-100 hover:bg-default-200/70 flex w-full flex-col items-start transition-colors">
        <PromptInput
          classNames={{
            inputWrapper: 'bg-transparent! shadow-none',
            innerWrapper: 'relative',
            input: 'pt-1 pl-2 pb-6 pr-10! text-medium',
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  isIconOnly
                  color={!prompt ? 'default' : 'secondary'}
                  radius="lg"
                  size="sm"
                  variant="solid"
                  onPress={handleMessageSend}
                  isDisabled={!prompt || !engineState?.isReady || engineState?.isGenerating}
                  isLoading={!engineState?.isReady || engineState?.isGenerating}
                >
                  <Icon
                    className={cn(
                      '[&>path]:stroke-[2px]',
                      !prompt ? 'text-default-600' : 'text-primary-foreground',
                    )}
                    icon="solar:arrow-up-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (!prompt && !engineState?.isReady) return

              handleMessageSend()
            }
          }}
          onValueChange={setPrompt}
        />
        {/* <div className="flex w-full items-center justify-between gap-2 overflow-auto px-4 pb-4">
          <div className="flex w-full gap-1 md:gap-3">
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:paperclip-linear" width={18} />
              }
              variant="flat"
            >
              Attach
            </Button>
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:soundwave-linear" width={18} />
              }
              variant="flat"
            >
              Voice Commands
            </Button>
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:notes-linear" width={18} />
              }
              variant="flat"
            >
              Templates
            </Button>
          </div>
          <p className="text-tiny text-default-400 py-1">{prompt.length}/2000</p>
        </div> */}
      </form>
    </div>
  )
}
