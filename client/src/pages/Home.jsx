import React, { useRef } from "react";
import Hero1 from "../assets/Hero1.png";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const heroContainerRef = useRef();
  const heroBgRef = useRef();
  const textRef = useRef();

  const {contextSafe} = useGSAP();
  const animate = contextSafe(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroContainerRef.current,
      {  opacity: 0, scale: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      }
    ).fromTo(
      heroBgRef.current,
      { scale: 0 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
      },
      "-=0.7"
    ).fromTo(
      textRef.current.children,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.7"
    ).fromTo(
      heroBgRef.current, 
      {rotate: 0},
      {
        rotate: 360,
        duration: 1,
        ease: "power4.inOut",
        repeat: -1,
      },
    )
  })

  useGSAP(() => {
    animate();
  })
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20">
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <div ref={heroContainerRef}>
          <div className="relative rounded-full">
            <div ref={heroBgRef} className="w-[20rem] h-[20rem] rounded-full bg-gradient-to-t from-primary to-primary-foreground" />
            <div className="w-[20rem] h-[25rem] absolute top-0 transform -translate-y-1/5 rounded-full overflow-hidden">
              <img
                src={Hero1}
                alt="Hero"
                className="w-auto h-auto absolute translate-x-1.5"
              />
            </div>
          </div>
        </div>

        <div ref={textRef} className="flex flex-col items-center mt-4">
        <p className="text-xs text-center">
          The ultimate grind system for warriors
        </p>
        <div className="bg-gradient-to-r from-transparent via-primary-foreground to-transparent my-1 w-full h-px" />
        <h3 className="md:text-xl text-xs font-sans text-center font-bold uppercase text-primary-foreground">
          <span className="text-primary">Train Smarter with AI</span> — Get Your Personalized Fitness & Nutrition Plan
          Free.
        </h3>
        <Button className={"mt-5 "}>
          <Power />
          Get Started
        </Button>
        </div>

      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Home;
