import EditProfile from "@/components/EditProfile";
import Plans from "@/components/Plans";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { planStore } from "@/store/planStore";
import { userStore } from "@/store/userStore";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, Edit, Power } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const Profile = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { user } = userStore();
  const { plans } = planStore();
  const [open, setOpen] = useState(false);

  const animationRef = useRef();
  const { contextSafe } = useGSAP();

  const animate = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      animationRef.current.children,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, stagger: 0.5, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  useGSAP(animate, []);
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  return (
    <>
      <EditProfile open={open} setOpen={setOpen} />
      <div className="min-h-screen md:px-22 px-4 py-10 flex items-center justify-center">
        <div
          ref={animationRef}
          className="min-h-screen flex flex-col items-center justify-center gap-8 mt-20 w-full"
        >
          <Card
            className={
              "w-full md:w-1/2 flex flex-col items-center justify-center gap-1 px-6"
            }
          >
            <div className="relative">
              <div className="size-26 object-contain rounded-full overflow-hidden border-3 border-primary-foreground bg-primary flex items-center justify-center">
                {user?.profile?.imageId ? (
                  <AdvancedImage
                  key={user.profile.imageId}
                    cldImg={cld
                      .image(user.profile.imageId)
                      .format("auto")
                      .quality("auto")
                      .resize(scale().width(400))}
                    className="w-full h-full object-top object-cover"
                  />
                ) : (
                  <p className="text-4xl text-primary-foreground">
                    {user?.fullname?.charAt(0).toUpperCase()}
                  </p>
                )}
              </div>
              <div className="absolute bottom-2 right-0 transform -translate-x-1/2 size-4 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <h1 className="text-lg font-sans font-bold tracking-tight">
              {user?.fullname}
            </h1>
            <h3 className="text-xs text-muted-foreground tracking-widest">
              {user?.email}
            </h3>

            <Button
              className={"w-full mt-4 flex items-center"}
              variant={"secondary"}
              onClick={() => setOpen(true)}
            >
              <Edit /> Edit
            </Button>
          </Card>
          {plans?.length > 0 ? (
            <Plans />
          ) : (
            <Card className={"w-full px-6 justify-center items-center gap-0"}>
              <div className="mx-auto bg-primary animate-bounce p-4 rounded-md flex items-center justify-center mb-4">
                <Power className="text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4 uppercase text-primary-foreground font-sans">
                No fitness plans yet
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-center text-sm">
                Start by creating a personalized fitness and diet plan tailored
                to your specific goals and needs
              </p>
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
              >
                <Link to="/generate">
                  <span className="relative flex items-center">
                    Create Your First Plan
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
