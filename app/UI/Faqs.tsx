import { GoPlus } from 'react-icons/go';
import { FaMinus } from 'react-icons/fa';
import React from 'react';
import { useState } from 'react';


import { faqs, faqs_1, faqs_1_1 } from '../contents/faqs';

import SlantDiv from './SlantDiv';
import Accordion from './Accordion';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';

const Faqs = () => {
  const [isSelected, setSelected] = useState<number | null>(null);
  const [isSelected_1, setSelected_1] = useState<boolean | null>(null);
  const [answer1, setAnswer1] = useState<boolean | null>(null);

  const handleFaqsClick = (i:number) => {
    if (isSelected === i) {
      return setSelected(null);
    }
    setSelected(i);
    setSelected_1(null);
  };

  const handleFaqsClick_1 = () => {
    setSelected_1((open) => !open);
    setSelected(null);
  };

  // find questions and answers inside faq_1 and faq array

  const findquestions = faqs.find((faq) => faq?.id === 'questions');
  const findanswers = faqs.find((faq) => faq?.id === 'answers');
  return (
    <section
      className={`xmd:max-w-[800px] m-auto ${whiteSpaces.sectionMargin} ${whiteSpaces.paddingX} `}
    >
      <SlantDiv className={'xmd:before:w-[50px]'}>
        <Headings
          type={'sectionName'}
          classname="text-center xmd:mb-[84px] md:mb[76px]"
        >
          Faqs
        </Headings>
      </SlantDiv>

      {/* first question and answer */}
      <Accordion
        key="accordion-1"
        questions={faqs_1.map((que) => (
          <p
            key={`${que.id}-que`}
            onClick={() => handleFaqsClick_1()}
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
                  className={`py-[1px]
    ${index === 0 ? 'list-disc' : ''}  
    ${answer1 && index > 0 ? 'list-disc' : ''}  
  `}
                >
                  {/* Content based on index and answer1 state */}
                  {(index === 0 || answer1) && itm.content_1}
                  {index === 1 && (
                    <span>
                      {' '}
                      <button
                        className={`text-number-color `}
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
        
        icon={isSelected_1 ? <GoPlus /> : <FaMinus />}
        handleFaqClick={() => handleFaqsClick_1()}
      />

      {/* rest question and answer */}
      {findquestions?.contents.map((que, index) => (
        <>
          <Accordion
            key="accordion-2"
            questions={
              <p
                key={`ques-${que.id}`}
                onClick={() => handleFaqsClick(index)}
                className="font-normal mobile:text-fz-xs xmd:text-fz-xsm md:leading- md:text-[20px] xmd:leading-5 xmd:tracking-[0.12px] text-[#000000]"
              >
                {que.content}
              </p>
            }
            //   render questions according to question index
            answers={
              <li>
                {isSelected === index
                  ? findanswers?.contents[index].content
                  : ''}
              </li>
            }
            icon={isSelected === index ? <GoPlus /> : <FaMinus />}
            handleFaqClick={() => handleFaqsClick(index)}
          />
        </>
      ))}
    </section>
  );
};

export default Faqs;
