import { cn } from '@heroui/react'
import type { Message } from '@lib/models/message.model'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

const MessagingChatMessage = React.forwardRef<HTMLDivElement, Message>(
  ({ text: message, user, ...props }, ref) => {
    const messageRef = React.useRef<HTMLDivElement>(null)
    const isRTL = user === 'bot'

    const MessageContent = () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: (props: any) => {
            const { inline, className, children, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark as any}
                language={match[1]}
                PreTag="div"
                className="my-2 rounded p-2 bg-gray-900"
                {...rest}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className ?? ''} px-1 bg-default-300 rounded`} {...rest}>
                {children}
              </code>
            )
          },
        }}
      >
        {message}
      </ReactMarkdown>
    )

    return (
      <div {...props} ref={ref} className={cn('flex gap-3', { 'flex-row-reverse': !isRTL })}>
        <div className="flex max-w-[70%] flex-col gap-2">
          <div
            className={cn('rounded-medium bg-content2 text-default-600 relative w-full px-4 py-2')}
          >
            <div ref={messageRef} className="text-medium text-start text-default-900">
              <MessageContent />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

MessagingChatMessage.displayName = 'MessagingChatMessage'

export default MessagingChatMessage
