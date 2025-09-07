import { addToast } from '@heroui/react'
import {
  deleteConversation,
  getAllConversations,
  getAmountOfConversations,
  getConversationById,
} from '@lib/db/conversation.db'
import {
  deleteMessagesByConversation,
  getMessagesByConversation,
  saveMessage,
} from '@lib/db/message.db'
import type { Conversation } from '@lib/models/conversation.model'
import type { Message } from '@lib/models/message.model'
import type { Model } from '@lib/models/model.model'
import isWebGPUSupported from '@lib/utils/gpu'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type Engine, useWebLLM, type WebLLMConfig } from './useWebLLM'

export type LaboratoryModalPropsDTO = Readonly<{
  stream: boolean
  setStream: React.Dispatch<React.SetStateAction<boolean>>
  temperature: number
  setTemperature: React.Dispatch<React.SetStateAction<number>>
  maxTokens: number
  setMaxTokens: React.Dispatch<React.SetStateAction<number>>
  topP: number
  setTopP: React.Dispatch<React.SetStateAction<number>>
  presencePenalty: number
  setPresencePenalty: React.Dispatch<React.SetStateAction<number>>
  frequencyPenalty: number
  setFrequencyPenalty: React.Dispatch<React.SetStateAction<number>>
  engineState: Engine | null
}>

export default function useIndexPage() {
  const STORAGE_KEY = 'lastConversationId'
  const [amountOfConversations, setAmountOfConversations] = useState<number>(0)
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(
    undefined,
  )
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [model, setModel] = useState<Model>(
    localStorage.getItem('model')
      ? JSON.parse(localStorage.getItem('model')!)
      : {
          id: 'Qwen2-0.5B-Instruct',
          quantization: ['q0f16'],
          origin: 'HuggingFace',
          owner: 'meta',
        },
  )
  const [webGPUSupported, setWebGPUSupported] = useState<boolean | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<string>('')
  const [stream, setStream] = useState<boolean>(() => {
    const stored = localStorage.getItem('stream')
    return stored === null ? true : stored === 'true'
  })
  const [temperature, setTemperature] = useState<number>(
    localStorage.getItem('temperature') ? parseFloat(localStorage.getItem('temperature')!) : 0.7,
  )
  const [maxTokens, setMaxTokens] = useState<number>(
    localStorage.getItem('maxTokens') ? parseInt(localStorage.getItem('maxTokens')!) : 512,
  )
  const [presencePenalty, setPresencePenalty] = useState<number>(
    localStorage.getItem('presencePenalty')
      ? parseFloat(localStorage.getItem('presencePenalty')!)
      : 0,
  )
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(
    localStorage.getItem('frequencyPenalty')
      ? parseFloat(localStorage.getItem('frequencyPenalty')!)
      : 0,
  )
  const [topP, setTopP] = useState<number>(
    localStorage.getItem('topP') ? parseFloat(localStorage.getItem('topP')!) : 1,
  )

  const config = useMemo<WebLLMConfig>(
    () => ({
      stream,
      temperature,
      top_p: topP,
      presence_penalty: presencePenalty,
      frequency_penalty: frequencyPenalty,
      maxTokens,
      initProgressCallback: (r) => {
        setDownloadProgress(r.text)
      },
    }),
    [stream, temperature, topP, presencePenalty, frequencyPenalty, maxTokens],
  )

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return /Mobi|Android/i.test(navigator.userAgent)
  }, [])

  const handleSetCurrentConversation = useCallback(
    async (conversationId: string) => {
      if (currentConversation?.id === conversationId) return
      const conversation = await getConversationById(conversationId)
      setCurrentConversation(conversation)
    },
    [currentConversation],
  )

  const handleAddConversation = useCallback((conversation: Conversation) => {
    setCurrentConversation(conversation)
    setConversations((prev) => [conversation, ...prev])
    setAmountOfConversations((prev) => prev + 1)
  }, [])

  const handleSendMessageToCurrentConversation = useCallback((message: Message) => {
    setConversationMessages((prev) => [...prev, message])
  }, [])

  const { engineState, sendMessagesToLLM } = useWebLLM({
    selectedModel: `${model.id}-${model.quantization[0]}-MLC`,
    config,
    conversation: currentConversation,
    handleSendMessageToCurrentConversation,
    setConversationMessages,
  })

  const handleUserSendMessage = useCallback(
    async (text: string, conversationId: string) => {
      const message: Message = {
        id: crypto.randomUUID(),
        conversationId: conversationId,
        text,
        user: 'user',
        favorite: false,
        timestamp: new Date(),
        status: 'sent',
      }

      await saveMessage(message)
      handleSendMessageToCurrentConversation(message)
      await sendMessagesToLLM(message, conversationId)
    },
    [handleSendMessageToCurrentConversation, sendMessagesToLLM],
  )

  const handleCreateNewConversation = useCallback(() => {
    setCurrentConversation(undefined)
  }, [])

  const handleDeleteConversation = useCallback(
    async (conversationId: string) => {
      setAmountOfConversations((prev) => Math.max(prev - 1, 0))

      await deleteMessagesByConversation(conversationId)
      const deleted = await deleteConversation(conversationId)

      if (currentConversation?.id === conversationId) {
        setCurrentConversation(undefined)
        setConversationMessages([])
      }

      setConversations((prev) => prev.filter((c) => c.id !== conversationId))

      addToast({
        title: 'Conversation deleted',
        description: `Conversation '${deleted?.title ?? conversationId}' has been deleted.`,
        color: 'danger',
        severity: 'danger',
      })
    },
    [currentConversation?.id],
  )

  useEffect(() => {
    async function loadLastConversation() {
      const lastId = localStorage.getItem(STORAGE_KEY)
      if (!lastId) return

      try {
        const conversation = await getConversationById(lastId)
        setCurrentConversation(conversation)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    loadLastConversation()
  }, [])

  useEffect(() => {
    if (currentConversation?.id) {
      localStorage.setItem(STORAGE_KEY, currentConversation.id)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [currentConversation])

  useEffect(() => {
    async function fetchConversationMessages() {
      if (!currentConversation) {
        setConversationMessages([])
        return
      }

      const messages = await getMessagesByConversation(currentConversation.id)
      setConversationMessages(messages)
    }

    fetchConversationMessages()
  }, [currentConversation])

  useEffect(() => {
    async function fetchAmountOfConversations() {
      const amount = await getAmountOfConversations()
      setAmountOfConversations(amount)
    }
    fetchAmountOfConversations()
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations = await getAllConversations()
      setConversations(fetchedConversations)
    }

    fetchConversations()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: We actually only want to run this when conversationMessages changes
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [conversationMessages])

  useEffect(() => {
    const checkWebGPUSupport = async () => {
      const supported = await isWebGPUSupported()
      setWebGPUSupported(supported)
    }

    checkWebGPUSupport()
  }, [])

  const laboratoryModalProps: LaboratoryModalPropsDTO = {
    stream,
    setStream,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    topP,
    setTopP,
    presencePenalty,
    setPresencePenalty,
    frequencyPenalty,
    setFrequencyPenalty,
    engineState,
  }

  return {
    amountOfConversations,
    conversations,
    setAmountOfConversations,
    handleSetCurrentConversation,
    handleCreateNewConversation,
    handleSendMessageToCurrentConversation,
    handleUserSendMessage,
    handleAddConversation,
    handleDeleteConversation,
    sendMessagesToLLM,
    setModel,
    laboratoryModalProps,
    currentConversation,
    conversationMessages,
    downloadProgress,
    scrollRef,
    model,
    engineState,
    webGPUSupported,
    isMobile,
  }
}
