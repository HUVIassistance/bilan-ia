import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  onStartAudit: () => void;
}

export default function Header({ onStartAudit }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#182337]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Real Logo integration */}
          <a href="#" className="flex items-center gap-1.5 group select-none">
            <Logo className="h-14 w-auto transform transition-transform group-hover:scale-102" />
          </a>

          {/* Call to Action Button */}
          <div>
            <button
              id="cta-nav"
              onClick={onStartAudit}
              className="inline-flex items-center gap-2 bg-[#ef8113] hover:bg-[#f09436] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:shadow-[#ef8113]/25 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Calculer mes pertes
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
