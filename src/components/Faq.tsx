import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#253551] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <HelpCircle className="w-10 h-10 text-[#ef8113] mx-auto opacity-90" />
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-gray-300 text-sm max-w-lg mx-auto font-light">
            Tout ce qu&apos;il faut savoir sur le Bilan IA
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#253551]/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-display font-medium text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ef8113] transition-transform duration-300 shrink-0 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Animated Answer panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                  } overflow-hidden`}
                >
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed p-6 bg-black/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
