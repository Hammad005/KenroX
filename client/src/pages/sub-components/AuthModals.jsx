import React from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const AuthModals = ({ openLogin, setOpenLogin, openSignup, setOpenSignup }) => (
  <>
    <Login
      open={openLogin}
      setOpen={setOpenLogin}
      switchToSignup={() => {
        setOpenLogin(false);
        setOpenSignup(true);
      }}
    />
    <Signup
      open={openSignup}
      setOpen={setOpenSignup}
      switchToLogin={() => {
        setOpenSignup(false);
        setOpenLogin(true);
      }}
    />
  </>
);


export default AuthModals;
