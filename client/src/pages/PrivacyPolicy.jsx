import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const privacyPolicies = [
    {
      heading: "Privacy Policy",
      paragraphs: [
        "Welcome to KenroX — a free SaaS AI-powered web application designed to generate personalized workout and diet plans based on user-provided information.",
        "Your privacy is important to us. This Privacy Policy outlines how we collect, use, protect, and handle your personal data when you use KenroX.",
      ],
    },
    {
      heading: "Information We Collect",
      paragraphs: [
        "When you use KenroX, we may collect the following personal information to generate customized plans:",
        "This data is voluntarily provided by you and is essential for creating accurate and effective workout and diet recommendations.",
      ],
      points: [
        "Age",
        "Height",
        "Weight",
        "Injuries (if any)",
        "Workout days per week",
        "Fitness goals",
        "Fitness level",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [
        "We use your data solely for the purpose of generating personalized fitness and nutrition plans. Specifically, your data helps us:",
        "We do not sell, rent, or share your personal information with third parties for marketing or advertising purposes.",
      ],
      points: [
        "Tailor your workout routines to suit your fitness level and goals",
        "Recommend diet plans appropriate for your body metrics and health status",
        "Avoid exercises that may not be safe due to disclosed injuries",
      ],
    },
    {
      heading: "Data Security",
      paragraphs: [
        "We implement standard security measures to protect your information from unauthorized access, misuse, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Data Retention",
      paragraphs: [
        "Your data is retained only as long as necessary for the purposes stated in this policy. Once your data is no longer required, we will securely delete it from our servers.",
      ],
    },
    {
      heading: "Cookies and Tracking",
      paragraphs: [
        "KenroX does not use cookies or third-party tracking tools to monitor your activity or behavior across other websites.",
      ],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy occasionally. Any changes will be reflected on this page with an updated date. Please review it regularly to stay informed.",
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:px-22 px-4 md:pt-20 pt-10">
      <div className="flex flex-col items-center justify-center my-20 md:w-2/3 min-h-screen">
        {privacyPolicies.map((policy, index, array) => (
          <div key={index}>
            <h1 className="md:text-4xl text-xl text-center text-primary-foreground text-nowrap font-bold font-sans">
              {policy.heading}
            </h1>
            {policy.paragraphs?.[0] && (
              <h3 className="text-base font-sans mt-5">
                {policy.paragraphs?.[0]}
              </h3>
            )}
            <ul className="list-disc ml-10 mt-5">
              {policy.points?.map((point, index) => (
                <li key={index} className="text-base font-sans">
                  {point}
                </li>
              ))}
            </ul>
            {policy.paragraphs?.[1] && (
              <h3 className="text-base font-sans mt-5">
                {policy.paragraphs?.[1]}
              </h3>
            )}
            {index !== array.length - 1 && (
              <div className="bg-gradient-to-r from-transparent my-10 via-primary-foreground to-transparent w-full h-px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
