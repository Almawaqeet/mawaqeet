"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { brandColors } from "@/constants/BrandConstants"

/**
 * A customizable button component with various styles and animations
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.variant="default"] - Button style variant ("default" | "outline" | "ghost" | "link")
 * @param {string} [props.size="default"] - Button size ("default" | "sm" | "lg" | "icon")
 * @param {boolean} [props.isLoading=false] - Whether to show loading spinner
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 */
interface ButtonProps  {
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "default",
    size = "default",
    isLoading = false,
    children,
    disabled = false,
    icon,
    onClick,
    ...props
  }, ref) => {

    const baseStyles = {
      default: `bg-${brandColors.dark_brown} text-${brandColors.white} hover:bg-gray-800`,
      outline: `border border-${brandColors.dark_brown} hover:bg-gray-100`,
      ghost: `hover:bg-${brandColors.dark_brown}`,
      link: `text-${brandColors.dark_brown} underline-offset-4 hover:underline`
    }

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    }

    return (
      <motion.button
        className={cn(
          "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer",
          baseStyles[variant],
          !isLoading && sizeStyles[size],
          isLoading && "w-10 h-10 p-0 rounded-full",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        animate={{
          scale: isLoading ? 0.8 : 1,
          transition: {
            duration: 0.2
          }
        }}
        whileHover={{
          scale: 1.05,
          transition: {
            duration: 0.2
          }
        }}
        whileTap={{
          scale: 0.95,
          transition: {
            duration: 0.2
          }
        }}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <motion.div
            className="min-w-5 min-h-5 flex items-center justify-center border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ) : (
          <>
            {children}
            {icon}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button, type ButtonProps }
