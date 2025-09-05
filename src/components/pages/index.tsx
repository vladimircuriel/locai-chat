import PromptInputFullLineWithBottomActions from '@components/inputs/PromptInputFullLineWithBottomActions'
import PromptInputWithActions from '@components/inputs/PromptInputWithActions'
import SidebarWithConversations from '@components/navigation/sidebar/SidebarWithConversations'
import { getAmountOfConversations } from '@lib/db/conversation.db'
import { useEffect, useState } from 'react'

export function useIndexPage() {
  const [amountOfConversations, setAmountOfConversations] = useState<number>(0)

  useEffect(() => {
    async function fetchAmountOfConversations() {
      const amount = await getAmountOfConversations()
      setAmountOfConversations(amount)
    }
    fetchAmountOfConversations()
  }, [])

  return { amountOfConversations, setAmountOfConversations }
}

export default function Index() {
  const { amountOfConversations, setAmountOfConversations } = useIndexPage()

  return (
    <>
      {amountOfConversations === 0 && (
        <div className="flex h-screen max-h-[calc(100vh-140px)] w-full">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-xl flex-col items-center gap-8">
              <h1 className="text-default-foreground text-3xl leading-9 font-bold">LocAI Chat</h1>
              <div className="flex w-full flex-col gap-4">
                <PromptInputFullLineWithBottomActions
                  setAmountOfConversations={setAmountOfConversations}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {amountOfConversations > 0 && (
        <div className="h-dvh w-full max-w-full">
          <SidebarWithConversations
            setAmountOfConversations={setAmountOfConversations}
            classNames={{
              header: 'min-h-[40px] h-[40px] py-[12px] justify-center overflow-hidden',
            }}
          >
            <div className="relative flex h-full flex-col px-4">
              <div className="flex h-full flex-col items-center justify-center gap-10">
                <div className="bg-foreground flex rounded-full">
                  <svg
                    className="text-background"
                    fill="none"
                    height="56"
                    viewBox="0 0 56 64"
                    width="56"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>
                      LocAI Logo - A location pin combined with an AI symbolizing intelligent
                    </title>
                    <path
                      clip-rule="evenodd"
                      d="M30.8843 21.7283L27.7874 16.2952L12.3021 43.4623H18.4236L30.8843 21.7283ZM34.7896 28.5799L31.6925 34.097L33.9395 38.0394H29.4793L26.4348 43.4623H43.2726L34.7896 28.5799Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-auto flex max-w-full flex-col gap-2">
                <PromptInputWithActions />
                <p className="text-small text-default-500 px-2 text-center leading-5 font-medium">
                  LocAI can make mistakes. Check important info.
                </p>
              </div>
            </div>
          </SidebarWithConversations>
        </div>
      )}
    </>
  )
}
