"use client"

import React, { memo } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AppModalProps {
  trigger?: React.ReactNode
  title?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}

const AppModal = memo(({
  trigger = "",
  title,
  open,
  onOpenChange,
  children,
  className
}: AppModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={`${className ?? ''}`}
        style={{ backgroundColor: 'white', color: 'brand-color' }}
      >
        <AlertDialogHeader className="space-y-4">
          {title && (
            <AlertDialogTitle className="text-xl font-bold text-gray-900 text-center" >
              {title}
            </AlertDialogTitle>
          )}
          <div className="mt-2">
            {children}
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
})

AppModal.displayName = 'AppModal'

export default AppModal
