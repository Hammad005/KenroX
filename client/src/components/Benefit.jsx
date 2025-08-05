import { Activity, BicepsFlexed, Briefcase, Dumbbell, HeartPlus, Home, Sparkles, User, UserCog } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Benefit = ({user, setOpen}) => {
    const kenroxBenefits = [
  {
    title: "Personal Trainers",
    description:
      "Use KenroX to instantly generate fully customized workout and diet plans for your clients — based on their goals, body weught, and fitness level — saving time while improving results.",
    icon: UserCog
  },
  {
    title: "Fitness Coaches",
    description:
      "Streamline group programming with KenroX's smart tools that help create balanced workout and nutrition plans tailored to class needs and shared goals.",
    icon: Dumbbell
  },
  {
    title: "Gym Owners",
    description:
      "Enhance your gym's offerings by providing members access to KenroX-generated plans — empowering them with personalized fitness and meal guidance from day one.",
    icon: Home
  },
  {
    title: "Sports Teams",
    description:
      "Build athlete-specific training and nutrition plans with KenroX to support sport-focused performance, recovery, and conditioning — all backed by user data.",
    icon: Activity
  },
  {
    title: "Fitness Enthusiasts",
    description:
      "Let KenroX guide your fitness journey with custom-made workout and diet plans that adapt to your goals, preferences, and progress — no guesswork required.",
    icon: HeartPlus
  },
  {
    title: "Corporate Wellness Programs",
    description:
      "Support employee well-being with KenroX's automated wellness planning — personalized fitness and meal plans that align with workplace health goals and time constraints.",
    icon: Briefcase
  },
];

const navigateTo = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center md:px-22 px-4 py-20">
        <div className="mx-auto bg-primary p-4 rounded-md flex items-center justify-center mb-4">
        <Sparkles className="rotate-90 animate-pulse text-primary-foreground"/>
        </div>
        <h3 className="md:text-3xl text-lg font-bold text-primary-foreground font-sans uppercase text-center">
          Who Can Benefit From Our Platform
        </h3>
        <p className="text-center text-primary md:text-xs text-[0.7rem]">
          Tailored workout solutions for every role in the fitness ecosystem —
          from professionals to passionate individuals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {kenroxBenefits.map((benefit, index) => (
                <Card key={index} className="p-4 gap-0 group hover:border-primary hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-secondary/50 hover:shadow-secondary transition-all">
                    <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground group-hover:scale-125 transition-all">
                    <benefit.icon className="size-5 text-white animate-pulse" />
                    </div>
                    <h4 className="text-lg font-semibold uppercase mt-2 group-hover:text-primary transition-all">{benefit.title}</h4>
                    <div className="h-1 w-10 group-hover:w-30  transition-all rounded-full bg-primary-foreground mt-2"/>
                    <p className="text-xs font-sans text-muted-foreground mt-2">{benefit.description}</p>
                </Card>
            ))}

        </div>
            <Button className={"mt-20 p-8"}
            onClick={() => {
              if (!user) {
                setOpen(true);
              } else {
                navigateTo("/generate");
              }
            }}
            >Try it yourself for free</Button>
      </div>
    </>
  );
};

export default Benefit;
