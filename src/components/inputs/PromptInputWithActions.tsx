/** biome-ignore-all lint/suspicious/noArrayIndexKey: it does not affect */

import { Button } from '@heroui/button'
import { cn } from '@heroui/react'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import React from 'react'

import PromptInput from './PromptInput'

export default function PromptInputWithActions() {
  const ideas = [
    {
      title: 'Create a blog post about HeroUI',
      description: 'explain it in simple terms',
    },
    {
      title: 'Give me 10 ideas for my next blog post',
      description: 'include only the best ideas',
    },
    {
      title: 'Compare HeroUI with other UI libraries',
      description: 'be as objective as possible',
    },
    {
      title: 'Write a text message to my friend',
      description: 'be polite and friendly',
    },
  ]

  const [prompt, setPrompt] = React.useState<string>('')

  const handleSuggestionSelect = (suggestion: { label: string }) => {
    setPrompt(`Help me ${suggestion.label.toLowerCase()}`)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
        <div className="flex gap-2">
          {ideas.map(({ title, description }, index) => (
            <Button
              key={index}
              className="flex h-14 flex-col items-start gap-0"
              variant="flat"
              onPress={() => handleSuggestionSelect({ label: title })}
            >
              <p>{title}</p>
              <p className="text-default-500">{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow>
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
                  color={!prompt ? 'default' : 'primary'}
                  isDisabled={!prompt}
                  radius="lg"
                  size="sm"
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
              </Tooltip>
            </div>
          }
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={setPrompt}
        />
      </form>
    </div>
  )
}
