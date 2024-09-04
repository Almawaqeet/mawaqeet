import React, { ReactNode, useState, useEffect } from 'react'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import { payment } from '../contents/payment'
import Paragraph from '../libs/utilities/Paragraph'
import PayInfo from './PayInfo'
import AppInfo from './AppInfo'

const Payment = () => {
  // Set the initial state to index 0
  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(<PayInfo />);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  useEffect(() => {

    setSelectedComponent(<PayInfo />);
  }, []);

  const handlePayment = (i: number) => {
    setSelectedNumber(i);
    setSelectedComponent(i === 0 ? <PayInfo /> : <AppInfo />);
  }

  return (
    <div>
      <section className={`max-w-[2000px] m-auto ${whiteSpaces.paddingY}`}>
        <main className={`${whiteSpaces.paddingX} xmd:pt-[89px] md:pt-[79px]`}>
          {payment.map((itm) => (
            <div className='flex gap-9' key={itm.id}>
              {itm.content.map((cont, index) => (
                <Paragraph
                  type='global'
                  key={`${cont.id}--`}
                  classname={`font-dejavu xmd:pb-10 md:pb-[58px] cursor-pointer ${selectedNumber === index ? 'font-bold text-black text-Bold-1-clamp' : 'text-[#848484]'}`}
                  onClick={() => handlePayment(index)}
                >
                  {cont.item}
                </Paragraph>
              ))}
            </div>
          ))}

          
        </main>
      </section>
      {selectedNumber && selectedComponent ? <AppInfo /> : <PayInfo />}
    </div>
  )
}

export default Payment;

