import React, { ReactNode } from 'react';

interface AccordionProps<Tdata> {
  questions: Tdata[] | ReactNode; // Questions can be an array of Tdata or a ReactNode
  answers: string | Tdata[] | ReactNode; // Answers can be a string, an array of Tdata, or a ReactNode
  icon: ReactNode; // Icon is a React node for flexibility
  handleFaqClick: (index: number) => void; // Function that handles clicks, passing the question index
}

const Accordion = <Tdata extends string | number | ReactNode>({
  questions,
  answers,
  icon,
  handleFaqClick,
}: AccordionProps<Tdata>) => {
  return (
    <div>
      {Array.isArray(questions) && questions.map((question, index) => (
        <div key={index} onClick={() => handleFaqClick(index)}>
          <div className="flex items-center">
            {icon}
            <div>{question}</div>
          </div>
          {/* Check if answers is an array before accessing an index */}
          <div>{Array.isArray(answers) ? answers[index] : answers}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
