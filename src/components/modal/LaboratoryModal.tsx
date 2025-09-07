import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import { Slider } from '@heroui/slider'
import { Switch } from '@heroui/switch'
import { Icon } from '@iconify/react'
import type { LaboratoryModalPropsDTO } from '@lib/hooks/useIndexPage'
import useLaboratoryModel from '@lib/hooks/useLaboratoryModal'

export default function LaboratoryModal(props: LaboratoryModalPropsDTO) {
  const { stream, temperature, maxTokens, topP, presencePenalty, frequencyPenalty, engineState } =
    props

  const {
    isOpen,
    onOpen,
    onOpenChange,
    handleTemperatureChange,
    handleFrequencyPenaltyChange,
    handleMaxTokensChange,
    handlePresencePenaltyChange,
    handleTopPChange,
    handleStreamChange,
  } = useLaboratoryModel(props)

  return (
    <>
      <Button
        onPress={onOpen}
        className="justify-start text-default-600"
        startContent={
          <Icon
            className="text-default-600"
            icon="solar:settings-minimalistic-line-duotone"
            width={24}
          />
        }
        variant="light"
      >
        Laboratory
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className="text-white bg-default-800"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Laboratory Settings</ModalHeader>
              <ModalBody className="flex flex-col gap-y-10">
                <div className="flex items-center justify-between">
                  <span>Streaming</span>
                  <Switch
                    isSelected={stream}
                    onValueChange={handleStreamChange}
                    isDisabled={!!engineState?.isGenerating || !!engineState?.isDownloading}
                  />
                </div>

                <Slider
                  label={`Temperature: ${temperature.toFixed(2)}`}
                  minValue={0}
                  maxValue={2}
                  step={0.2}
                  value={temperature}
                  showSteps
                  isDisabled={
                    !!engineState?.isGenerating ||
                    !!engineState?.isDownloading ||
                    !engineState?.isReady
                  }
                  marks={[
                    { value: 0.0, label: '0%' },
                    { value: 0.4, label: '20%' },
                    { value: 1.0, label: '50%' },
                    { value: 1.6, label: '80%' },
                    { value: 2.0, label: '100%' },
                  ]}
                  showTooltip
                  startContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleTemperatureChange(Math.max(temperature - 0.2, 0))}
                    >
                      <Icon
                        className="text-2xl text-default-300"
                        icon="solar:minus-circle-outline"
                      />
                    </Button>
                  }
                  endContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleTemperatureChange(Math.min(temperature + 0.2, 2))}
                    >
                      <Icon className="text-2xl text-default-300" icon="solar:add-circle-outline" />
                    </Button>
                  }
                  onChangeEnd={(v) => handleTemperatureChange(v as number)}
                />

                <Slider
                  label={`Top P: ${topP.toFixed(2)}`}
                  minValue={0}
                  maxValue={1}
                  step={0.1}
                  value={topP}
                  showSteps
                  isDisabled={
                    !!engineState?.isGenerating ||
                    !!engineState?.isDownloading ||
                    !engineState?.isReady
                  }
                  marks={[
                    { value: 0.0, label: '0%' },
                    { value: 0.2, label: '20%' },
                    { value: 0.5, label: '50%' },
                    { value: 0.8, label: '80%' },
                    { value: 1.0, label: '100%' },
                  ]}
                  showTooltip
                  startContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleTopPChange(Math.max(topP - 0.1, 0))}
                    >
                      <Icon
                        className="text-2xl text-default-300"
                        icon="solar:minus-circle-outline"
                      />
                    </Button>
                  }
                  endContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleTopPChange(Math.min(topP + 0.1, 1))}
                    >
                      <Icon className="text-2xl text-default-300" icon="solar:add-circle-outline" />
                    </Button>
                  }
                  onChangeEnd={(v) => handleTopPChange(v as number)}
                />

                <Slider
                  label={`Presence Penalty: ${presencePenalty.toFixed(2)}`}
                  minValue={-2}
                  maxValue={2}
                  step={0.5}
                  value={presencePenalty}
                  showSteps
                  isDisabled={
                    !!engineState?.isGenerating ||
                    !!engineState?.isDownloading ||
                    !engineState?.isReady
                  }
                  marks={[
                    { value: -2.0, label: '-2.0' },
                    { value: -1.0, label: '-1.0' },
                    { value: 0.0, label: '0.0' },
                    { value: 1.0, label: '1.0' },
                    { value: 2.0, label: '2.0' },
                  ]}
                  showTooltip
                  startContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() =>
                        handlePresencePenaltyChange(Math.max(presencePenalty - 0.5, -2))
                      }
                    >
                      <Icon
                        className="text-2xl text-default-300"
                        icon="solar:minus-circle-outline"
                      />
                    </Button>
                  }
                  endContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() =>
                        handlePresencePenaltyChange(Math.min(presencePenalty + 0.5, 2))
                      }
                    >
                      <Icon className="text-2xl text-default-300" icon="solar:add-circle-outline" />
                    </Button>
                  }
                  onChangeEnd={(v) => handlePresencePenaltyChange(v as number)}
                />

                <Slider
                  label={`Frequency Penalty: ${frequencyPenalty.toFixed(2)}`}
                  minValue={-2}
                  maxValue={2}
                  step={0.5}
                  value={frequencyPenalty}
                  showSteps
                  isDisabled={
                    !!engineState?.isGenerating ||
                    !!engineState?.isDownloading ||
                    !engineState?.isReady
                  }
                  marks={[
                    { value: -2.0, label: '-2.0' },
                    { value: -1.0, label: '-1.0' },
                    { value: 0.0, label: '0.0' },
                    { value: 1.0, label: '1.0' },
                    { value: 2.0, label: '2.0' },
                  ]}
                  showTooltip
                  startContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() =>
                        handleFrequencyPenaltyChange(Math.max(frequencyPenalty - 0.5, -2))
                      }
                    >
                      <Icon
                        className="text-2xl text-default-300"
                        icon="solar:minus-circle-outline"
                      />
                    </Button>
                  }
                  endContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() =>
                        handleFrequencyPenaltyChange(Math.min(frequencyPenalty + 0.5, 2))
                      }
                    >
                      <Icon className="text-2xl text-default-300" icon="solar:add-circle-outline" />
                    </Button>
                  }
                  onChangeEnd={(v) => handleFrequencyPenaltyChange(v as number)}
                />

                <Slider
                  label={`Max Tokens: ${maxTokens}`}
                  minValue={1}
                  maxValue={2048}
                  step={256}
                  value={maxTokens}
                  showSteps
                  isDisabled={
                    !!engineState?.isGenerating ||
                    !!engineState?.isDownloading ||
                    !engineState?.isReady
                  }
                  marks={[
                    { value: 1, label: '1' },
                    { value: 512, label: '512' },
                    { value: 1024, label: '1024' },
                    { value: 1536, label: '1536' },
                    { value: 2048, label: '2048' },
                  ]}
                  showTooltip
                  startContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleMaxTokensChange(Math.max(maxTokens - 256, 1))}
                    >
                      <Icon
                        className="text-2xl text-default-300"
                        icon="solar:minus-circle-outline"
                      />
                    </Button>
                  }
                  endContent={
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => handleMaxTokensChange(Math.min(maxTokens + 256, 2048))}
                    >
                      <Icon className="text-2xl text-default-300" icon="solar:add-circle-outline" />
                    </Button>
                  }
                  onChangeEnd={(v) => handleMaxTokensChange(v as number)}
                />

                {!!engineState?.isGenerating ||
                !!engineState?.isDownloading ||
                !engineState?.isReady ? (
                  <Chip
                    variant="dot"
                    color="success"
                    className="text-sm text-white border-gray-600"
                  >
                    <span className="block truncate">
                      Cannot adjust settings while the model is loading or generating.
                    </span>
                  </Chip>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button onPress={onOpenChange} variant="light" color="primary">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
