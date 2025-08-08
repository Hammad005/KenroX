import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { Loader, LogOut, Menu, Power } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userStore } from "@/store/userStore";
import AuthModals from "@/pages/sub-components/AuthModals";

const Navbar = () => {
  const navRef = useRef();
  const naivgateTo = useNavigate();

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
  });

  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const { user, logout, loading } = userStore();
  return (
    <>
      <AuthModals
        openLogin={open}
        setOpenLogin={setOpen}
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur border-b border-border py-3 md:px-22 px-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="w-[12rem] object-contain">
            <img src={logo} alt="logo" className="w-full object-cover" />
          </Link>

          <div className="flex items-center justify-center gap-12 w-full">
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
            {user && (
              <Link
                to="/profile"
                className="lg:flex hidden items-center gap-1.5 uppercase text-sm hover:text-primary-foreground transition-colors"
              >
                Profile
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 w-fit justify-end">
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
                    {user && (
                      <Link
                        to="/profile"
                        className="uppercase text-sm font-medium hover:text-primary transition-colors"
                      >
                        Profile
                      </Link>
                    )}
                    <div className="flex items-center justify-center gap-3">
                      {!user && (
                        <>
                          <Button
                            variant="secondary"
                            className="w-1/2"
                            onClick={() => setOpen(true)}
                          >
                            Log In
                          </Button>
                          <Button
                            className="w-1/2"
                            onClick={() => setOpenSignup(true)}
                          >
                            Sign Up
                          </Button>
                        </>
                      )}
                    </div>
                  </nav>

                  {/* Bottom*/}
                  {user && (
                    <div className="flex items-center justify-between gap-3 w-full py-2 px-2 border-t">
                      {/* Profile Button */}
                      <Link to="/profile" className="flex items-center gap-2">
                      <div className="relative">
                        <div className="size-8 object-contain rounded-full overflow-hidden border-2 border-primary-foreground bg-primary flex items-center justify-center">
                          {user?.profile?.imageUrl ? (
                            <img
                              src={user?.profile?.imageUrl}
                              alt="avatar"
                              className="w-full object-cover"
                            />
                          ) : (
                            <p className="text-lg text-primary-foreground">
                              {user?.fullname?.charAt(0).toUpperCase()}
                            </p>
                          )}
                        </div>
                          <div className="absolute bottom-0 right-0  size-2.5 bg-green-500 border border-white rounded-full" />
                      </div>
                          <h3 className="font-sans text-xs">
                            {user?.fullname}
                          </h3>
                      </Link>
                      <div>
                        <Button
                          size={"icon"}
                          onClick={logout}
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <LogOut />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {user ? (
              <>
                <Button
                  className={"hidden lg:flex items-center"}
                  onClick={() => naivgateTo("/generate")}
                >
                  <Power /> Get Started
                </Button>
                <Button
                  variant="secondary"
                  size={"icon"}
                  className={"hidden lg:flex"}
                  onClick={logout}
                  disabled={loading}
                >
                  {loading ? <Loader className="animate-spin" /> : <LogOut />}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className={"hidden lg:block"}
                  onClick={() => setOpen(true)}
                >
                  Log In
                </Button>
                <Button
                  className={"hidden lg:block"}
                  onClick={() => setOpenSignup(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
