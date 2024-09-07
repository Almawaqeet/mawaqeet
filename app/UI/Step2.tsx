import React, { ReactNode, useEffect, useState } from 'react'
import Paragraph from '../libs/utilities/Paragraph'
import { apptype, packtype } from '../contents/payment'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import PackagesContent from './PackagesContent'
import { useAppInfo } from '../libs/hooks/useAppInfo'
import PackageInfo from './PackageInfo'

const Step2: React.FC = () => {
  const [isSelected, setSelected] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(<PackagesContent />)

  useEffect(() => {
    setSelectedComponent(<PackagesContent />)
    updateComponent(selectedNumber)
  }, [])



  const handleClick = (i: number) => {
    if (isSelected !== i) {
      setSelected(i)
    }
  };

  const handleSelect = (i: number) => {
    if (selectedNumber !== i) {
      setSelectedNumber(i)
    }
  };

  const updateComponent = (step: number) => {
    switch (step) {
      case 0:
        setSelectedComponent(<PackagesContent offstyle='hidden' offheight='mobile:h-[700px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' />)
        break;
      case 1:
        setSelectedComponent(<PackagesContent />)
        break;
      default:
        setSelectedComponent(<PackagesContent offstyle='hidden' offheight='mobile:h-[700px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' />)
        break;
    }
  };
  
  return (
    <section className=''>
      <main className={`${whiteSpaces.paddingX}`}>
        <Paragraph type='globalBold' classname='text-Bold-1-clamp font-bold tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu'>Select Package</Paragraph>





        <div className='grid grid-cols-2 gap-4 xmd:pb-16'>
  {packtype.map((app, i) => (
    <div className='w-full' key={app.id}>
      <div
        className={`xmd:px-6 xmd:py-3 rounded-sm cursor-pointer ${selectedNumber === i ? 'bg-hover-color text-white' : 'bg-white'}`}
        onClick={() => { handleSelect(i); updateComponent(i); }}>
        <Paragraph
          type='global'
          classname={`text-quote-clamp font-normal xmd:text-center md:text-start leading-5 tracking-tight font-dejavu`}
        >
          {app.content}
        </Paragraph>
      </div>
    </div>
  ))}
</div>

{/* Render PackageInfo for the selected index only
<PackageInfo index={selectedNumber} selectedIndex={selectedNumber} /> */}


        {/* <div className='flex xmd:gap-9'>
          {apptype.map((typ, index) => (
            <span key={`${typ.id}-span`} className='flex xmd:gap-5'>
              <input
                className={`xmd:w-[18px] xmd:h-[18px] rounded-full border-[1px] border-[#848484] ${isSelected === index ? 'radiostyle' : ''}`}
                type='radio'
                checked={isSelected === index}
                onClick={() => handleClick(index)}
              />
              <Paragraph type='global'
                key={`${typ.id}-typ`}
                classname='text-Bold-1-clamp font-normal tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu'
              >
                {typ.content}
              </Paragraph>
            </span>
          ))}
        </div> */}

        {packtype.map((app, index) => (
          <PackageInfo key={app.content} index={index} selectComponent={selectedComponent} />
        ))}

        {/* <div className={`grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]`}>

          {selectedComponent ? <PackagesContent offstyle='hidden' offheight='mobile:h-[700px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' /> : <PackagesContent />}

        </div> */}
      </main>
    </section>
  )
}

export default Step2