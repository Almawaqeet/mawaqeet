'use client'
import { ReactNode, useState } from "react";
import { payment } from "@/app/contents/payment";
import { MbisProvider } from "@/app/libs/hooks/useContextProvider";
import { whiteSpaces } from "@/app/libs/utilities/GlobalSpaces";
import Paragraph from "@/app/libs/utilities/Paragraph";
import ApplicationForm from "@/app/UI/ApplicationForm";
import Navbar from "@/app/UI/Navbar";
import PayInfo from "@/app/UI/PayInfo";


const Page = ({ params }: { params: { slug: string } }) => {

  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(null);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);


  const handlePayment = (i: number) => {
      setSelectedNumber(i);
      setSelectedComponent(i === 0 ?  <ApplicationForm /> : <PayInfo />);
  };

  return (
      <MbisProvider>
          <Navbar />
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
              {selectedComponent ? selectedComponent : <ApplicationForm />}
          </div>
      </MbisProvider>
  );
};

export default Page;