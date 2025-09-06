import DeepSeek from './DeepSeek'
import Gemma from './Gemma'
import Meta from './Meta'
import MistralAI from './Mistral'
import Phi from './Phi'
import Qwen from './Qwen'

export default function IconMapper(owner: string) {
  switch (owner) {
    case 'google':
      return <Gemma />
    case 'deepseek':
      return <DeepSeek />
    case 'meta':
      return <Meta />
    case 'qwen':
      return <Qwen />
    case 'mistral':
      return <MistralAI />
    case 'microsoft':
      return <Phi />
    default:
      return 'AI'
  }
}
