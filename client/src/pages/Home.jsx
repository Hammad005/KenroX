import React from "react";
import Hero1 from "../assets/Hero1.png";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20">
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <div>
          <div className="relative rounded-full">
            <div className="w-[20rem] h-[20rem] rounded-full bg-gradient-to-t from-primary to-primary-foreground" />
            <div className="w-[20rem] h-[25rem] absolute top-0 transform -translate-y-1/5 rounded-full overflow-hidden">
              <img
                src={Hero1}
                alt="Hero"
                className="w-auto h-auto absolute translate-x-1.5"
              />
            </div>
          </div>
        </div>
        <p className="text-xs mt-4 text-center">
          The ultimate grind system for warriors
        </p>
        <div className="bg-gradient-to-r from-transparent via-primary-foreground to-transparent my-1 w-full h-px" />
        <h3 className="md:text-xl font-sans text-center font-bold uppercase text-primary-foreground">
          Train Smarter with AI — Get Your Personalized Fitness & Nutrition Plan
          Free.
        </h3>

        <Button className={"mt-5 "}>
          <Power />
          Get Started
        </Button>
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Home;
