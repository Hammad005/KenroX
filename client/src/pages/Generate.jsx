import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Power } from "lucide-react";
import React, { useRef, useState } from "react";
import HeroWithBook from "../assets/Hero2.png";

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
  const [data, setData] = useState({
    age: null,
    height: "",
    weight: "",
    injuries: "",
    workout_days: [],
    fitness_goal: "",
    fitness_level: "",
  });

  const currentIndex = questions.findIndex(
    (q) => q.id === currentStep[currentStep.length - 1]
  );

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextId = questions[currentIndex + 1].id;
      setCurrentStep((prev) => [...prev, nextId]);
    } else if (currentIndex === questions.length - 1) {
      btnRef.current.click();
    }
  };

  const goBack = () => {
    if (currentStep.length > 1) {
      setCurrentStep((prev) => prev.slice(0, -1));
    }
  };

  const btnRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      height: data.height + " ft",
      weight: data.weight + " kgs",
    };

    setData(updatedData);

    console.log(updatedData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div className="relative flex items-center justify-center w-full lg:min-h-screen lg:mt-20 ">
        <div className="absolute -top-1/3 lg:translate-y-1/2 lg:block hidden">
          <img
            src={HeroWithBook}
            alt="hero"
            className="h-[300px] w-auto max-w-full object-contain"
          />
        </div>

        <Card className="py-0 md:w-1/2 w-full border-primary-foreground/50 z-10 shadow shadow-primary-foreground">
          <CardHeader className="border-b bg-secondary rounded-t-xl py-4 px-4 [.border-b]:pb-2">
            <CardTitle className="font-sans flex items-center gap-2">
              <Power className="size-5 text-primary-foreground animate-pulse" />
              Generate Your Plan
            </CardTitle>
            <CardDescription
              className={"text-muted-foreground font-sans text-[12px]"}
            >
              The ultimate grind system for warriors, Train Smarter with AI —
              Get Your Personalized Fitness & Diet Plan for Free.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0">
            <div className="flex flex-col items-center justify-center">
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
                            !isActive && isVisited
                              ? "bg-secondary-foreground"
                              : "bg-secondary"
                          }`}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="my-10 flex flex-col gap-3 items-start justify-start w-full px-6">
                <Label
                  htmlFor={questions[currentIndex].id}
                  className={"font-sans"}
                >
                  {questions[currentIndex].question}
                </Label>
                <form onSubmit={handleSubmit} className="mt-2 w-full">
                  {questions[currentIndex].id === "Age" && Age(setData, data)}
                  {questions[currentIndex].id === "Height" &&
                    Height(setData, data)}
                  {questions[currentIndex].id === "Weight" &&
                    Weight(setData, data)}
                  {questions[currentIndex].id === "Injuries" &&
                    Injuries(setData, data)}
                  {questions[currentIndex].id === "Workout Days" &&
                    WorkoutDays(setData, data)}
                  {questions[currentIndex].id === "Fitness Goals" &&
                    FitnessGoals(setData, data)}
                  {questions[currentIndex].id === "Fitness Level" &&
                    FitnessLevel(setData, data)}

                  <button type="submit" className="hidden" ref={btnRef} />
                </form>
              </div>
            </div>
          </CardContent>

          <CardFooter
            className={`border-t bg-secondary rounded-b-xl px-4 [.border-t]:pt-4 pb-4 gap-2 ${
              currentIndex === 0 ? "justify-end" : "justify-between"
            }`}
          >
            <Button
              variant="outline"
              onClick={goBack}
              className={`${currentIndex === 0 && "hidden"}`}
            >
              <ArrowLeft /> Back
            </Button>
            <Button onClick={goNext}>
              {currentIndex === questions.length - 1 ? (
                "Submit"
              ) : (
                <>
                  Next <ArrowRight />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Generate;

export const Age = (setData, data) => {
  return (
    <Input
      type="number"
      placeholder="Enter your age"
      value={data.age}
      onChange={(e) => setData({ ...data, age: e.target.value })}
    />
  );
};

export const Height = (setData, data) => {
  return (
    <Input
      type="number"
      placeholder="Enter your height in ft"
      value={data.height}
      onChange={(e) => setData({ ...data, height: e.target.value })}
    />
  );
};

export const Weight = (setData, data) => {
  return (
    <Input
      type="number"
      placeholder="Enter your weight in kgs"
      value={data.weight}
      onChange={(e) => setData({ ...data, weight: e.target.value })}
    />
  );
};

export const Injuries = (setData, data) => {
  return (
    <Textarea
      placeholder="Enter your injuries or allergies(if any)"
      value={data.injuries}
      onChange={(e) => setData({ ...data, injuries: e.target.value })}
    />
  );
};

export const WorkoutDays = (setData, data) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {days.map((day) => (
        <div key={day} className="flex items-center gap-2">
          <Checkbox
            checked={data.workout_days.includes(day)}
            onCheckedChange={(checked) => {
              if (checked) {
                setData({ ...data, workout_days: [...data.workout_days, day] });
              } else {
                setData({
                  ...data,
                  workout_days: data.workout_days.filter((d) => d !== day),
                });
              }
            }}
          />
          <span
            key={day}
            className="text-sm font-semibold text-muted-foreground"
          >
            {day}
          </span>
        </div>
      ))}
    </div>
  );
};

export const FitnessGoals = (setData, data) => {
  return (
    <Input
      type="text"
      placeholder="Enter your fitness goals"
      value={data.fitness_goal}
      onChange={(e) => setData({ ...data, fitness_goal: e.target.value })}
    />
  );
};

export const FitnessLevel = (setData, data) => {
  return (
    <Input
      type="text"
      placeholder="Enter your fitness level"
      value={data.fitness_level}
      onChange={(e) => setData({ ...data, fitness_level: e.target.value })}
    />
  );
};
