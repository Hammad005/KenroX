import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Hero3 from "../assets/Hero3.png";
import { Loader, Loader2 } from "lucide-react";

const GeneratePlanLoading = () => {
  const pathRef = useRef(null);
  const textRef = useRef(null);

  const lines = [
    "“Analyzing your age for optimized training and nutrition…”",
    "“Calculating your height and weight to balance workouts and meals…”",
    "“Reviewing injuries and allergies to ensure safe and effective planning…”",
    "“Mapping your workout days for maximum progress…”",
    "“Tailoring your fitness goal into a smart strategy…”",
    "“Adapting to your fitness level…”",
    "“Generating a personalized workout plan and diet plan for you!”",
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const { contextSafe } = useGSAP();

  const animate = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      pathRef.current,
      { opacity: 0, scale: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
      }
    )
      .to(pathRef.current, {
        y: -30,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      })
      .fromTo(
        textRef.current.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.3,
          stagger: 0.2,
          ease: "power4.out",
          onComplete: () => {
            const interval = setInterval(() => {
              setCurrentLineIndex((prevIndex) => {
                if (prevIndex < lines.length - 1) {
                  return prevIndex + 1;
                } else {
                  clearInterval(interval);
                  return prevIndex;
                }
              });
            }, 3000);

            return () => clearInterval(interval);
          },
        },
        "-=1.5"
      );
  }, []);

  useGSAP(animate, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center md:mt-20 mt-30">
        <div ref={pathRef}>
          <div className="relative">
            <div className="w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-primary to-primary-foreground blur-[8px]" />
            <div className="w-[20rem] h-[25rem] absolute top-0 transform -translate-y-1/5 rounded-full overflow-hidden">
              <img src={Hero3} alt="Hero" className="w-auto h-auto" />
            </div>
          </div>
        </div>

        <div ref={textRef} className="flex flex-col items-center mt-5 gap-3">
          <p
            className="text-xs text-center text-muted-foreground uppercase font-bold tracking-widest"
          >
            {lines[currentLineIndex]}
          </p>
          <div className="bg-gradient-to-r from-transparent via-primary-foreground to-transparent my-1 w-full h-px" />
          <Loader className="animate-spin size-7" />
        </div>
      </div>
    </>
  );
};

export default GeneratePlanLoading;
