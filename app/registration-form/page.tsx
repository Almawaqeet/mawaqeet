'use client'
import { appForm, payment } from "@/app/contents/payment";
import { MbisProvider } from "@/app/libs/hooks/useContextProvider";
import { whiteSpaces } from "@/app/libs/utilities/GlobalSpaces";
import Paragraph from "@/app/libs/utilities/Paragraph";
import ApplicationForm from "./application/[[...steps]]/page";
import Navbar from "@/app/UI/Navbar";
import PayInfo from "@/app/UI/PayInfo";
import { ReactNode, useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  // Match the slug with the corresponding appForm content
  const pageSlug = appForm.find((item) => item.content === params.slug)?.content;

  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(null);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  useEffect(() => {
      if (pageSlug) {
          const index = appForm.findIndex(item => item.content === pageSlug);
          setSelectedNumber(index);
          setSelectedComponent(<ApplicationForm  />);
      }
  }, [pageSlug]);

  const handlePayment = (i: number) => {
      setSelectedNumber(i);
      setSelectedComponent(i === 0 ? <PayInfo /> : <ApplicationForm />);
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
              {selectedComponent ? selectedComponent : <ApplicationForm  />}
          </div>
      </MbisProvider>
  );
};

export default Page;
