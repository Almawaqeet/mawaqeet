"use client"

import React from 'react'
import Lottie from 'lottie-react'
import successAnimation from '@/components/Assets/success.json'

interface SuccessLottieProps {
  width?: string | number
  height?: string | number
  className?: string
}

const SuccessLottie = ({
  width = 100,
  height = 100,
  className = ''
}: SuccessLottieProps) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className}`}>
      <Lottie
        animationData={successAnimation}
        style={{
          width: width,
          height: height
        }}
      />
    </div>
  )
}

export default SuccessLottie
