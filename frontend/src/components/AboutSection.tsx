import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50"
    >
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl font-bold text-purple-800 mb-6 text-center">
          Smart, Caring, Always Available
        </h2>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg text-purple-700">
            Our AI assistant specializes in women's reproductive health, focusing on infertility, 
            pregnancy, and gynaecological concerns. Designed to provide compassionate, 
            evidence-based information when you need it most, whether it's 3 AM or during a busy day.
          </p>
          <p className="text-lg text-purple-600">
            Your conversations remain private and secure. No judgment, no waiting rooms, 
            just reliable information to help you understand your body and make informed decisions 
            about your healthcare journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
