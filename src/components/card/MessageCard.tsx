import { cn } from '@heroui/react'
import type { Message } from '@lib/models/message.model'
import React from 'react'

const MessagingChatMessage = React.forwardRef<HTMLDivElement, Message>(
  ({ id, text: message, user, timestamp, favorite, status, ...props }, ref) => {
    const messageRef = React.useRef<HTMLDivElement>(null)
    const isRTL = user === 'bot'

    const Message = () => (
      <div className="flex max-w-[70%] flex-col gap-2">
        <div
          className={cn('rounded-medium bg-content2 text-default-600 relative w-full px-4 py-2')}
        >
          <div ref={messageRef} className="text-small text-default-900">
            <div className="whitespace-pre-line">{message}</div>
          </div>
        </div>
      </div>
    )

    return (
      <div {...props} ref={ref} className={cn('flex gap-3', { 'flex-row-reverse': !isRTL })}>
        <Message />
      </div>
    )
  },
)

MessagingChatMessage.displayName = 'MessagingChatMessage'

export default MessagingChatMessage
