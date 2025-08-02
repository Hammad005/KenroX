import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ArrowUp, Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import X from "../assets/loading/x.png"

const Footer = () => {
  return (
    <>
      <footer className="bg-secondary dark:bg-card py-3 md:px-22 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col md:items-start items-center justify-center gap-6 w-full">
        <Link href="/">
          <img src={logo} alt="logo" className="w-[10rem]" />
        </Link>
            <p className="text-xs lg:w-2/3 ">
              The ultimate grind system for warriors, Train Smarter with AI —
              Get Your Personalized Fitness & Diet Plan for Free.
            </p>
            <div className="flex items-center gap-8">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                className="hover:text-primary-foreground transition-colors dark:bg-secondary bg-card p-2 rounded-md"
              >
                <Facebook className="size-6" />
              </Link>
              <Link
                to="https://www.linkedin.com"
                target="_blank"
                className="hover:text-primary-foreground transition-colors dark:bg-secondary bg-card p-2 rounded-md"
              >
                <Linkedin className="size-6" />
              </Link>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                className="hover:text-primary-foreground transition-colors dark:bg-secondary bg-card p-2 rounded-md"
              >
                <Instagram className="size-6" />
              </Link>
              <Link
                to="https://www.github.com"
                target="_blank"
                className="hover:text-primary-foreground transition-colors dark:bg-secondary bg-card p-2 rounded-md"
              >
                <Github className="size-6" />
              </Link>
            </div>
            <Button
              className={"lg:w-1/3 w-full lg:flex items-center hidden"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp /> Back to Top
            </Button>
          </div>
          <div className="flex items-start lg:justify-start justify-center  md:gap-30 gap-22 md:mt-10 relative">
            <div className="absolute left-0 lg:-translate-x-1/4 flex items-center justify-center w-full dark:opacity-10 opacity-30">
                <img src={X} alt="X" className="w-[13rem]"/>
            </div>
            <div className="flex flex-col gap-4 z-10">
              <h3 className="text-sm font-bold font-sans mb-2 text-primary">
                Quick Links:
              </h3>
              <Link
                to="/"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                About
              </Link>
              <Link
                to="/how-it-works"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/testimonials"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                Testimonials
              </Link>
            </div>
            <div className="flex flex-col gap-4 z-10">
              <h3 className="text-sm font-bold font-sans mb-2 text-primary">
                Legal:
              </h3>
              <Link
                to="/privacy-policy"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className=" text-sm hover:text-primary-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
              
            </div>
          </div>
        </div>
        <Button
              className={"lg:w-1/3 w-full lg:hidden mt-8"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp /> Back to Top
            </Button>
      </footer>
      <div className="bg-gray-400/60 dark:bg-card/70 py-0.5 flex items-center justify-center">
        <p className="text-xs font-sans">
          Copyright © 2025, KenroX, All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
