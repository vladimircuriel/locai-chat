import usePromptInputFullLine from '@lib/hooks/usePromptInputFullLine'
import PromptInputFullLineComponent from './PromptInputFullLineComponent'

export default function PromptInputFullLine() {
  const { prompt, setPrompt } = usePromptInputFullLine()

  return <PromptInputFullLineComponent prompt={prompt} setPrompt={setPrompt} />
}
