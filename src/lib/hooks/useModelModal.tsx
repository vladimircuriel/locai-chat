import { useDisclosure } from '@heroui/modal'
import type { Model } from '@lib/models/model.model'

type UseModelModalProps = Readonly<{
  allModels: Model[]
  selectedModel?: Model | null
  setModel?: React.Dispatch<React.SetStateAction<Model>>
}>

import { useCallback, useState } from 'react'

export default function useModelModal({ allModels }: UseModelModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [models, setModels] = useState<Model[]>(allModels)

  const handleSearch = useCallback(
    (query: string) => {
      if (!query) {
        setModels(allModels)
        return
      }

      const filteredModels = models.filter((model) =>
        model.id.toLowerCase().includes(query.toLowerCase()),
      )
      setModels(filteredModels)
    },
    [models, allModels],
  )

  return {
    isOpen,
    onOpen,
    onOpenChange,
    models,
    handleSearch,
  }
}
