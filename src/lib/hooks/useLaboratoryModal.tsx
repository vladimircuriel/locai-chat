import { useDisclosure } from '@heroui/react'
import type { LaboratoryModalPropsDTO } from '@lib/hooks/useIndexPage'
import { useDebouncedCallback } from 'use-debounce'

export default function useLaboratoryModel(props: LaboratoryModalPropsDTO) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleTemperatureChange = useDebouncedCallback((value: number) => {
    props.setTemperature(value)
    localStorage.setItem('temperature', value.toString())
  }, 500)

  const handleMaxTokensChange = useDebouncedCallback((value: number) => {
    props.setMaxTokens(value)
    localStorage.setItem('maxTokens', value.toString())
  }, 500)

  const handleTopPChange = useDebouncedCallback((value: number) => {
    props.setTopP(value)
    localStorage.setItem('topP', value.toString())
  }, 500)

  const handlePresencePenaltyChange = useDebouncedCallback((value: number) => {
    props.setPresencePenalty(value)
    localStorage.setItem('presencePenalty', value.toString())
  }, 500)

  const handleFrequencyPenaltyChange = useDebouncedCallback((value: number) => {
    props.setFrequencyPenalty(value)
    localStorage.setItem('frequencyPenalty', value.toString())
  }, 500)

  const handleStreamChange = (value: boolean) => {
    props.setStream(value)
    localStorage.setItem('stream', value.toString())
  }

  return {
    isOpen,
    onOpen,
    onOpenChange,
    handleTemperatureChange,
    handleMaxTokensChange,
    handleTopPChange,
    handlePresencePenaltyChange,
    handleFrequencyPenaltyChange,
    handleStreamChange,
  }
}
