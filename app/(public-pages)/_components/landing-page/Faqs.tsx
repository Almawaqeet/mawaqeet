'use client';
import React, { useState } from 'react';
import { motion } from "framer-motion"
import AppHeading from '@/components/reusables/AppHeading';
import { faqs } from '@/old-pages/contents/faqs';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (idx: number) => {
        setActiveIndex(activeIndex === idx ? activeIndex : idx);

    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section className={`${whiteSpaces.paddingX} py-4 md:py-16`}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <AppHeading
                    variant="h2"
                    className="text-2xl sm:text-3xl md:text-4xl text-brand-color text-center mb-4"
                >
                    FAQS
                </AppHeading>

                {faqs.map((itm) =>
                    itm.contents.map((eachitm, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                           
                        >
                            <Accordion
                                type="single"
                                collapsible
                                className="bg-white hover:bg-[#F2EDE8] p-2 rounded-lg hover:shadow-lg transition-shadow duration-300 lg:w-4/6 sm:w-full  grid m-auto xmd:mb-2 md:mb-4"
                                key={`${eachitm.id}-${idx}`}
                            >
                                <AccordionItem value={`item-${idx}`}>
                                    <AccordionTrigger
                                        className="flex justify-between w-full"
                                        onClick={() => handleToggle(idx)}
                                    >
                                        <h3 className="text-lg font-semibold text-brand-color xmd:text-start md:text-center">
                                            {eachitm.question || eachitm.question_1}
                                        </h3>
                                        {activeIndex === idx ? <ChevronDown /> : <ChevronUp />}
                                    </AccordionTrigger>
                                    <AccordionContent className={`${activeIndex === idx && `border-t-[1px] border-t-brand-color`} text-sm text-start mb-1 pb-1`}>
                                        {activeIndex === idx && (
                                            <>
                                                {eachitm.answer_1 && <li className='list-disc'>{eachitm.answer_1}</li>}
                                                {eachitm.answer_2 && <li className='list-disc'>{eachitm.answer_2}</li>}
                                                {eachitm.answer_3 && <li className='list-disc'>{eachitm.answer_3}</li>}
                                                {eachitm.answer_4 && <li className='list-disc'>{eachitm.answer_4}</li>}
                                                {eachitm.answer_5 && <li className='list-disc'>{eachitm.answer_5}</li>}
                                                {eachitm.answer_6 && <li className='list-disc'>{eachitm.answer_6}</li>}
                                                {eachitm.answer_7 && <li className='list-disc'>{eachitm.answer_7}</li>}
                                                {eachitm.answer && <li className='list-disc'>{eachitm.answer}</li>}
                                            </>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </motion.div>
                    ))
                )}

            </motion.div>
        </section>
    );
};

export default Faqs;
