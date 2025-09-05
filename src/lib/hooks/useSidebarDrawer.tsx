import { TRANSITION_EASINGS } from '@heroui/framer-utils'
import type { ModalProps } from '@heroui/modal'
import { useMemo } from 'react'

type UserSidebarDrawerProps = Readonly<{
  sidebarWidth?: number
  sidebarPlacement?: 'left' | 'right'
  drawerMotionProps?: ModalProps['motionProps']
}>

export default function useSidebarDrawer({
  sidebarWidth = 288,
  sidebarPlacement = 'left',
  drawerMotionProps,
}: UserSidebarDrawerProps) {
  const motionProps = useMemo(() => {
    if (!!drawerMotionProps && typeof drawerMotionProps === 'object') {
      return drawerMotionProps
    }

    return {
      variants: {
        enter: {
          x: 0,
          transition: {
            x: {
              duration: 0.3,
              ease: TRANSITION_EASINGS.easeOut,
            },
          },
        },
        exit: {
          x: sidebarPlacement === 'left' ? -sidebarWidth : sidebarWidth,
          transition: {
            x: {
              duration: 0.2,
              ease: TRANSITION_EASINGS.easeOut,
            },
          },
        },
      },
    }
  }, [sidebarWidth, sidebarPlacement, drawerMotionProps])

  return { motionProps }
}
