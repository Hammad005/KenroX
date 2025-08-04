import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const privacyPolicies = [
    {
      heading: "Terms and Conditions",
      paragraphs: [
        "Welcome to KenroX - a free SaaS AI-powered web app designed to generate personalized workout and diet plans based on user input. By accessing or using KenroX, you agree to be bound by these Terms and Conditions. Please read them carefully.",
      ],
    },
    {
      heading: "Acceptance of Terms",
      paragraphs: [
        "By using KenroX, you confirm that you have read, understood, and agreed to these Terms. If you do not agree with any part of these terms, please do not use the platform.",
      ],
    },
    {
      heading: "Eligibility",
      paragraphs: [
        "You must be at least 13 years old to use KenroX. By using this service, you represent that you meet this age requirement.",
      ],
    },
    {
      heading: "Use of the Service",
      paragraphs: [
        "KenroX provides personalized workout and diet plans based on the information you provide, such as:",
        "You agree to provide accurate and complete information and understand that the effectiveness of the plans depends on the accuracy of the data you provide.",
      ],
      points: [
        "Age",
        "Height",
        "Weight",
        "Injuries",
        "Workout days",
        "Fitness goals",
        "Fitness level",
      ],
    },
    {
        heading: "Not Medical Advice",
        paragraphs: [
            "KenroX is not a substitute for professional medical advice, diagnosis, or treatment. The information provided is for general health and fitness purposes only. Always consult with a healthcare provider before starting any fitness or diet program, especially if you have existing health conditions or concerns.",
        ],
    },
    {
      heading: "User Responsibilities",
      paragraphs: [
        "By using KenroX, you agree to:",
      ],
      points: [
        "Use the platform for personal, non-commercial purposes only",
        "Not misuse, attempt to hack, or disrupt the service",
        "Not submit false or misleading information",
        "Comply with all applicable laws and regulations"
      ],
    },
    {
        heading: "Intellectual Property",
        paragraphs: [
            "All content on KenroX, including the design, logo, code, and features, are the property of KenroX and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of KenroX without prior written permission.",
        ],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [
        "KenroX is provided “as is” without any warranties, express or implied. We are not liable for:",
        "Your use of the platform is at your own risk."
      ],
      points: [
        "Any injury or harm resulting from the use of the workout or diet plans",
        "Errors or inaccuracies in the generated content",
        "Any interruptions or unavailability of the service"
      ],
    },
    {
      heading: "Modifications to the Service",
      paragraphs: [
        "We may update, modify, or discontinue any part of the KenroX service at any time without notice. We are not liable for any resulting impact on your use of the platform.",
      ],
    },
    {
      heading: "Termination",
      paragraphs: [
        "We reserve the right to suspend or terminate access to KenroX at our discretion, without notice, if you violate these Terms or misuse the service.",
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

export default TermsAndConditions;