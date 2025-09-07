import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import usePromptInputFullLineComponent from '@lib/hooks/usePromptInputFullLineComponent'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Conversation } from '@lib/models/conversation.model'
import PromptInput from './PromptInput'
import PromptInputAssets from './PromptInputAsstets'

export interface PromptInputProps {
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  handleMessageSend: (conversationId: string) => void
  handleAddConversation: (conversation: Conversation) => void
  currentModel: Engine | null
}

export default function PromptInputFullLineComponent({
  prompt,
  setPrompt,
  handleMessageSend,
  handleAddConversation,
  currentModel,
}: PromptInputProps) {
  const { assets, setAssets, inputRef, handleKeyDown, handlePaste, onSubmit } =
    usePromptInputFullLineComponent({
      prompt,
      setPrompt,
      handleMessageSend,
      handleAddConversation,
      currentModel,
    })

  return (
    <Form
      className="flex flex-col items-start w-full gap-0 rounded-medium bg-neutral-100 dark:bg-default-100"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <div className={cn('group flex gap-2 pr-3 pl-[20px]', assets.length > 0 ? 'pt-4' : '')}>
        <PromptInputAssets
          assets={assets}
          onRemoveAsset={(index) => {
            setAssets((prev) => prev.filter((_, i) => i !== index))
          }}
        />
      </div>
      <PromptInput
        ref={inputRef}
        autoFocus
        classNames={{
          innerWrapper: 'relative',
          input: 'text-medium h-auto w-full',
          inputWrapper:
            'bg-transparent! shadow-none group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0 pr-3 pl-[20px] pt-3 pb-4',
        }}
        maxRows={16}
        minRows={2}
        name="content"
        radius="lg"
        spellCheck="true"
        value={prompt}
        variant="flat"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onValueChange={setPrompt}
      />
      <div className="flex flex-row items-center justify-end w-full px-3 pb-3">
        {/* <Tooltip showArrow content="Attach Files">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            onPress={() => fileInputRef.current?.click()}
          >
            <Icon className="text-default-500" icon="solar:paperclip-outline" width={24} />
            <VisuallyHidden>
              <input
                ref={fileInputRef}
                multiple
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
              />
            </VisuallyHidden>
          </Button>
        </Tooltip> */}
        <Button
          isIconOnly
          color={!prompt ? 'default' : 'secondary'}
          isDisabled={!prompt || !currentModel?.isReady || currentModel?.isGenerating}
          isLoading={!currentModel?.isReady || currentModel?.isGenerating}
          radius="full"
          size="sm"
          type="submit"
          variant="solid"
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
      </div>
    </Form>
  )
}
