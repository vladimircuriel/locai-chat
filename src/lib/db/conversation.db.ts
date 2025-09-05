import type { Conversation } from '@lib/models/conversation.model'
import { getDB } from './db'

const STORE = 'conversations'

export async function saveConversation(conversation: Conversation): Promise<Conversation> {
  const db = await getDB()
  await db.put(STORE, conversation)

  return conversation
}

export async function getAllConversations(): Promise<Conversation[]> {
  const db = await getDB()
  return db.getAll(STORE)
}

export async function getConversationById(id: string): Promise<Conversation | undefined> {
  const db = await getDB()
  return db.get(STORE, id)
}

export async function getAmountOfConversations(): Promise<number> {
  const db = await getDB()
  return db.count(STORE)
}

export async function updateConversationById(id: string, updates: Partial<Conversation>) {
  const db = await getDB()
  const conversation = await db.get(STORE, id)
  if (!conversation) return

  const updatedConversation = { ...conversation, ...updates, updatedAt: new Date() }
  await db.put(STORE, updatedConversation)
  return updatedConversation
}

export async function transformIntoJSONWithMessages(
  conversationId: string,
): Promise<{ conversation: Conversation; json: string } | ''> {
  const db = await getDB()
  const conversation = await db.get(STORE, conversationId)
  if (!conversation) return ''

  const messages = await db.getAllFromIndex('messages', 'by_conversation', conversationId)

  const exportData = {
    conversation,
    messages,
  }

  return {
    conversation,
    json: JSON.stringify(exportData, null, 2),
  }
}

export async function deleteConversation(id: string): Promise<Conversation | undefined> {
  const db = await getDB()
  const conversation = await db.get(STORE, id)
  await db.delete(STORE, id)

  return conversation
}

export async function clearConversations() {
  const db = await getDB()
  await db.clear(STORE)
}
