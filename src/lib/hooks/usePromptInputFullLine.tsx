import { useState } from 'react'

export default function usePromptInputFullLine() {
  const [prompt, setPrompt] = useState<string>('')

  return { prompt, setPrompt }
}
