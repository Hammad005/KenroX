import React, { useRef } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Testimonials = () => {
    const testimonials = [
  {
    name: "Ayesha Khan",
    goal: "To lose weight and improve fitness",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    text: "KenroX completely transformed my workout routine. The personalized plans feel like they were made just for me!",
  },
  {
    name: "Ali Raza",
    goal: "To build strength and endurance",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    text: "I finally found a fitness app that understands my needs. Diet + workout combo is spot on!",
  },
  {
    name: "Sara Malik",
    goal: "To tone muscles and stay active",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "As someone who struggles with consistency, KenroX made it so easy to stick to a plan. I love the motivation it gives me!",
  },
  {
    name: "Hamza Javed",
    goal: "To bulk up and gain lean muscle",
    avatar: "https://i.pravatar.cc/150?img=22",
    rating: 4,
    text: "Great app with solid AI. The diet recommendations actually suit my body type, and the workouts are intense and effective.",
  },
  {
    name: "Mehwish Tariq",
    goal: "To get fit post-pregnancy",
    avatar: "https://i.pravatar.cc/150?img=58",
    rating: 5,
    text: "KenroX helped me regain my strength and energy after pregnancy. The adaptive plan was exactly what I needed!",
  },
  {
    name: "Usman Farooq",
    goal: "To stay healthy with a busy schedule",
    avatar: "https://i.pravatar.cc/150?img=16",
    rating: 4,
    text: "I never thought I'd manage fitness with work stress, but KenroX gave me short, smart routines that actually work. Big fan!",
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
    );

    tl.fromTo(
      cardRef.current.children,
      {
        opacity: 0,
        y: 50,
        scale: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          scrub: true,
        },
      }
    );
  });

  useGSAP(animate, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen mt-10">
        <div
        ref={mainHeadingRef}
        className="flex flex-col items-center justify-center md:mt-10 mt-10"
      >
        <h1 className="text-5xl text-primary-foreground text-nowrap font-bold italic font-sans">
          Testimonials
        </h1>
        <h3 className="text-xs text-center font-sans">
          What Our Users Say About KenroX
        </h3>
        <div
          ref={underlineRef}
          className="bg-gradient-to-r from-transparent mt-4 via-primary-foreground to-transparent w-full h-px"
        />
      </div>
        <div ref={cardRef} className="grid gap-5 pb-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-2xl p-6 flex flex-col gap-0 items-center justify-center text-center md:min-h-full min-h-[500px]"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-foreground">
                {testimonial.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {testimonial.goal}
              </p>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground italic">
                “{testimonial.text}”
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
