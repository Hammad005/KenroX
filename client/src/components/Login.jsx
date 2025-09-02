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

const Login = ({ open: openLogin, setOpen: setOpenLogin, switchToSignup }) => {
  const handleGoogleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // from Google Cloud
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_CALLBACK_URL; // your frontend redirect route
    const SCOPE = "openid email profile";
    const RESPONSE_TYPE = "code";

    // Force account chooser every time → prompt=select_account
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=consent%20select_account`;

    window.location.href = url;
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = userStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(data);
    if (res?.success) {
      setData({ email: "", password: "" });
      setShowPassword(false);
      setOpenLogin(false);
    }
  };

  return (
    <>
      <Dialog open={openLogin} onOpenChange={setOpenLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className={"gap-0"}>
            <DialogTitle className={"flex items-center"}>
              <img src={logo} alt="logo" className="w-[7rem]" />
              <p className="text-2xl font-sans pt-2 italic text-primary font-bold">
                - Login
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
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-sans text-center w-full">
              Don&apos;t have an account?{" "}
              <span
                className="text-primary-foreground hover:underline cursor-pointer"
                onClick={() => {
                  switchToSignup();
                }}
              >
                Sign Up
              </span>
            </p>
            <DialogFooter className={"mt-5 pt-5 border-t"}>
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
