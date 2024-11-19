"use client"

import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '@/components/assets/lottie/loading.json'

interface LoadingLottieProps {
  width?: string | number
  height?: string | number
  className?: string
}

const LoadingLottie = ({
  width = 100,
  height = 100,
  className = ''
}: LoadingLottieProps) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className}`}>
      <Lottie
        animationData={loadingAnimation}
        style={{
          width: width,
          height: height
        }}
      />
    </div>
  )
}

export default LoadingLottie
