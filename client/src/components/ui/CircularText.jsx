import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const containerRef = useRef(null);
  const rotationTween = useRef(null);

  useEffect(() => {
    rotate();
    return () => rotationTween.current?.kill();
  }, [spinDuration, text]);

  const rotate = (duration = spinDuration) => {
    rotationTween.current?.kill();
    rotationTween.current = gsap.to(containerRef.current, {
      rotation: "+=360",
      duration,
      ease: "linear",
      repeat: -1,
    });
  };

  const handleHoverStart = () => {
    let newDuration = spinDuration;
    switch (onHover) {
      case "speedUp":
        newDuration = spinDuration / 4;
        break;
      case "slowDown":
        newDuration = spinDuration * 2;
        break;
      case "pause":
        rotationTween.current?.pause();
        return;
      case "goBonkers":
        newDuration = spinDuration / 20;
        gsap.to(containerRef.current, { scale: 0.8, duration: 0.3 });
        break;
    }
    rotate(newDuration);
  };

  const handleHoverEnd = () => {
    if (onHover === "pause") {
      rotationTween.current?.resume();
    }
    if (onHover === "goBonkers") {
      gsap.to(containerRef.current, { scale: 1, duration: 0.3 });
    }
    rotate();
  };

  const letters = Array.from(text);
  const radius = 80;

  return (
    <div
      ref={containerRef}
      className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative text-white font-black text-center cursor-pointer origin-center ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 text-2xl"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
              transformOrigin: "center",
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
