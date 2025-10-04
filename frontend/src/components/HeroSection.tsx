import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleChatNowClick = () => {
    navigate("/chat");
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-purple-800">
              Your Trusted AI Assistant for Women's Health
            </h1>
            <p className="text-xl text-purple-600 max-w-lg">
              Ask about infertility, pregnancy, and gynaecology — anytime, privately, and accurately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleChatNowClick}
                className="bg-purple-400 text-white hover:bg-purple-500 transition-colors rounded-full px-6 py-3"
              >
                Chat Now
              </Button>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-500 hover:bg-purple-100 hover:border-purple-500 rounded-full px-6 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-pink-100/50 rounded-full blur-3xl"></div>
              <img
                src="https://res.cloudinary.com/dyj3rywju/image/upload/v1744120554/doctorimg-removebg-preview_dpaajn.png"
                alt="Female doctor illustration"
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
