import React, { useRef } from 'react';
import logo from '../assets/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  const logoRef = useRef();
  const loadingRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { scale: 2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        delay: 0.5,
        ease: "elastic.out(1, 0.3)",
      }
    ).fromTo(
      loadingRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2 justify-center relative">
        <div
          ref={logoRef}
          className="w-1/2 h-full"
        >
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        <Loader2 ref={loadingRef} className='animate-spin size-14 text-primary-foreground'/>
      </div>
    </div>
  );
};

export default LoadingSpinner;
