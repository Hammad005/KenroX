import React, { useEffect, useRef } from "react";
import HeroGroup from "../assets/HeroGroup.png";
import HeroDumbble from "../assets/Hero4.png";
import { Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CircularText from "@/components/ui/CircularText";

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const mainHeadingRef = useRef();

  const heroDumbbleRef = useRef();
  const para1Ref = useRef();
  const underlineRef = useRef();

  const heroGroupRef = useRef();
  const heading2Ref = useRef();
  const para2Ref = useRef();

  const { contextSafe } = useGSAP();

  const animation = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      mainHeadingRef.current,
      { opacity: 0, y: -60 },
      { opacity: 1, duration: 1.2, y: 0, ease: "power4.out" }
    )
      .fromTo(
        heroDumbbleRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, duration: 1.2, x: 0, ease: "power4.out" },
        "-=1"
      )
      .fromTo(
        para1Ref.current.children,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(
        underlineRef.current,
        { width: 0 },
        { width: "100%", duration: 1.2, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(
        heading2Ref.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          duration: 1.2,
          x: 0,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading2Ref.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      )
      .fromTo(
        para2Ref.current.children,
        { opacity: 0, y: -60 },
        {
          opacity: 1,
          duration: 1.2,
          y: 0,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: para2Ref.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      )
      .fromTo(
        heroGroupRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heroGroupRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        },
        "-=0.7"
      );
  }, []);

  useGSAP(() => {
    animation();
    ScrollTrigger.refresh();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
        <div className="grid grid-cols-1 min-h-screen">
          <div
            ref={mainHeadingRef}
            className="flex flex-col items-center justify-center md:mt-0 mt-20"
          >
            <h1 className="text-5xl text-primary-foreground text-nowrap font-bold italic font-sans">
              About <span className="italic">KenroX</span>
            </h1>
            <h3 className="text-xs text-center font-sans">
              The ultimate grind system for warriors, Train Smarter with AI —
              Get Your Personalized Fitness & Diet Plan for Free.
            </h3>
            <div
              ref={underlineRef}
              className="bg-gradient-to-r from-transparent mt-4 via-primary-foreground to-transparent w-full h-px"
            />
          </div>
          <div className="flex lg:flex-row flex-col items-start justify-center gap-8 my-10 md:text-start text-center">
            <div
              ref={heroDumbbleRef}
              className="lg:w-[40rem] h-auto rounded-xl bg-gradient-to-r overflow-hidden from-primary to-primary-foreground"
            >
              <img
                src={HeroDumbble}
                alt="HeroGroup"
                className="w-full h-full object-contain object-bottom "
              />
            </div>
            <CircularText
              text="KenroX: Your AI Coach"
              onHover="speedUp"
              spinDuration={20}
              className="custom-class"
            />
            <div ref={para1Ref} className="w-full">
              <h3 className="text-lg font-sans mt-8">
                <span className="italic text-primary font-bold">KenroX</span> is
                a smart, AI-powered SaaS web application that helps you take
                control of your health and fitness like never before. Designed
                for all fitness levels,{" "}
                <span className="italic text-primary font-bold">KenroX</span>{" "}
                creates fully customized workout and diet plans based on your
                unique profile — no subscriptions, no guesswork, and no generic
                routines.
              </h3>
              <h3 className="text-lg font-sans mt-8">
                We believe that fitness should be personal, practical, and
                accessible to everyone. That's why{" "}
                <span className="italic text-primary font-bold">KenroX</span> is
                completely free to use.
              </h3>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col-reverse items-center justify-center gap-8 my-10 ">
          <div className="w-full">
            <h1
              ref={heading2Ref}
              className="md:text-5xl text-3xl text-primary-foreground  font-bold italic font-sans text-center lg:text-start"
            >
              Why Choose KenroX?
            </h1>
            <ul
              ref={para2Ref}
              className="font-sans mt-9 flex flex-col items-start"
            >
              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">Fully Personalized</span> - Every
                  plan is unique to your data and goals.
                </p>
              </li>

              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">AI-Driven</span> - Smarter
                  recommendations that improve with use.
                </p>
              </li>

              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">Free to Use</span> - No
                  subscriptions and no hidden fees for now.
                </p>
              </li>

              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">Beginner Friendly</span> - Simple
                  interface with no complex setup.
                </p>
              </li>

              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">Injury-Aware</span> - Plans are
                  adjusted to avoid risks or strain.
                </p>
              </li>

              <li className="flex items-start gap-2 mb-4">
                <div className="p-1 bg-primary w-fit rounded-sm">
                  <Check className="size-4 text-white" />
                </div>
                <p className="md:text-base text-sm">
                  <span className="font-bold">All-In-One</span> - No need to
                  juggle multiple apps or spreadsheets.
                </p>
              </li>
            </ul>
          </div>
          <div
            ref={heroGroupRef}
            className="lg:w-[50rem] h-auto rounded-xl bg-gradient-to-r overflow-hidden from-primary to-primary-foreground"
          >
            <img
              src={HeroGroup}
              alt="HeroDumbble"
              className="w-full h-full object-contain object-bottom "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
