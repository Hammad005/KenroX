import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const paths = [
  "M22.5,-33.1C28.4,-26.7,31.7,-19.1,33.5,-11.4C35.3,-3.7,35.5,3.9,33.3,10.9C31.1,17.8,26.6,24.1,20.7,28.5C14.7,32.9,7.4,35.5,-0.4,36C-8.1,36.5,-16.2,35,-20.2,29.9C-24.3,24.9,-24.3,16.4,-28.1,8.3C-31.8,0.2,-39.3,-7.5,-39.9,-15.2C-40.5,-22.9,-34.1,-30.6,-26.3,-36.3C-18.5,-42.1,-9.3,-46,-0.5,-45.3C8.3,-44.7,16.7,-39.5,22.5,-33.1Z",
  "M27.2,-39.7C35.2,-34.2,42.7,-29.1,44.6,-21.6C46.6,-14.2,42.9,-4.4,39.5,5.7C36.1,15.7,32.9,26,25.4,31.8C17.9,37.6,6.1,38.8,-3.9,39.7C-13.9,40.7,-21.9,41.4,-29.4,37.2C-36.9,33,-43.9,23.8,-46.3,14C-48.6,4.2,-46.3,-6.2,-42.3,-16C-38.3,-25.9,-32.6,-35.3,-24.4,-40.8C-16.2,-46.2,-8.1,-47.6,1,-48.9C10.1,-50.2,20.2,-51.3,27.2,-39.7Z",
  "M23.1,-31.9C29.8,-25.2,35.2,-19,37.6,-11.7C40.1,-4.4,39.5,3.8,35.4,10.7C31.3,17.6,23.8,23.3,16.4,28.5C9,33.6,1.7,38.3,-5.6,40.2C-12.9,42.2,-20.3,41.4,-27.2,37.6C-34,33.8,-40.4,27.1,-44.4,18.9C-48.5,10.7,-50.1,1,-47.3,-7.3C-44.6,-15.5,-37.6,-22.3,-30.3,-28.2C-23,-34.1,-15.4,-39.1,-7.3,-39.8C0.7,-40.6,13.4,-37.9,23.1,-31.9Z"
];

const BlobAnimated = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const animateBlob = () => {
      const nextIndex = (index + 1) % paths.length;
      gsap.to(pathRef.current, {
        duration: 2.5,
        ease: "power4.out",
        attr: { d: paths[nextIndex] },
        onComplete: () => {
          index = nextIndex;
          animateBlob();
        }
      });
    };

    animateBlob();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400px" height="400px">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop stopColor="#774228" offset="0%" />
          <stop stopColor="#EFB100" offset="100%" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        fill="url(#sw-gradient)"
        d={paths[0]}
        transform="translate(50 50)"
        strokeWidth="0"
      />
    </svg>
  );
};

export default BlobAnimated;
