import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Power } from "lucide-react";
import React, { useState } from "react";

const Generate = () => {
  const questions = [
    { id: "Age", question: "What is your age?" },
    { id: "Height", question: "What is your height(in ft)?" },
    { id: "Weight", question: "What is your current body weight(in kg)?" },
    { id: "Injuries", question: "Do you have any injuries or allergies?" },
    {
      id: "Workout Days",
      question: "Which days do you plan to work out each week?",
    },
    {
      id: "Fitness Goals",
      question:
        "What are your fitness goals - (such as weight loss, muscle gain, or endurance)?",
    },
    {
      id: "Fitness Level",
      question:
        "What is your fitness level - (beginner, intermediate, or advanced)?",
    },
  ];

  const [currentStep, setCurrentStep] = useState([questions[0].id]);

  const currentIndex = questions.findIndex(
    (q) => q.id === currentStep[currentStep.length - 1]
  );

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextId = questions[currentIndex + 1].id;
      setCurrentStep((prev) => [...prev, nextId]);
    }
  };

  const goBack = () => {
    if (currentStep.length > 1) {
      setCurrentStep((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div className="flex items-center justify-center w-full">
        <Card className="py-0 md:w-1/2 w-full">
          <CardHeader className="border-b bg-secondary rounded-t-xl py-4 px-4 [.border-b]:pb-2">
            <CardTitle className="font-sans flex items-center gap-2">
              <Power className="size-5 text-primary-foreground animate-pulse" />
              Generate Your Plan
            </CardTitle>
          </CardHeader>

          <CardContent className="px-0">
            <div className="flex items-center justify-center">
              <ul className="flex flex-wrap items-center justify-center w-full">
                {questions.map((q, index) => {
                  const isVisited = currentStep.includes(q.id);
                  const isActive = q.id === currentStep[currentStep.length - 1];

                  return (
                    <li key={index} className="flex items-center">
                      <div
                        className={`size-8 text-base font-semibold flex items-center justify-center rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-secondary-foreground text-background"
                            : isVisited
                            ? "bg-secondary-foreground text-background"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {index !== questions.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 lg:min-w-[2rem] min-w-2 transition-all duration-200 ${
                            !isActive && isVisited ? "bg-secondary-foreground" : "bg-secondary"
                          }`}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>

          <CardFooter className={`border-t bg-secondary rounded-b-xl px-4 [.border-t]:pt-4 pb-4 gap-2 ${currentIndex === 0 ? "justify-end" : "justify-between"}`}>
            <Button
              variant="outline"
              onClick={goBack}
              className={`${currentIndex === 0 && "hidden"}`}
            >
              <ArrowLeft /> Back
            </Button>
            <Button
              onClick={goNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Generate;
