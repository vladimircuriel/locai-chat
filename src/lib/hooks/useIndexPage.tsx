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
import { useWebLLM, type WebLLMConfig } from './useWebLLM'

export default function useIndexPage() {
  const STORAGE_KEY = 'lastConversationId'
  const [amountOfConversations, setAmountOfConversations] = useState<number>(0)
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(
    undefined,
  )
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [model, setModel] = useState<Model>({
    id: 'Qwen2-0.5B-Instruct',
    quantization: ['q0f16'],
    origin: 'HuggingFace',
    owner: 'meta',
  })
  const [stream, setStream] = useState<boolean>(true)
  const [temperature, setTemperature] = useState<number>(0.8)
  const [maxTokens, setMaxTokens] = useState<number>(512)
  const [downloadProgress, setDownloadProgress] = useState<string>('')
  const [webGPUSupported, setWebGPUSupported] = useState<boolean | null>(null)

  const config = useMemo<WebLLMConfig>(
    () => ({
      stream,
      temperature,
      maxTokens,
      initProgressCallback: (r) => {
        setDownloadProgress(r.text)
      },
    }),
    [stream, temperature, maxTokens],
  )

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
    setStream,
    currentConversation,
    conversationMessages,
    downloadProgress,
    scrollRef,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    model,
    engineState,
    webGPUSupported,
  }
}
