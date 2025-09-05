export type Message = {
  id: string
  conversationId: string
  text: string
  user: 'user' | 'bot'
  favorite: boolean
  timestamp: Date
  status: 'pending' | 'sent' | 'error'
}
