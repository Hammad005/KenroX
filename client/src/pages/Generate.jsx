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
import { ArrowLeft, ArrowRight, Check, Power } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import HeroWithBook from "../assets/Hero2.png";
import { toast } from "sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GeneratePlanLoading from "@/components/GeneratePlanLoading";
import { useNavigate } from "react-router-dom";
import { planStore } from "@/store/planStore";

const Generate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const cardRef = useRef();
  const animationEndRef = useRef();
  const navigateTo = useNavigate();
  const [switchToGenerate, setSwitchToGenerate] = useState(false);

  const { generatePlan } = planStore();

  const questions = [
    { id: "age", question: "What is your age?" },
    { id: "height", question: "What is your height(in ft)?" },
    { id: "weight", question: "What is your current body weight(in kg)?" },
    { id: "injuries", question: "Do you have any injuries or allergies?" },
    {
      id: "workout_days",
      question: "Which days do you plan to work out each week?",
    },
    {
      id: "fitness_goal",
      question:
        "What are your fitness goals - (such as weight loss, muscle gain, or endurance)?",
    },
    {
      id: "fitness_level",
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

  const btnRef = useRef();

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

  const checkDisabled = () => {
    if (currentStep.includes("age") && !data.age) {
      return true;
    } else if (currentStep.includes("height") && !data.height) {
      return true;
    } else if (currentStep.includes("weight") && !data.weight) {
      return true;
    } else if (currentStep.includes("injuries") && !data.injuries) {
      return true;
    } else if (currentStep.includes("workout_days") && !data.workout_days) {
      return true;
    } else if (currentStep.includes("fitness_goal") && !data.fitness_goal) {
      return true;
    } else if (currentStep.includes("fitness_level") && !data.fitness_level) {
      return true;
    } else {
      return false;
    }
  };

  // Intro animation
  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  // Outro animation stored in ref (for manual trigger)
  useGSAP(() => {
    if (!cardRef.current) return;
    const tl = gsap.timeline({ paused: true });
    tl.to(cardRef.current, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power4.out",
      onComplete: () => setSwitchToGenerate(true),
    });
    animationEndRef.current = tl;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.age ||
      !data.height ||
      !data.weight ||
      !data.injuries ||
      !Array.isArray(data.workout_days) ||
      data.workout_days.length === 0 ||
      !data.fitness_goal ||
      !data.fitness_level
    ) {
      return toast.error("Please answer all the questions.");
    }

    if (data.age < 13) {
      setCurrentStep([questions[0].id]);
      return toast.warning("You must be at least 13 years old.");
    }

    const updatedData = {
      ...data,
      height: data.height + "ft",
      weight: data.weight + "kgs",
    };

    setData(updatedData);

    animationEndRef?.current?.play();

    const res = await generatePlan(updatedData);
    if (res?.success) {
      setData({
        age: null,
        height: "",
        weight: "",
        injuries: "",
        workout_days: [],
        fitness_goal: "",
        fitness_level: "",
      });
      navigateTo("/profile");
      setSwitchToGenerate(false);
      setCurrentStep([questions[0].id]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div className="flex items-center justify-center w-full">
        {switchToGenerate ? (
          <GeneratePlanLoading />
        ) : (
          <Card
            ref={cardRef}
            className="py-0 md:w-1/2 w-full border-primary-foreground/50 z-10 shadow shadow-primary-foreground gap-0"
          >
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
                <ul className="flex flex-wrap items-center justify-center w-full my-5">
                  {questions.map((q, index) => {
                    const isVisited = currentStep.includes(q.id);
                    const isActive =
                      q.id === currentStep[currentStep.length - 1];

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
                          {Array.isArray(data[q.id]) ? (
                            data[q.id].length > 0 ? (
                              <Check className="size-5" />
                            ) : (
                              index + 1
                            )
                          ) : data[q.id] ? (
                            <Check className="size-5" />
                          ) : (
                            index + 1
                          )}
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

                <div className="flex w-full justify-between lg:items-center items-end">
                  {/* Left Image Section */}
                  <div className="flex h-[200px] w-1/3 items-end justify-center object-contain">
                    <img
                      src={HeroWithBook}
                      alt="Hero"
                      className="h-auto w-auto  object-cover"
                    />
                  </div>

                  {/* Right Form Section */}
                  <div className="flex h-[200px] w-full flex-col items-start justify-center gap-3 px-2">
                    <Label
                      htmlFor={questions[currentIndex].id}
                      className="font-sans text-xs md:text-sm"
                    >
                      {questions[currentIndex].question}
                    </Label>

                    <form onSubmit={handleSubmit} className="w-full">
                      {questions[currentIndex].id === "age" &&
                        Age(setData, data)}
                      {questions[currentIndex].id === "height" &&
                        Height(setData, data)}
                      {questions[currentIndex].id === "weight" &&
                        Weight(setData, data)}
                      {questions[currentIndex].id === "injuries" &&
                        Injuries(setData, data)}
                      {questions[currentIndex].id === "workout_days" &&
                        WorkoutDays(setData, data)}
                      {questions[currentIndex].id === "fitness_goal" &&
                        FitnessGoals(setData, data)}
                      {questions[currentIndex].id === "fitness_level" &&
                        FitnessLevel(setData, data)}

                      {/* Hidden button to allow form submit via ref */}
                      <button type="submit" className="hidden" ref={btnRef} />
                    </form>
                  </div>
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
              <Button disabled={checkDisabled()} onClick={goNext}>
                {currentIndex === questions.length - 1 ? (
                  "Generate"
                ) : (
                  <>
                    Next <ArrowRight />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Generate;

export const Age = (setData, data) => {
  return (
    <>
      <Input
        type="number"
        placeholder="Enter your age"
        value={data.age}
        onChange={(e) =>
          setData({
            ...data,
            age: e.target.value === "" ? null : Number(e.target.value),
          })
        }
      />
      <p className="text-[10px] text-muted-foreground pt-2 text-end w-full">
        Age must be greater than or equal to 13.
      </p>
    </>
  );
};

export const Height = (setData, data) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Enter your height in ft"
        value={data.height}
        onChange={(e) => setData({ ...data, height: e.target.value })}
      />
      <p className="text-[10px] text-muted-foreground pt-2 text-end w-full">
        Don't add "ft" or "feet" in your height field.
      </p>
    </>
  );
};

export const Weight = (setData, data) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Enter your weight in kgs"
        value={data.weight}
        onChange={(e) => setData({ ...data, weight: e.target.value })}
      />
      <p className="text-[10px] text-muted-foreground pt-2 text-end w-full">
        Don't add "kg" or "kgs" in your weight field.
      </p>
    </>
  );
};

export const Injuries = (setData, data) => {
  return (
    <>
      <Textarea
        placeholder="Enter your injuries or allergies(if any)"
        value={data.injuries}
        onChange={(e) => setData({ ...data, injuries: e.target.value })}
        className={"text-xs"}
      />
      <p className="text-[10px] text-muted-foreground pt-2 text-end w-full">
        Enter your injuries or allergies(if any).
      </p>
    </>
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
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
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
    <>
      <Textarea
        placeholder="Enter your fitness goal"
        value={data.fitness_goal}
        onChange={(e) => setData({ ...data, fitness_goal: e.target.value })}
        className={"text-xs"}
      />
      <p className="text-[10px] text-muted-foreground pt-2 text-end w-full">
        Fitness goal like (Lose Weight, Gain Strength, Improve Flexibility).
      </p>
    </>
  );
};

export const FitnessLevel = (setData, data) => {
  const levels = ["Beginner", "Intermediate", "Advanced"];
  return (
    <>
      <div className="grid gap-3">
        {levels.map((level) => (
          <div key={level} className="flex items-center gap-2">
            <Checkbox
              checked={data.fitness_level === level}
              onCheckedChange={(checked) => {
                if (checked) {
                  setData({ ...data, fitness_level: level });
                } else {
                  setData({ ...data, fitness_level: "" });
                }
              }}
            />
            <span
              key={level}
              className="text-sm font-semibold text-muted-foreground"
            >
              {level}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
