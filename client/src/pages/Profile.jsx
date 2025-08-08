import EditProfile from "@/components/EditProfile";
import Plans from "@/components/Plans";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { planStore } from "@/store/planStore";
import { userStore } from "@/store/userStore";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";

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
  return (
    <>
      <EditProfile open={open} setOpen={setOpen} />
      <div className="min-h-screen md:px-22 px-4 py-10 flex items-center justify-center">
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 mt-20 w-full">
        <Card
          className={
            "w-full md:w-1/2 flex flex-col items-center justify-center gap-1 px-6"
          }
        >
          <div className="relative">
            <div className="size-26 object-contain rounded-full overflow-hidden border-3 border-primary-foreground bg-primary flex items-center justify-center">
              {user?.profile?.imageUrl ? (
                <img
                  src={user?.profile?.imageUrl}
                  alt="avatar"
                  className="w-full object-cover"
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
        {plans?.length > 0 ? <Plans/> : ""}
        </div>
      </div>
    </>
  );
};

export default Profile;
