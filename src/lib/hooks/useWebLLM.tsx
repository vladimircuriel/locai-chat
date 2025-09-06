import { addToast } from '@heroui/react'
import { getMessagesByConversation, saveMessage } from '@lib/db/message.db'
import type { Conversation } from '@lib/models/conversation.model'
import type { Message } from '@lib/models/message.model'
import {
  type ChatCompletionMessageParam,
  CreateMLCEngine,
  type InitProgressReport,
  type MLCEngine,
} from '@mlc-ai/web-llm'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type Engine = {
  motor: MLCEngine | null
  model: string
  isReady: boolean
  isDownloading: boolean
  isGenerating: boolean
}

export interface WebLLMConfig {
  initProgressCallback?: (report: InitProgressReport) => void
  temperature?: number
  stream?: boolean
  maxTokens?: number
  stopSequences?: string[]
}

type UseWebLLMProps = Readonly<{
  selectedModel: string
  config?: WebLLMConfig
  conversation: Conversation | undefined
  handleSendMessageToCurrentConversation: (message: Message) => void
  setConversationMessages: React.Dispatch<React.SetStateAction<Message[]>>
}>

export function useWebLLM({
  selectedModel,
  config = {},
  conversation,
  handleSendMessageToCurrentConversation,
  setConversationMessages,
}: UseWebLLMProps) {
  if (!selectedModel) {
    throw new Error('Model is required')
  }
  const [engineState, setEngineState] = useState<Engine | null>(null)
  const engineRef = useRef<MLCEngine | null>(null)

  const memoConfig = useMemo(() => config, [config])

  useEffect(() => {
    let active = true

    async function init() {
      setEngineState({
        motor: null,
        model: selectedModel,
        isReady: false,
        isDownloading: true,
        isGenerating: false,
      })

      try {
        await CreateMLCEngine(selectedModel, {
          initProgressCallback: memoConfig.initProgressCallback,
        })
        if (!active) return

        const workerEngine = await CreateMLCEngine(selectedModel)
        if (!active) return

        engineRef.current = workerEngine as MLCEngine

        setEngineState({
          motor: workerEngine,
          model: selectedModel,
          isReady: true,
          isDownloading: false,
          isGenerating: false,
        })

        addToast({
          title: 'Model loaded',
          description: `The model ${selectedModel} has been loaded successfully.`,
          color: 'success',
          severity: 'success',
        })
      } catch {
        if (!active) return
        setEngineState((prev) => (prev ? { ...prev, isDownloading: false } : prev))
        addToast({
          title: 'Error',
          description: 'Failed to load the model. Please try again.',
          color: 'danger',
          severity: 'danger',
        })
      }
    }

    init()
    return () => {
      active = false
    }
  }, [selectedModel, memoConfig])

  const sendMessagesToLLM = useCallback(
    async (message: Message, conversationId: string, onChunk?: (delta: string) => void) => {
      const engine = engineRef.current
      if (!engine) throw new Error('Engine not initialized')
      setEngineState((prev) => prev && { ...prev, isGenerating: true })

      const conversationMessages = conversationId
        ? await getMessagesByConversation(conversationId)
        : []

      const chatMessages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `This is a conversation titled "${conversation?.title}".`,
        } as ChatCompletionMessageParam,

        ...conversationMessages.map(
          (m) =>
            ({
              role: m.user === 'user' ? 'user' : 'assistant',
              content: m.text,
            }) as ChatCompletionMessageParam,
        ),

        { role: 'user', content: message.text } as ChatCompletionMessageParam,
      ]

      const baseReq = {
        messages: chatMessages,
        temperature: memoConfig.temperature,
        max_tokens: memoConfig.maxTokens,
        stop: memoConfig.stopSequences,
      }

      if (memoConfig.stream) {
        handleSendMessageToCurrentConversation({
          id: crypto.randomUUID(),
          conversationId: conversationId!,
          text: '',
          user: 'bot',
          favorite: false,
          timestamp: new Date(),
          status: 'pending',
        })

        const stream = await engine.chat.completions.create({
          ...baseReq,
          stream: true,
        })

        let result = ''
        for await (const part of stream as any) {
          const delta = part.choices[0]?.delta?.content || ''
          result += delta
          onChunk?.(delta)

          setConversationMessages((prev) => {
            const copy = [...prev]
            const lastIdx = copy.length - 1
            copy[lastIdx] = {
              ...copy[lastIdx],
              text: result,
              status: 'pending',
            }
            return copy
          })
        }

        setConversationMessages((prev) => {
          const copy = [...prev]
          const lastIdx = copy.length - 1
          if (copy[lastIdx]?.user === 'bot' && copy[lastIdx]?.status === 'pending') {
            copy.splice(lastIdx, 1)
          }
          return copy
        })

        const message: Message = {
          id: crypto.randomUUID(),
          conversationId: conversationId,
          text: result ?? 'No response',
          user: 'bot',
          favorite: false,
          timestamp: new Date(),
          status: 'sent',
        }

        await saveMessage(message)
        handleSendMessageToCurrentConversation(message)

        setEngineState((prev) => prev && { ...prev, isGenerating: false })
        return result
      } else {
        const res = await engine.chat.completions.create(baseReq)

        const content = res.choices[0].message.content
        setEngineState((prev) => prev && { ...prev, isGenerating: false })

        if (!conversationId) return content

        const message: Message = {
          id: crypto.randomUUID(),
          conversationId: conversationId,
          text: content ?? 'No response',
          user: 'bot',
          favorite: false,
          timestamp: new Date(),
          status: 'sent',
        }

        await saveMessage(message)
        handleSendMessageToCurrentConversation(message)
      }
    },
    [memoConfig, conversation, handleSendMessageToCurrentConversation, setConversationMessages],
  )

  return { engineState, sendMessagesToLLM }
}
