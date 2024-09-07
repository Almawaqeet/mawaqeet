import React, { ReactNode } from 'react'
import PackagesContent from './PackagesContent'

type props = {
    index: number
    selectComponent: ReactNode
}

const PackageInfo: React.FC<props> = ({ index, selectComponent }) => {
  return (
    <div>
        {selectComponent === index ?  <PackagesContent offstyle='hidden' offheight='mobile:h-[700px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' /> : <PackagesContent />}
    </div>
  )
}

export default PackageInfo