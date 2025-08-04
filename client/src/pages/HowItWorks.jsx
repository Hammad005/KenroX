import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Login from "./sub-components/Login";
import { userStore } from "@/store/userStore";

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const points = [
    {
      title: "Create a free KenroX account.",
    },
    {
      title:
        "Log in to start building your personalized workout and diet plans.",
    },
    {
      title: "Provide your age.",
    },
    {
      title: "Enter your height.",
    },
    {
      title: "Enter your current body weight.",
    },
    {
      title: "Mention any existing injuries or allergies.",
    },
    {
      title: "Select the days you plan to work out each week.",
    },
    {
      title:
        "Select your fitness goal (e.g., weight loss, muscle gain, endurance).",
    },
    {
      title:
        "Choose your current fitness level (beginner, intermediate, or advanced).",
    },
    {
      title:
        "Based on your responses, KenroX uses AI to generate a tailored workout and diet plan just for you.",
    },
    {
      title:
        "Access and manage your plans anytime from your profile dashboard.",
    },
  ];

  const mainHeadingRef = useRef();
  const underlineRef = useRef();
  const cardRef = useRef();

  const { contextSafe } = useGSAP();

  const animate = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      mainHeadingRef.current,
      { opacity: 0, y: -60 },
      { opacity: 1, duration: 1, y: 0, ease: "power4.out" }
    ).fromTo(
      underlineRef.current,
      { width: 0 },
      { width: "100%", duration: 1, ease: "power4.out" }
    ).fromTo(
      cardRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, duration: 1, scale: 1, ease: "power4.out" },
      "-=1"
    )
  });

  useGSAP(animate, []);
  const {user} = userStore();
    const [open, setOpen] = useState(false)
  return (
    <>
    <Login open={open} setOpen={setOpen}/>
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div
        ref={mainHeadingRef}
        className="flex flex-col items-center justify-center md:mt-10 mt-10"
      >
        <h1 className="text-5xl text-primary-foreground text-nowrap font-bold italic font-sans">
          How It Works
        </h1>
        <h3 className="text-xs text-center font-sans">
          How does KenroX work, and what can it do for you as a fitness
          enthusiast?
        </h3>
        <div
          ref={underlineRef}
          className="bg-gradient-to-r from-transparent mt-4 via-primary-foreground to-transparent w-full h-px"
        />
      </div>

      <Card ref={cardRef} className="my-10 p-10">
        <ol className="relative grid border-s border-primary">
          {points.map((point, index, array) => (
            <li
              key={index}
              className={`${index !== array.length - 1 && "mb-10"} ms-8 group`}
            >
              <div className="absolute size-8 text-base text-white font-bold flex items-center justify-center bg-primary group-hover:bg-primary-foreground transition-colors rounded-full -start-4 ">
                {index + 1}
              </div>
              <h3 className="text-base font-semibold font-sans">
                {point.title}
              </h3>
            </li>
          ))}
        </ol>
      </Card>

      <Button className={"p-8 mb-10"}
      onClick={() => {
        if(!user){
          setOpen(true)
        } else {
          ''
        }
      }}
      >Try it yourself for free</Button>
    </div>
    </>
  );
};

export default HowItWorks;
