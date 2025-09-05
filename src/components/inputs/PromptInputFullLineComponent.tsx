import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import usePromptInputFullLineComponent from '@lib/hooks/usePromptInputFullLineComponent'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import PromptInput from './PromptInput'
import PromptInputAssets from './PromptInputAsstets'

export interface PromptInputProps {
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  handleMessageSend: () => void
}

export default function PromptInputFullLineComponent({
  prompt,
  setPrompt,
  handleMessageSend,
}: PromptInputProps) {
  const {
    assets,
    setAssets,
    inputRef,
    fileInputRef,
    handleKeyDown,
    handlePaste,
    handleFileUpload,
    onSubmit,
  } = usePromptInputFullLineComponent({ prompt, setPrompt, handleMessageSend })

  return (
    <Form
      className="rounded-medium bg-neutral-100 dark:bg-default-100 flex w-full flex-col items-start gap-0"
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
      <div className="flex w-full flex-row items-center justify-between px-3 pb-3">
        <Tooltip showArrow content="Attach Files">
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
        </Tooltip>
        <Button
          isIconOnly
          color={!prompt ? 'default' : 'primary'}
          isDisabled={!prompt}
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
