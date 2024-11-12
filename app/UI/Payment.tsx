import React, { ReactNode, useState, useEffect } from 'react'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import { payment } from '../contents/payment'
import Paragraph from '../libs/utilities/Paragraph'
import PayInfo from './PayInfo'
import AppInfo from './ApplicationForm'

const Payment = () => {
  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(<PayInfo />);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  useEffect(() => {

    setSelectedComponent(<PayInfo />);
  }, []);

  const handlePayment = (i: number) => {
    setSelectedNumber(i);
    setSelectedComponent(i === 1 ? <PayInfo /> : <AppInfo />);
  }

  return (
    <div>
      <section className={`max-w-[2000px] m-auto ${whiteSpaces.paddingY}`}>
        <main className={`${whiteSpaces.paddingX} xmd:pt-[89px] md:pt-[79px]`}>
          {payment.map((itm) => (
            <div className='flex gap-9' key={itm.id}>
              {itm.content.map((cont) => (
                <Paragraph
                  type='global'
                  key={`${cont.id}--`}
                  classname={`  xmd:pb-10 md:pb-[58px] cursor-pointer ${selectedNumber === itm.id ? 'font-bold text-black text-Bold-1-clamp' : 'text-[#848484]'}`}
                  onClick={() => handlePayment(itm.id)}
                >
                  {cont.item}
                </Paragraph>
              ))}
            </div>
          ))}

          {/* <div className=''>
            <ConfirmPayment image={'/images/Animation-pay.png'} className='absolute w-3/4 top-1 left-1/2 transform -translate-x-1/2 z-10' />
          </div> */}
        </main>
      </section>
      {selectedNumber && selectedComponent ? <PayInfo /> : <AppInfo />}
    </div>
  )
}

export default Payment;
