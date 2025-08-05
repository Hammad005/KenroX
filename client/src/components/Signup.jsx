import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "../assets/logo.png";
import { Eye, EyeOff, Loader } from "lucide-react";
import GoogleLogo from "../assets/googleLogo.png";
import { userStore } from "@/store/userStore";
import { toast } from "sonner";
const Signup = ({ open : openSignup, setOpen : setOpenSignup, switchToLogin }) => {
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, "_self");
  };

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { signup, loading } = userStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
      
    }else if (data.password !== confirmPassowrd) {
      return toast.error("Passwords do not match");
    }
    const res = await signup(data);
    if (res?.success) {
      setData({ fullname: "", email: "", password: "" });
      setConfirmPassowrd("");
      setShowPassword(false);
      setShowCPassword(false);
      setOpenSignup(false);
    }
  };
  return (
    <>
      <Dialog open={openSignup} onOpenChange={setOpenSignup}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-scroll">
          <DialogHeader className={"gap-0"}>
            <DialogTitle className={"flex items-center"}>
              <img src={logo} alt="logo" className="w-[7rem]" />
              <p className="text-2xl font-sans pt-2 italic text-primary font-bold">
                - Signup
              </p>
            </DialogTitle>
            <DialogDescription className={"text-[0.75rem] font-sans"}>
              The ultimate grind system for warriors, Train Smarter with AI —
              Get Your Personalized Fitness & Diet Plan for Free.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant={"secondary"}
            className={"font-sans w-full mt-5"}
            onClick={handleGoogleLogin}
          >
            <img src={GoogleLogo} alt="googleLogo" className="size-4" />
            Continue with Google
          </Button>
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t" />
            <span className="mx-4 text-sm text-muted-foreground bg-background px-2">
              Or
            </span>
            <div className="flex-grow border-t" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <Label htmlFor="email">Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="text-sm font-sans"
                value={data.fullname}
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                required
              />
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-sm font-sans"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="text-sm font-sans pr-10"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showCPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="text-sm font-sans pr-10"
                  value={confirmPassowrd}
                  onChange={(e) =>
                    setConfirmPassowrd(e.target.value)
                  }
                  required
                />
                {showCPassword ? (
                  <EyeOff
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowCPassword(!showCPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowCPassword(!showCPassword)}
                  />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-sans text-center w-full">
              Already have an account?{" "}
              <span
                className="text-primary-foreground hover:underline cursor-pointer"
                onClick={() => {
                  switchToLogin()
                }}
              >
                Login
              </span>
            </p>
            <DialogFooter className={"mt-5 pt-5 border-t"}>
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Sign Up"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signup;
