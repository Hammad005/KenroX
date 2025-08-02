import React, { useEffect, useRef } from "react";
import Hero1 from "../assets/Hero1.png";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Goals from "@/components/Goals";
import Benefit from "@/components/Benefit";
import Faq from "@/components/Faq";

const Home = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [])
  const heroContainerRef = useRef();
  const heroBgRef = useRef();
  const textRef = useRef();

  const { contextSafe } = useGSAP();
  const animate = contextSafe(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroContainerRef.current,
      { opacity: 0, scale: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      }
    )
      .fromTo(
        heroBgRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.7"
      )
      .to(heroBgRef.current, {
        filter: "blur(8px)",
        duration: 1.2,
        ease: "sine.inOut",
      })
      .fromTo(
        textRef.current.children,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        },
        "-=1"
      );
  });

  useGSAP(() => {
    animate();
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
        <div className="flex flex-col items-center justify-center md:mt-20 mt-30">
          <div ref={heroContainerRef}>
            <div className="relative ">
              <div
                ref={heroBgRef}
                className="w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-primary to-primary-foreground"
              />
              <div className="w-[20rem] h-[25rem] absolute top-0 transform -translate-y-1/5 rounded-full overflow-hidden">
                <img
                  src={Hero1}
                  alt="Hero"
                  className="w-auto h-auto absolute translate-x-1.5"
                />
              </div>
            </div>
          </div>

          <div ref={textRef} className="flex flex-col items-center mt-10">
            <p className="text-xs text-center uppercase font-semibold">
              The ultimate grind system for warriors
            </p>
            <div className="bg-gradient-to-r from-transparent via-primary-foreground to-transparent my-1 w-full h-px" />
            <h3 className="md:text-xl text-xs font-sans text-center font-bold uppercase text-primary-foreground">
              <span className="text-primary">Train Smarter with AI</span> — Get
              Your Personalized Fitness & Diet Plan for Free.
            </h3>
            <Button className={"mt-5 "}>
              <Power />
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <Goals />
      <Benefit/>
      <Faq/>
    </>
  );
};

export default Home;
