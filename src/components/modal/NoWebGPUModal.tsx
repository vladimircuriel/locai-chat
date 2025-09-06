import { Divider } from '@heroui/divider'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal'

type NoWebGPUModalProps = {
  isOpen: boolean
}

export default function NoWebGPUModal({ isOpen }: NoWebGPUModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      className="text-white bg-default-800"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      size="5xl"
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
                It looks like your browser or device does not support the <strong>WebGPU</strong>{' '}
                API. LocAI relies on WebGPU to run machine-learning models directly in the browser,
                harnessing your GPU for performance. Without WebGPU, these models cannot execute
                locally.
              </p>
              <p>
                <strong>Why WebGPU? </strong>
                WebGPU provides low-level access to your graphics card for compute workloads. LocAI
                uses it to accelerate inference: downloading model weights into IndexedDB is just
                step one—the actual math happens on your GPU. If WebGPU isn’t available, the models
                simply cannot run.
              </p>
              <p>
                <strong>Recommended setup:</strong>
                <ul className="list-disc list-inside">
                  <li>
                    Use Google Chrome (or another Chromium-based browser) with WebGPU enabled.
                    &nbsp;
                    <a href="https://www.google.com/chrome/" className="underline">
                      Download Chrome
                    </a>
                  </li>
                  <li>
                    A desktop or laptop with a discrete GPU (NVIDIA, AMD) or integrated GPU that
                    supports WebGPU.
                  </li>
                  <li>Could need your browser’s experimental WebGPU flag turned on.</li>
                </ul>
              </p>
              <p>
                <strong>About LocAI:</strong>
                LocAI is a zero-server, zero-signup AI chat client built on{' '}
                <a href="https://github.com/mlc-ai/web-llm" className="underline">
                  MLC’s WebLLM
                </a>
                . All data and models live entirely in your browser—no remote servers, no accounts.
                If you clear your IndexedDB or switch devices, your chats and models will be lost.
              </p>
              <p>
                <strong>Explore further:</strong>
                <ul className="list-disc list-inside">
                  <li>
                    WebLLM on GitHub:{' '}
                    <a href="https://github.com/mlc-ai/web-llm" className="underline">
                      github.com/mlc-ai/web-llm
                    </a>
                  </li>
                  <li>
                    Available models and specs:{' '}
                    <a href="https://mlc.ai/models" className="underline">
                      mlc.ai/models
                    </a>
                  </li>
                </ul>
              </p>
              <p>
                Once you’re on a compatible browser and device, return to LocAI to download and run
                models entirely in-browser—secure, private, and offline-capable.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
