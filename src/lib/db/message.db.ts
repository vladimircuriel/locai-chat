import type { Message } from '@lib/models/message.model'
import { getDB } from './db'

const STORE = 'messages'
const INDEX_BY_CONVO = 'by_conversation'

export async function saveMessage(message: Message) {
  const db = await getDB()
  await db.put(STORE, message)
}

export async function getMessagesByConversation(conversationId: string): Promise<Message[]> {
  const db = await getDB()
  return db.getAllFromIndex(STORE, INDEX_BY_CONVO, conversationId)
}

export async function getAllMessages(): Promise<Message[]> {
  const db = await getDB()
  return db.getAll(STORE)
}

export async function deleteMessage(id: string) {
  const db = await getDB()
  await db.delete(STORE, id)
}

export async function deleteMessagesByConversation(conversationId: string) {
  const db = await getDB()
  const tx = db.transaction(STORE, 'readwrite')
  const index = tx.store.index(INDEX_BY_CONVO)
  let cursor = await index.openCursor(IDBKeyRange.only(conversationId))

  while (cursor) {
    await cursor.delete()
    cursor = await cursor.continue()
  }

  await tx.done
}

export async function clearMessages() {
  const db = await getDB()
  await db.clear(STORE)
}
