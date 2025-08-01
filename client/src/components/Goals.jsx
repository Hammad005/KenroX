import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Goals = () => {
  const textRef = useRef();
  const { contextSafe } = useGSAP();

  const animate = contextSafe(() => {
    gsap.fromTo(
      textRef.current.children,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top top",
          end: "+=400", // how long it stays pinned (adjust as needed)
          pin: true,
          scrub: true,
        },
      }
    );
  });

  useGSAP(animate, []);

  return (
    <div
      ref={textRef}
      className="py-20 md:py-32 bg-secondary min-h-screen flex flex-col justify-center items-center dark:bg-card/50 mt-10"
    >
        <div className="mx-auto bg-primary p-4 rounded-md flex items-center justify-center mb-4">
        <BrainCircuit className="rotate-90 animate-pulse text-primary-foreground"/>
        </div>
      <h3 className="md:text-3xl text-xl font-bold text-primary-foreground font-sans uppercase text-center">
        Achieve Your Goals Smarter
      </h3>
      <h4 className="text-center text-primary text-xs md:text-sm">
        Unlock AI-Powered Fitness & Nutrition in Seconds
      </h4>
      <p className="md:w-2/4 mx-auto text-center font-sans text-sm mt-4">
        Say goodbye to generic plans. Our intelligent system instantly crafts
        personalized workout and diet programs based on your body, goals, and
        lifestyle — all for free. Save time, train smarter, and see real results
        faster.
      </p>
    </div>
  );
};

export default Goals;
