import { Drawer, DrawerBody, DrawerContent } from '@heroui/drawer'
import type { ModalProps } from '@heroui/modal'
import { cn } from '@heroui/react'
import useSidebarDrawer from '@lib/hooks/useSidebarDrawer'
import React from 'react'

const SidebarDrawer = React.forwardRef<
  HTMLDivElement,
  ModalProps & {
    sidebarWidth?: number
    sidebarPlacement?: 'left' | 'right'
  }
>(
  (
    {
      children,
      className,
      onOpenChange,
      isOpen,
      sidebarWidth = 288,
      classNames = {},
      sidebarPlacement = 'left',
      motionProps: drawerMotionProps,
      ...props
    },
    ref,
  ) => {
    const { motionProps } = useSidebarDrawer({
      sidebarWidth,
      sidebarPlacement,
      drawerMotionProps,
    })
    return (
      <>
        <Drawer
          ref={ref}
          {...props}
          classNames={{
            ...classNames,
            wrapper: cn('w-(--sidebar-width)!', classNames?.wrapper, {
              'items-start! justify-start! ': sidebarPlacement === 'left',
              'items-end! justify-end!': sidebarPlacement === 'right',
            }),
            base: cn(
              'w-(--sidebar-width) m-0! p-0 h-full max-h-full',
              classNames?.base,
              className,
              {
                'inset-y-0 left-0 max-h-none rounded-l-none justify-start!':
                  sidebarPlacement === 'left',
                'inset-y-0 right-0 max-h-none rounded-r-none justify-end!':
                  sidebarPlacement === 'right',
              },
            ),
            body: cn('p-0', classNames?.body),
            closeButton: cn('z-50', classNames?.closeButton),
          }}
          isOpen={isOpen}
          motionProps={motionProps}
          radius="none"
          scrollBehavior="inside"
          style={{
            // @ts-expect-error
            '--sidebar-width': `${sidebarWidth}px`,
          }}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </Drawer>
        <div
          className={cn(
            'hidden h-full max-w-(--sidebar-width) overflow-x-hidden  sm:flex',
            className,
          )}
        >
          {children}
        </div>
      </>
    )
  },
)

SidebarDrawer.displayName = 'SidebarDrawer'

export default SidebarDrawer
