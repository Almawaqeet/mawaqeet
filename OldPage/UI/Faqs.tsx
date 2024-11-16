import React, { useState } from 'react';
import { faqs, faqs_1, faqs_1_1 } from '../contents/faqs';
import SlantDiv from './SlantDiv';
import Accordion from './Accordion';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import Headings from '../utilities/Headings';
import { FaMinus } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';

const Faqs = () => {
  const [isSelected, setSelected] = useState<number | null>(null);
  const [isSelected_1, setSelected_1] = useState<boolean | null>(null);
  const [answer1, setAnswer1] = useState<boolean | null>(null);

  const handleFaqsClick = (i: number) => {
    setSelected(isSelected === i ? null : i);
    setSelected_1(null);
  };

  const handleFaqsClick_1 = () => {
    setSelected_1((open) => !open);
    setSelected(null);
  };

  const findquestions = faqs.find((faq) => faq.id === 'questions');
  const findanswers = faqs.find((faq) => faq.id === 'answers');

  return (
    <section className={`xmd:max-w-[800px] m-auto ${whiteSpaces.sectionMargin}  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] `} id='faqs'>
      <SlantDiv className={'xmd:before:w-[50px]'}>
        <Headings
          type={'sectionName'}
          classname="text-center xmd:mb-[84px] md:mb[76px]"
        >
          Faqs
        </Headings>
      </SlantDiv>

      {/* First question and answer */}
      <Accordion
        key="accordion-1"
        questions={faqs_1.map((que) => (
          <p
            key={`${que.id}-que`}
            onClick={handleFaqsClick_1}
            className="font-normal mobile:text-fz-xs xmd:text-fz-xsm md:leading-[50px] md:text-fz-sm xmd:leading-5 xmd:tracking-[0.12px] text-[#000000]"
          >
            {que.question_1}
          </p>
        ))}
        answers={
          isSelected_1
            ? faqs_1_1.map((itm, index) => (
              <li
              key={`itm-${itm.id}`}
              className={`py-[1px] ${answer1 ? 'list-disc' : 'list-none'}`}
            >
                  {(index === 0 || answer1) && itm.content_1}
                  {index === 1 && (
                    <span>
                      <button
                        className="text-number-color"
                        onClick={() => setAnswer1((close) => !close)}
                      >
                        {answer1 ? `View less` : 'view more'}
                      </button>
                      <span
                        className="text-number-color"
                        onClick={() => setAnswer1((close) => !close)}
                      >
                        &gt;&gt;&gt;
                      </span>
                    </span>
                  )}
                </li>
              ))
            : ''
        }
        icon={isSelected_1 ? <GoPlus onClick={() => handleFaqsClick_1()} className='text-white absolute left-1/2 transform -translate-x-1/2  md:w-10 md:h-6 top-1/4'/> : <FaMinus onClick={() => handleFaqsClick_1()} className='text-white absolute left-1/2 transform -translate-x-1/2  w-8 h-4 top-1/4'/>}
        handleFaqClick={handleFaqsClick_1}

      />

      {/* Rest of the questions and answers */}
      {findquestions?.contents.map((que, index) => (
        <Accordion
          key={`accordion-${que.id}`}
          questions={
            <p
              key={`ques-${que.id}`}
              onClick={() => handleFaqsClick(index)}
              className={`font-normal mobile:text-fz-xs xmd:text-fz-xsm md:leading- md:text-[20px] xmd:leading-5 xmd:tracking-[0.12px] text-[#000000] `}
            >
              {que.content}
            </p>
          }
          answers={
            <li className={`${isSelected === index ? 'list-disc' : 'list-none'}`}>
              {isSelected === index ? findanswers?.contents[index].content : ''}
            </li>
          }
          icon={isSelected === index ? <GoPlus onClick={() => handleFaqsClick(index)} className='text-white absolute left-1/2 transform -translate-x-1/2  md:w-10 md:h-6 top-1/4'/> : <FaMinus onClick={() => handleFaqsClick(index)} className='text-white absolute left-1/2 transform -translate-x-1/2  w-8 h-4 top-1/4'/>}
          handleFaqClick={() => handleFaqsClick(index)}
        />
      ))}
    </section>
  );

};

export default Faqs;
