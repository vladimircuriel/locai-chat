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
}>

export function useWebLLM({
  selectedModel,
  config = {},
  conversation,
  handleSendMessageToCurrentConversation,
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
        console.log('MLC Engine created')

        if (!active) return

        console.log('Initializing Service Worker Engine...')

        const workerEngine = await CreateMLCEngine(selectedModel)
        console.log('Service Worker Engine created')
        console.log('Worker Engine:', workerEngine)
        console.log('active', active)
        if (!active) return

        console.log('Service Worker Engine initialized')

        engineRef.current = workerEngine as MLCEngine

        console.log('Engine initialized and ready:', workerEngine)

        setEngineState({
          motor: workerEngine,
          model: selectedModel,
          isReady: true,
          isDownloading: false,
          isGenerating: false,
        })
      } catch {
        console.error('Failed to initialize the engine')
        if (!active) return
        setEngineState((prev) => (prev ? { ...prev, isDownloading: false } : prev))
      }
    }

    init()
    return () => {
      active = false
    }
  }, [selectedModel, memoConfig])

  const sendMessagesToLLM = useCallback(
    async (message: Message, onChunk?: (delta: string) => void) => {
      console.log('sendMessagesToLLM called with messages:', message)

      const engine = engineRef.current
      if (!engine) throw new Error('Engine not initialized')
      setEngineState((prev) => prev && { ...prev, isGenerating: true })

      console.log('Engine initialized:', engine)

      const conversationMessages = conversation?.id
        ? await getMessagesByConversation(conversation.id)
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

      console.log('Chat messages prepared:', chatMessages)

      const baseReq = {
        messages: chatMessages,
        temperature: memoConfig.temperature,
        max_tokens: memoConfig.maxTokens,
        stop: memoConfig.stopSequences,
      }

      if (memoConfig.stream) {
        const stream = await engine.chat.completions.create({
          ...baseReq,
          stream: true,
        })
        let result = ''
        for await (const part of stream as any) {
          const delta = part.choices[0]?.delta?.content || ''
          result += delta
          onChunk?.(delta)
        }
        setEngineState((prev) => prev && { ...prev, isGenerating: false })
        return result
      } else {
        console.log('Sending request to engine:', baseReq)

        const res = await engine.chat.completions.create(baseReq)
        const content = res.choices[0].message.content
        setEngineState((prev) => prev && { ...prev, isGenerating: false })
        console.log('Received response from engine:', content)

        if (!conversation) return content

        console.log('Saving message to conversation:', conversation.id)

        const message: Message = {
          id: crypto.randomUUID(),
          conversationId: conversation.id,
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
    [memoConfig, conversation, handleSendMessageToCurrentConversation],
  )

  return { engineState, sendMessagesToLLM }
}
