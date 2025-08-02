import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
  });
  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur border-b border-border py-3 md:px-22 px-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="w-full">
            <img src={logo} alt="logo" className="w-[8rem]" />
          </Link>

          <div className="flex items-center justify-between w-full">
            <Link
              to="/"
              className="lg:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="lg:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="lg:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/testimonials"
              className="lg:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
            >
              Testimonials
            </Link>
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                  <SheetTitle>
                    <img src={logo} alt="KenroX Logo" className="w-32" />
                  </SheetTitle>
                </SheetHeader>

                {/* Main Navigation Container */}
                <div className="flex flex-col justify-between flex-1 mt-10">
                  {/* Top Half - Navigation */}
                  <nav className="flex flex-col items-center gap-12">
                    <Link
                      to="/"
                      className="uppercase text-sm font-medium hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      className="uppercase text-sm font-medium hover:text-primary transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="uppercase text-sm font-medium hover:text-primary transition-colors"
                    >
                      How It Works
                    </Link>
                    <Link
                      to="/testimonials"
                      className="uppercase text-sm font-medium hover:text-primary transition-colors"
                    >
                      Testimonials
                    </Link>
                    <div className="flex items-center justify-center gap-3">
                    <Button variant="secondary" className="w-1/2">
                      Log In
                    </Button>
                    <Button className="w-1/2">Sign Up</Button>
                  </div>
                  </nav>

                  {/* Bottom - Auth Buttons */}
                  {false && <div className="flex items-center justify-center gap-3 w-full pt-6 border-t">
                    <Button variant="secondary" className="w-1/2">
                      Log In
                    </Button>
                    <Button className="w-1/2">Sign Up</Button>
                  </div>}
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="secondary" className={"hidden lg:block"}>
              Log In
            </Button>
            <Button className={"hidden lg:block"}>Sign Up</Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
