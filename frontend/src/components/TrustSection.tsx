
import React from "react";
import { BookOpen, Lock, Clock, ThumbsUp } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: <BookOpen className="w-8 h-8 text-pink-400" />,
      title: "Verified Medical Sources",
      description:
        "Our AI is trained on peer-reviewed medical literature and trusted healthcare guidelines.",
    },
    {
      icon: <Lock className="w-8 h-8 text-purple-400" />,
      title: "Anonymous & Private",
      description:
        "Your conversations are private and we don't store personally identifiable information.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: "Available 24/7",
      description:
        "Get answers to your health questions whenever you need them, day or night.",
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-green-400" />,
      title: "User-Friendly Interface",
      description:
        "Simple, intuitive design makes it easy to get the information you need quickly.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl font-bold text-purple-700 mb-4 text-center">
          Why Use This Chatbot?
        </h2>
        <p className="section-subtitle text-center text-purple-600 max-w-2xl mx-auto">
          Designed with your needs in mind, our AI assistant offers several unique advantages
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">{point.title}</h3>
              <p className="text-purple-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
