import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate();
  const handleChatNowClick = () => navigate("/chat");

  // Smooth scroll function
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false); // close mobile menu
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "How It Works", id: "how-it-works" },
    { name: "FAQs", id: "faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-purple-100/90 backdrop-blur-md shadow-lg py-2"
          : "bg-purple-50 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-purple-600 leading-none">Femina</span>
            <span className="text-xl font-medium text-pink-400 leading-none">AI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-purple-700 hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={handleChatNowClick}
              className="bg-pink-300 hover:bg-pink-400 text-white rounded-full px-5 py-2 transition-colors shadow-md hover:shadow-lg"
            >
              Chat Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-purple-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4 bg-purple-100 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-purple-700 hover:text-pink-400 transition-colors duration-200 font-medium text-left"
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={handleChatNowClick}
              className="bg-pink-300 hover:bg-pink-400 text-white w-full rounded-full px-4 py-2 transition-colors shadow-md hover:shadow-lg"
            >
              Chat Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
