import { userStore } from "@/store/userStore";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";

const EditProfile = ({ open, setOpen }) => {
  const { user, updateUser, loading } = userStore();
  const uploadBtnRef = useRef();

  const [data, setData] = useState({
    fullname: user?.fullname,
    profile: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, profile: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(data);
    if (res?.success) {
      setData({ fullname: user?.fullname, profile: "" });
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className={"font-sans"}>Edit profile</DialogTitle>
              <DialogDescription className={"text-[0.7rem]"}>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Full Name</Label>
                <Input
                  defaultValue={user?.fullname}
                  onChange={(e) =>
                    setData({ ...data, fullname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="file">Profile:</Label>
                <Input
                  type="file"
                  className={"hidden"}
                  ref={uploadBtnRef}
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => uploadBtnRef.current.click()}
                >
                  <Upload /> Upload Profile
                </Button>
              </div>
              {data.profile && (
                <div className="h-20 w-20 rounded-md overflow-hidden object-contain border-2 border-primary-foreground relative">
                  <div className="absolute top-0 right-0 cursor-pointer" onClick={() => setData({ ...data, profile: "" })}>
                  <X/>
                  </div>
                  <img
                    src={data.profile}
                    alt="profile"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
            </div>
            <DialogFooter className="mt-4 pt-4 border-t">
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>{
                loading ? <Loader2 className="animate-spin" /> : "Save changes"
                }</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
