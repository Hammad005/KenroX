import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = () => {
  const navigate = useNavigate();
  const logoRef = useRef();
  const loadingRef = useRef();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code){
          await axios.post("/auth/google", { code });
          navigate("/");
        }
      } catch (err) {
        console.error("Google login failed", err);
        navigate("/");
      }
    };

    handleGoogleAuth();
  }, []);

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
          className="md:w-1/3 w-1/2 h-full"
        >
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        <Loader2 ref={loadingRef} className='animate-spin md:size-12 size-10 text-primary-foreground'/>
      </div>
    </div>
  );
};

export default LoadingSpinner;
