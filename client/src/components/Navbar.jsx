import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out",}
    );
  });
  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3 md:px-22 px-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="w-full">
            <img src={logo} alt="logo" className="w-[8rem]" />
          </Link>

          <div className="flex items-center justify-between w-full">
            <Link
              to="/"
              className="md:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="md:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="md:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="md:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <ModeToggle />
            <Button variant="secondary" className={"hidden md:block"}>
              Log In
            </Button>
            <Button className={"hidden md:block"}>Sign Up</Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
