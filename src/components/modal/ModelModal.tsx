import IconMapper from '@components/icons/Icons'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import MODELS from '@lib/constants/models.constants'
import useModelModal from '@lib/hooks/useModelModal'
import type { Engine } from '@lib/hooks/useWebLLM'
import type { Model } from '@lib/models/model.model'

type ModelModalProps = {
  selectedModel: Model | null
  setModel: React.Dispatch<React.SetStateAction<Model>>
  engineState: Engine | null
}

export default function ModelModal({ selectedModel, setModel, engineState }: ModelModalProps) {
  const { isOpen, onOpen, onOpenChange, models, handleSearch } = useModelModal({
    allModels: MODELS,
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
                  <div className="max-w-[340px] lg:max-w-full overflow-scroll">
                    <Chip variant="dot" color="warning" className="text-sm text-white">
                      <span className="truncate">
                        You cannot change the model while the current model is downloading or
                        generating.
                      </span>
                    </Chip>
                  </div>
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
                        localStorage.setItem(
                          'model',
                          JSON.stringify({ ...model, quantization: [quant] }),
                        )
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
                <div className="flex flex-col items-center justify-between w-full gap-y-4 lg:flex-row">
                  <Chip
                    variant="dot"
                    color="primary"
                    className="text-sm text-white border-gray-600"
                  >
                    <span className="block truncate">Selected model: {selectedModel?.id}</span>
                  </Chip>
                  <Chip
                    variant="dot"
                    color="success"
                    className="text-sm text-white border-gray-600"
                  >
                    <span className="block truncate">
                      {models.length} model{models.length !== 1 ? 's' : ''} found.
                    </span>
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
