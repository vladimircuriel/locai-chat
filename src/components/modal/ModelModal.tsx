import IconMapper from '@components/icons/Icons'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import MODELS from '@lib/constants/models.constants'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Model } from '@lib/models/model.model'
import { useCallback, useState } from 'react'

type UseModelModalProps = Readonly<{
  allModels: Model[]
  selectedModel: Model | null
  setModel: React.Dispatch<React.SetStateAction<Model>>
}>

export function useModelModal({ allModels, selectedModel, setModel }: UseModelModalProps) {
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

type ModelModalProps = {
  selectedModel: Model | null
  setModel: React.Dispatch<React.SetStateAction<Model>>
  engineState: Engine | null
}

export default function ModelModal({ selectedModel, setModel, engineState }: ModelModalProps) {
  const { isOpen, onOpen, onOpenChange, models, handleSearch } = useModelModal({
    allModels: MODELS,
    selectedModel,
    setModel,
  })

  return (
    <>
      <Button onPress={onOpen} variant="light" color="default">
        {selectedModel?.id}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-white bg-default-800"
        isDismissable={false}
        size="5xl"
        isKeyboardDismissDisabled={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Model</ModalHeader>
              <Divider className="mb-2 -mt-2 bg-default-700" />
              <ModalBody className="dark">
                <Input
                  variant="bordered"
                  label="Search models"
                  placeholder="Search models..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {engineState?.isGenerating || engineState?.isDownloading ? (
                  <Chip variant="dot" color="warning" className="text-sm text-white">
                    You cannot change the model while the current model is downloading or
                    generating.
                  </Chip>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {models.map((model) => (
                    <Select
                      key={model.id}
                      label={model.id}
                      startContent={IconMapper(model.owner)}
                      isDisabled={!!engineState?.isGenerating || !!engineState?.isDownloading}
                      variant="bordered"
                      selectionMode="single"
                      selectedKeys={
                        selectedModel?.id === model.id ? [selectedModel.quantization[0]] : []
                      }
                      onSelectionChange={(keys) => {
                        const quant = Array.from(keys)[0] as string
                        setModel({
                          ...model,
                          quantization: [quant],
                        })
                        onOpenChange()
                      }}
                    >
                      {model.quantization.map((quant) => (
                        <SelectItem key={quant}>{quant}</SelectItem>
                      ))}
                    </Select>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex items-center justify-between w-full">
                  <Chip
                    variant="dot"
                    color="primary"
                    className="text-sm text-white border-gray-600"
                  >
                    Selected model: {selectedModel?.id}
                  </Chip>
                  <Chip
                    variant="dot"
                    color="success"
                    className="text-sm text-white border-gray-600"
                  >
                    {models.length} model{models.length !== 1 ? 's' : ''} found.
                  </Chip>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
