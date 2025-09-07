import { Divider } from '@heroui/divider'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal'
import { useEffect } from 'react'

export default function MobileModal({ isMobile = false }: { isMobile?: boolean }) {
  const { isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    if (isMobile) {
      onOpen()
    }
  }, [isMobile, onOpen])

  return (
    <Modal
      isOpen={isOpen}
      className="text-white bg-default-800"
      isDismissable={false}
      size="xl"
      isKeyboardDismissDisabled={false}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              LocAI: Local Multi-Model AI ChatBot
            </ModalHeader>
            <Divider className="mb-2 -mt-2 bg-default-700" />
            <ModalBody className="space-y-4 dark">
              <p>
                <strong>Not supported on mobile:</strong> LocAI cannot run properly on phones or
                tablets. Mobile devices have limited GPU performance, low memory capacity, poor
                WebGPU support, and heavy battery/heat issues when running large AI models. Use a
                desktop or laptop for a stable experience.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
