import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const questions = [
    {
      question: "What is the KenroX?",
      answer:
        "The KenroX is an AI-powered tool that creates personalized exercise routines based on your fitness goals, fitness level, and time constraints.",
    },
    {
      question: "How does the KenroX work?",
      answer:
        "Simply enter your goals (such as weight loss, muscle gain, or endurance), select your fitness level, specify available wokrout days, and enter your height and weight. The AI will analyze your input and generate a balanced workout plan tailored to you.",
    },
    {
      question: "Is the workout plan safe for beginners?",
      answer:
        "Absolutely. The tool designs plans based on your fitness level and gradually increases intensity to help beginners build strength and confidence safely.",
    },
    {
      question: "How long does it take to generate a workout plan?",
      answer:
        "Your personalized workout plan is generated in seconds, so you can start working out immediately.",
    },
    {
      question: "Is there a limit to how many plans I can generate?",
      answer:
        "You can generate unlimited personalized workout plans for free — for now. Premium access will be introduced soon.",
    },
    {
      question: "Is the generated workout plan based on fitness science?",
      answer:"Our AI models are trained on expert-backed fitness protocols, ensuring your workout plan follows principles of progressive overload, recovery, and balanced muscle targeting.",
    },
    {
      question: "Is my personal data secure and private?",
      answer:"Absolutely. All inputs are encrypted in transit, and we never share your data with third parties. Your workout preferences and history remain confidential.",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-22 px-4 py-20">
      <h3 className="md:text-3xl text-lg font-bold text-primary-foreground font-sans uppercase text-center">
        Frequently asked questions
      </h3>

      <div className="mt-10 lg:w-3xl">
        <Accordion type="multiple" collapsible>
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`} className={"py-4"}>
              <AccordionTrigger className={'font-semibold dark:text-white text-primary'}>{question.question}</AccordionTrigger>
              <AccordionContent className={"font-sans text-muted-foreground"}>
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
