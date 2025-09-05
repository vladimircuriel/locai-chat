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
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWebLLM, type WebLLMConfig } from './useWebLLM'

export default function useIndexPage() {
  const [amountOfConversations, setAmountOfConversations] = useState<number>(0)
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(
    undefined,
  )
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [model, setModel] = useState('gemma-2b-it-q4f16_1-MLC')
  const [stream, setStream] = useState(false)
  const [temperature, setTemperature] = useState(0.8)
  const [maxTokens, setMaxTokens] = useState(512)
  const [downloadProgress, setDownloadProgress] = useState('')

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
    setConversations((prev) => [conversation, ...prev])
  }, [])

  const handleSendMessageToCurrentConversation = useCallback((message: Message) => {
    setConversationMessages((prev) => [...prev, message])
  }, [])

  const { engineState, sendMessagesToLLM } = useWebLLM({
    selectedModel: model,
    config,
    conversation: currentConversation,
    handleSendMessageToCurrentConversation,
  })

  const handleUserSendMessage = useCallback(
    async (text: string) => {
      if (!currentConversation) return

      const message: Message = {
        id: crypto.randomUUID(),
        conversationId: currentConversation.id,
        text,
        user: 'user',
        favorite: false,
        timestamp: new Date(),
        status: 'sent',
      }

      await saveMessage(message)
      handleSendMessageToCurrentConversation(message)
      await sendMessagesToLLM(message)
    },
    [currentConversation, handleSendMessageToCurrentConversation, sendMessagesToLLM],
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
    currentConversation,
    conversationMessages,
    downloadProgress,
    engineState,
  }
}
