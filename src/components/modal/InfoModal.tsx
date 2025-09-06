import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal'
import { Icon } from '@iconify/react'
import { useEffect } from 'react'

export default function InfoModal({ isFirstTime = false }: { isFirstTime?: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (isFirstTime) {
      onOpen()
      localStorage.setItem('isFirstTime', 'false')
    }
  }, [isFirstTime, onOpen])

  return (
    <>
      <Button
        fullWidth
        onPress={onOpen}
        className="justify-start text-default-600"
        startContent={
          <Icon className="text-default-600" icon="solar:info-circle-line-duotone" width={24} />
        }
        variant="light"
      >
        About
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
              <ModalHeader className="flex flex-col gap-1">
                LocAI: Local Multi-Model AI ChatBot
              </ModalHeader>
              <Divider className="mb-2 -mt-2 bg-default-700" />
              <ModalBody className="space-y-4 dark">
                <p>
                  <strong>LocAI</strong> is a pure client-side AI chat client built on top of{' '}
                  <a href="https://github.com/mlc-ai/web-llm" className="underline">
                    MLC’s WebLLM
                  </a>
                  . It lets you download and run large language models directly in your browser—no
                  account signup or server calls required.
                </p>
                <p>
                  <strong>How it works:</strong>
                  <ul className="list-disc list-inside">
                    <li>Models are fetched and cached in your browser via IndexedDB.</li>
                    <li>
                      All inference is done locally—using your CPU, RAM, and (mandatory)
                      WebGPU-enabled GPU.
                    </li>
                    <li>
                      No data ever leaves your machine; if you clear your IndexedDB or switch
                      browsers, your chats and models will be gone.
                    </li>
                  </ul>
                </p>

                <p>
                  <strong>Default model: </strong>
                  Qwen2-0.5B-Instruct, a very basic model that consumes minimal resources. For
                  improved performance, consider selecting a more capable model from the top right
                  corner.
                </p>

                <p>
                  <strong>Browser requirements: </strong>
                  LocAI relies on modern WebGPU support. Google Chrome (and Chromium-based browsers)
                  work best. Firefox and Safari currently have limited or experimental WebGPU
                  support, so you may encounter issues there.
                </p>
                <p>
                  <strong>Model memory: </strong>
                  Each model maintains its chat history and “memory” within the session, so it can
                  refer back to earlier messages in the conversation.
                </p>
                <p>
                  <strong>Model selection: </strong>
                  You can choose from a variety of models on{' '}
                  <a href="https://mlc.ai/models" className="underline">
                    mlc.ai/models
                  </a>
                  . Smaller models download faster and consume less memory, but their responses may
                  be less accurate or fluent. Larger models require more VRAM/RAM but deliver
                  higher-quality replies.
                </p>
                <p>
                  <strong>Local resource usage: </strong>
                  Downloading and running these models uses your own device’s storage (to cache
                  model weights) and RAM/VRAM to execute inference. There are no remote servers
                  involved—everything runs right here in the browser.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
