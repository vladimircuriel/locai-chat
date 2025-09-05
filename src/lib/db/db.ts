import { type IDBPDatabase, openDB } from 'idb'

const DB_NAME = 'chat-db'
const DB_VERSION = 1
const STORE_CONVERSATIONS = 'conversations'
const STORE_MESSAGES = 'messages'

let dbPromise: Promise<IDBPDatabase> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_CONVERSATIONS)) {
          db.createObjectStore(STORE_CONVERSATIONS, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
          const store = db.createObjectStore(STORE_MESSAGES, { keyPath: 'id' })
          store.createIndex('by_conversation', 'conversationId', { unique: false })
        }
      },
    })
  }
  return dbPromise
}
