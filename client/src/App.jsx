import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import NotFound from "./components/NotFound";
import HowItWorks from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import { userStore } from "./store/userStore";
import { Toaster } from "@/components/ui/sonner";
import Generate from "./pages/Generate";

const App = () => {
  const { checkAuth, authLoading, user } = userStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authLoading) return <LoadingSpinner />;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        {/* <Route path="/testimonials" element={<Home />} /> */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/generate"
          element={user ? <Generate /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
