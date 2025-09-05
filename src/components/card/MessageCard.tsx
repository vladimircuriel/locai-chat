import { Avatar } from '@heroui/avatar'
import { cn } from '@heroui/react'
import type { Message } from '@lib/models/message.model'
import React, { useCallback } from 'react'

const MessagingChatMessage = React.forwardRef<HTMLDivElement, Message>(
  ({ id, text: message, user, timestamp, favorite, status, ...props }, ref) => {
    const messageRef = React.useRef<HTMLDivElement>(null)

    const MessageAvatar = useCallback(() => {
      const avatar =
        user === 'bot'
          ? 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png'
          : 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg'

      return (
        <div className="relative flex-none">
          <Avatar src={avatar} />
        </div>
      )
    }, [user])

    const name = user === 'bot' ? 'Acme AI' : 'You'
    const formattedTime = timestamp
      ? new Date(timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : ''
    const isRTL = user === 'bot'

    const Message = () => (
      <div className="flex max-w-[70%] flex-col gap-4">
        <div
          className={cn('rounded-medium bg-content2 text-default-600 relative w-full px-4 py-3')}
        >
          <div className="flex justify-between">
            <div className="text-small text-default-foreground w-fit font-semibold">{name}</div>
            <div className="text-small text-default-400">{formattedTime}</div>
          </div>
          <div ref={messageRef} className="text-small text-default-900 mt-2">
            <div className="whitespace-pre-line">{message}</div>
          </div>
        </div>
      </div>
    )

    return (
      <div {...props} ref={ref} className={cn('flex gap-3', { 'flex-row-reverse': !isRTL })}>
        <MessageAvatar />
        <Message />
      </div>
    )
  },
)

MessagingChatMessage.displayName = 'MessagingChatMessage'

export default MessagingChatMessage
